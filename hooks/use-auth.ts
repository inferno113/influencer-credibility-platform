"use client"

import { useEffect, useState } from "react"
import type { User, UserRole } from "@/lib/types"
import { authStorage } from "@/lib/auth-context"
import { mockUsers } from "@/lib/mock-data"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from storage on mount
  useEffect(() => {
    const storedUser = authStorage.getUser()
    setUser(storedUser)
    setLoading(false)
  }, [])

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - find user by role from mock data or create new one
    const mockUser = mockUsers.find((u) => u.role === role) || {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      avatar: "/abstract-user-representation.png",
    }

    authStorage.setUser(mockUser)
    setUser(mockUser)
  }

  const logout = () => {
    authStorage.clearUser()
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: user !== null,
  }
}
