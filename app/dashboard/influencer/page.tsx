"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { TrendingUp, Users, Eye, Award, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"

export default function InfluencerDashboardPage() {
  const currentInfluencer = mockInfluencers[0]

  const profileViewTrend = [
    { date: "Jan", views: 320 },
    { date: "Feb", views: 450 },
    { date: "Mar", views: 380 },
    { date: "Apr", views: 520 },
    { date: "May", views: 610 },
    { date: "Jun", views: 730 },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {currentInfluencer.name}
              </h1>
              <p className="text-muted-foreground">View your credibility metrics and performance analytics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Credibility Rating", value: currentInfluencer.credibilityRating, icon: Award, suffix: "" },
                {
                  label: "Profile Views",
                  value: "2,450",
                  icon: Eye,
                  change: "+12% this month",
                },
                { label: "Followers", value: `${(currentInfluencer.followers / 1000).toFixed(0)}K`, icon: Users },
                {
                  label: "Growth Stability",
                  value: `${currentInfluencer.growthStability.toFixed(1)}/10`,
                  icon: TrendingUp,
                },
              ].map((metric) => {
                const Icon = metric.icon
                return (
                  <Card
                    key={metric.label}
                    className="p-6 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <Icon className="w-5 h-5 text-primary opacity-50" />
                    </div>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    {metric.change && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">{metric.change}</p>
                    )}
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                  <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={profileViewTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="var(--color-primary)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-primary)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                  <h2 className="text-lg font-semibold mb-4">Trust Tags</h2>
                  <div className="flex flex-wrap gap-3">
                    {currentInfluencer.trustTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="px-3 py-2 text-sm bg-primary/20 text-primary border border-primary/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Earned tags represent verified strengths in your professional profile.
                  </p>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30">
                  <div className="text-sm text-muted-foreground mb-2">Current Rating</div>
                  <div className="text-4xl font-bold mb-2">{currentInfluencer.credibilityRating}</div>
                  <div className="text-sm font-medium">Excellent credibility</div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                  <h3 className="font-semibold mb-4">Actions</h3>
                  <div className="space-y-2">
                    <Link href="/dashboard/influencer/profile">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Edit Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/influencer/insights">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Full Insights
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      onClick={() => alert("Report downloaded")}
                    >
                      <Download className="w-3 h-3" />
                      Download Report
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                  <h3 className="font-semibold mb-2">Rating Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Your rating reflects content quality, engagement metrics, growth patterns, and authenticity factors.
                  </p>
                </Card>
              </div>
            </div>
          </div>
    </div>
  )
}
