"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Admin Settings</h1>
              <p className="text-muted-foreground">Configure platform settings and policies</p>
            </div>

            {/* Platform Settings */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Platform Configuration</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Minimum Rating for Verification</label>
                  <input
                    type="number"
                    defaultValue="70"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Maximum Comparison Limit</label>
                  <input
                    type="number"
                    defaultValue="3"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating Update Frequency (days)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-secondary/50"
                  />
                </div>
                <Button>Save Configuration</Button>
              </div>
            </Card>

            {/* Feature Toggles */}
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-6">Feature Management</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Enable brand discovery</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Enable influencer comparisons</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-foreground">Enable public profiles</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-foreground">Enable beta features</span>
                </label>
              </div>
            </Card>

            {/* Backup & Data */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Data Management</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  Export Analytics
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  View System Logs
                </Button>
              </div>
            </Card>
          </div>
    </div>
  )
}
