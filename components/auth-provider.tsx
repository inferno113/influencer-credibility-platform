"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, UserRole } from "@/lib/types"
import { authStorage, SESSION_TIMEOUT } from "@/lib/auth-context"
import { usePathname, useRouter } from "next/navigation"

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
  const pathname = usePathname()
  const router = useRouter()

  const logout = useCallback(() => {
    authStorage.clearUser()
    setUser(null)
  }, [])

  useEffect(() => {
    // Load user from storage on client
    const storedUser = authStorage.getUser()
    setUser(storedUser)
    setLoading(false)
  }, [])

  // Sign out when user goes to home page
  useEffect(() => {
    if (pathname === "/" && user) {
      logout()
      router.refresh()
    }
  }, [pathname, user, logout, router])

  // Session timeout checker
  useEffect(() => {
    if (!user) return

    const checkSession = () => {
      const storedUser = authStorage.getUser()
      if (!storedUser) {
        // Session expired
        setUser(null)
        router.push("/auth")
      }
    }

    // Check session every minute
    const interval = setInterval(checkSession, 60 * 1000)

    // Also set a timeout for the exact session expiry
    const timeRemaining = authStorage.getTimeRemaining()
    const timeout = setTimeout(() => {
      logout()
      router.push("/auth")
    }, timeRemaining)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [user, router, logout])

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
