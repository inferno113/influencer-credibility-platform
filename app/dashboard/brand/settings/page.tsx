"use client"

import { BrandSidebar } from "@/components/brand-sidebar"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1">
        <BrandSidebar />

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Brand Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Brand Profile</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand Name</label>
                  <input
                    type="text"
                    defaultValue="Your Brand Co."
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <input
                    type="text"
                    defaultValue="Technology & Innovation"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="contact@brand.com"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>

            {/* Preferences */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Email notifications for partnership inquiries</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Weekly creator recommendations</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-foreground">Insights and analytics reports</span>
                </label>
              </div>
            </Card>

            {/* Subscription */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Subscription</h2>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Premium Plan</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced creator discovery and unlimited comparisons
                  </p>
                  <Badge>Active</Badge>
                </div>
                <Button variant="outline">Manage Plan</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
