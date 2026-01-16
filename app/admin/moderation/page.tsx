"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ModerationPage() {
  const reports = [
    {
      id: "1",
      influencer: "Sarah Chen",
      reason: "Suspicious follower growth",
      date: "2025-01-14",
      status: "pending",
    },
    {
      id: "2",
      influencer: "Marcus Johnson",
      reason: "Undisclosed paid promotion",
      date: "2025-01-12",
      status: "investigating",
    },
    {
      id: "3",
      influencer: "Elena Vasquez",
      reason: "Verified - No issues found",
      date: "2025-01-10",
      status: "resolved",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Moderation Queue</h1>
              <p className="text-muted-foreground">Review reported content and influencer violations</p>
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Active Reports</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Influencer</th>
                      <th className="text-left py-3 px-4 font-semibold">Report Reason</th>
                      <th className="text-left py-3 px-4 font-semibold">Reported Date</th>
                      <th className="text-center py-3 px-4 font-semibold">Status</th>
                      <th className="text-center py-3 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="py-3 px-4 font-medium">{report.influencer}</td>
                        <td className="py-3 px-4">{report.reason}</td>
                        <td className="py-3 px-4">{report.date}</td>
                        <td className="text-center py-3 px-4">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              report.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                                : report.status === "investigating"
                                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                                  : "bg-green-500/20 text-green-700 dark:text-green-300"
                            }`}
                          >
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Button size="sm" variant="ghost">
                            Review
                          </Button>
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
