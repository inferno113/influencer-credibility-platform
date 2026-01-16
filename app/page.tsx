"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { 
  LayoutGrid, List, ArrowRight, Star, Users, CheckCircle2, Sparkles, 
  TrendingUp, Calendar, MapPin, Zap, Rocket, Crown, PartyPopper,
  Megaphone, Gift, Award
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Simplified categories for public users
const categories = [...new Set(mockInfluencers.map((i) => i.category))].sort()

// Mock promotions data
const creatorEvents = [
  {
    id: "ce1",
    title: "Tech Talk Live 2026",
    creator: "Alex Chen",
    creatorAvatar: "/professional-man-tech.jpg",
    type: "Live Event",
    date: "Feb 15, 2026",
    location: "Virtual",
    description: "Join Alex for an exclusive live Q&A about the future of AI and content creation.",
    attendees: 1250,
    sponsorshipAvailable: true,
  },
  {
    id: "ce2",
    title: "Fitness Challenge Launch",
    creator: "Maya Johnson",
    creatorAvatar: "/professional-woman-fitness.jpg",
    type: "Campaign",
    date: "Feb 1-28, 2026",
    location: "Instagram & YouTube",
    description: "30-day fitness transformation challenge with brand partnership opportunities.",
    attendees: 5000,
    sponsorshipAvailable: true,
  },
  {
    id: "ce3",
    title: "Creative Masterclass",
    creator: "Jordan Rivera",
    creatorAvatar: "/professional-man-creative.jpg",
    type: "Workshop",
    date: "Jan 25, 2026",
    location: "Los Angeles, CA",
    description: "Hands-on photography and videography workshop for aspiring creators.",
    attendees: 150,
    sponsorshipAvailable: true,
  },
]

const brandEvents = [
  {
    id: "be1",
    title: "Tech Product Launch",
    brand: "InnovateTech",
    brandLogo: "/brand-tech.jpg",
    type: "Product Launch",
    date: "Feb 20, 2026",
    location: "San Francisco, CA",
    description: "Looking for tech creators to cover our latest AI-powered device launch.",
    budget: "$5,000 - $15,000",
    creatorsNeeded: 10,
  },
  {
    id: "be2",
    title: "Spring Fashion Campaign",
    brand: "StyleHouse",
    brandLogo: "/brand-fashion.jpg",
    type: "Brand Campaign",
    date: "Mar 1-31, 2026",
    location: "Remote",
    description: "Seeking fashion influencers for our spring collection campaign.",
    budget: "$2,000 - $8,000",
    creatorsNeeded: 25,
  },
  {
    id: "be3",
    title: "Wellness Summit Sponsorship",
    brand: "VitalLife",
    brandLogo: "/brand-wellness.jpg",
    type: "Event Sponsorship",
    date: "Apr 10-12, 2026",
    location: "Miami, FL",
    description: "Inviting wellness creators to our annual health and wellness summit.",
    budget: "$3,000 - $10,000",
    creatorsNeeded: 15,
  },
]

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [ratingFilter, setRatingFilter] = useState<"all" | "high" | "medium">("all")

  // Simple filtering for public users
  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    if (influencer.status !== "approved") return false
    if (selectedCategory && influencer.category !== selectedCategory) return false
    if (ratingFilter === "high" && influencer.credibilityRating < 85) return false
    if (ratingFilter === "medium" && (influencer.credibilityRating < 70 || influencer.credibilityRating >= 85)) return false
    return true
  })

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
    if (rating >= 75) return "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30"
    if (rating >= 65) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30"
    return "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30"
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 w-fit gap-2 px-4 py-1.5">
                    <Sparkles className="w-4 h-4" />
                    The Future of Creator Economy
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      ELEVATE
                    </span>
                    <br />
                    <span className="text-foreground">Your Influence</span>
                  </h1>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  The premier platform connecting verified creators with top brands. 
                  Transparent credibility ratings, exclusive opportunities, and a thriving 
                  community to take your influence to the next level.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white w-full sm:w-auto px-8"
                    >
                      Get Started <Rocket className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-primary/30 hover:border-primary bg-transparent w-full sm:w-auto"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-8 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">10K+</p>
                    <p className="text-sm text-muted-foreground">Verified Creators</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary">500+</p>
                    <p className="text-sm text-muted-foreground">Partner Brands</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">$2M+</p>
                    <p className="text-sm text-muted-foreground">Deals Facilitated</p>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  {/* Featured Creator Cards */}
                  <div className="space-y-4">
                    <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          94
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Tech Reviews</p>
                          <p className="text-xs text-muted-foreground">500K followers</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                        <Badge variant="secondary" className="text-xs">Top Rated</Badge>
                      </div>
                    </Card>
                    <Card className="p-4 bg-card/80 backdrop-blur-sm border-secondary/20 hover:border-secondary/50 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          91
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Lifestyle</p>
                          <p className="text-xs text-muted-foreground">1.2M followers</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">Rising Star</Badge>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-4 pt-8">
                    <Card className="p-4 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                          88
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Fitness</p>
                          <p className="text-xs text-muted-foreground">800K followers</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">High Engagement</Badge>
                      </div>
                    </Card>
                    <Card className="p-4 bg-card/80 backdrop-blur-sm border-green-500/20 hover:border-green-500/50 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                          96
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Finance</p>
                          <p className="text-xs text-muted-foreground">2.5M followers</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">Expert</Badge>
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Events & Promotions */}
        <section className="border-b border-border/50 bg-gradient-to-b from-background to-card/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 mb-2">
                  <PartyPopper className="w-3 h-3 mr-1" /> Creator Events
                </Badge>
                <h2 className="text-3xl font-bold">Upcoming Creator Events</h2>
                <p className="text-muted-foreground mt-1">Exclusive events and content drops from top creators</p>
              </div>
              <Link href="/auth">
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  View All Events <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creatorEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                      {event.sponsorshipAvailable && (
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30 text-xs">
                          <Crown className="w-3 h-3 mr-1" /> Sponsorship Open
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                        {event.creator[0]}
                      </div>
                      <span className="text-sm font-medium">{event.creator}</span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.attendees.toLocaleString()} interested
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link href="/auth">
                      <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Opportunities */}
        <section className="border-b border-border/50 bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 mb-2">
                  <Megaphone className="w-3 h-3 mr-1" /> Brand Deals
                </Badge>
                <h2 className="text-3xl font-bold">Open Brand Opportunities</h2>
                <p className="text-muted-foreground mt-1">Active campaigns and deals from partner brands</p>
              </div>
              <Link href="/auth">
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  View All Opportunities <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg hover:border-secondary/50 transition-all group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                        <Gift className="w-3 h-3 mr-1" /> {event.budget}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {event.brand[0]}
                      </div>
                      <span className="text-sm font-medium">{event.brand}</span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Looking for {event.creatorsNeeded} creators
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link href="/auth">
                      <Button variant="outline" className="w-full gap-2 border-secondary/50 hover:border-secondary hover:bg-secondary/10">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Creators Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-2">
                    <Award className="w-3 h-3 mr-1" /> Verified Creators
                  </Badge>
                  <h2 className="text-3xl font-bold">Explore Top Creators</h2>
                  <p className="text-muted-foreground mt-1">Discover verified creators by category and credibility rating</p>
                </div>
              </div>

              {/* CTA for brands */}
              <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Want advanced search & comparison tools?</p>
                      <p className="text-xs text-muted-foreground">
                        Sign in as a brand to unlock filters, comparisons, messaging & more
                      </p>
                    </div>
                  </div>
                  <Link href="/auth">
                    <Button
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 whitespace-nowrap"
                    >
                      Sign In <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Simple Filters for Public */}
            <div className="mb-8 space-y-4">
              {/* Category Pills */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Browse by Category</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Rating</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={ratingFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRatingFilter("all")}
                  >
                    All Ratings
                  </Button>
                  <Button
                    variant={ratingFilter === "high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRatingFilter("high")}
                    className="gap-2"
                  >
                    <Star className="w-3 h-3" /> Top Rated (85+)
                  </Button>
                  <Button
                    variant={ratingFilter === "medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRatingFilter("medium")}
                  >
                    Good (70-84)
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">{filteredInfluencers.length} creators found</div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Creator Cards */}
            {filteredInfluencers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No creators match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory(null); setRatingFilter("all") }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredInfluencers.slice(0, 9).map((influencer) => (
                  <Link key={influencer.id} href={`/profile/${influencer.id}`}>
                    <Card className={`overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer ${viewMode === "list" ? "flex flex-row" : ""}`}>
                      {/* Image */}
                      <div className={viewMode === "list" ? "w-32 h-32 relative flex-shrink-0" : "aspect-video relative"}>
                        <Image
                          src={influencer.avatar || "/placeholder.svg"}
                          alt={influencer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{influencer.name}</h3>
                              {influencer.verified && (
                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{influencer.category}</p>
                          </div>
                          <Badge className={`${getRatingColor(influencer.credibilityRating)} border font-bold`}>
                            {influencer.credibilityRating}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{influencer.bio}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {(influencer.followers / 1000).toFixed(0)}K
                          </span>
                          <span className="text-xs">
                            {influencer.niche.slice(0, 2).join(" • ")}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* View More */}
            {filteredInfluencers.length > 9 && (
              <div className="text-center mt-8">
                <Link href="/auth">
                  <Button size="lg" variant="outline" className="gap-2">
                    Sign In to See More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-b from-background to-primary/5 py-20 border-t border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Ready to Elevate?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of creators and brands already using ELEVATE to grow their influence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto px-8">
                  Get Started Free <Rocket className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:border-primary bg-transparent w-full sm:w-auto"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
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
