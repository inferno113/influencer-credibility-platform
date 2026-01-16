"use client"

import { InfluencerSidebar } from "@/components/influencer-sidebar"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import Image from "next/image"
import { UserPlus, Users } from "lucide-react"

export default function NetworkPage() {
  // Mock other influencers
  const otherInfluencers = mockInfluencers.slice(1)
  const [following, setFollowing] = [new Set(["2", "3"]), () => {}]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <InfluencerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Creator Network</h1>
              <p className="text-muted-foreground">Connect with and follow other professional creators</p>
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Following", value: "24", icon: Users },
                { label: "Followers", value: "156", icon: Users },
                { label: "Mutual Connections", value: "8", icon: Users },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <Icon className="w-5 h-5 text-primary opacity-50" />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Suggested Creators */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Suggested Creators</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherInfluencers.map((influencer) => (
                  <Card key={influencer.id} className="p-4 border border-border">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={influencer.avatar || "/placeholder.svg"}
                          alt={influencer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{influencer.name}</h3>
                        <p className="text-xs text-muted-foreground">{influencer.category}</p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b border-border">
                      <Badge className="text-xs">{influencer.credibilityRating}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                      <div>
                        <p className="font-medium text-foreground">{(influencer.followers / 1000).toFixed(0)}K</p>
                        <p>followers</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{influencer.niche.length}</p>
                        <p>niches</p>
                      </div>
                    </div>

                    <Button className="w-full gap-2 bg-transparent" variant="outline" size="sm">
                      <UserPlus className="w-4 h-4" />
                      Follow
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
