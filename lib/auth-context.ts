import type { User, UserRole } from "./types"

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

// Session timeout in milliseconds (15 minutes)
export const SESSION_TIMEOUT = 15 * 60 * 1000

// Simulated auth storage using sessionStorage
export const authStorage = {
  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const stored = sessionStorage.getItem("authUser")
    const loginTime = sessionStorage.getItem("authLoginTime")
    
    if (!stored || !loginTime) return null
    
    // Check if session has expired
    const elapsed = Date.now() - parseInt(loginTime)
    if (elapsed > SESSION_TIMEOUT) {
      // Session expired, clear user
      authStorage.clearUser()
      return null
    }
    
    return JSON.parse(stored)
  },
  setUser: (user: User) => {
    if (typeof window === "undefined") return
    sessionStorage.setItem("authUser", JSON.stringify(user))
    sessionStorage.setItem("authLoginTime", Date.now().toString())
  },
  clearUser: () => {
    if (typeof window === "undefined") return
    sessionStorage.removeItem("authUser")
    sessionStorage.removeItem("authLoginTime")
  },
  refreshSession: () => {
    if (typeof window === "undefined") return
    sessionStorage.setItem("authLoginTime", Date.now().toString())
  },
  getTimeRemaining: (): number => {
    if (typeof window === "undefined") return 0
    const loginTime = sessionStorage.getItem("authLoginTime")
    if (!loginTime) return 0
    const elapsed = Date.now() - parseInt(loginTime)
    return Math.max(0, SESSION_TIMEOUT - elapsed)
  }
}
