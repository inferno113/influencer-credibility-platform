"use client"

import { InfluencerCard } from "@/components/influencer-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockInfluencers } from "@/lib/mock-data"

export default function SavedPage() {
  // Mock saved influencers
  const savedInfluencers = mockInfluencers

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Saved Creators</h1>
              <p className="text-muted-foreground">Your curated list of creators for partnerships</p>
            </div>

            {savedInfluencers.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No saved creators yet</p>
                <Button>Explore Creators</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedInfluencers.map((influencer) => (
                  <InfluencerCard key={influencer.id} influencer={influencer} />
                ))}
              </div>
            )}
          </div>
    </div>
  )
}
