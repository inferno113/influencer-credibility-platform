"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InfluencerCard } from "@/components/influencer-card"
import { ExploreFilters, type FilterState } from "@/components/explore-filters"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockInfluencers } from "@/lib/mock-data"
import { LayoutGrid, List, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    platforms: [],
    ratingRange: [0, 100],
    tags: [],
    verified: null,
  })

  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    if (filters.categories.length > 0 && !filters.categories.includes(influencer.category)) {
      return false
    }
    if (
      influencer.credibilityRating < filters.ratingRange[0] ||
      influencer.credibilityRating > filters.ratingRange[1]
    ) {
      return false
    }
    if (filters.tags.length > 0) {
      const hasTags = filters.tags.some((tag) => influencer.trustTags.includes(tag))
      if (!hasTags) return false
    }
    if (filters.verified === true && !influencer.verified) {
      return false
    }
    if (filters.platforms.length > 0) {
      const platformMap: Record<string, keyof typeof influencer.platforms> = {
        Instagram: "instagram",
        TikTok: "tiktok",
        YouTube: "youtube",
        Twitter: "twitter",
        LinkedIn: "linkedin",
      }
      const hasPlatform = filters.platforms.some((p) => influencer.platforms[platformMap[p]])
      if (!hasPlatform) return false
    }
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Explore Creators
              </h1>
              <p className="text-lg text-muted-foreground">Browse verified creators across categories and platforms</p>
            </div>

            <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Sign in as a brand for advanced features</p>
                    <p className="text-xs text-muted-foreground">Direct comparisons, advanced filters, and more</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ExploreFilters onFilterChange={setFilters} />
            </div>

            <div className="lg:col-span-3">
              {filteredInfluencers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No creators match your filters.</p>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                  {filteredInfluencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} influencer={influencer} compact={viewMode === "list"} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
