"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers } from "@/lib/mock-data"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, CheckCircle2, Clock, XCircle, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = {
    total: mockInfluencers.length,
    verified: mockInfluencers.filter((i) => i.status === "approved").length,
    pending: mockInfluencers.filter((i) => i.status === "pending").length,
    rejected: mockInfluencers.filter((i) => i.status === "rejected").length,
    avgRating: mockInfluencers.reduce((acc, i) => acc + i.credibilityRating, 0) / mockInfluencers.length,
  }

  const statusData = [
    { name: "Approved", value: stats.verified, color: "#10b981" },
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
  ]

  const ratingDistribution = [
    { range: "90-100", count: mockInfluencers.filter((i) => i.credibilityRating >= 90).length },
    {
      range: "80-89",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 80 && i.credibilityRating < 90).length,
    },
    {
      range: "70-79",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 70 && i.credibilityRating < 80).length,
    },
    {
      range: "60-69",
      count: mockInfluencers.filter((i) => i.credibilityRating >= 60 && i.credibilityRating < 70).length,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Welcome */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform analytics and influencer management</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {[
                {
                  label: "Total Influencers",
                  value: stats.total,
                  icon: Users,
                  color: "text-blue-500",
                },
                {
                  label: "Verified",
                  value: stats.verified,
                  icon: CheckCircle2,
                  color: "text-green-500",
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  icon: Clock,
                  color: "text-yellow-500",
                },
                {
                  label: "Rejected",
                  value: stats.rejected,
                  icon: XCircle,
                  color: "text-red-500",
                },
                {
                  label: "Avg Rating",
                  value: stats.avgRating.toFixed(1),
                  icon: TrendingUp,
                  color: "text-purple-500",
                },
              ].map((kpi) => {
                const Icon = kpi.icon
                return (
                  <Card key={kpi.label} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      <Icon className={`w-4 h-4 ${kpi.color}`} />
                    </div>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </Card>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Status Distribution */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Verification Status Distribution</h2>
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

            {/* Recent Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Pending Verification Queue</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-center py-3 px-4 font-semibold">Rating</th>
                      <th className="text-center py-3 px-4 font-semibold">Followers</th>
                      <th className="text-center py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInfluencers.slice(0, 5).map((influencer) => (
                      <tr key={influencer.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="py-3 px-4 font-medium">{influencer.name}</td>
                        <td className="py-3 px-4">{influencer.category}</td>
                        <td className="text-center py-3 px-4">
                          <Badge className="text-xs">{influencer.credibilityRating}</Badge>
                        </td>
                        <td className="text-center py-3 px-4">{(influencer.followers / 1000).toFixed(0)}K</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
