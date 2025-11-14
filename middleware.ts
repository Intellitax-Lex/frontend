// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Sin checks: app funciona visualmente en todas las rutas
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
}
