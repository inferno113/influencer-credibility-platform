"use client"

import type { Influencer } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface ComparisonModalProps {
  influencers: Influencer[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComparisonModal({ influencers, open, onOpenChange }: ComparisonModalProps) {
  if (influencers.length === 0) return null

  const metrics = [
    { key: "credibilityRating", label: "Credibility Rating", suffix: "" },
    { key: "engagementRate", label: "Engagement Rate", suffix: "%" },
    { key: "growthStability", label: "Growth Stability", suffix: "/10" },
    { key: "contentQuality", label: "Content Quality", suffix: "/10" },
    { key: "authenticity", label: "Authenticity", suffix: "/10" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Creator Comparison</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Metric</th>
                {influencers.map((inf) => (
                  <th key={inf.id} className="text-center py-3 px-4">
                    <div className="font-semibold">{inf.name}</div>
                    <div className="text-xs text-muted-foreground">{inf.category}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Basic Info */}
              <tr className="border-b border-border hover:bg-secondary/30">
                <td className="py-3 px-4 font-medium">Verified</td>
                {influencers.map((inf) => (
                  <td key={inf.id} className="text-center py-3 px-4">
                    {inf.verified ? <CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto" /> : "-"}
                  </td>
                ))}
              </tr>

              {/* Metrics */}
              {metrics.map((metric) => (
                <tr key={metric.key} className="border-b border-border hover:bg-secondary/30">
                  <td className="py-3 px-4 font-medium">{metric.label}</td>
                  {influencers.map((inf) => {
                    const value = inf[metric.key as keyof Influencer] || 0
                    const numValue = Number(value)
                    const maxValue = metric.suffix === "%" ? 100 : metric.suffix === "/10" ? 10 : 100

                    return (
                      <td key={inf.id} className="text-center py-3 px-4">
                        <div className="mb-2 font-semibold">
                          {numValue.toFixed(1)}
                          {metric.suffix}
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${(numValue / maxValue) * 100}%` }}
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* Followers */}
              <tr className="border-b border-border hover:bg-secondary/30">
                <td className="py-3 px-4 font-medium">Followers</td>
                {influencers.map((inf) => (
                  <td key={inf.id} className="text-center py-3 px-4">
                    {(inf.followers / 1000).toFixed(0)}K
                  </td>
                ))}
              </tr>

              {/* Tags */}
              <tr>
                <td className="py-3 px-4 font-medium">Trust Tags</td>
                {influencers.map((inf) => (
                  <td key={inf.id} className="text-center py-3 px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {inf.trustTags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
