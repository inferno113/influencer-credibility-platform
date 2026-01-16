"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Sparkles, Plus, Calendar, MapPin, Users, DollarSign, 
  Edit, Trash2, Eye, Clock, CheckCircle2, XCircle, AlertCircle,
  Video, Mic, Camera, PartyPopper, Star
} from "lucide-react"

// Mock creator's promoted events/content
const myPromotions = [
  {
    id: "cp1",
    title: "Tech Talk Live 2026",
    type: "Live Stream",
    icon: Video,
    status: "active",
    date: "Feb 15, 2026",
    time: "7:00 PM EST",
    location: "Virtual",
    description: "Exclusive live Q&A about the future of AI, robotics, and content creation. Seeking sponsors for this high-engagement event.",
    expectedReach: "50K+ live viewers",
    sponsorshipGoal: "$25,000",
    sponsorshipRaised: "$18,000",
    sponsorsInterested: 8,
    sponsorsConfirmed: 2,
    tiers: [
      { name: "Title Sponsor", price: "$15,000", available: true },
      { name: "Gold Sponsor", price: "$8,000", available: false },
      { name: "Silver Sponsor", price: "$3,000", available: true },
    ],
    views: 2450,
    createdAt: "Jan 8, 2026",
  },
  {
    id: "cp2",
    title: "Creator Masterclass Series",
    type: "Video Series",
    icon: Camera,
    status: "active",
    date: "Feb 1 - Mar 31, 2026",
    time: "Weekly episodes",
    location: "YouTube",
    description: "10-part educational series on content creation, monetization, and growing your audience. Perfect for creator tools and software brands.",
    expectedReach: "500K+ total views",
    sponsorshipGoal: "$40,000",
    sponsorshipRaised: "$32,000",
    sponsorsInterested: 12,
    sponsorsConfirmed: 4,
    tiers: [
      { name: "Series Sponsor", price: "$25,000", available: false },
      { name: "Episode Sponsor", price: "$5,000", available: true },
      { name: "Segment Sponsor", price: "$2,000", available: true },
    ],
    views: 5680,
    createdAt: "Dec 20, 2025",
  },
  {
    id: "cp3",
    title: "Behind the Scenes Podcast",
    type: "Podcast Launch",
    icon: Mic,
    status: "draft",
    date: "Mar 1, 2026",
    time: "Bi-weekly episodes",
    location: "All Platforms",
    description: "New podcast launching soon! Interviews with top creators sharing their journeys. Looking for launch sponsors.",
    expectedReach: "100K+ downloads/month",
    sponsorshipGoal: "$15,000",
    sponsorshipRaised: "$0",
    sponsorsInterested: 0,
    sponsorsConfirmed: 0,
    tiers: [
      { name: "Launch Partner", price: "$10,000", available: true },
      { name: "Episode Sponsor", price: "$3,000", available: true },
      { name: "Ad Spot", price: "$1,000", available: true },
    ],
    views: 0,
    createdAt: "Jan 12, 2026",
  },
  {
    id: "cp4",
    title: "Holiday Special 2025",
    type: "Special Event",
    icon: PartyPopper,
    status: "completed",
    date: "Dec 24, 2025",
    time: "8:00 PM EST",
    location: "YouTube Live",
    description: "Holiday special stream with giveaways and special guests. Successfully sponsored event with great engagement.",
    expectedReach: "75K+ viewers",
    sponsorshipGoal: "$20,000",
    sponsorshipRaised: "$22,500",
    sponsorsInterested: 15,
    sponsorsConfirmed: 5,
    tiers: [
      { name: "Title Sponsor", price: "$12,000", available: false },
      { name: "Giveaway Sponsor", price: "$5,000", available: false },
      { name: "Shoutout Sponsor", price: "$2,000", available: false },
    ],
    views: 12400,
    createdAt: "Nov 28, 2025",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30", icon: CheckCircle2 },
  draft: { label: "Draft", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30", icon: CheckCircle2 },
  paused: { label: "Paused", color: "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30", icon: XCircle },
}

export default function CreatorPromotePage() {
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "completed">("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredPromotions = myPromotions.filter((promo) => {
    if (filter === "all") return true
    return promo.status === filter
  })

  const stats = {
    active: myPromotions.filter(p => p.status === "active").length,
    totalRaised: myPromotions.reduce((acc, p) => acc + parseInt(p.sponsorshipRaised.replace(/[^0-9]/g, "")), 0),
    totalViews: myPromotions.reduce((acc, p) => acc + p.views, 0),
    totalSponsors: myPromotions.reduce((acc, p) => acc + p.sponsorsConfirmed, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-secondary" />
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Your Events</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">Promote Your Content</h1>
          <p className="text-muted-foreground">
            Create and manage your events, content series, and special projects to attract brand sponsors.
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus className="w-4 h-4" /> Create New Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Active Events</p>
          <p className="text-3xl font-bold text-primary">{stats.active}</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
          <p className="text-3xl font-bold text-green-500">${(stats.totalRaised / 1000).toFixed(0)}K</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Event Views</p>
          <p className="text-3xl font-bold text-accent">{stats.totalViews.toLocaleString()}</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Brand Partners</p>
          <p className="text-3xl font-bold text-secondary">{stats.totalSponsors}</p>
        </Card>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader className="p-0 mb-6">
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>Promote your upcoming content or event to attract brand sponsors</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input placeholder="e.g., Summer Music Festival Stream" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <Input placeholder="e.g., Live Stream, Video Series, Podcast" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date/Duration</label>
                <Input placeholder="e.g., Mar 15, 2026 or Mar 1-15, 2026" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location/Platform</label>
                <Input placeholder="e.g., YouTube Live, Twitch, In-Person" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Reach</label>
                <Input placeholder="e.g., 50K+ viewers" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sponsorship Goal</label>
                <Input placeholder="e.g., $15,000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                placeholder="Describe your event, what sponsors will get, and why brands should partner with you..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sponsorship Tiers (one per line: Name - Price)</label>
              <textarea 
                className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                placeholder="Title Sponsor - $10,000&#10;Gold Sponsor - $5,000&#10;Silver Sponsor - $2,000"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <CheckCircle2 className="w-4 h-4" /> Publish Event
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="ghost" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "active", "draft", "completed"] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "All Events" : status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== "all" && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {myPromotions.filter(p => p.status === status).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredPromotions.map((promo) => {
          const statusInfo = statusConfig[promo.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon
          const Icon = promo.icon
          const progress = (parseInt(promo.sponsorshipRaised.replace(/[^0-9]/g, "")) / parseInt(promo.sponsorshipGoal.replace(/[^0-9]/g, ""))) * 100

          return (
            <Card key={promo.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-xl">{promo.title}</CardTitle>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{promo.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {promo.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {promo.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {promo.expectedReach}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{promo.description}</p>
                
                {/* Sponsorship Progress */}
                <div className="py-4 px-4 bg-muted/30 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sponsorship Progress</span>
                    <span className="text-sm">
                      <strong className="text-green-500">{promo.sponsorshipRaised}</strong>
                      <span className="text-muted-foreground"> / {promo.sponsorshipGoal}</span>
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <strong>{promo.views.toLocaleString()}</strong> views
                    </span>
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <strong>{promo.sponsorsInterested}</strong> interested
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <strong>{promo.sponsorsConfirmed}</strong> confirmed
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Created {promo.createdAt}
                    </span>
                  </div>
                </div>

                {/* Sponsorship Tiers */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Sponsorship Tiers</p>
                  <div className="flex flex-wrap gap-2">
                    {promo.tiers.map((tier) => (
                      <Badge 
                        key={tier.name} 
                        variant={tier.available ? "outline" : "secondary"}
                        className={`text-xs ${!tier.available ? "opacity-50" : ""}`}
                      >
                        {tier.name}: {tier.price}
                        {!tier.available && " (Sold)"}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {promo.status === "active" && (
                    <>
                      <Button size="sm" className="gap-2">
                        <Users className="w-4 h-4" /> View Interested Brands ({promo.sponsorsInterested})
                      </Button>
                      <Button size="sm" variant="outline">Share Event</Button>
                    </>
                  )}
                  {promo.status === "draft" && (
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Sparkles className="w-4 h-4" /> Publish Event
                    </Button>
                  )}
                  {promo.status === "completed" && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" /> View Results
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredPromotions.length === 0 && (
        <Card className="p-12 text-center border-border/50">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === "all" 
              ? "Create your first event to start attracting sponsors."
              : `No ${filter} events at the moment.`}
          </p>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4" /> Create Event
          </Button>
        </Card>
      )}
    </div>
  )
}
