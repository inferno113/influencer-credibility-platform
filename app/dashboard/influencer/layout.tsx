import type { ReactNode } from "react"
import { RoleGuard } from "@/components/role-guard"
import { InfluencerSidebar } from "@/components/influencer-sidebar"

export default function InfluencerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["influencer", "admin"]}>
      <div className="flex h-screen bg-background">
        <InfluencerSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </RoleGuard>
  )
}
