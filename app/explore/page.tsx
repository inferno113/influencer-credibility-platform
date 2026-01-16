"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { LayoutGrid, List, ArrowRight, Lock, Star, Users, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Simplified categories for public users
const categories = [...new Set(mockInfluencers.map((i) => i.category))].sort()

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [ratingFilter, setRatingFilter] = useState<"all" | "high" | "medium">("all")

  // Simple filtering for public users
  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    // Only show approved influencers
    if (influencer.status !== "approved") return false
    
    if (selectedCategory && influencer.category !== selectedCategory) {
      return false
    }
    if (ratingFilter === "high" && influencer.credibilityRating < 85) {
      return false
    }
    if (ratingFilter === "medium" && (influencer.credibilityRating < 70 || influencer.credibilityRating >= 85)) {
      return false
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Explore Creators
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover verified creators by category and credibility rating
              </p>
            </div>

            {/* CTA for brands */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
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
                    Sign In as Brand <ArrowRight className="w-4 h-4" />
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

          {/* Creator Cards - Simplified for Public */}
          {filteredInfluencers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No creators match your filters.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory(null); setRatingFilter("all") }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredInfluencers.map((influencer) => (
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

          {/* Bottom CTA */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-2">Need more powerful discovery tools?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Brands get access to advanced filters, side-by-side comparisons, direct messaging, 
              engagement analytics, and more.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth">
                <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Sign In as Brand <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">View Pricing Plans</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
