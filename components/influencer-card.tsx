"use client"

import type { Influencer } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, TrendingUp, LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface InfluencerCardProps {
  influencer: Influencer
  compact?: boolean
}

export function InfluencerCard({ influencer, compact = false }: InfluencerCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 85) return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
    if (rating >= 75) return "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
    if (rating >= 65)
      return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
    return "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800"
  }

  if (compact) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={influencer.avatar || "/placeholder.svg"}
              alt={influencer.name}
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">{influencer.name}</h3>
                <p className="text-sm text-muted-foreground">{influencer.category}</p>
              </div>
              {influencer.verified && <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />}
            </div>
            <div className="flex items-center justify-between">
              <Badge className={`${getRatingColor(influencer.credibilityRating)} border`}>
                {influencer.credibilityRating}
              </Badge>
              <Link href={`/profile/${influencer.id}`}>
                <Button size="sm" variant="ghost">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-secondary relative overflow-hidden">
        <Image src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{influencer.name}</h3>
            <p className="text-sm text-muted-foreground">{influencer.category}</p>
          </div>
          {influencer.verified && <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{influencer.bio}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Credibility Rating</span>
            <Badge className={`${getRatingColor(influencer.credibilityRating)} border`}>
              {influencer.credibilityRating}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="w-4 h-4" />
              Followers
            </span>
            <span className="font-medium text-foreground">{(influencer.followers / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Growth Stability
            </span>
            <span className="font-medium text-foreground">{influencer.growthStability.toFixed(1)}/10</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {influencer.trustTags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {influencer.trustTags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{influencer.trustTags.length - 2} more
            </Badge>
          )}
        </div>

        <Link href={`/profile/${influencer.id}`}>
          <Button className="w-full gap-2">
            View Profile <LinkIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
