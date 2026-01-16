import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </RoleGuard>
  )
}
