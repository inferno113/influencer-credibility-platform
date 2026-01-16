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
import { ArrowLeft, CheckCircle2, Users, TrendingUp, Shield, Sparkles } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [step, setStep] = useState<"role-select" | "login">("role-select")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const roles: Array<{
    value: UserRole
    label: string
    description: string
    features: string[]
    icon: React.ReactNode
    color: string
    bgGradient: string
  }> = [
    {
      value: "public",
      label: "Public User",
      description: "Browse verified creators",
      features: ["View all profiles", "Filter by category", "See credibility scores", "Read reviews"],
      icon: <Users className="w-8 h-8" />,
      color: "text-blue-500",
      bgGradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      value: "brand",
      label: "Brand Account",
      description: "Find perfect creators",
      features: ["Advanced filtering", "Compare 3 creators", "Direct messaging", "Export insights"],
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-purple-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      value: "influencer",
      label: "Creator Account",
      description: "Showcase your profile",
      features: ["Manage your presence", "View analytics", "Get brand offers", "Track rating"],
      icon: <Sparkles className="w-8 h-8" />,
      color: "text-orange-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
    },
    {
      value: "admin",
      label: "Platform Admin",
      description: "Manage the platform",
      features: ["User management", "Rating control", "Analytics", "Moderation tools"],
      icon: <Shield className="w-8 h-8" />,
      color: "text-emerald-500",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
    },
  ]

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("login")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole || !email) return

    setLoading(true)

    setTimeout(() => {
      login(email, password, selectedRole)

      const redirectMap: Record<UserRole, string> = {
        public: "/explore",
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
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          {/* Role Selection Step */}
          {step === "role-select" && (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <h1 className="text-5xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-lg text-muted-foreground">Select your account type to continue</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                  <button key={role.value} onClick={() => handleRoleSelect(role.value)} className="text-left">
                    <Card
                      className={`h-full border-2 transition-all duration-300 cursor-pointer group bg-gradient-to-br ${role.bgGradient} hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/50 ${
                        selectedRole === role.value ? "border-primary shadow-xl" : "border-border/50"
                      }`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl bg-white/10 backdrop-blur group-hover:scale-110 transition-transform`}
                          >
                            <div className={role.color}>{role.icon}</div>
                          </div>
                          {selectedRole === role.value && (
                            <Badge className="bg-primary text-white border-0 animate-pulse">
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Selected
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {role.label}
                        </CardTitle>
                        <CardDescription className="text-sm">{role.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {role.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                            >
                              <div className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>

              {/* Info Banner */}
              <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    New to Creator Intelligence? Enter any email to create your account instantly. No credit card
                    required.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Login Step */}
          {step === "login" && selectedRole && (
            <div className="space-y-8 max-w-md mx-auto">
              <button
                onClick={() => setStep("role-select")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to role selection
              </button>

              <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Continue as{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {roles.find((r) => r.value === selectedRole)?.label}
                    </span>
                  </CardTitle>
                  <CardDescription>Enter your email to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-muted/50 border-border/50 focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/50 border-border/50 focus:border-primary/50"
                      />
                    </div>

                    <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Demo Access:</p>
                      <p>Use any email and password to explore the platform.</p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={!email || loading}
                    >
                      {loading ? "Signing in..." : "Continue"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Pricing CTA */}
              <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardContent className="pt-6 space-y-3">
                  <p className="font-medium text-sm">Ready to upgrade?</p>
                  <Link href={selectedRole === "brand" ? "/pricing" : "/pricing/creators"}>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary/50 hover:border-primary bg-transparent hover:bg-primary/5"
                      onClick={() => {}}
                    >
                      View Premium Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
