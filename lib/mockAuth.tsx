'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

type User = { id: string; email?: string } | null
type Context = {
  user: User
  login: (email?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<Context | undefined>(undefined)

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)

  const login = async (email = 'ana@example.com') => {
    await new Promise((r) => setTimeout(r, 300))
    setUser({ id: 'mock-id', email })
  }

  const logout = async () => {
    await new Promise((r) => setTimeout(r, 100))
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useMockAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useMockAuth must be used inside MockAuthProvider')
  return ctx
}
