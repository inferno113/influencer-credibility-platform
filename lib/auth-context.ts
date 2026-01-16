import type { User, UserRole } from "./types"

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

// Simulated auth storage using sessionStorage
export const authStorage = {
  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const stored = sessionStorage.getItem("authUser")
    return stored ? JSON.parse(stored) : null
  },
  setUser: (user: User) => {
    if (typeof window === "undefined") return
    sessionStorage.setItem("authUser", JSON.stringify(user))
  },
  clearUser: () => {
    if (typeof window === "undefined") return
    sessionStorage.removeItem("authUser")
  },
}
