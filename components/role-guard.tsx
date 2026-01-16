"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: Array<"admin" | "brand" | "influencer" | "public">
  fallbackUrl?: string
}

export function RoleGuard({ children, allowedRoles, fallbackUrl = "/auth" }: RoleGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.role))) {
      router.push(fallbackUrl)
    }
  }, [user, loading, allowedRoles, fallbackUrl, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
