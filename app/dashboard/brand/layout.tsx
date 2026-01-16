import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"
import { BrandSidebar } from "@/components/brand-sidebar"

export default function BrandDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["brand", "admin"]}>
      <div className="flex h-screen bg-background">
        <BrandSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </RoleGuard>
  )
}
