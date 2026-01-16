"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Megaphone, Plus, Calendar, MapPin, Users, DollarSign, 
  Edit, Trash2, Eye, Clock, CheckCircle2, XCircle, AlertCircle
} from "lucide-react"

// Mock brand's promoted events/deals
const myPromotions = [
  {
    id: "bp1",
    title: "Spring Tech Product Launch",
    type: "Product Launch",
    status: "active",
    date: "Feb 20, 2026",
    location: "San Francisco, CA + Virtual",
    description: "Looking for tech creators to cover our latest AI-powered smart home device launch. Seeking authentic reviews and unboxing content.",
    budget: "$5,000 - $15,000",
    creatorsNeeded: 10,
    creatorsApplied: 24,
    creatorsAccepted: 3,
    requirements: ["Tech niche", "10K+ followers", "Previous product review experience"],
    perks: ["Free product", "Exclusive access", "Commission on sales"],
    views: 1250,
    createdAt: "Jan 10, 2026",
  },
  {
    id: "bp2",
    title: "Summer Fashion Campaign",
    type: "Brand Campaign",
    status: "active",
    date: "Mar 1 - Mar 31, 2026",
    location: "Remote",
    description: "Multi-platform campaign for our spring/summer collection. Looking for fashion and lifestyle creators for Instagram, TikTok, and YouTube content.",
    budget: "$2,000 - $8,000",
    creatorsNeeded: 25,
    creatorsApplied: 67,
    creatorsAccepted: 12,
    requirements: ["Fashion/Lifestyle niche", "5K+ followers", "Strong aesthetic"],
    perks: ["Full collection access", "Affiliate commission", "Feature on brand page"],
    views: 3420,
    createdAt: "Jan 5, 2026",
  },
  {
    id: "bp3",
    title: "Wellness Summit 2026",
    type: "Event Sponsorship",
    status: "draft",
    date: "Apr 10-12, 2026",
    location: "Miami, FL",
    description: "Annual health and wellness summit. Inviting wellness, fitness, and nutrition creators for event coverage and content creation.",
    budget: "$3,000 - $10,000",
    creatorsNeeded: 15,
    creatorsApplied: 0,
    creatorsAccepted: 0,
    requirements: ["Wellness/Fitness niche", "Engaged audience", "Professional content"],
    perks: ["All-expense-paid trip", "VIP access", "Networking opportunities"],
    views: 0,
    createdAt: "Jan 15, 2026",
  },
  {
    id: "bp4",
    title: "Holiday Gift Guide Collab",
    type: "Affiliate Campaign",
    status: "completed",
    date: "Dec 1-25, 2025",
    location: "Remote",
    description: "Holiday gift guide campaign featuring our top products. Completed successfully with great ROI.",
    budget: "$1,500 - $5,000",
    creatorsNeeded: 20,
    creatorsApplied: 45,
    creatorsAccepted: 20,
    requirements: ["Lifestyle niche", "Holiday content experience"],
    perks: ["Products for giveaways", "Bonus for top performers"],
    views: 8900,
    createdAt: "Nov 15, 2025",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30", icon: CheckCircle2 },
  draft: { label: "Draft", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30", icon: CheckCircle2 },
  paused: { label: "Paused", color: "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30", icon: XCircle },
}

export default function BrandPromotePage() {
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "completed">("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredPromotions = myPromotions.filter((promo) => {
    if (filter === "all") return true
    return promo.status === filter
  })

  const stats = {
    active: myPromotions.filter(p => p.status === "active").length,
    totalApplicants: myPromotions.reduce((acc, p) => acc + p.creatorsApplied, 0),
    totalViews: myPromotions.reduce((acc, p) => acc + p.views, 0),
    totalAccepted: myPromotions.reduce((acc, p) => acc + p.creatorsAccepted, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Megaphone className="w-6 h-6 text-secondary" />
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">Brand Deals</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">Promote Your Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage brand deals, campaigns, and event sponsorships to attract top creators.
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus className="w-4 h-4" /> Create New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
          <p className="text-3xl font-bold text-primary">{stats.active}</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Total Applicants</p>
          <p className="text-3xl font-bold text-secondary">{stats.totalApplicants}</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Campaign Views</p>
          <p className="text-3xl font-bold text-accent">{stats.totalViews.toLocaleString()}</p>
        </Card>
        <Card className="p-4 border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Creators Partnered</p>
          <p className="text-3xl font-bold text-green-500">{stats.totalAccepted}</p>
        </Card>
      </div>

      {/* Create Form (Simplified) */}
      {showCreateForm && (
        <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader className="p-0 mb-6">
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Fill in the details to attract the right creators</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Title</label>
                <Input placeholder="e.g., Summer Product Launch" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Type</label>
                <Input placeholder="e.g., Product Launch, Brand Campaign" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date/Duration</label>
                <Input placeholder="e.g., Mar 1-15, 2026" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="e.g., Remote, New York, NY" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Range</label>
                <Input placeholder="e.g., $2,000 - $5,000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Creators Needed</label>
                <Input type="number" placeholder="e.g., 10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                placeholder="Describe your campaign, what you're looking for, and what creators will do..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <CheckCircle2 className="w-4 h-4" /> Publish Campaign
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
            {status === "all" ? "All Campaigns" : status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== "all" && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {myPromotions.filter(p => p.status === status).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredPromotions.map((promo) => {
          const statusInfo = statusConfig[promo.status as keyof typeof statusConfig]
          const StatusIcon = statusInfo.icon

          return (
            <Card key={promo.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
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
                        <DollarSign className="w-3 h-3" />
                        {promo.budget}
                      </span>
                    </CardDescription>
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
                
                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 py-3 px-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{promo.views.toLocaleString()}</strong> views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>{promo.creatorsApplied}</strong> applied / <strong>{promo.creatorsNeeded}</strong> needed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      <strong>{promo.creatorsAccepted}</strong> accepted
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Created {promo.createdAt}
                    </span>
                  </div>
                </div>

                {/* Requirements & Perks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Requirements</p>
                    <div className="flex flex-wrap gap-1">
                      {promo.requirements.map((req) => (
                        <Badge key={req} variant="outline" className="text-xs">{req}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Perks for Creators</p>
                    <div className="flex flex-wrap gap-1">
                      {promo.perks.map((perk) => (
                        <Badge key={perk} variant="secondary" className="text-xs">{perk}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {promo.status === "active" && (
                    <>
                      <Button size="sm" className="gap-2">
                        <Users className="w-4 h-4" /> View Applicants ({promo.creatorsApplied})
                      </Button>
                      <Button size="sm" variant="outline">Pause Campaign</Button>
                    </>
                  )}
                  {promo.status === "draft" && (
                    <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Megaphone className="w-4 h-4" /> Publish Campaign
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
          <Megaphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === "all" 
              ? "Create your first campaign to start attracting creators."
              : `No ${filter} campaigns at the moment.`}
          </p>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </Button>
        </Card>
      )}
    </div>
  )
}
