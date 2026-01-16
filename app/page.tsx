import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Users, TrendingUp, Shield, Sparkles, Star, BarChart3, Eye, Target, Award, Globe } from "lucide-react"
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
                  <h1 className="text-5xl lg:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                    The IMDb for Influencers
                  </h1>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  The first transparent credibility rating system for content creators. 
                  We analyze authenticity, engagement quality, and growth patterns to help 
                  brands find genuine influencers and help creators showcase their true value.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/explore">
                    <Button
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white w-full sm:w-auto"
                    >
                      Explore Creators <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary/30 hover:border-primary bg-transparent w-full sm:w-auto"
                    >
                      Sign In / Register
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">10K+</p>
                    <p className="text-sm text-muted-foreground">Rated Creators</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary">500+</p>
                    <p className="text-sm text-muted-foreground">Brands Trust Us</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-accent">95%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </div>

              {/* Hero Visual - Rating Preview Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-primary/20 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                        92
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Sample Creator</p>
                        <p className="text-sm text-muted-foreground">Lifestyle • 500K followers</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Authenticity</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: "94%"}} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Engagement Quality</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: "89%"}} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Growth Stability</span>
                        <span className="font-medium">91%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{width: "91%"}} />
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">✓ Verified</Badge>
                      <Badge variant="secondary" className="text-xs">Consistent Poster</Badge>
                      <Badge variant="secondary" className="text-xs">High Engagement</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Creator Intelligence */}
        <section className="border-b border-border/50 bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-primary/10 text-primary border-primary/20">What We Do</Badge>
              <h2 className="text-4xl font-bold">Transparent Influencer Credibility Ratings</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Just like IMDb rates movies and Glassdoor rates companies, we provide transparent, 
                data-driven credibility scores for content creators. Our algorithm analyzes multiple 
                factors to give you the complete picture of any influencer's authenticity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 border-border/50 bg-card/50 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Public Users</h3>
                <p className="text-muted-foreground">
                  Browse and discover creators freely. See credibility ratings, categories, and basic 
                  profile information without creating an account.
                </p>
              </Card>

              <Card className="p-6 border-border/50 bg-card/50 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Brands</h3>
                <p className="text-muted-foreground">
                  Sign in to access advanced filters, save favorite creators, compare profiles, 
                  and connect directly with verified influencers for collaborations.
                </p>
              </Card>

              <Card className="p-6 border-border/50 bg-card/50 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">For Creators</h3>
                <p className="text-muted-foreground">
                  Sign in to view your rating, track your credibility score, find collaboration 
                  opportunities with similar creators, and connect with brands.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How Our Rating Works */}
        <section className="border-b border-border/50 bg-gradient-to-b from-background to-card/30 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Our Methodology</Badge>
              <h2 className="text-4xl font-bold">How We Calculate Credibility Scores</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our proprietary algorithm analyzes 50+ data points to generate accurate, unbiased ratings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Authenticity Analysis",
                  icon: Shield,
                  gradient: "from-green-500 to-emerald-500",
                  score: "25%",
                  description: "Fake follower detection, bot engagement analysis, and audience authenticity verification.",
                },
                {
                  title: "Engagement Quality",
                  icon: Users,
                  gradient: "from-blue-500 to-cyan-500",
                  score: "25%",
                  description: "Real engagement rate, comment quality analysis, and audience interaction patterns.",
                },
                {
                  title: "Growth Stability",
                  icon: TrendingUp,
                  gradient: "from-purple-500 to-pink-500",
                  score: "25%",
                  description: "Organic growth patterns, consistency over time, and sustainable audience building.",
                },
                {
                  title: "Content Consistency",
                  icon: BarChart3,
                  gradient: "from-orange-500 to-red-500",
                  score: "25%",
                  description: "Posting frequency, content quality, niche expertise, and brand alignment.",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Card
                    key={item.title}
                    className="p-6 border-border/50 bg-card/50 hover:border-primary/50 transition-all group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.score}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust Badges Explained */}
        <section className="border-b border-border/50 bg-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-accent/10 text-accent border-accent/20">Trust Indicators</Badge>
              <h2 className="text-4xl font-bold">Understanding Trust Badges</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each creator profile displays trust badges that indicate specific verified achievements
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Verified", color: "bg-blue-500" },
                { label: "Rising Star", color: "bg-yellow-500" },
                { label: "Consistent Poster", color: "bg-green-500" },
                { label: "High Engagement", color: "bg-purple-500" },
                { label: "Brand Safe", color: "bg-cyan-500" },
                { label: "Niche Expert", color: "bg-orange-500" },
              ].map((badge) => (
                <Card key={badge.label} className="p-4 text-center border-border/50 bg-card/50">
                  <div className={`w-10 h-10 ${badge.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">{badge.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-background to-card/30 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Start Exploring Today
              </h2>
              <p className="text-xl text-muted-foreground">
                Browse creators publicly or sign in to access advanced features.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/explore">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
                  Browse Creators <Globe className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:border-primary bg-transparent w-full sm:w-auto"
                >
                  Sign In for More <ArrowRight className="w-4 h-4" />
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
