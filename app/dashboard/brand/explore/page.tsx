"use client"

import { useState } from "react"
import { InfluencerCard } from "@/components/influencer-card"
import { ExploreFilters, type FilterState } from "@/components/explore-filters"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { LayoutGrid, List, ArrowRight, Zap, MessageSquare } from "lucide-react"

export default function BrandExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    platforms: [],
    ratingRange: [0, 100],
    tags: [],
    verified: null,
  })
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])

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

  const toggleComparison = (influencerId: string) => {
    if (selectedForComparison.includes(influencerId)) {
      setSelectedForComparison(selectedForComparison.filter((id) => id !== influencerId))
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, influencerId])
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Creator Discovery
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced filtering, side-by-side comparisons, and direct outreach
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
          <Zap className="w-4 h-4 mr-2" />
          Premium
        </Badge>
      </div>

      {selectedForComparison.length > 0 && (
        <Card className="p-4 border-secondary/50 bg-gradient-to-r from-secondary/15 to-purple-500/15">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-secondary/30 rounded-full text-sm font-medium">
                Comparing {selectedForComparison.length} of 3
              </div>
              <span className="text-sm text-muted-foreground">Brand-exclusive feature</span>
            </div>
            <Button
              className="gap-2 bg-gradient-to-r from-secondary to-purple-500 hover:opacity-90"
              onClick={() => alert("Comparison modal opening")}
            >
              View Detailed Comparison <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{filteredInfluencers.length} creators available</div>
        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ExploreFilters onFilterChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {filteredInfluencers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No creators match your filters. Try adjusting your search.
              </p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
              {filteredInfluencers.map((influencer) => (
                <div key={influencer.id} className="relative group">
                  <InfluencerCard influencer={influencer} compact={viewMode === "list"} />
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleComparison(influencer.id)}
                      className={`w-8 h-8 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                        selectedForComparison.includes(influencer.id)
                          ? "bg-secondary border-secondary"
                          : "bg-white/80 border-secondary hover:bg-white hover:border-secondary"
                      }`}
                    >
                      {selectedForComparison.includes(influencer.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => alert(`Message sent to ${influencer.name}`)}
                      className="w-8 h-8 rounded bg-white/80 border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-white transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
