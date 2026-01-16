"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/types"
import Link from "next/link"
import { CheckCircle2, TrendingUp, Shield, Sparkles, Key, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Demo credentials for each role (excluding public - they don't need to sign in)
type SignInRole = Exclude<UserRole, "public">
const demoCredentials: Record<SignInRole, { email: string; password: string }> = {
  brand: { email: "demo@brand.com", password: "demo123" },
  influencer: { email: "demo@creator.com", password: "demo123" },
  admin: { email: "demo@admin.com", password: "demo123" },
}

const roleLabels: Record<SignInRole, string> = {
  brand: "Brand",
  influencer: "Creator",
  admin: "Admin",
}

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [selectedRole, setSelectedRole] = useState<SignInRole>("brand")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const roles: Array<{
    value: SignInRole
    label: string
    description: string
    features: string[]
    icon: React.ReactNode
    color: string
    bgGradient: string
  }> = [
    {
      value: "brand",
      label: "Brand Account",
      description: "Find perfect creators for your campaigns",
      features: ["Advanced filtering", "Compare creators", "Direct messaging", "Export insights"],
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-purple-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      value: "influencer",
      label: "Creator Account",
      description: "Showcase your profile to brands",
      features: ["Manage presence", "View analytics", "Get offers", "Track rating"],
      icon: <Sparkles className="w-6 h-6" />,
      color: "text-orange-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
    },
    {
      value: "admin",
      label: "Platform Admin",
      description: "Manage the entire platform",
      features: ["User management", "Rating control", "Analytics", "Moderation"],
      icon: <Shield className="w-6 h-6" />,
      color: "text-emerald-500",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole || !email || !password) return

    setLoading(true)
    setError(null)

    setTimeout(() => {
      // Validate credentials
      const validCreds = demoCredentials[selectedRole]
      if (email !== validCreds.email || password !== validCreds.password) {
        setError("Invalid email or password. Please use the demo credentials shown below.")
        setLoading(false)
        return
      }

      login(email, password, selectedRole)

      const redirectMap: Record<SignInRole, string> = {
        brand: "/dashboard/brand",
        influencer: "/dashboard/influencer",
        admin: "/admin",
      }

      router.push(redirectMap[selectedRole])
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
              <span className="text-white font-bold text-sm">CI</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">Creator Intelligence</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Sign In
            </h1>
            <p className="text-lg text-muted-foreground">Access your dashboard</p>
          </div>

          {/* Sign In Form */}
          <Card className="max-w-md mx-auto border-border/50 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-xl">Welcome Back</CardTitle>
              <CardDescription>Select your account type and enter credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Role Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Account Type</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between bg-muted/50 border-border/50 hover:bg-muted"
                      >
                        <span className="flex items-center gap-2">
                          {roles.find(r => r.value === selectedRole)?.icon}
                          {roleLabels[selectedRole]}
                        </span>
                        <ChevronDown className="w-4 h-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[200px]">
                      {roles.map((role) => (
                        <DropdownMenuItem
                          key={role.value}
                          onClick={() => {
                            setSelectedRole(role.value)
                            setEmail("")
                            setPassword("")
                            setError(null)
                          }}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className={role.color}>{role.icon}</span>
                            {role.label}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder={demoCredentials[selectedRole].email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={!email || !password || loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="max-w-md mx-auto border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-4 h-4 text-primary" />
                <p className="font-medium text-foreground">Demo Credentials</p>
              </div>
              <div className="space-y-3">
                {(Object.entries(demoCredentials) as [SignInRole, { email: string; password: string }][]).map(([role, creds]) => (
                  <div 
                    key={role} 
                    className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                      selectedRole === role 
                        ? "bg-primary/10 border-primary/50" 
                        : "bg-background/50 border-border/50"
                    }`}
                    onClick={() => {
                      setSelectedRole(role)
                      setEmail(creds.email)
                      setPassword(creds.password)
                      setError(null)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-foreground">{roleLabels[role]}</p>
                        <p className="text-xs text-muted-foreground">{creds.email}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {creds.password}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Click on a credential to auto-fill the form
              </p>
            </CardContent>
          </Card>

          {/* Role Cards */}
          <div className="pt-4">
            <p className="text-center text-sm text-muted-foreground mb-6">Choose the right account for you</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <Card
                  key={role.value}
                  className={`border transition-all cursor-pointer hover:shadow-lg hover:border-primary/50 bg-gradient-to-br ${role.bgGradient} ${
                    selectedRole === role.value ? "border-primary ring-2 ring-primary/20" : "border-border/50"
                  }`}
                  onClick={() => {
                    setSelectedRole(role.value)
                    setEmail(demoCredentials[role.value].email)
                    setPassword(demoCredentials[role.value].password)
                    setError(null)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-white/10 ${role.color}`}>
                        {role.icon}
                      </div>
                      {selectedRole === role.value && (
                        <Badge className="bg-primary text-white border-0 text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{role.label}</CardTitle>
                    <CardDescription className="text-xs">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5">
                      {role.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
