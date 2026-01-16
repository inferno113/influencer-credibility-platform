"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            {/* Privacy Settings */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Privacy & Visibility</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Make profile public</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Allow brands to contact me</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-foreground">Show email on profile</span>
                </label>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Rating change alerts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Partnership inquiries</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Weekly insights report</span>
                </label>
              </div>
            </Card>

            {/* Account */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Account</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="creator@example.com"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>
          </div>
    </div>
  )
}
