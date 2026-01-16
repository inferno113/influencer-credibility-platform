import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CreatorPricingPage() {
  const creatorPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Build your credibility profile",
      features: [
        "Create public profile",
        "View your credibility rating",
        "See trust tags",
        "Basic analytics",
        "Platform connections (limited)",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro Creator",
      price: "$29",
      period: "per month",
      description: "Maximize visibility to brands",
      features: [
        "Everything in Free +",
        "Premium profile badge",
        "Featured in brand searches",
        "Unlimited platform connections",
        "Advanced analytics dashboard",
        "Growth tracking & insights",
        "Direct brand messaging",
        "Partnership opportunities list",
      ],
      cta: "Start Free Trial",
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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Grow Your Creator Brand
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get discovered by brands, showcase your credibility, and land partnerships faster.
            </p>
          </div>

          {/* Toggle between Brand and Creator */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex rounded-lg border border-border p-1 bg-card">
              <Link
                href="/pricing"
                className="px-6 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                For Brands
              </Link>
              <button className="px-6 py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-white font-medium">
                For Creators
              </button>
            </div>
          </div>

          {/* Creator Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {creatorPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 flex flex-col transition-all ${
                  plan.highlighted
                    ? "border-primary/50 bg-gradient-to-br from-card to-card/50 relative ring-2 ring-primary/20 md:col-span-2 md:max-w-md"
                    : "border-border/50 bg-card/30 hover:border-primary/30"
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white border-0">
                    Recommended
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
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

                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Go Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Get Discovered",
                  description: "Featured in brand searches and recommendations. Get found by the right partners.",
                },
                {
                  title: "Showcase Your Value",
                  description: "Premium badge and detailed analytics show brands your credibility and growth metrics.",
                },
                {
                  title: "Direct Connections",
                  description: "Message brands directly and receive partnership opportunities tailored to your niche.",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
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
