"use client"

import { useState } from "react"
import { InfluencerCard } from "@/components/influencer-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockInfluencers, mockTags } from "@/lib/mock-data"
import { ComparisonModal } from "@/components/comparison-modal"
import {
  LayoutGrid,
  List,
  ArrowRight,
  Zap,
  MessageSquare,
  Lock,
  Crown,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Filter,
  Bookmark,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

// Mock user plan - in real app this would come from auth context
type PlanType = "free" | "premium" | "enterprise"
const currentPlan: PlanType = "free" // Change this to test different plans

const categories = [...new Set(mockInfluencers.map((i) => i.category))].sort()
const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn"]

// Feature access by plan
const planFeatures = {
  free: {
    maxComparisons: 0,
    advancedFilters: false,
    engagementFilter: false,
    growthFilter: false,
    messaging: false,
    exportData: false,
    savedSearches: false,
    saveCreators: 3,
    connectToCreator: false,
  },
  premium: {
    maxComparisons: 3,
    advancedFilters: true,
    engagementFilter: true,
    growthFilter: true,
    messaging: true,
    exportData: false,
    savedSearches: true,
    saveCreators: -1, // unlimited
    connectToCreator: true,
  },
  enterprise: {
    maxComparisons: -1, // unlimited
    advancedFilters: true,
    engagementFilter: true,
    growthFilter: true,
    messaging: true,
    exportData: true,
    savedSearches: true,
    saveCreators: -1,
    connectToCreator: true,
  },
}

interface FilterState {
  search: string
  categories: string[]
  platforms: string[]
  ratingRange: [number, number]
  engagementRange: [number, number]
  growthRange: [number, number]
  tags: string[]
  verified: boolean | null
  followersRange: [number, number]
}

export default function BrandExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(true)
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    platforms: [],
    ratingRange: [0, 100],
    engagementRange: [0, 15],
    growthRange: [0, 10],
    tags: [],
    verified: null,
    followersRange: [0, 500000],
  })

  const features = planFeatures[currentPlan]

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters({ ...filters, ...newFilters })
  }

  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    // Only show approved
    if (influencer.status !== "approved") return false

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        influencer.name.toLowerCase().includes(searchLower) ||
        influencer.bio.toLowerCase().includes(searchLower) ||
        influencer.category.toLowerCase().includes(searchLower) ||
        influencer.niche.some((n) => n.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Categories
    if (filters.categories.length > 0 && !filters.categories.includes(influencer.category)) {
      return false
    }

    // Rating
    if (
      influencer.credibilityRating < filters.ratingRange[0] ||
      influencer.credibilityRating > filters.ratingRange[1]
    ) {
      return false
    }

    // Engagement (premium feature)
    if (features.engagementFilter) {
      if (
        influencer.engagementRate < filters.engagementRange[0] ||
        influencer.engagementRate > filters.engagementRange[1]
      ) {
        return false
      }
    }

    // Growth (premium feature)
    if (features.growthFilter) {
      if (
        influencer.growthStability < filters.growthRange[0] ||
        influencer.growthStability > filters.growthRange[1]
      ) {
        return false
      }
    }

    // Tags
    if (filters.tags.length > 0) {
      const hasTags = filters.tags.some((tag) => influencer.trustTags.includes(tag))
      if (!hasTags) return false
    }

    // Verified
    if (filters.verified === true && !influencer.verified) {
      return false
    }

    // Platforms
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

    // Followers
    if (influencer.followers < filters.followersRange[0] || influencer.followers > filters.followersRange[1]) {
      return false
    }

    return true
  })

  const toggleComparison = (influencerId: string) => {
    if (!features.maxComparisons) return

    if (selectedForComparison.includes(influencerId)) {
      setSelectedForComparison(selectedForComparison.filter((id) => id !== influencerId))
    } else if (features.maxComparisons === -1 || selectedForComparison.length < features.maxComparisons) {
      setSelectedForComparison([...selectedForComparison, influencerId])
    }
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      categories: [],
      platforms: [],
      ratingRange: [0, 100],
      engagementRange: [0, 15],
      growthRange: [0, 10],
      tags: [],
      verified: null,
      followersRange: [0, 500000],
    })
  }

  const selectedInfluencers = mockInfluencers.filter((i) => selectedForComparison.includes(i.id))

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Creator Discovery
          </h1>
          <p className="text-muted-foreground text-lg">Find the perfect creators for your brand</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className={`px-4 py-2 ${
              currentPlan === "enterprise"
                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                : currentPlan === "premium"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gray-500"
            } text-white border-0`}
          >
            {currentPlan === "enterprise" ? (
              <Crown className="w-4 h-4 mr-2" />
            ) : currentPlan === "premium" ? (
              <Zap className="w-4 h-4 mr-2" />
            ) : (
              <Users className="w-4 h-4 mr-2" />
            )}
            {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
          </Badge>
          {currentPlan === "free" && (
            <Link href="/pricing">
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary">
                <Sparkles className="w-4 h-4" /> Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Comparison Bar */}
      {features.maxComparisons !== 0 && selectedForComparison.length > 0 && (
        <Card className="p-4 border-secondary/50 bg-gradient-to-r from-secondary/15 to-purple-500/15">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-secondary/30 rounded-full text-sm font-medium">
                {selectedForComparison.length}
                {features.maxComparisons !== -1 && ` of ${features.maxComparisons}`} selected
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedForComparison([])}>
                Clear
              </Button>
            </div>
            <Button
              className="gap-2 bg-gradient-to-r from-secondary to-purple-500 hover:opacity-90"
              onClick={() => setComparisonModalOpen(true)}
              disabled={selectedForComparison.length < 2}
            >
              Compare Creators <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Free plan comparison upsell */}
      {features.maxComparisons === 0 && (
        <Card className="p-4 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Side-by-side creator comparison</p>
                <p className="text-xs text-muted-foreground">Upgrade to Premium to compare up to 3 creators</p>
              </div>
            </div>
            <Link href="/pricing">
              <Button size="sm" variant="outline" className="gap-2">
                <Zap className="w-4 h-4" /> Upgrade to Premium
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Free plan connect upsell */}
      {!features.connectToCreator && (
        <Card className="p-4 border-secondary/30 bg-gradient-to-r from-secondary/10 to-purple-500/10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <UserPlus className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-medium text-sm">Connect directly with creators</p>
                <p className="text-xs text-muted-foreground">Send partnership requests and start collaborations with verified creators</p>
              </div>
            </div>
            <Link href="/pricing">
              <Button size="sm" className="gap-2 bg-gradient-to-r from-secondary to-purple-500">
                <Crown className="w-4 h-4" /> Upgrade to Connect
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Search Bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search creators by name, niche, or keywords..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <Card className="w-72 p-6 h-fit sticky top-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...filters.categories, cat]
                          : filters.categories.filter((c) => c !== cat)
                        updateFilters({ categories: updated })
                      }}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Platforms</h4>
              <div className="space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.platforms.includes(platform)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...filters.platforms, platform]
                          : filters.platforms.filter((p) => p !== platform)
                        updateFilters({ platforms: updated })
                      }}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                Credibility Rating: {filters.ratingRange[0]} - {filters.ratingRange[1]}
              </h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.ratingRange[0]}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), filters.ratingRange[1])
                    updateFilters({ ratingRange: [newMin, filters.ratingRange[1]] })
                  }}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.ratingRange[1]}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), filters.ratingRange[0])
                    updateFilters({ ratingRange: [filters.ratingRange[0], newMax] })
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Engagement Rate - Premium Feature */}
            <div className="mb-6 relative">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Engagement Rate
                {!features.engagementFilter && <Lock className="w-3 h-3 text-primary" />}
              </h4>
              {features.engagementFilter ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {filters.engagementRange[0]}% - {filters.engagementRange[1]}%
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={filters.engagementRange[0]}
                    onChange={(e) => {
                      const newMin = Math.min(Number(e.target.value), filters.engagementRange[1])
                      updateFilters({ engagementRange: [newMin, filters.engagementRange[1]] })
                    }}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={filters.engagementRange[1]}
                    onChange={(e) => {
                      const newMax = Math.max(Number(e.target.value), filters.engagementRange[0])
                      updateFilters({ engagementRange: [filters.engagementRange[0], newMax] })
                    }}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-2">Premium feature</p>
                  <Link href="/pricing">
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Growth Stability - Premium Feature */}
            <div className="mb-6 relative">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
                Growth Stability
                {!features.growthFilter && <Lock className="w-3 h-3 text-primary" />}
              </h4>
              {features.growthFilter ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {filters.growthRange[0]} - {filters.growthRange[1]}/10
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={filters.growthRange[0]}
                    onChange={(e) => {
                      const newMin = Math.min(Number(e.target.value), filters.growthRange[1])
                      updateFilters({ growthRange: [newMin, filters.growthRange[1]] })
                    }}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={filters.growthRange[1]}
                    onChange={(e) => {
                      const newMax = Math.max(Number(e.target.value), filters.growthRange[0])
                      updateFilters({ growthRange: [filters.growthRange[0], newMax] })
                    }}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-2">Premium feature</p>
                  <Link href="/pricing">
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Trust Tags */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Trust Tags</h4>
              <div className="flex flex-wrap gap-2">
                {mockTags.slice(0, 6).map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={filters.tags.includes(tag.label) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      const updated = filters.tags.includes(tag.label)
                        ? filters.tags.filter((t) => t !== tag.label)
                        : [...filters.tags, tag.label]
                      updateFilters({ tags: updated })
                    }}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified === true}
                  onChange={(e) => {
                    updateFilters({ verified: e.target.checked ? true : null })
                  }}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Verified Only</span>
              </label>
            </div>
          </Card>
        )}

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">{filteredInfluencers.length} creators found</p>
            {features.savedSearches && (
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="w-4 h-4" /> Save Search
              </Button>
            )}
          </div>

          {filteredInfluencers.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">No creators match your filters.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredInfluencers.map((influencer) => (
                <div key={influencer.id} className="relative group">
                  <InfluencerCard influencer={influencer} compact={viewMode === "list"} />

                  {/* Hover Actions */}
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Comparison checkbox */}
                    {features.maxComparisons !== 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleComparison(influencer.id)
                        }}
                        className={`w-8 h-8 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                          selectedForComparison.includes(influencer.id)
                            ? "bg-secondary border-secondary"
                            : "bg-white/80 dark:bg-gray-800/80 border-secondary hover:bg-white dark:hover:bg-gray-800"
                        }`}
                        title="Add to comparison"
                      >
                        {selectedForComparison.includes(influencer.id) && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    )}

                    {/* Connect to Creator button */}
                    {features.connectToCreator ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          alert(`Sending connection request to ${influencer.name}`)
                        }}
                        className="w-8 h-8 rounded bg-gradient-to-r from-primary to-secondary flex items-center justify-center cursor-pointer hover:opacity-90 transition-all"
                        title="Connect with creator"
                      >
                        <UserPlus className="w-4 h-4 text-white" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          alert("Upgrade to Premium to connect directly with creators")
                        }}
                        className="w-8 h-8 rounded bg-white/80 dark:bg-gray-800/80 border-2 border-primary/50 flex items-center justify-center cursor-pointer"
                        title="Upgrade to connect"
                      >
                        <UserPlus className="w-4 h-4 text-primary/50" />
                      </button>
                    )}

                    {/* Message button */}
                    {features.messaging ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          alert(`Opening chat with ${influencer.name}`)
                        }}
                        className="w-8 h-8 rounded bg-white/80 dark:bg-gray-800/80 border-2 border-primary flex items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-all"
                        title="Send message"
                      >
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          alert("Upgrade to Premium to message creators directly")
                        }}
                        className="w-8 h-8 rounded bg-white/80 dark:bg-gray-800/80 border-2 border-muted flex items-center justify-center cursor-pointer"
                        title="Upgrade to message"
                      >
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal
        influencers={selectedInfluencers}
        open={comparisonModalOpen}
        onOpenChange={setComparisonModalOpen}
      />
    </div>
  )
}
