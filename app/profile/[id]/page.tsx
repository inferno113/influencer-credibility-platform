"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { CheckCircle2, Users, TrendingUp, Calendar, Share2, Bookmark } from "lucide-react"
import Image from "next/image"
import { use } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProfilePage(props: PageProps) {
  const params = use(props.params)
  const influencer = mockInfluencers.find((i) => i.id === params.id)

  if (!influencer) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Creator Not Found</h1>
            <p className="text-muted-foreground">We couldn't find the creator you're looking for.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "bg-green-500/20 text-green-700 dark:text-green-300"
    if (rating >= 75) return "bg-blue-500/20 text-blue-700 dark:text-blue-300"
    if (rating >= 65) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
    return "bg-gray-500/20 text-gray-700 dark:text-gray-300"
  }

  const getRatingBand = (rating: number) => {
    if (rating >= 85) return { label: "Excellent", description: "Consistent, authentic, highly engaging" }
    if (rating >= 75) return { label: "Very Good", description: "Strong credentials and engagement" }
    if (rating >= 65) return { label: "Good", description: "Solid presence with room for growth" }
    return { label: "Fair", description: "Developing credibility" }
  }

  const ratingBand = getRatingBand(influencer.credibilityRating)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avatar */}
              <div className="md:col-span-1">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-secondary mb-6">
                  <Image
                    src={influencer.avatar || "/placeholder.svg"}
                    alt={influencer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button className="w-full mb-2 gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save Creator
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              {/* Main Info */}
              <div className="md:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{influencer.name}</h1>
                    <p className="text-lg text-muted-foreground">{influencer.category}</p>
                  </div>
                  {influencer.verified && <CheckCircle2 className="w-8 h-8 text-blue-500 flex-shrink-0" />}
                </div>

                <p className="text-lg text-foreground mb-6 leading-relaxed">{influencer.bio}</p>

                {/* Rating Card */}
                <Card className={`p-6 mb-6 ${getRatingColor(influencer.credibilityRating)}`}>
                  <div className="text-sm font-medium mb-2">Credibility Rating</div>
                  <div className="flex items-baseline gap-4">
                    <div className="text-5xl font-bold">{influencer.credibilityRating}</div>
                    <div>
                      <div className="font-semibold">{ratingBand.label}</div>
                      <div className="text-sm opacity-80">{ratingBand.description}</div>
                    </div>
                  </div>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Followers
                    </div>
                    <div className="text-2xl font-bold">{(influencer.followers / 1000).toFixed(0)}K</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Growth Stability
                    </div>
                    <div className="text-2xl font-bold">{influencer.growthStability.toFixed(1)}/10</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Content Quality</div>
                    <div className="text-2xl font-bold">{influencer.contentQuality.toFixed(1)}/10</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
                    <div className="text-2xl font-bold">{influencer.engagementRate.toFixed(1)}%</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trust Tags */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Trust Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {influencer.trustTags.map((tag) => (
                    <Badge key={tag} className="px-3 py-2 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Niche & Category */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Focus Areas</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-2">Category</h3>
                    <p className="font-medium">{influencer.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-2">Niches</h3>
                    <div className="flex flex-wrap gap-2">
                      {influencer.niche.map((n) => (
                        <Badge key={n} variant="secondary">
                          {n}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Detailed Scores */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Credibility Components</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Content Quality",
                      score: influencer.contentQuality,
                      description: "Quality and relevance of published content",
                    },
                    {
                      name: "Engagement Rate",
                      score: influencer.engagementRate,
                      description: "Audience interaction and responsiveness",
                    },
                    {
                      name: "Growth Stability",
                      score: influencer.growthStability,
                      description: "Sustainable and consistent growth patterns",
                    },
                    {
                      name: "Authenticity",
                      score: influencer.authenticity,
                      description: "Genuine voice and audience connection",
                    },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <span className="text-lg font-bold">{item.score.toFixed(1)}/10</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${(item.score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Connected Platforms */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Connected Platforms</h3>
                <div className="space-y-3">
                  {Object.entries(influencer.platforms).map(
                    ([platform, handle]) =>
                      handle && (
                        <div key={platform} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{platform}</span>
                          <Badge variant="secondary">{handle}</Badge>
                        </div>
                      ),
                  )}
                </div>
              </Card>

              {/* Join Date */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Profile Created</span>
                </div>
                <p className="font-medium">
                  {new Date(influencer.joinedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Card>

              {/* Status Badge */}
              <Card className="p-6">
                <div className="text-sm text-muted-foreground mb-2">Verification Status</div>
                <Badge
                  className={
                    influencer.status === "approved"
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : influencer.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }
                >
                  {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                </Badge>
              </Card>

              {/* CTA */}
              <Button className="w-full" size="lg">
                Contact for Partnership
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
