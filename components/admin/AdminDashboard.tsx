'use client'
import { useEffect, useState } from "react";
import { createClient } from '../../lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "../../@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, BookOpen, GraduationCap, DollarSign, CalendarIcon, ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../@/components/ui/popover";
import { Calendar } from "../../@/components/ui/calendar";
import { Switch } from "../../@/components/ui/switch";
import { Label } from "../../@/components/ui/label";
import { cn } from "../../lib/utils";
import { format, subDays, subMonths, subYears, startOfDay, endOfDay, differenceInDays } from "date-fns";

interface DashboardStats {
  totalVentas: number;
  montoTotal: number;
  totalUsuarios: number;
  cursosPopulares: Array<{ titulo: string; inscripciones: number }>;
  ventasMensuales: Array<{ mes: string; ventas: number; monto: number }>;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalVentas: 0,
    montoTotal: 0,
    totalUsuarios: 0,
    cursosPopulares: [],
    ventasMensuales: [],
  });
  const [previousStats, setPreviousStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  const [tempDateRange, setTempDateRange] = useState<{ from?: Date; to?: Date }>({});
  const supabase = createClient(); 

  useEffect(() => {
    loadDashboardStats();
  }, [dateRange, compareEnabled]);

  const handlePresetRange = (days: number) => {
    setDateRange({
      from: subDays(new Date(), days),
      to: new Date(),
    });
  };

  const handleCustomRange = () => {
    if (tempDateRange.from && tempDateRange.to) {
      setDateRange({
        from: startOfDay(tempDateRange.from),
        to: endOfDay(tempDateRange.to),
      });
    }
  };

  const loadDashboardStats = async () => {
    setLoading(true);
    try {
      // Total ventas de libros (filtradas por fecha)
      const { data: ventas, error: ventasError } = await supabase
        .from("compras_libros")
        .select("monto_pagado, fecha_compra")
        .gte("fecha_compra", dateRange.from.toISOString())
        .lte("fecha_compra", dateRange.to.toISOString());

      if (ventasError) throw ventasError;

      const totalVentas = ventas?.length || 0;
      const montoTotal = ventas?.reduce((sum, v) => sum + Number(v.monto_pagado || 0), 0) || 0;

      // Total usuarios registrados
      const { count: totalUsuarios, error: usuariosError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      if (usuariosError) throw usuariosError;

      // Cursos con más inscripciones
      const { data: inscripciones, error: inscripcionesError } = await supabase
        .from("inscripciones_cursos")
        .select("curso_id, cursos(titulo)");

      if (inscripcionesError) throw inscripcionesError;

      const cursosCounts = inscripciones?.reduce((acc: any, curr: any) => {
        const titulo = curr.cursos?.titulo || "Sin título";
        acc[titulo] = (acc[titulo] || 0) + 1;
        return acc;
      }, {}) || {};

      const cursosPopulares = Object.entries(cursosCounts)
        .map(([titulo, inscripciones]) => ({ titulo, inscripciones: inscripciones as number }))
        .sort((a, b) => b.inscripciones - a.inscripciones)
        .slice(0, 5);

      // Ventas mensuales (últimos 6 meses)
      const ventasPorMes = ventas?.reduce((acc: any, venta) => {
        const fecha = new Date(venta.fecha_compra);
        const mes = fecha.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
        if (!acc[mes]) {
          acc[mes] = { mes, ventas: 0, monto: 0 };
        }
        acc[mes].ventas += 1;
        acc[mes].monto += Number(venta.monto_pagado || 0);
        return acc;
      }, {}) || {};

      const ventasMensuales = Object.values(ventasPorMes).slice(-6);

      setStats({
        totalVentas,
        montoTotal,
        totalUsuarios: totalUsuarios || 0,
        cursosPopulares,
        ventasMensuales: ventasMensuales as any,
      });

      // Cargar stats del periodo anterior si está habilitada la comparación
      if (compareEnabled) {
        const daysDiff = differenceInDays(dateRange.to, dateRange.from);
        const previousFrom = subDays(dateRange.from, daysDiff + 1);
        const previousTo = subDays(dateRange.from, 1);

        const { data: previousVentas } = await supabase
          .from("compras_libros")
          .select("monto_pagado, fecha_compra")
          .gte("fecha_compra", previousFrom.toISOString())
          .lte("fecha_compra", previousTo.toISOString());

        const previousTotalVentas = previousVentas?.length || 0;
        const previousMontoTotal = previousVentas?.reduce((sum, v) => sum + Number(v.monto_pagado || 0), 0) || 0;

        setPreviousStats({
          totalVentas: previousTotalVentas,
          montoTotal: previousMontoTotal,
          totalUsuarios: 0,
          cursosPopulares: [],
          ventasMensuales: [],
        });
      } else {
        setPreviousStats(null);
      }
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros de fecha */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Filtros de Fecha</span>
            <div className="flex items-center space-x-2">
              <Switch
                id="compare-mode"
                checked={compareEnabled}
                onCheckedChange={setCompareEnabled}
              />
              <Label htmlFor="compare-mode" className="text-sm font-normal">
                Comparar periodos
              </Label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePresetRange(7)}
              className={cn(
                dateRange.from.getTime() === subDays(new Date(), 7).setHours(0, 0, 0, 0) &&
                  "bg-primary text-primary-foreground"
              )}
            >
              Última Semana
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePresetRange(30)}
              className={cn(
                dateRange.from.getTime() === subDays(new Date(), 30).setHours(0, 0, 0, 0) &&
                  "bg-primary text-primary-foreground"
              )}
            >
              Último Mes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePresetRange(90)}
              className={cn(
                dateRange.from.getTime() === subDays(new Date(), 90).setHours(0, 0, 0, 0) &&
                  "bg-primary text-primary-foreground"
              )}
            >
              Últimos 3 Meses
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDateRange({
                  from: subMonths(new Date(), 6),
                  to: new Date(),
                })
              }
            >
              Últimos 6 Meses
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setDateRange({
                  from: subYears(new Date(), 1),
                  to: new Date(),
                })
              }
            >
              Último Año
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
                    : "Rango personalizado"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3 space-y-3">
                  <Calendar
                    mode="range"
                    selected={{ from: tempDateRange.from, to: tempDateRange.to }}
                    onSelect={(range) => setTempDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                    className={cn("pointer-events-auto")}
                  />
                  <Button
                    onClick={handleCustomRange}
                    disabled={!tempDateRange.from || !tempDateRange.to}
                    className="w-full"
                    size="sm"
                  >
                    Aplicar Rango
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Tarjetas de métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.montoTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{stats.totalVentas} libros vendidos</p>
            {compareEnabled && previousStats && (
              <div className="flex items-center gap-1 mt-2">
                {calculateGrowth(stats.montoTotal, previousStats.montoTotal) >= 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  calculateGrowth(stats.montoTotal, previousStats.montoTotal) >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {Math.abs(calculateGrowth(stats.montoTotal, previousStats.montoTotal)).toFixed(1)}%
                </span>
                <span className="text-xs text-muted-foreground">vs periodo anterior</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
            <p className="text-xs text-muted-foreground">Total de usuarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Libros Vendidos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVentas}</div>
            <p className="text-xs text-muted-foreground">Total de ventas</p>
            {compareEnabled && previousStats && (
              <div className="flex items-center gap-1 mt-2">
                {calculateGrowth(stats.totalVentas, previousStats.totalVentas) >= 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  calculateGrowth(stats.totalVentas, previousStats.totalVentas) >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {Math.abs(calculateGrowth(stats.totalVentas, previousStats.totalVentas)).toFixed(1)}%
                </span>
                <span className="text-xs text-muted-foreground">vs periodo anterior</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Populares</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cursosPopulares.length}</div>
            <p className="text-xs text-muted-foreground">Con inscripciones</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="monto" stroke="hsl(var(--primary))" strokeWidth={2} name="Monto ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cursos Más Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.cursosPopulares}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="titulo" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inscripciones" fill="hsl(var(--primary))" name="Inscripciones" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};