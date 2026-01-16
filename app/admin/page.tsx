"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockInfluencers } from "@/lib/mock-data"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, CheckCircle2, Clock, Star, TrendingUp, FileCheck, ArrowRight, Award } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const stats = {
    total: mockInfluencers.length,
    verified: mockInfluencers.filter((i) => i.status === "approved").length,
    pending: mockInfluencers.filter((i) => i.status === "pending").length,
    awaitingRating: 5, // Mock value for creators approved but not rated
    avgRating: mockInfluencers.reduce((acc, i) => acc + i.credibilityRating, 0) / mockInfluencers.length,
  }

  const statusData = [
    { name: "Approved", value: stats.verified, color: "#10b981" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Awaiting Rating", value: stats.awaitingRating, color: "#8b5cf6" },
  ]

  const ratingDistribution = [
    { range: "4.5-5.0", count: mockInfluencers.filter((i) => i.credibilityRating >= 90).length },
    {
      range: "4.0-4.4",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 80 && i.credibilityRating < 90).length,
    },
    {
      range: "3.5-3.9",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 70 && i.credibilityRating < 80).length,
    },
    {
      range: "3.0-3.4",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 60 && i.credibilityRating < 70).length,
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage creator applications and assign ratings</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/applications">
              <Button variant="outline" className="gap-2">
                <FileCheck className="w-4 h-4" />
                Review Applications
              </Button>
            </Link>
            <Link href="/admin/assign-rating">
              <Button className="bg-gradient-to-r from-primary to-secondary gap-2">
                <Star className="w-4 h-4" />
                Assign Ratings
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              label: "Total Creators",
              value: stats.total,
              icon: Users,
              color: "text-blue-500",
              bg: "from-blue-500/10 to-blue-500/5",
            },
            {
              label: "Fully Rated",
              value: stats.verified,
              icon: CheckCircle2,
              color: "text-green-500",
              bg: "from-green-500/10 to-green-500/5",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "text-yellow-500",
              bg: "from-yellow-500/10 to-yellow-500/5",
            },
            {
              label: "Awaiting Rating",
              value: stats.awaitingRating,
              icon: Star,
              color: "text-purple-500",
              bg: "from-purple-500/10 to-purple-500/5",
            },
            {
              label: "Avg Rating",
              value: (stats.avgRating / 20).toFixed(1),
              icon: TrendingUp,
              color: "text-orange-500",
              bg: "from-orange-500/10 to-orange-500/5",
            },
          ].map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label} className={`bg-gradient-to-br ${kpi.bg} border-${kpi.color.split('-')[1]}-500/20`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/applications" className="block">
            <Card className="p-5 hover:shadow-lg transition-all hover:border-yellow-500/50 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-500/10">
                    <FileCheck className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-semibold">New Applications</p>
                    <p className="text-sm text-muted-foreground">{stats.pending} pending review</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
              </div>
            </Card>
          </Link>
          <Link href="/admin/approved" className="block">
            <Card className="p-5 hover:shadow-lg transition-all hover:border-purple-500/50 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Award className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Approved Creators</p>
                    <p className="text-sm text-muted-foreground">{stats.awaitingRating} awaiting rating</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              </div>
            </Card>
          </Link>
          <Link href="/admin/assign-rating" className="block">
            <Card className="p-5 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Assign Ratings</p>
                    <p className="text-sm text-muted-foreground">Rate creator profiles</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Creator Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Rating Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Rating Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="range" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest creator applications pending review</CardDescription>
              </div>
              <Link href="/admin/applications">
                <Button variant="outline" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-center py-3 px-4 font-semibold">Followers</th>
                    <th className="text-center py-3 px-4 font-semibold">Rating</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                    <th className="text-center py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInfluencers.slice(0, 5).map((influencer) => (
                    <tr key={influencer.id} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">{influencer.name}</td>
                      <td className="py-3 px-4">{influencer.category}</td>
                      <td className="text-center py-3 px-4">{(influencer.followers / 1000).toFixed(0)}K</td>
                      <td className="text-center py-3 px-4">
                        {influencer.status === "approved" ? (
                          <Badge className="bg-primary/20 text-primary">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {(influencer.credibilityRating / 20).toFixed(1)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">Not rated</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge
                          className={
                            influencer.status === "approved"
                              ? "bg-green-500/20 text-green-700 dark:text-green-300"
                              : influencer.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                                : "bg-purple-500/20 text-purple-700 dark:text-purple-300"
                          }
                        >
                          {influencer.status === "approved" ? "Rated" : influencer.status === "pending" ? "Pending" : "Awaiting Rating"}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Link href={influencer.status === "pending" ? "/admin/applications" : "/admin/assign-rating"}>
                          <Button variant="ghost" size="sm" className="text-primary">
                            {influencer.status === "pending" ? "Review" : "Rate"} <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
