"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import Image from "next/image"
import { useState } from "react"

export default function ProfilePage() {
  const currentInfluencer = mockInfluencers[0]
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">My Professional Profile</h1>
              <p className="text-muted-foreground">Manage your public profile information</p>
            </div>

            {/* Profile Header */}
            <Card className="p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <Image
                      src={currentInfluencer.avatar || "/placeholder.svg"}
                      alt={currentInfluencer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{currentInfluencer.name}</h2>
                    <p className="text-lg text-muted-foreground mb-3">{currentInfluencer.category}</p>
                    <div className="flex gap-2">
                      {currentInfluencer.niche.map((n) => (
                        <Badge key={n} variant="secondary">
                          {n}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              {isEditing && <div className="border-t border-border pt-6">Edit functionality would be here</div>}
            </Card>

            {/* Bio Section */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Professional Bio</h3>
              {isEditing ? (
                <textarea
                  defaultValue={currentInfluencer.bio}
                  className="w-full p-3 border border-border rounded-lg bg-secondary/50 resize-none"
                  rows={4}
                />
              ) : (
                <p className="text-foreground leading-relaxed">{currentInfluencer.bio}</p>
              )}
            </Card>

            {/* Connected Platforms */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Connected Platforms</h3>
              <div className="space-y-3">
                {[
                  { name: "Instagram", handle: currentInfluencer.platforms.instagram },
                  { name: "TikTok", handle: currentInfluencer.platforms.tiktok },
                  { name: "YouTube", handle: currentInfluencer.platforms.youtube },
                  { name: "Twitter", handle: currentInfluencer.platforms.twitter },
                  { name: "LinkedIn", handle: currentInfluencer.platforms.linkedin },
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                  >
                    <span className="font-medium">{platform.name}</span>
                    {platform.handle ? (
                      <Badge variant="secondary">{platform.handle}</Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Profile Preview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Preview</h3>
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  This is how other users and brands will see your profile.
                </p>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h4 className="text-2xl font-bold mb-2">{currentInfluencer.name}</h4>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{currentInfluencer.bio}</p>
                  <Badge className="mb-4">{currentInfluencer.credibilityRating}</Badge>
                </div>
              </div>
            </Card>
          </div>
    </div>
  )
}
