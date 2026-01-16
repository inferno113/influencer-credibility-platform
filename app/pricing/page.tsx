import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const brandPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with basic discovery",
      features: [
        "Browse all creators",
        "View public profiles",
        "Filter by category & rating",
        "See trust tags",
        "3 profile views per month",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      description: "Advanced discovery & partnerships",
      features: [
        "Everything in Free +",
        "Advanced filters (engagement, growth)",
        "Save unlimited creators",
        "Side-by-side comparisons (3 creators)",
        "Direct messaging to creators",
        "Partnership tracking tools",
        "Unlimited profile views",
        "Monthly analytics reports",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Custom solutions at scale",
      features: [
        "Everything in Premium +",
        "Unlimited comparisons",
        "Priority support",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "Advanced analytics & insights",
        "Team collaboration tools",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

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
        "Unlimited platform connections",
        "Advanced analytics dashboard",
        "Growth tracking & insights",
        "Featured in brand searches",
        "Direct brand messaging",
        "Partnership opportunities",
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for brands or creators. Unlock premium features and grow faster.
            </p>
          </div>

          {/* Toggle between Brand and Creator */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex rounded-lg border border-border p-1 bg-card">
              <button className="px-6 py-2 rounded-md bg-gradient-to-r from-primary to-secondary text-white font-medium">
                For Brands
              </button>
              <Link
                href="/pricing/creators"
                className="px-6 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                For Creators
              </Link>
            </div>
          </div>

          {/* Brand Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {brandPlans.map((plan, idx) => (
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
