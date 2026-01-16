"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Youtube,
  Instagram,
  Twitter,
  Music2,
  Linkedin,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Mock data for approved creators awaiting rating
const mockApprovedCreators = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@creator.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    category: "Lifestyle",
    approvedAt: "2024-01-15",
    followers: "250K",
    totalReach: "1.2M",
    engagementRate: "4.8%",
    bio: "Lifestyle content creator focusing on wellness, travel, and sustainable living.",
    platforms: {
      youtube: { followers: "180K" },
      instagram: { followers: "250K" },
      tiktok: { followers: "120K" },
    },
    ratingStatus: "pending",
    rating: null,
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@techreviews.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    category: "Technology",
    approvedAt: "2024-01-14",
    followers: "500K",
    totalReach: "2.5M",
    engagementRate: "5.2%",
    bio: "Tech reviewer and gadget enthusiast. Breaking down complex technology.",
    platforms: {
      youtube: { followers: "500K" },
      twitter: { followers: "85K" },
      linkedin: { followers: "25K" },
    },
    ratingStatus: "pending",
    rating: null,
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma@fitlife.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    category: "Fitness",
    approvedAt: "2024-01-13",
    followers: "320K",
    totalReach: "1.8M",
    engagementRate: "6.1%",
    bio: "Certified personal trainer and nutritionist. Helping people achieve fitness goals.",
    platforms: {
      instagram: { followers: "320K" },
      youtube: { followers: "150K" },
      tiktok: { followers: "200K" },
    },
    ratingStatus: "in_progress",
    rating: null,
  },
  {
    id: "4",
    name: "Alex Rivera",
    email: "alex@traveldiary.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    category: "Travel",
    approvedAt: "2024-01-12",
    followers: "420K",
    totalReach: "2.1M",
    engagementRate: "4.5%",
    bio: "World traveler and adventure seeker. Sharing authentic travel experiences.",
    platforms: {
      youtube: { followers: "420K" },
      instagram: { followers: "380K" },
    },
    ratingStatus: "completed",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa@foodie.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    category: "Food",
    approvedAt: "2024-01-11",
    followers: "280K",
    totalReach: "1.4M",
    engagementRate: "5.8%",
    bio: "Food blogger and recipe creator. Sharing delicious recipes from around the world.",
    platforms: {
      instagram: { followers: "280K" },
      youtube: { followers: "120K" },
      tiktok: { followers: "190K" },
    },
    ratingStatus: "completed",
    rating: 4.5,
  },
]

const platformIcons: Record<string, React.ReactNode> = {
  youtube: <Youtube className="w-3 h-3" />,
  instagram: <Instagram className="w-3 h-3" />,
  twitter: <Twitter className="w-3 h-3" />,
  tiktok: <Music2 className="w-3 h-3" />,
  linkedin: <Linkedin className="w-3 h-3" />,
  website: <Globe className="w-3 h-3" />,
}

export default function ApprovedCreatorsPage() {
  const [creators] = useState(mockApprovedCreators)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || creator.ratingStatus === filterStatus
    return matchesSearch && matchesStatus
  })

  const pendingRatingCount = creators.filter(c => c.ratingStatus === "pending").length
  const inProgressCount = creators.filter(c => c.ratingStatus === "in_progress").length
  const completedCount = creators.filter(c => c.ratingStatus === "completed").length

  const getRatingStatusBadge = (status: string, rating: number | null) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 bg-yellow-500/10"><Clock className="w-3 h-3 mr-1" />Awaiting Rating</Badge>
      case "in_progress":
        return <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/10"><Star className="w-3 h-3 mr-1" />Rating in Progress</Badge>
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10"><Star className="w-3 h-3 mr-1 fill-current" />{rating?.toFixed(1)} Rating</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approved Creators</h1>
          <p className="text-muted-foreground">Manage ratings for approved creator profiles</p>
        </div>
        <Link href="/admin/assign-rating">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Star className="w-4 h-4 mr-2" /> Assign Ratings
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Awaiting Rating</p>
                <p className="text-2xl font-bold text-yellow-500">{pendingRatingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating in Progress</p>
                <p className="text-2xl font-bold text-blue-500">{inProgressCount}</p>
              </div>
              <Star className="w-8 h-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fully Rated</p>
                <p className="text-2xl font-bold text-green-500">{completedCount}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Approved</p>
                <p className="text-2xl font-bold text-purple-500">{creators.length}</p>
              </div>
              <Award className="w-8 h-8 text-purple-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
          >
            Awaiting Rating
          </Button>
          <Button
            variant={filterStatus === "in_progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("in_progress")}
          >
            In Progress
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCreators.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">No creators found matching your criteria.</p>
          </Card>
        ) : (
          filteredCreators.map((creator) => (
            <Card key={creator.id} className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{creator.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{creator.email}</p>
                    <Badge variant="secondary" className="text-xs">{creator.category}</Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="font-semibold text-sm">{creator.followers}</p>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <p className="text-xs text-muted-foreground">Reach</p>
                    <p className="font-semibold text-sm">{creator.totalReach}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-sm">{creator.engagementRate}</p>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex items-center gap-2 mb-4">
                  {Object.entries(creator.platforms).map(([platform, data]) => (
                    <div
                      key={platform}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-xs"
                    >
                      {platformIcons[platform]}
                      <span className="text-muted-foreground">{data.followers}</span>
                    </div>
                  ))}
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  {getRatingStatusBadge(creator.ratingStatus, creator.rating)}
                  {creator.ratingStatus !== "completed" ? (
                    <Link href={`/admin/assign-rating?creator=${creator.id}`}>
                      <Button size="sm" variant="outline" className="text-primary border-primary/50 hover:bg-primary/10">
                        <Star className="w-3 h-3 mr-1" /> Rate
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" /> View
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
