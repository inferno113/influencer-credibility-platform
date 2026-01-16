"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function RatingSystemPage() {
  const [weights, setWeights] = useState({
    contentQuality: 25,
    engagementQuality: 25,
    growthStability: 25,
    authenticity: 25,
  })

  const [mockRating, setMockRating] = useState(0)

  const calculateMockRating = () => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0)
    if (total === 0) return 0
    const normalized = Object.values(weights).map((w) => (w / total) * 100)
    const avg = normalized.reduce((a, b) => a + b, 0) / normalized.length
    return Math.round(avg)
  }

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights({ ...weights, [key]: value })
    setMockRating(calculateMockRating())
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Rating System Control</h1>
              <p className="text-muted-foreground">Adjust factors that influence credibility scores</p>
            </div>

            {/* Weight Sliders */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Rating Weights</h2>
              <div className="space-y-6">
                {Object.entries(weights).map(([key, value]) => {
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim()
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-foreground">{label}</label>
                        <span className="text-lg font-semibold text-primary">{value}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) =>
                          handleWeightChange(key as keyof typeof weights, Number.parseInt(e.target.value))
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Adjust importance weight</p>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Total Check */}
            <Card className="p-6 mb-6 bg-secondary/30">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Weight Distribution</p>
                  <p className="text-2xl font-bold">{Object.values(weights).reduce((a, b) => a + b, 0)}%</p>
                </div>
                {Object.values(weights).reduce((a, b) => a + b, 0) === 100 ? (
                  <div className="text-green-600 text-sm font-medium">✓ Properly balanced</div>
                ) : (
                  <div className="text-yellow-600 text-sm font-medium">⚠ Adjust to 100%</div>
                )}
              </div>
            </Card>

            {/* Mock Rating */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Live Rating Preview</h2>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">Example Influencer Score</p>
                <p className="text-6xl font-bold text-primary">{calculateMockRating()}</p>
                <p className="text-muted-foreground mt-4">Based on current weight distribution</p>
              </div>
            </Card>

            {/* Methodology */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Rating Methodology</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  <strong>Content Quality:</strong> Measures the relevance, originality, and production value of
                  published content across platforms.
                </p>
                <p>
                  <strong>Engagement Quality:</strong> Analyzes audience interaction rates, comment sentiment, and
                  community responsiveness.
                </p>
                <p>
                  <strong>Growth Stability:</strong> Evaluates sustainable growth patterns without artificial spikes or
                  follower manipulation.
                </p>
                <p>
                  <strong>Authenticity:</strong> Assesses genuine voice consistency, transparency about partnerships,
                  and audience trust indicators.
                </p>
              </div>
            </Card>
          </div>
    </div>
  )
}
