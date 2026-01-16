"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Star,
  CheckCircle2,
  Users,
  Youtube,
  Instagram,
  Twitter,
  Music2,
  Linkedin,
  Globe,
  Save,
  ExternalLink,
  TrendingUp,
  MessageSquare,
  Heart,
  Eye,
  Award,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock data for creators awaiting rating
const mockCreatorsForRating = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@creator.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    category: "Lifestyle",
    approvedAt: "2024-01-15",
    bio: "Lifestyle content creator focusing on wellness, travel, and sustainable living. Creating authentic content since 2019.",
    platforms: {
      youtube: { url: "https://youtube.com/@sarahjohnson", followers: "180K", avgViews: "45K", engagement: "5.2%" },
      instagram: { url: "https://instagram.com/sarahjohnson", followers: "250K", avgLikes: "12K", engagement: "4.8%" },
      tiktok: { url: "https://tiktok.com/@sarahjohnson", followers: "120K", avgViews: "85K", engagement: "7.1%" },
    },
    metrics: {
      totalFollowers: "550K",
      avgEngagement: "5.7%",
      contentQuality: "High",
      postFrequency: "5-7/week",
      audienceAge: "18-34",
      audienceGender: "68% Female",
    },
    ratingStatus: "pending",
    currentRating: null,
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@techreviews.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    category: "Technology",
    approvedAt: "2024-01-14",
    bio: "Tech reviewer and gadget enthusiast. Breaking down complex technology into simple, understandable content.",
    platforms: {
      youtube: { url: "https://youtube.com/@marcustech", followers: "500K", avgViews: "120K", engagement: "6.1%" },
      twitter: { url: "https://twitter.com/marcustech", followers: "85K", avgLikes: "2.5K", engagement: "2.9%" },
      linkedin: { url: "https://linkedin.com/in/marcuschen", followers: "25K", avgLikes: "800", engagement: "3.2%" },
    },
    metrics: {
      totalFollowers: "610K",
      avgEngagement: "4.1%",
      contentQuality: "Premium",
      postFrequency: "3-4/week",
      audienceAge: "25-44",
      audienceGender: "72% Male",
    },
    ratingStatus: "pending",
    currentRating: null,
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma@fitlife.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    category: "Fitness",
    approvedAt: "2024-01-13",
    bio: "Certified personal trainer and nutritionist. Helping people achieve their fitness goals through actionable advice.",
    platforms: {
      instagram: { url: "https://instagram.com/emmafitlife", followers: "320K", avgLikes: "18K", engagement: "5.6%" },
      youtube: { url: "https://youtube.com/@emmafitlife", followers: "150K", avgViews: "35K", engagement: "4.5%" },
      tiktok: { url: "https://tiktok.com/@emmafitlife", followers: "200K", avgViews: "95K", engagement: "8.2%" },
    },
    metrics: {
      totalFollowers: "670K",
      avgEngagement: "6.1%",
      contentQuality: "High",
      postFrequency: "Daily",
      audienceAge: "18-35",
      audienceGender: "58% Female",
    },
    ratingStatus: "pending",
    currentRating: null,
  },
]

const platformIcons: Record<string, React.ReactNode> = {
  youtube: <Youtube className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  tiktok: <Music2 className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  website: <Globe className="w-4 h-4" />,
}

const platformColors: Record<string, string> = {
  youtube: "text-red-500 bg-red-500/10",
  instagram: "text-pink-500 bg-pink-500/10",
  twitter: "text-blue-400 bg-blue-400/10",
  tiktok: "text-purple-500 bg-purple-500/10",
  linkedin: "text-blue-600 bg-blue-600/10",
}

// Rating criteria
const ratingCriteria = [
  { id: "content_quality", label: "Content Quality", description: "Overall quality of content production" },
  { id: "engagement", label: "Engagement Rate", description: "How well audience interacts with content" },
  { id: "authenticity", label: "Authenticity", description: "Genuineness and transparency of creator" },
  { id: "consistency", label: "Consistency", description: "Regularity of content posting" },
  { id: "audience_quality", label: "Audience Quality", description: "Relevance and authenticity of followers" },
]

export default function AssignRatingPage() {
  const [creators] = useState(mockCreatorsForRating)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCreator, setSelectedCreator] = useState<typeof mockCreatorsForRating[0] | null>(null)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRatingChange = (criteriaId: string, value: number) => {
    setRatings(prev => ({ ...prev, [criteriaId]: value }))
  }

  const calculateOverallRating = () => {
    const values = Object.values(ratings)
    if (values.length === 0) return 0
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  const handleSaveRating = async () => {
    if (!selectedCreator) return
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert(`Rating saved for ${selectedCreator.name}: ${calculateOverallRating().toFixed(1)}`)
    // Reset form
    setRatings({})
    setNotes("")
    setSelectedCreator(null)
  }

  const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
    const [hover, setHover] = useState(0)
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="transition-transform hover:scale-110"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hover || value)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {value > 0 ? `${value}/5` : "Not rated"}
        </span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/approved">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assign Ratings</h1>
            <p className="text-muted-foreground">Evaluate and rate approved creator profiles</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creator Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Select Creator</CardTitle>
              <CardDescription>Choose a creator to assign rating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50"
                />
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedCreator?.id === creator.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border/50"
                    }`}
                    onClick={() => {
                      setSelectedCreator(creator)
                      setRatings({})
                      setNotes("")
                    }}
                  >
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{creator.name}</p>
                      <p className="text-xs text-muted-foreground">{creator.category}</p>
                    </div>
                    {creator.currentRating ? (
                      <Badge variant="outline" className="text-green-500 border-green-500/50">
                        <Star className="w-3 h-3 mr-1 fill-current" /> {creator.currentRating}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Form */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCreator ? (
            <>
              {/* Creator Profile Card */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-20 h-20 border-2 border-primary/30">
                        <AvatarImage src={selectedCreator.avatar} alt={selectedCreator.name} />
                        <AvatarFallback className="text-xl">{selectedCreator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-bold">{selectedCreator.name}</h2>
                        <p className="text-sm text-muted-foreground">{selectedCreator.email}</p>
                        <Badge variant="secondary" className="mt-1">{selectedCreator.category}</Badge>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedCreator.bio}</p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.totalFollowers}</p>
                    </div>
                    <div className="text-center">
                      <Heart className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Engagement</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.avgEngagement}</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Quality</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.contentQuality}</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.postFrequency}</p>
                    </div>
                    <div className="text-center">
                      <Eye className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Age Group</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.audienceAge}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="font-semibold text-sm">{selectedCreator.metrics.audienceGender}</p>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Platform Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {Object.entries(selectedCreator.platforms).map(([platform, data]) => (
                        <a
                          key={platform}
                          href={data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-lg border transition-all hover:shadow-md ${platformColors[platform]} border-border/50`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {platformIcons[platform]}
                              <span className="font-medium capitalize text-sm">{platform}</span>
                            </div>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Followers</p>
                              <p className="font-semibold">{data.followers}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Engagement</p>
                              <p className="font-semibold">{data.engagement}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rating Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Rating Criteria
                  </CardTitle>
                  <CardDescription>Rate each criteria from 1-5 stars based on your evaluation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {ratingCriteria.map((criteria) => (
                    <div key={criteria.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                      <div>
                        <p className="font-medium text-foreground">{criteria.label}</p>
                        <p className="text-xs text-muted-foreground">{criteria.description}</p>
                      </div>
                      <StarRating
                        value={ratings[criteria.id] || 0}
                        onChange={(v) => handleRatingChange(criteria.id, v)}
                      />
                    </div>
                  ))}

                  {/* Overall Rating Preview */}
                  {Object.keys(ratings).length > 0 && (
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Overall Rating</p>
                          <p className="text-xs text-muted-foreground">
                            Based on {Object.keys(ratings).length} of {ratingCriteria.length} criteria
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                          <span className="text-3xl font-bold text-foreground">{calculateOverallRating().toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Admin Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Add any notes or observations about this creator..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-24 px-3 py-2 rounded-lg border border-border/50 bg-muted/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      {Object.keys(ratings).length === ratingCriteria.length
                        ? "✓ All criteria rated"
                        : `Rate ${ratingCriteria.length - Object.keys(ratings).length} more criteria`}
                    </p>
                    <Button
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={Object.keys(ratings).length < ratingCriteria.length || saving}
                      onClick={handleSaveRating}
                    >
                      {saving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" /> Save Rating
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <Star className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Select a Creator</h3>
              <p className="text-sm text-muted-foreground">Choose a creator from the list to assign their rating</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
