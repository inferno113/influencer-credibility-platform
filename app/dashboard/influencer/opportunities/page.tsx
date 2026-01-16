"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, Calendar, MapPin, DollarSign, Building2, 
  ExternalLink, Filter, Star, Clock, CheckCircle2, Users, Gift
} from "lucide-react"

// Mock brand opportunities for creators
const brandOpportunities = [
  {
    id: "bo1",
    title: "Spring Tech Product Launch",
    brand: "InnovateTech",
    brandLogo: "IT",
    type: "Product Review",
    status: "open",
    date: "Feb 20, 2026",
    location: "San Francisco, CA + Virtual",
    description: "Looking for tech creators to cover our latest AI-powered smart home device launch. Seeking authentic reviews and unboxing content.",
    compensation: "$5,000 - $15,000",
    creatorsNeeded: 10,
    creatorsApplied: 24,
    requirements: ["Tech niche", "10K+ followers", "Previous product review experience"],
    perks: ["Free product ($499 value)", "Exclusive early access", "Commission on sales"],
    deadline: "Feb 10, 2026",
    matchScore: 95,
  },
  {
    id: "bo2",
    title: "Summer Fashion Campaign",
    brand: "StyleHouse",
    brandLogo: "SH",
    type: "Brand Ambassador",
    status: "open",
    date: "Mar 1 - Mar 31, 2026",
    location: "Remote",
    description: "Multi-platform campaign for our spring/summer collection. Looking for fashion and lifestyle creators for Instagram, TikTok, and YouTube content.",
    compensation: "$2,000 - $8,000",
    creatorsNeeded: 25,
    creatorsApplied: 67,
    requirements: ["Fashion/Lifestyle niche", "5K+ followers", "Strong aesthetic"],
    perks: ["Full collection access", "Affiliate commission", "Feature on brand page"],
    deadline: "Feb 15, 2026",
    matchScore: 78,
  },
  {
    id: "bo3",
    title: "Wellness Summit 2026",
    brand: "VitalLife",
    brandLogo: "VL",
    type: "Event Coverage",
    status: "open",
    date: "Apr 10-12, 2026",
    location: "Miami, FL",
    description: "Annual health and wellness summit. Inviting wellness, fitness, and nutrition creators for event coverage and content creation.",
    compensation: "$3,000 - $10,000",
    creatorsNeeded: 15,
    creatorsApplied: 18,
    requirements: ["Wellness/Fitness niche", "Engaged audience", "Professional content"],
    perks: ["All-expense-paid trip", "VIP access", "Networking opportunities"],
    deadline: "Mar 1, 2026",
    matchScore: 88,
  },
  {
    id: "bo4",
    title: "Gaming Gear Review Series",
    brand: "ProGamer",
    brandLogo: "PG",
    type: "Product Review",
    status: "open",
    date: "Ongoing",
    location: "Remote",
    description: "Long-term partnership opportunity for gaming creators. Review our latest gaming peripherals and gear with creative freedom.",
    compensation: "$1,500 - $4,000 per video",
    creatorsNeeded: 8,
    creatorsApplied: 42,
    requirements: ["Gaming niche", "Active streaming", "Technical knowledge"],
    perks: ["Keep all products", "Early access to new releases", "Exclusive discount codes"],
    deadline: "Rolling basis",
    matchScore: 72,
  },
  {
    id: "bo5",
    title: "Sustainable Living Campaign",
    brand: "EcoFirst",
    brandLogo: "EF",
    type: "Sponsored Content",
    status: "open",
    date: "Feb 15 - Mar 15, 2026",
    location: "Remote",
    description: "Partner with us to promote sustainable living practices and eco-friendly products. Looking for creators passionate about sustainability.",
    compensation: "$2,500 - $6,000",
    creatorsNeeded: 20,
    creatorsApplied: 31,
    requirements: ["Lifestyle/Sustainability niche", "Authentic voice", "Aligned values"],
    perks: ["Product bundle ($300 value)", "Donation to chosen charity", "Long-term partnership potential"],
    deadline: "Feb 5, 2026",
    matchScore: 65,
  },
  {
    id: "bo6",
    title: "Cooking Show Sponsorship",
    brand: "KitchenPro",
    brandLogo: "KP",
    type: "Series Sponsorship",
    status: "urgent",
    date: "Feb 1-28, 2026",
    location: "Remote",
    description: "Seeking food creators for a month-long cooking series featuring our premium kitchen appliances. High visibility opportunity.",
    compensation: "$8,000 - $20,000",
    creatorsNeeded: 5,
    creatorsApplied: 15,
    requirements: ["Food/Cooking niche", "50K+ followers", "Video production skills"],
    perks: ["Full appliance set ($2,000 value)", "Recipe book feature", "Brand ambassador status"],
    deadline: "Jan 25, 2026",
    matchScore: 91,
  },
]

const categories = ["All", "Product Review", "Brand Ambassador", "Event Coverage", "Sponsored Content", "Series Sponsorship"]

export default function CreatorOpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"match" | "compensation" | "deadline">("match")

  const filteredOpportunities = brandOpportunities
    .filter((opp) => {
      if (selectedCategory === "All") return true
      return opp.type === selectedCategory
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.matchScore - a.matchScore
      if (sortBy === "compensation") {
        const aMin = parseInt(a.compensation.replace(/[^0-9]/g, ""))
        const bMin = parseInt(b.compensation.replace(/[^0-9]/g, ""))
        return bMin - aMin
      }
      return 0
    })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <Badge className="bg-primary/10 text-primary border-primary/20">Brand Deals</Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
        <p className="text-muted-foreground">
          Discover brand campaigns, sponsorships, and collaboration opportunities tailored to your profile.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
          <p className="text-sm text-muted-foreground mb-1">Open Opportunities</p>
          <p className="text-3xl font-bold text-primary">{brandOpportunities.length}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-gradient-to-br from-green-500/5 to-transparent">
          <p className="text-sm text-muted-foreground mb-1">High Match (90%+)</p>
          <p className="text-3xl font-bold text-green-500">{brandOpportunities.filter(o => o.matchScore >= 90).length}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-gradient-to-br from-orange-500/5 to-transparent">
          <p className="text-sm text-muted-foreground mb-1">Urgent Deadlines</p>
          <p className="text-3xl font-bold text-orange-500">{brandOpportunities.filter(o => o.status === "urgent").length}</p>
        </Card>
        <Card className="p-4 border-border/50 bg-gradient-to-br from-secondary/5 to-transparent">
          <p className="text-sm text-muted-foreground mb-1">Total Potential</p>
          <p className="text-3xl font-bold text-secondary">$50K+</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter & Sort</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Campaign Type</p>
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
            <p className="text-xs text-muted-foreground mb-2">Sort By</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={sortBy === "match" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("match")}
                className="gap-1"
              >
                <Star className="w-3 h-3" /> Best Match
              </Button>
              <Button
                variant={sortBy === "compensation" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("compensation")}
                className="gap-1"
              >
                <DollarSign className="w-3 h-3" /> Highest Pay
              </Button>
              <Button
                variant={sortBy === "deadline" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("deadline")}
                className="gap-1"
              >
                <Clock className="w-3 h-3" /> Deadline
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{filteredOpportunities.length} opportunities found</p>
        
        {filteredOpportunities.map((opp) => (
          <Card 
            key={opp.id} 
            className={`overflow-hidden transition-all hover:shadow-lg border-border/50 ${
              opp.status === "urgent" ? "border-l-4 border-l-orange-500" : ""
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center font-bold text-secondary">
                    {opp.brandLogo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <CardTitle className="text-xl">{opp.title}</CardTitle>
                      {opp.status === "urgent" && (
                        <Badge className="bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30 text-xs">
                          Urgent
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">{opp.type}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {opp.brand}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {opp.creatorsApplied}/{opp.creatorsNeeded} applied
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${
                    opp.matchScore >= 90 
                      ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30" 
                      : opp.matchScore >= 75
                        ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30"
                        : "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30"
                  }`}>
                    <Star className="w-3 h-3 mr-1" />
                    {opp.matchScore}% match
                  </Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {opp.compensation}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{opp.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {opp.date}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {opp.location}
                </span>
                <span className="flex items-center gap-2 text-orange-500">
                  <Clock className="w-4 h-4" />
                  Apply by {opp.deadline}
                </span>
              </div>

              {/* Requirements & Perks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 px-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Requirements</p>
                  <div className="flex flex-wrap gap-1">
                    {opp.requirements.map((req) => (
                      <Badge key={req} variant="outline" className="text-xs">{req}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <Gift className="w-3 h-3" /> Perks
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {opp.perks.map((perk) => (
                      <Badge key={perk} className="text-xs bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">
                        {perk}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <CheckCircle2 className="w-4 h-4" /> Apply Now
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" /> View Details
                </Button>
                <Button variant="ghost">Save for Later</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <Card className="p-12 text-center border-border/50">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No opportunities match your filters</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters to see more opportunities.</p>
          <Button variant="outline" onClick={() => setSelectedCategory("All")}>
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  )
}
