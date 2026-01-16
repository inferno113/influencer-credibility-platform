"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Search, Heart, Settings, LogOut, Crown, Sparkles, PartyPopper, Megaphone } from "lucide-react"

export function BrandSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const links = [
    { href: "/dashboard/brand", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/brand/explore", label: "Explore", icon: Search },
    { href: "/dashboard/brand/opportunities", label: "Opportunities", icon: PartyPopper },
    { href: "/dashboard/brand/promote", label: "Promote", icon: Megaphone },
    { href: "/dashboard/brand/saved", label: "Saved", icon: Heart },
    { href: "/dashboard/brand/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-foreground">ELEVATE</span>
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

      {/* Upgrade Plan Section */}
      <div className="px-4 py-4 border-t border-border">
        <Link href="/pricing">
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Upgrade Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Unlock advanced filters & direct creator messaging</p>
            <Button size="sm" className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Sparkles className="w-3 h-3" /> View Plans
            </Button>
          </div>
        </Link>
      </div>

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
