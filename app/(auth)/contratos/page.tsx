'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Button } from "../../../@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { Textarea } from "../../../@/components/ui/textarea";
import { FileText, Download, Sparkles, Copy, Check, History, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { createClient } from '../../../lib/supabase/client';
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";

const Contratos = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState({
    parteA: "",
    parteB: "",
    objeto: "",
    monto: "",
    plazo: "",
    detalles: ""
  });
  const [loading, setLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState("");
  const [copied, setCopied] = useState(false);
  const [historialContratos, setHistorialContratos] = useState<any[]>([]);
  const [viewingContract, setViewingContract] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("nuevo");
  const supabase = createClient(); 

  useEffect(() => {
    loadHistorial();
  }, []);

  const loadHistorial = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('contratos_generados')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistorialContratos(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleDeleteContract = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contratos_generados')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Contrato eliminado');
      loadHistorial();
    } catch (error) {
      console.error('Error deleting contract:', error);
      toast.error('Error al eliminar el contrato');
    }
  };

  const getTipoContratoName = (tipo: string) => {
    const names: Record<string, string> = {
      compraventa: "Compraventa",
      servicios: "Servicios",
      arrendamiento: "Arrendamiento",
      trabajo: "Trabajo",
      sociedad: "Sociedad"
    };
    return names[tipo] || tipo;
  };

  const templates = [
    { id: "compraventa", name: "Contrato de Compraventa", description: "Para transacciones de bienes" },
    { id: "servicios", name: "Contrato de Servicios", description: "Para prestación de servicios profesionales" },
    { id: "arrendamiento", name: "Contrato de Arrendamiento", description: "Para alquiler de inmuebles" },
    { id: "trabajo", name: "Contrato de Trabajo", description: "Para relaciones laborales" },
    { id: "sociedad", name: "Contrato de Sociedad", description: "Para constitución de sociedades" }
  ];

  const handleGenerateContract = async () => {
    if (!selectedTemplate || !formData.parteA || !formData.parteB) {
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    setLoading(true);
    setGeneratedContract("");
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-contract`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipoContrato: selectedTemplate,
            parteA: formData.parteA,
            parteB: formData.parteB,
            objeto: formData.objeto,
            monto: formData.monto,
            plazo: formData.plazo,
            detalles: formData.detalles
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar el contrato');
      }

      const data = await response.json();
      setGeneratedContract(data.contract);
      
      toast.success("Contrato generado exitosamente", {
        description: "Revisa el documento y descárgalo cuando estés listo"
      });

      // Reload history to show new contract
      loadHistorial();
      setActiveTab("historial");

    } catch (error: any) {
      console.error("Error generando contrato:", error);
      toast.error(error.message || "Error al generar el contrato");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyContract = () => {
    if (!generatedContract) return;
    navigator.clipboard.writeText(generatedContract);
    setCopied(true);
    toast.success("Contrato copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!generatedContract) return;
    
    // Create a text file with the contract
    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contrato-${selectedTemplate}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Contrato descargado");
  };

  return (
    <div className="min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Generador de Contratos</h1>
            <p className="text-muted-foreground">
              Crea contratos legales personalizados con ayuda de IA
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="nuevo">Nuevo Contrato</TabsTrigger>
              <TabsTrigger value="historial">
                <History className="w-4 h-4 mr-2" />
                Historial ({historialContratos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nuevo" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <FileText className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Detalles del Contrato</CardTitle>
                <CardDescription>
                  Completa la información para generar tu contrato personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parteA">Parte A (Contratante) *</Label>
                    <Input
                      id="parteA"
                      placeholder="Nombre completo o razón social"
                      value={formData.parteA}
                      onChange={(e) => setFormData({ ...formData, parteA: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parteB">Parte B (Contratado) *</Label>
                    <Input
                      id="parteB"
                      placeholder="Nombre completo o razón social"
                      value={formData.parteB}
                      onChange={(e) => setFormData({ ...formData, parteB: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objeto">Objeto del Contrato</Label>
                  <Input
                    id="objeto"
                    placeholder="Ej: Prestación de servicios de consultoría"
                    value={formData.objeto}
                    onChange={(e) => setFormData({ ...formData, objeto: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monto">Monto (Gs.)</Label>
                    <Input
                      id="monto"
                      type="number"
                      placeholder="0"
                      value={formData.monto}
                      onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plazo">Plazo</Label>
                    <Input
                      id="plazo"
                      placeholder="Ej: 6 meses"
                      value={formData.plazo}
                      onChange={(e) => setFormData({ ...formData, plazo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detalles">Detalles Adicionales</Label>
                  <Textarea
                    id="detalles"
                    placeholder="Agrega cualquier información adicional que desees incluir en el contrato"
                    rows={4}
                    value={formData.detalles}
                    onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button 
                  onClick={handleGenerateContract} 
                  disabled={loading}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {loading ? "Generando con IA..." : "Generar con IA"}
                </Button>
              </CardFooter>
            </Card>
          )}
            </TabsContent>

            <TabsContent value="historial" className="space-y-6">
              {historialContratos.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No has generado ningún contrato todavía.
                      <br />
                      Crea tu primer contrato usando la pestaña "Nuevo Contrato"
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {historialContratos.map((contrato) => (
                    <Card key={contrato.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              {getTipoContratoName(contrato.tipo_contrato)}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {contrato.parte_a} ↔ {contrato.parte_b}
                            </CardDescription>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(contrato.created_at).toLocaleDateString('es-PY')}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {contrato.objeto && (
                            <div>
                              <span className="text-muted-foreground">Objeto:</span>
                              <p className="font-medium truncate">{contrato.objeto}</p>
                            </div>
                          )}
                          {contrato.monto && (
                            <div>
                              <span className="text-muted-foreground">Monto:</span>
                              <p className="font-medium">Gs. {contrato.monto}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingContract(contrato)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const blob = new Blob([contrato.contenido_contrato], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `contrato-${contrato.tipo_contrato}-${contrato.id.slice(0, 8)}.txt`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            toast.success('Contrato descargado');
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteContract(contrato.id)}
                          className="ml-auto"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Dialog open={!!viewingContract} onOpenChange={() => setViewingContract(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>
                  {viewingContract && getTipoContratoName(viewingContract.tipo_contrato)}
                </DialogTitle>
                <DialogDescription>
                  {viewingContract && `${viewingContract.parte_a} ↔ ${viewingContract.parte_b}`}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {viewingContract?.contenido_contrato}
                </pre>
              </ScrollArea>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (viewingContract) {
                      navigator.clipboard.writeText(viewingContract.contenido_contrato);
                      toast.success('Contrato copiado al portapapeles');
                    }
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button
                  onClick={() => {
                    if (viewingContract) {
                      const blob = new Blob([viewingContract.contenido_contrato], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `contrato-${viewingContract.tipo_contrato}-${viewingContract.id.slice(0, 8)}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      toast.success('Contrato descargado');
                      setViewingContract(null);
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {generatedContract && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contrato Generado</CardTitle>
                <CardDescription>
                  Revisa el contrato generado por IA. Puedes copiarlo o descargarlo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {generatedContract}
                  </pre>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCopyContract}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleDownloadPDF}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
    </div>
  );
};

export default Contratos;