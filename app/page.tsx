import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Shield, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-card/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 w-fit gap-2">
                    <Sparkles className="w-4 h-4" />
                    Credibility Intelligence Platform
                  </Badge>
                  <h1 className="text-6xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                    The IMDb for Influencers
                  </h1>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Institutional-grade credibility ratings for creators. Brands discover verified talent. Creators
                  showcase authentic influence. All powered by transparent, data-driven intelligence.
                </p>

                <div className="flex gap-4 pt-4">
                  <Link href="/explore">
                    <Button
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
                    >
                      Explore Creators <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary/30 hover:border-primary bg-transparent"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-primary/20 p-8 h-96 flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    <div className="h-3 bg-primary/30 rounded-full w-3/4" />
                    <div className="h-3 bg-secondary/30 rounded-full w-full" />
                    <div className="h-3 bg-accent/30 rounded-full w-5/6" />
                    <div className="pt-4 space-y-3">
                      <div className="h-2 bg-primary/20 rounded-full" />
                      <div className="h-2 bg-primary/20 rounded-full w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-border/50 bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to credibility intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "1",
                  title: "Credibility Scoring",
                  description:
                    "Multi-factor analysis: consistency, engagement, growth stability, content quality, and authenticity scoring.",
                  icon: TrendingUp,
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  number: "2",
                  title: "Trust Verification",
                  description:
                    "Transparent tagging system with verified badges, trust indicators, and detailed rating methodology.",
                  icon: Shield,
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  number: "3",
                  title: "Smart Discovery",
                  description:
                    "Advanced filters by category, platform, rating range, and tags to find the perfect creators.",
                  icon: Zap,
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.number} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Card className="relative h-full p-8 border-border/50 bg-card/50 hover:border-primary/50 transition-all">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 text-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl font-bold text-primary/40">{item.number}</span>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* User Roles / Features */}
        <section className="border-b border-border/50 bg-gradient-to-b from-background to-card/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Built for Your Role</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Powerful tools designed for every user</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Public Users",
                  icon: Users,
                  gradient: "from-blue-500 to-cyan-500",
                  features: ["Browse creators", "View ratings", "Explore profiles", "Filter by category"],
                },
                {
                  title: "Brands",
                  icon: Zap,
                  gradient: "from-purple-500 to-pink-500",
                  features: ["Advanced filters", "Save creators", "Compare profiles", "Direct messaging"],
                },
                {
                  title: "Creators",
                  icon: TrendingUp,
                  gradient: "from-orange-500 to-red-500",
                  features: ["View your rating", "Track analytics", "Edit profile", "Connect with brands"],
                },
                {
                  title: "Admins",
                  icon: Shield,
                  gradient: "from-green-500 to-emerald-500",
                  features: ["Manage platform", "Control ratings", "View analytics", "Moderate content"],
                },
              ].map((role) => {
                const Icon = role.icon
                return (
                  <Card
                    key={role.title}
                    className="p-6 border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-4">{role.title}</h3>
                    <ul className="space-y-2">
                      {role.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Premium Features */}
        <section className="border-b border-border/50 bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold">Premium Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock advanced tools for brands and creators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-card/30 border border-border/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold">For Brands</h3>
                <ul className="space-y-3">
                  {[
                    "Advanced demographic filtering",
                    "Side-by-side creator comparisons",
                    "Direct messaging to creators",
                    "Partnership tracking tools",
                    "Monthly analytics reports",
                    "Priority support",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing">
                  <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    View Brand Plans <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-6 bg-card/30 border border-border/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold">For Creators</h3>
                <ul className="space-y-3">
                  {[
                    "Premium profile badge",
                    "Featured in brand searches",
                    "Advanced analytics dashboard",
                    "Growth tracking & insights",
                    "Direct brand messaging",
                    "Partnership opportunities",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing/creators">
                  <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    View Creator Plans <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-background to-card/30 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to join?
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover trusted creators or grow your influence with data-driven insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/explore">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Browse Creators <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:border-primary bg-transparent"
                >
                  Create Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
