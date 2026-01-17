"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, X, Zap, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect creators to their own pricing page
  useEffect(() => {
    if (user?.role === "influencer") {
      router.push("/pricing/creators")
    }
  }, [user, router])

  const brandPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Get started with basic discovery",
      icon: Zap,
      features: [
        { text: "Browse all creators", included: true },
        { text: "View public profiles", included: true },
        { text: "Filter by category & rating", included: true },
        { text: "See trust tags", included: true },
        { text: "3 profile views per month", included: true },
        { text: "Advanced filters (engagement, growth)", included: false },
        { text: "Save unlimited creators", included: false },
        { text: "Side-by-side comparisons", included: false },
        { text: "Direct messaging to creators", included: false },
        { text: "Partnership tracking tools", included: false },
        { text: "Monthly analytics reports", included: false },
        { text: "Event promotion", included: false },
      ],
      eventPromotion: "Not available",
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹999",
      period: "per month",
      description: "Full access to all features",
      icon: Crown,
      features: [
        { text: "Browse all creators", included: true },
        { text: "View public profiles", included: true },
        { text: "Filter by category & rating", included: true },
        { text: "See trust tags", included: true },
        { text: "Unlimited profile views", included: true },
        { text: "Advanced filters (engagement, growth)", included: true },
        { text: "Save unlimited creators", included: true },
        { text: "Side-by-side comparisons (3 creators)", included: true },
        { text: "Direct messaging to creators", included: true },
        { text: "Partnership tracking tools", included: true },
        { text: "Monthly analytics reports", included: true },
        { text: "1 free event promotion/month", included: true },
      ],
      eventPromotion: "₹500 per additional event",
      cta: "Upgrade to Pro",
      highlighted: true,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              <Shield className="w-3 h-3 mr-1" /> For Brands
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Brand Pricing Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find and connect with the perfect creators for your campaigns.
            </p>
          </div>

          {/* Brand Plans Grid - No toggle for logged in users */}
          {!user && (
            <div className="flex justify-center mb-8">
              <p className="text-sm text-muted-foreground">
                Looking for creator plans? <Link href="/pricing/creators" className="text-primary hover:underline">Click here</Link>
              </p>
            </div>
          )}

          {/* Brand Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {brandPlans.map((plan, idx) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={idx}
                  className={`p-8 flex flex-col transition-all ${
                    plan.highlighted
                      ? "border-primary/50 bg-gradient-to-br from-card to-card/50 relative ring-2 ring-primary/20 md:scale-105"
                      : "border-border/50 bg-card/30 hover:border-primary/30"
                  }`}
                >
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white border-0">
                      Recommended
                    </Badge>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${plan.highlighted ? "bg-primary/20" : "bg-muted"}`}>
                        <IconComponent className={`w-5 h-5 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Event promotion: {plan.eventPromotion}
                    </p>
                  </div>

                  <Link href="/auth">
                    <Button
                      className={`w-full mb-8 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          : "bg-transparent border border-border hover:border-primary"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground/50" : ""}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Event Promotion Pricing */}
          <div className="bg-card border border-border/50 rounded-lg p-8 mb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Event Promotion Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">Free Plan</h4>
                <p className="text-muted-foreground text-sm">Event promotion not available</p>
                <p className="text-sm text-muted-foreground mt-2">Upgrade to Pro to promote events</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="font-semibold mb-2">Pro Plan</h4>
                <p className="text-sm text-muted-foreground mb-1">1 free/month, then</p>
                <p className="text-2xl font-bold text-primary">₹499</p>
                <p className="text-sm text-muted-foreground">per additional event</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Go Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Full Access",
                  description: "Get unlimited profile views, advanced filters, and save unlimited creators to your list.",
                },
                {
                  icon: Crown,
                  title: "Direct Connections",
                  description: "Message creators directly and use partnership tracking tools to manage collaborations.",
                },
                {
                  icon: Zap,
                  title: "Promote Events",
                  description: "Get 1 free event promotion per month. Additional events at just ₹500 each.",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 bg-card border border-border/50 rounded-lg p-12 max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold">Ready to find perfect creators?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upgrade to Pro and unlock all features to discover and connect with the best creators.
            </p>
            <Link href="/auth">
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8 py-6 text-lg">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and wire transfers for enterprise plans.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes, all Premium plans come with a 14-day free trial. No credit card required.",
                },
                {
                  q: "What if I need custom features?",
                  a: "Contact our sales team for enterprise plans with custom features, integrations, and dedicated support.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 border-border/50 bg-card/30">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
