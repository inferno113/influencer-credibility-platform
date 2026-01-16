"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ManageInfluencersPage() {
  const [influencers, setInfluencers] = useState(mockInfluencers)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setInfluencers(influencers.map((i) => (i.id === id ? { ...i, status: "approved" as const } : i)))
  }

  const handleReject = (id: string) => {
    setInfluencers(influencers.map((i) => (i.id === id ? { ...i, status: "rejected" as const } : i)))
  }

  const selectedInfluencer = influencers.find((i) => i.id === selectedId)

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Manage Influencers</h1>
              <p className="text-muted-foreground">Approve, reject, and manage influencer profiles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Influencer List */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">All Influencers</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-semibold">Category</th>
                          <th className="text-center py-3 px-4 font-semibold">Rating</th>
                          <th className="text-center py-3 px-4 font-semibold">Status</th>
                          <th className="text-center py-3 px-4 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {influencers.map((influencer) => (
                          <tr
                            key={influencer.id}
                            className={`border-b border-border hover:bg-secondary/30 cursor-pointer ${
                              selectedId === influencer.id ? "bg-secondary/50" : ""
                            }`}
                            onClick={() => setSelectedId(influencer.id)}
                          >
                            <td className="py-3 px-4 font-medium">{influencer.name}</td>
                            <td className="py-3 px-4">{influencer.category}</td>
                            <td className="text-center py-3 px-4">
                              <Badge className="text-xs">{influencer.credibilityRating}</Badge>
                            </td>
                            <td className="text-center py-3 px-4">
                              <Badge
                                className={
                                  influencer.status === "approved"
                                    ? "bg-green-500/20 text-green-700 dark:text-green-300"
                                    : influencer.status === "pending"
                                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                                }
                              >
                                {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="text-center py-3 px-4">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedId(influencer.id)
                                }}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-1">
                {selectedInfluencer ? (
                  <Card className="p-6 sticky top-24">
                    <h3 className="text-lg font-semibold mb-4">{selectedInfluencer.name}</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium">{selectedInfluencer.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <p className="text-2xl font-bold">{selectedInfluencer.credibilityRating}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Followers</p>
                        <p className="font-medium">{(selectedInfluencer.followers / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium">{selectedInfluencer.joinedDate}</p>
                      </div>
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground mb-2">Actions</p>
                        <div className="space-y-2">
                          {selectedInfluencer.status !== "approved" && (
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(selectedInfluencer.id)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve
                            </Button>
                          )}
                          {selectedInfluencer.status !== "rejected" && (
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-red-600 hover:bg-red-700"
                              onClick={() => handleReject(selectedInfluencer.id)}
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 text-center text-muted-foreground">Select an influencer to view details</Card>
                )}
              </div>
            </div>
          </div>
    </div>
  )
}
