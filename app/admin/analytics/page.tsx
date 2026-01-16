"use client"

import { Card } from "@/components/ui/card"
import { mockInfluencers } from "@/lib/mock-data"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  const platformStats = [
    { name: "Instagram", count: mockInfluencers.filter((i) => i.platforms.instagram).length },
    { name: "TikTok", count: mockInfluencers.filter((i) => i.platforms.tiktok).length },
    { name: "YouTube", count: mockInfluencers.filter((i) => i.platforms.youtube).length },
    { name: "Twitter", count: mockInfluencers.filter((i) => i.platforms.twitter).length },
    { name: "LinkedIn", count: mockInfluencers.filter((i) => i.platforms.linkedin).length },
  ]

  const monthlyGrowth = [
    { month: "Jan", total: 20, verified: 15 },
    { month: "Feb", total: 22, verified: 16 },
    { month: "Mar", total: 25, verified: 18 },
    { month: "Apr", total: 28, verified: 21 },
    { month: "May", total: 30, verified: 23 },
  ]

  const categoryDistribution = [
    { name: "Technology", count: 2 },
    { name: "Design & Creative", count: 1 },
    { name: "Business", count: 1 },
    { name: "Marketing", count: 1 },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Platform Analytics</h1>
              <p className="text-muted-foreground">Insights into platform growth and influencer distribution</p>
            </div>

            {/* Platform Distribution */}
            <Card className="p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Influencers by Platform</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {platformStats.map((platform) => (
                  <Card key={platform.name} className="p-4 text-center border border-border">
                    <p className="text-sm text-muted-foreground mb-1">{platform.name}</p>
                    <p className="text-3xl font-bold text-primary">{platform.count}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Growth Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Growth Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="verified"
                      stackId="1"
                      fill="var(--color-primary)"
                      stroke="var(--color-primary)"
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stackId="1"
                      fill="var(--color-secondary)"
                      stroke="var(--color-secondary)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
                <div className="space-y-4">
                  {categoryDistribution.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground">{cat.name}</span>
                        <span className="font-semibold">{cat.count}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${(cat.count / mockInfluencers.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Rating Distribution */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Rating Band Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    band: "Excellent (90-100)",
                    count: mockInfluencers.filter((i) => i.credibilityRating >= 90).length,
                  },
                  {
                    band: "Very Good (80-89)",
                    count: mockInfluencers.filter((i) => i.credibilityRating >= 80 && i.credibilityRating < 90).length,
                  },
                  {
                    band: "Good (70-79)",
                    count: mockInfluencers.filter((i) => i.credibilityRating >= 70 && i.credibilityRating < 80).length,
                  },
                  { band: "Fair (60-69)", count: mockInfluencers.filter((i) => i.credibilityRating < 70).length },
                ].map((item) => (
                  <Card key={item.band} className="p-4 text-center border border-border">
                    <p className="text-sm text-muted-foreground mb-2">{item.band}</p>
                    <p className="text-3xl font-bold text-primary">{item.count}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
    </div>
  )
}
