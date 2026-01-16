"use client"

import { InfluencerSidebar } from "@/components/influencer-sidebar"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InsightsPage() {
  const currentInfluencer = mockInfluencers[0]

  const ratingHistory = [
    { date: "Apr", rating: 81 },
    { date: "May", rating: 82 },
    { date: "Jun", rating: 84 },
    { date: "Jul", rating: 85 },
    { date: "Aug", rating: 86 },
    { date: "Sep", rating: 87 },
  ]

  const improvementSuggestions = [
    {
      area: "Engagement Rate",
      current: 6.2,
      benchmark: 7.5,
      suggestion: "Increase audience interaction through more Q&A sessions",
    },
    {
      area: "Content Consistency",
      current: 8.8,
      benchmark: 9.0,
      suggestion: "Maintain weekly publishing schedule",
    },
    {
      area: "Authenticity Score",
      current: 8.2,
      benchmark: 8.5,
      suggestion: "Share more personal stories and behind-the-scenes content",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <InfluencerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Insights & Analytics</h1>
                <p className="text-muted-foreground">Track your rating trends and improvement areas</p>
              </div>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>

            {/* Rating Trend */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Rating Progression
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ratingHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" domain={[75, 90]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Metrics Comparison */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Your Metrics vs Category Benchmark</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { metric: "Content Quality", your: 8.8, benchmark: 8.2 },
                    { metric: "Engagement", your: 6.2, benchmark: 7.5 },
                    { metric: "Growth", your: 8.5, benchmark: 7.8 },
                    { metric: "Authenticity", your: 8.2, benchmark: 8.1 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Bar dataKey="your" fill="var(--color-primary)" />
                  <Bar dataKey="benchmark" fill="var(--color-secondary)" opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Improvement Suggestions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Improvement Opportunities</h2>
              <div className="space-y-4">
                {improvementSuggestions.map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium">{item.area}</h3>
                      <Badge variant={item.current >= item.benchmark ? "default" : "secondary"} className="text-xs">
                        {item.current >= item.benchmark ? "Above Benchmark" : "Below Benchmark"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Your Score</p>
                        <p className="text-lg font-semibold">{item.current.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Category Benchmark</p>
                        <p className="text-lg font-semibold">{item.benchmark.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Gap</p>
                        <p
                          className={`text-lg font-semibold ${item.current >= item.benchmark ? "text-green-600" : "text-amber-600"}`}
                        >
                          {Math.abs((item.current - item.benchmark).toFixed(1))}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{item.suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
