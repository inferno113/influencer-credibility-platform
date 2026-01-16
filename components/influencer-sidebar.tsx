"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, User, Users, BarChart3, Settings, LogOut } from "lucide-react"

export function InfluencerSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const links = [
    { href: "/dashboard/influencer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/influencer/profile", label: "My Profile", icon: User },
    { href: "/dashboard/influencer/network", label: "Network", icon: Users },
    { href: "/dashboard/influencer/insights", label: "Insights", icon: BarChart3 },
    { href: "/dashboard/influencer/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CI</span>
          </div>
          <span className="font-semibold text-foreground">Creator Intel</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link key={link.href} href={link.href}>
              <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-3">
                <Icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={() => {
            logout()
          }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
