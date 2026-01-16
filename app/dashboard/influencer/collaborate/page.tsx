"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockInfluencers } from "@/lib/mock-data"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  Handshake,
  Search,
  MessageSquare,
  Crown,
  Lock,
  Sparkles,
  Star,
  TrendingUp,
  Filter,
  ExternalLink,
} from "lucide-react"

// Mock user plan - in real app this would come from auth context
type PlanType = "free" | "premium" | "enterprise"
const currentPlan: PlanType = "free"

const planFeatures = {
  free: {
    collaborationsPerMonth: 3,
    messaging: false,
    priorityMatching: false,
  },
  premium: {
    collaborationsPerMonth: 20,
    messaging: true,
    priorityMatching: true,
  },
  enterprise: {
    collaborationsPerMonth: -1,
    messaging: true,
    priorityMatching: true,
  },
}

export default function CollaboratePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sentRequests, setSentRequests] = useState<string[]>([])

  const features = planFeatures[currentPlan]

  // Get the current user's profile (mock - first influencer)
  const currentUserProfile = mockInfluencers[0]

  // Find similar creators based on category and niche
  const similarCreators = mockInfluencers
    .filter((influencer) => {
      if (influencer.id === currentUserProfile?.id) return false
      if (influencer.status !== "approved") return false

      // Match by category or overlapping niches
      const categoryMatch = influencer.category === currentUserProfile?.category
      const nicheOverlap = influencer.niche.some((n) => currentUserProfile?.niche.includes(n))

      if (selectedCategory && influencer.category !== selectedCategory) return false

      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const matchesSearch =
          influencer.name.toLowerCase().includes(searchLower) ||
          influencer.category.toLowerCase().includes(searchLower) ||
          influencer.niche.some((n) => n.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      return categoryMatch || nicheOverlap
    })
    .sort((a, b) => {
      // Sort by similarity score (niches in common)
      const aNicheMatch = a.niche.filter((n) => currentUserProfile?.niche.includes(n)).length
      const bNicheMatch = b.niche.filter((n) => currentUserProfile?.niche.includes(n)).length
      return bNicheMatch - aNicheMatch
    })

  const categories = [...new Set(mockInfluencers.map((i) => i.category))].sort()

  const handleCollaborateRequest = (influencerId: string) => {
    if (!features.messaging && !sentRequests.includes(influencerId)) {
      // Free users can send limited requests
      if (sentRequests.length >= features.collaborationsPerMonth) {
        return
      }
    }
    setSentRequests([...sentRequests, influencerId])
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Collaborate with Creators
          </h1>
          <p className="text-muted-foreground text-lg">
            Find creators similar to you for collaborations and partnerships
          </p>
        </div>
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
            <Sparkles className="w-4 h-4 mr-2" />
          ) : (
            <Users className="w-4 h-4 mr-2" />
          )}
          {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
        </Badge>
      </div>

      {/* Your Profile Summary */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-secondary flex-shrink-0">
            <Image
              src={currentUserProfile?.avatar || "/placeholder.svg"}
              alt="Your profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{currentUserProfile?.name || user?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {currentUserProfile?.category} • {currentUserProfile?.niche.join(", ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Finding creators similar to your profile</p>
            <p className="text-xs text-primary mt-1">
              {similarCreators.length} potential collaborators found
            </p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{similarCreators.length}</p>
              <p className="text-xs text-muted-foreground">Similar Creators</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sentRequests.length}</p>
              <p className="text-xs text-muted-foreground">Requests Sent</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {features.collaborationsPerMonth === -1
                  ? "∞"
                  : features.collaborationsPerMonth - sentRequests.length}
              </p>
              <p className="text-xs text-muted-foreground">Requests Left</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{currentUserProfile?.credibilityRating}</p>
              <p className="text-xs text-muted-foreground">Your Rating</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Free Plan Upsell */}
      {currentPlan === "free" && (
        <Card className="p-4 border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Unlock Direct Messaging & Priority Matching</p>
                <p className="text-xs text-muted-foreground">
                  Premium users get unlimited collaboration requests and direct messaging
                </p>
              </div>
            </div>
            <Link href="/pricing/creators">
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary">
                <Sparkles className="w-4 h-4" /> Upgrade to Premium
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search creators by name or niche..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.slice(0, 5).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Similar Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarCreators.map((influencer) => {
          const nicheOverlap = influencer.niche.filter((n) => currentUserProfile?.niche.includes(n))
          const isSent = sentRequests.includes(influencer.id)
          const canSendRequest =
            features.collaborationsPerMonth === -1 || sentRequests.length < features.collaborationsPerMonth

          return (
            <Card
              key={influencer.id}
              className="p-6 border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                  <Image
                    src={influencer.avatar || "/placeholder.svg"}
                    alt={influencer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{influencer.name}</h3>
                    {influencer.verified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{influencer.category}</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold">
                  {influencer.credibilityRating}
                </div>
              </div>

              {/* Match Indicator */}
              {nicheOverlap.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {nicheOverlap.length} niche{nicheOverlap.length > 1 ? "s" : ""} in common
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{nicheOverlap.join(", ")}</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 rounded bg-muted/50">
                  <p className="font-semibold text-sm">{(influencer.followers / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="font-semibold text-sm">{influencer.engagementRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="font-semibold text-sm">{influencer.niche.length}</p>
                  <p className="text-xs text-muted-foreground">Niches</p>
                </div>
              </div>

              {/* Niches */}
              <div className="flex flex-wrap gap-1 mb-4">
                {influencer.niche.slice(0, 3).map((niche) => (
                  <Badge
                    key={niche}
                    variant="outline"
                    className={`text-xs ${
                      currentUserProfile?.niche.includes(niche) ? "border-green-500 text-green-500" : ""
                    }`}
                  >
                    {niche}
                  </Badge>
                ))}
                {influencer.niche.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{influencer.niche.length - 3}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/profile/${influencer.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ExternalLink className="w-3 h-3" /> View Profile
                  </Button>
                </Link>
                {isSent ? (
                  <Button size="sm" disabled className="flex-1 gap-2">
                    <Handshake className="w-3 h-3" /> Request Sent
                  </Button>
                ) : canSendRequest ? (
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => handleCollaborateRequest(influencer.id)}
                  >
                    <Handshake className="w-3 h-3" /> Collaborate
                  </Button>
                ) : (
                  <Link href="/pricing/creators" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full gap-2">
                      <Lock className="w-3 h-3" /> Upgrade
                    </Button>
                  </Link>
                )}
              </div>

              {/* Direct Message - Premium only */}
              {features.messaging && (
                <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
                  <MessageSquare className="w-3 h-3" /> Send Message
                </Button>
              )}
            </Card>
          )
        })}
      </div>

      {similarCreators.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No similar creators found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more creators
          </p>
        </Card>
      )}
    </div>
  )
}
