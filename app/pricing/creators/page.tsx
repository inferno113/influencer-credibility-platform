"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Sparkles, X, Crown, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function CreatorPricingPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect brands to their own pricing page
  useEffect(() => {
    if (user?.role === "brand") {
      router.push("/pricing")
    }
  }, [user, router])

  const creatorPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Get started with basic features",
      icon: Zap,
      features: [
        { text: "Create public profile", included: true },
        { text: "View your credibility rating", included: true },
        { text: "See trust tags", included: true },
        { text: "Basic analytics", included: true },
        { text: "Platform connections (limited)", included: true },
        { text: "Advanced insights", included: false },
        { text: "Featured in brand explore", included: false },
        { text: "Promote & Opportunities access", included: false },
        { text: "Free event promotion", included: false },
        { text: "Cross-creator collaborations", included: false },
      ],
      eventPromotion: "₹400 per event",
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹499",
      period: "per month",
      description: "Maximize visibility to brands",
      icon: Sparkles,
      features: [
        { text: "Create public profile", included: true },
        { text: "View your credibility rating", included: true },
        { text: "See trust tags", included: true },
        { text: "Basic analytics", included: true },
        { text: "Unlimited platform connections", included: true },
        { text: "Advanced insights & analytics", included: true },
        { text: "Featured in brand explore page", included: true },
        { text: "Promote & Opportunities access", included: true },
        { text: "1 free event promotion/month", included: true },
        { text: "Cross-creator collaborations", included: false },
      ],
      eventPromotion: "₹200 per additional event",
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Premium",
      price: "₹999",
      period: "per month",
      description: "Ultimate creator experience",
      icon: Crown,
      features: [
        { text: "Everything in Pro +", included: true },
        { text: "Priority visibility to brands", included: true },
        { text: "Cross-creator collaborations", included: true },
        { text: "3 free event promotions/month", included: true },
        { text: "Premium profile badge", included: true },
        { text: "Priority support", included: true },
        { text: "Early access to new features", included: true },
        { text: "Exclusive partnership opportunities", included: true },
        { text: "Advanced growth tracking", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      eventPromotion: "₹200 per additional event",
      cta: "Go Premium",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
              <Sparkles className="w-3 h-3 mr-1" /> For Creators
            </Badge>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Creator Pricing Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get discovered by brands, showcase your credibility, and land partnerships faster.
            </p>
          </div>

          {/* Link to brand pricing for non-logged users */}
          {!user && (
            <div className="flex justify-center mb-8">
              <p className="text-sm text-muted-foreground">
                Looking for brand plans? <Link href="/pricing" className="text-primary hover:underline">Click here</Link>
              </p>
            </div>
          )}

          {/* Creator Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {creatorPlans.map((plan, idx) => {
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
                      Most Popular
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

          {/* Benefits */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Upgrade?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Get Discovered",
                  description: "Pro and Premium creators are featured prominently in brand searches and get more visibility.",
                },
                {
                  icon: Users,
                  title: "Collaborate & Grow",
                  description: "Premium members can collaborate with other creators and expand their network.",
                },
                {
                  icon: Zap,
                  title: "Promote Events",
                  description: "Get free event promotions every month. Pro gets 1, Premium gets 3 free promotions.",
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

          {/* Event Promotion Pricing */}
          <div className="bg-card border border-border/50 rounded-lg p-8 mb-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Event Promotion Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">Free Plan</h4>
                <p className="text-2xl font-bold text-primary">₹399</p>
                <p className="text-sm text-muted-foreground">per event</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/30">
                <h4 className="font-semibold mb-2">Pro Plan</h4>
                <p className="text-sm text-muted-foreground mb-1">1 free/month, then</p>
                <p className="text-2xl font-bold text-primary">₹199</p>
                <p className="text-sm text-muted-foreground">per additional event</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">Premium Plan</h4>
                <p className="text-sm text-muted-foreground mb-1">3 free/month, then</p>
                <p className="text-2xl font-bold text-primary">₹199</p>
                <p className="text-sm text-muted-foreground">per additional event</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 bg-card border border-border/50 rounded-lg p-12">
            <h2 className="text-3xl font-bold">Ready to grow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who are already building successful partnerships.
            </p>
            <Link href="/auth">
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8 py-6 text-lg">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
