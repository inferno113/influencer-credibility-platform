"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, MapPin, Users, Sparkles, Star, PartyPopper, 
  Video, Mic, Camera, Heart, ExternalLink, Filter
} from "lucide-react"

// Mock creator events that brands can sponsor
const creatorEvents = [
  {
    id: "ce1",
    title: "Tech Talk Live 2026",
    creator: "Alex Chen",
    creatorRating: 94,
    category: "Technology",
    type: "Live Stream",
    icon: Video,
    date: "Feb 15, 2026",
    time: "7:00 PM EST",
    location: "Virtual",
    description: "Join Alex for an exclusive live Q&A about the future of AI, robotics, and content creation. Expected audience of 50,000+ live viewers.",
    expectedReach: "50K+ live viewers",
    sponsorshipTiers: [
      { name: "Title Sponsor", price: "$15,000", benefits: "Logo placement, 5-min segment, social mentions" },
      { name: "Gold Sponsor", price: "$8,000", benefits: "Logo placement, product showcase" },
      { name: "Silver Sponsor", price: "$3,000", benefits: "Logo in description, shoutout" },
    ],
    tags: ["Tech", "AI", "Live Event"],
    interested: 12,
  },
  {
    id: "ce2",
    title: "30-Day Fitness Transformation",
    creator: "Maya Johnson",
    creatorRating: 91,
    category: "Fitness",
    type: "Challenge Campaign",
    icon: Heart,
    date: "Feb 1 - Mar 2, 2026",
    time: "Daily content",
    location: "Instagram & YouTube",
    description: "A month-long fitness transformation challenge with daily workout videos, meal plans, and community engagement. Perfect for fitness, nutrition, and wellness brands.",
    expectedReach: "2M+ impressions",
    sponsorshipTiers: [
      { name: "Campaign Partner", price: "$25,000", benefits: "Full integration, product placement, dedicated posts" },
      { name: "Equipment Sponsor", price: "$10,000", benefits: "Product feature in workouts" },
      { name: "Nutrition Partner", price: "$7,500", benefits: "Meal plan integration" },
    ],
    tags: ["Fitness", "Health", "Campaign"],
    interested: 8,
  },
  {
    id: "ce3",
    title: "Photography Masterclass",
    creator: "Jordan Rivera",
    creatorRating: 88,
    category: "Photography",
    type: "In-Person Workshop",
    icon: Camera,
    date: "Jan 25, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Los Angeles, CA",
    description: "Hands-on photography and videography workshop for aspiring creators. Limited to 100 attendees for an intimate learning experience.",
    expectedReach: "100 attendees + 200K online recap",
    sponsorshipTiers: [
      { name: "Venue Sponsor", price: "$12,000", benefits: "Naming rights, booth space, welcome gift inclusion" },
      { name: "Equipment Partner", price: "$6,000", benefits: "Demo stations, product loans" },
      { name: "Refreshment Sponsor", price: "$2,500", benefits: "Branded refreshments, signage" },
    ],
    tags: ["Photography", "Workshop", "In-Person"],
    interested: 5,
  },
  {
    id: "ce4",
    title: "Gaming Marathon for Charity",
    creator: "StreamKing",
    creatorRating: 92,
    category: "Gaming",
    type: "Charity Stream",
    icon: Video,
    date: "Feb 28, 2026",
    time: "12-hour stream",
    location: "Twitch",
    description: "24-hour gaming marathon raising funds for children's hospitals. Massive engagement opportunity with gaming and tech audiences.",
    expectedReach: "100K+ concurrent viewers",
    sponsorshipTiers: [
      { name: "Presenting Sponsor", price: "$20,000", benefits: "Stream title, overlay branding, exclusive segment" },
      { name: "Gaming Sponsor", price: "$10,000", benefits: "Game showcase, giveaway integration" },
      { name: "Community Sponsor", price: "$5,000", benefits: "Chat bot integration, shoutouts" },
    ],
    tags: ["Gaming", "Charity", "Live Stream"],
    interested: 15,
  },
  {
    id: "ce5",
    title: "Podcast Launch Party",
    creator: "Sarah Talks",
    creatorRating: 89,
    category: "Lifestyle",
    type: "Launch Event",
    icon: Mic,
    date: "Feb 10, 2026",
    time: "6:00 PM PST",
    location: "San Francisco + Virtual",
    description: "Exclusive launch party for new podcast season. Hybrid event with 200 in-person guests and 10K+ virtual attendees.",
    expectedReach: "10K+ attendees",
    sponsorshipTiers: [
      { name: "Season Sponsor", price: "$30,000", benefits: "Podcast intro, episode sponsorship, event naming" },
      { name: "Event Sponsor", price: "$8,000", benefits: "Booth, product bags, signage" },
      { name: "Digital Sponsor", price: "$4,000", benefits: "Virtual event branding, ad spots" },
    ],
    tags: ["Podcast", "Launch", "Hybrid"],
    interested: 7,
  },
]

const categories = ["All", "Technology", "Fitness", "Photography", "Gaming", "Lifestyle"]
const eventTypes = ["All Types", "Live Stream", "Challenge Campaign", "In-Person Workshop", "Charity Stream", "Launch Event"]

export default function BrandOpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All Types")
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const filteredEvents = creatorEvents.filter((event) => {
    if (selectedCategory !== "All" && event.category !== selectedCategory) return false
    if (selectedType !== "All Types" && event.type !== selectedType) return false
    return true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <PartyPopper className="w-6 h-6 text-primary" />
          <Badge className="bg-primary/10 text-primary border-primary/20">Creator Events</Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">Sponsorship Opportunities</h1>
        <p className="text-muted-foreground">
          Discover upcoming creator events and content campaigns you can sponsor or partner with.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter Events</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Event Type</p>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{filteredEvents.length} opportunities found</p>
        
        {filteredEvents.map((event) => {
          const Icon = event.icon
          const isExpanded = expandedEvent === event.id

          return (
            <Card 
              key={event.id} 
              className={`overflow-hidden transition-all hover:shadow-lg ${isExpanded ? "border-primary/50" : "border-border/50"}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">{event.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {event.creator}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {event.creatorRating} rating
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.interested} brands interested
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
                    {event.expectedReach}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{event.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {event.date} • {event.time}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                {/* Sponsorship Tiers - Expanded View */}
                {isExpanded && (
                  <div className="pt-4 border-t border-border/50 space-y-4">
                    <h4 className="font-semibold">Sponsorship Tiers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {event.sponsorshipTiers.map((tier) => (
                        <Card key={tier.name} className="p-4 bg-muted/30 border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{tier.name}</span>
                            <Badge className="bg-primary/20 text-primary border-primary/30">{tier.price}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{tier.benefits}</p>
                        </Card>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Express Interest <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="outline">Contact Creator</Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  >
                    {isExpanded ? "Show Less" : "View Sponsorship Options"}
                  </Button>
                  {!isExpanded && (
                    <span className="text-sm text-muted-foreground">
                      Starting from {event.sponsorshipTiers[event.sponsorshipTiers.length - 1].price}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <Card className="p-12 text-center border-border/50">
          <PartyPopper className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No events match your filters</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters to see more opportunities.</p>
          <Button variant="outline" onClick={() => { setSelectedCategory("All"); setSelectedType("All Types") }}>
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  )
}
