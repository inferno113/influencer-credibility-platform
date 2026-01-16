"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Star, BarChart3, Settings, LogOut, ShieldAlert, FileCheck, Award } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/applications", label: "Applications", icon: FileCheck },
    { href: "/admin/approved", label: "Approved Creators", icon: Users },
    { href: "/admin/assign-rating", label: "Assign Ratings", icon: Star },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center">
            <span className="text-destructive-foreground font-bold text-sm">AD</span>
          </div>
          <span className="font-semibold text-foreground">Admin Panel</span>
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
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
