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
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Users,
  ArrowRight,
  Youtube,
  Instagram,
  Twitter,
  Music2,
  Linkedin,
  Globe,
} from "lucide-react"

// Mock data for pending creator applications
const mockApplications = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@creator.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    category: "Lifestyle",
    appliedAt: "2024-01-15",
    followers: "250K",
    bio: "Lifestyle content creator focusing on wellness, travel, and sustainable living. Creating authentic content since 2019.",
    platforms: {
      youtube: { url: "https://youtube.com/@sarahjohnson", followers: "180K", verified: true },
      instagram: { url: "https://instagram.com/sarahjohnson", followers: "250K", verified: true },
      tiktok: { url: "https://tiktok.com/@sarahjohnson", followers: "120K", verified: false },
    },
    status: "pending",
    documents: ["id_verified", "address_verified"],
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@techreviews.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    category: "Technology",
    appliedAt: "2024-01-14",
    followers: "500K",
    bio: "Tech reviewer and gadget enthusiast. Breaking down complex technology into simple, understandable content for everyone.",
    platforms: {
      youtube: { url: "https://youtube.com/@marcustech", followers: "500K", verified: true },
      twitter: { url: "https://twitter.com/marcustech", followers: "85K", verified: true },
      linkedin: { url: "https://linkedin.com/in/marcuschen", followers: "25K", verified: true },
    },
    status: "pending",
    documents: ["id_verified"],
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma@fitlife.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    category: "Fitness",
    appliedAt: "2024-01-13",
    followers: "320K",
    bio: "Certified personal trainer and nutritionist. Helping people achieve their fitness goals through actionable advice.",
    platforms: {
      instagram: { url: "https://instagram.com/emmafitlife", followers: "320K", verified: true },
      youtube: { url: "https://youtube.com/@emmafitlife", followers: "150K", verified: true },
      tiktok: { url: "https://tiktok.com/@emmafitlife", followers: "200K", verified: true },
    },
    status: "pending",
    documents: ["id_verified", "address_verified", "certification_verified"],
  },
  {
    id: "4",
    name: "David Park",
    email: "david@gamingzone.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    category: "Gaming",
    appliedAt: "2024-01-12",
    followers: "750K",
    bio: "Pro gamer and streamer. Competitive player turned content creator, sharing tips, gameplay, and entertainment.",
    platforms: {
      youtube: { url: "https://youtube.com/@davidgaming", followers: "750K", verified: true },
      twitter: { url: "https://twitter.com/davidgaming", followers: "120K", verified: true },
    },
    status: "under_review",
    documents: ["id_verified"],
  },
  {
    id: "5",
    name: "Priya Sharma",
    email: "priya@beautybliss.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    category: "Beauty",
    appliedAt: "2024-01-11",
    followers: "180K",
    bio: "Beauty enthusiast and makeup artist. Creating inclusive beauty content for all skin types and tones.",
    platforms: {
      instagram: { url: "https://instagram.com/priyabeauty", followers: "180K", verified: true },
      youtube: { url: "https://youtube.com/@priyabeauty", followers: "95K", verified: false },
      tiktok: { url: "https://tiktok.com/@priyabeauty", followers: "220K", verified: true },
    },
    status: "pending",
    documents: ["id_verified", "address_verified"],
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
  youtube: "text-red-500 bg-red-500/10 hover:bg-red-500/20",
  instagram: "text-pink-500 bg-pink-500/10 hover:bg-pink-500/20",
  twitter: "text-blue-400 bg-blue-400/10 hover:bg-blue-400/20",
  tiktok: "text-purple-500 bg-purple-500/10 hover:bg-purple-500/20",
  linkedin: "text-blue-600 bg-blue-600/10 hover:bg-blue-600/20",
  website: "text-gray-500 bg-gray-500/10 hover:bg-gray-500/20",
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "approved" } : app
      )
    )
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: "approved" } : null)
    }
  }

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    )
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: "rejected" } : null)
    }
  }

  const handleMarkUnderReview = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "under_review" } : app
      )
    )
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: "under_review" } : null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 bg-yellow-500/10"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "under_review":
        return <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/10"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>
      case "approved":
        return <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="text-red-500 border-red-500/50 bg-red-500/10"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return null
    }
  }

  const pendingCount = applications.filter(a => a.status === "pending").length
  const underReviewCount = applications.filter(a => a.status === "under_review").length
  const approvedTodayCount = applications.filter(a => a.status === "approved").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Creator Applications</h1>
          <p className="text-muted-foreground">Review and process new creator applications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-500">{pendingCount} Pending</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <Eye className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">{underReviewCount} In Review</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold text-blue-500">{underReviewCount}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-green-500">{approvedTodayCount}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-purple-500">{applications.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500/50" />
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
            Pending
          </Button>
          <Button
            variant={filterStatus === "under_review" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("under_review")}
          >
            Under Review
          </Button>
        </div>
      </div>

      {/* Main Content - Applications List + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No applications found matching your criteria.</p>
            </Card>
          ) : (
            filteredApplications.map((app) => (
              <Card
                key={app.id}
                className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${
                  selectedApplication?.id === app.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => setSelectedApplication(app)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14 border-2 border-border">
                      <AvatarImage src={app.avatar} alt={app.name} />
                      <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{app.name}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{app.email}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{app.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {app.followers} followers
                        </span>
                        <span className="text-xs text-muted-foreground">Applied {app.appliedAt}</span>
                      </div>
                      {/* Platform Links Preview */}
                      <div className="flex items-center gap-2 mt-3">
                        {Object.entries(app.platforms).map(([platform, data]) => (
                          <a
                            key={platform}
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded-md transition-colors ${platformColors[platform]}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {platformIcons[platform]}
                          </a>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedApplication ? (
            <Card className="sticky top-6 border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Application Details</CardTitle>
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/30">
                    <AvatarImage src={selectedApplication.avatar} alt={selectedApplication.name} />
                    <AvatarFallback>{selectedApplication.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{selectedApplication.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                    <Badge variant="secondary" className="mt-1">{selectedApplication.category}</Badge>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">About</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedApplication.bio}</p>
                </div>

                {/* Platform Verification */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Platform Verification</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedApplication.platforms).map(([platform, data]) => (
                      <a
                        key={platform}
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-md ${platformColors[platform]} border-border/50`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-white/10">
                            {platformIcons[platform]}
                          </div>
                          <div>
                            <p className="font-medium text-sm capitalize">{platform}</p>
                            <p className="text-xs text-muted-foreground">{data.followers} followers</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {data.verified && (
                            <Badge variant="outline" className="text-green-500 border-green-500/50 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                            </Badge>
                          )}
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Click to open platform profiles and verify authenticity
                  </p>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Verified Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.documents.map((doc) => (
                      <Badge key={doc} variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {doc.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selectedApplication.status !== "approved" && selectedApplication.status !== "rejected" && (
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium text-foreground">Actions</h4>
                    {selectedApplication.status === "pending" && (
                      <Button
                        variant="outline"
                        className="w-full text-blue-500 border-blue-500/50 hover:bg-blue-500/10"
                        onClick={() => handleMarkUnderReview(selectedApplication.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" /> Mark as Under Review
                      </Button>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(selectedApplication.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-500 border-red-500/50 hover:bg-red-500/10"
                        onClick={() => handleReject(selectedApplication.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Approved creators will appear in the Approved section for rating assignment
                    </p>
                  </div>
                )}

                {selectedApplication.status === "approved" && (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-500">Application Approved</p>
                    <p className="text-xs text-muted-foreground mt-1">Awaiting rating assignment</p>
                  </div>
                )}

                {selectedApplication.status === "rejected" && (
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30 text-center">
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-500">Application Rejected</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-6 p-8 text-center border-dashed">
              <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Select an application to view details</p>
              <p className="text-xs text-muted-foreground mt-2">Click on any application card to see full details and verification options</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
