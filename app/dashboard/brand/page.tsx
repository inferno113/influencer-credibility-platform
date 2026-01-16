"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { ArrowRight, TrendingUp, Heart, Users } from "lucide-react"
import Link from "next/link"

export default function BrandDashboardPage() {
  const savedInfluencers = mockInfluencers.slice(0, 3)
  const suggestedInfluencers = mockInfluencers.slice(2, 5)

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Creator Management
              </h1>
              <p className="text-muted-foreground">Discover, evaluate, and manage creator partnerships</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Saved Creators", value: "12", icon: Heart },
                { label: "Total Followers", value: "2.4M", icon: Users },
                { label: "Avg. Rating", value: "84", icon: TrendingUp },
                { label: "Partnership Inquiries", value: "8", icon: ArrowRight },
              ].map((kpi) => {
                const Icon = kpi.icon
                return (
                  <Card
                    key={kpi.label}
                    className="p-6 border-primary/20 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                        <p className="text-3xl font-bold">{kpi.value}</p>
                      </div>
                      <Icon className="w-5 h-5 text-primary opacity-50" />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Saved Creators */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Creators</h2>
                  <Link href="/dashboard/brand/saved">
                    <Button variant="ghost" className="gap-2">
                      View All <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {savedInfluencers.map((influencer) => (
                    <Card
                      key={influencer.id}
                      className="p-4 border-border/50 hover:border-primary/50 transition-all bg-card/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{influencer.name}</h3>
                            <Badge className="text-xs bg-primary/20 text-primary border border-primary/30">
                              {influencer.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{influencer.bio}</p>
                          <div className="flex gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Rating: </span>
                              <span className="font-semibold text-primary">{influencer.credibilityRating}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Followers: </span>
                              <span className="font-semibold">{(influencer.followers / 1000).toFixed(0)}K</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link href={`/profile/${influencer.id}`}>
                            <Button size="sm" variant="outline">
                              View Profile
                            </Button>
                          </Link>
                          <Button size="sm" variant="ghost" onClick={() => alert("Creator removed from saved")}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Suggested Creators */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended</h2>

                <div className="space-y-4">
                  {suggestedInfluencers.map((influencer) => (
                    <Card
                      key={influencer.id}
                      className="p-4 bg-gradient-to-br from-card to-card/30 border-border/50 hover:border-secondary/50 transition-all"
                    >
                      <div className="mb-3">
                        <h3 className="font-semibold text-sm mb-1">{influencer.name}</h3>
                        <p className="text-xs text-muted-foreground">{influencer.category}</p>
                      </div>
                      <div className="mb-4">
                        <Badge className="text-xs bg-secondary/20 text-secondary border border-secondary/30">
                          {influencer.credibilityRating}
                        </Badge>
                      </div>
                      <Link href={`/profile/${influencer.id}`}>
                        <Button size="sm" className="w-full bg-transparent" variant="outline">
                          Explore
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>

                <Link href="/dashboard/brand/explore">
                  <Button className="w-full mt-6 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Browse All Creators <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
    </div>
  )
}
