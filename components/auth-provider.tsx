"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, UserRole } from "@/lib/types"
import { authStorage } from "@/lib/auth-context"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from storage on client
    const storedUser = authStorage.getUser()
    setUser(storedUser)
    setLoading(false)
  }, [])

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login logic
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      avatar: "/abstract-user-representation.png",
    }
    authStorage.setUser(newUser)
    setUser(newUser)
  }

  const logout = () => {
    authStorage.clearUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: user !== null }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
