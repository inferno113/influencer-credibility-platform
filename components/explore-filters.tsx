"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInfluencers, mockTags } from "@/lib/mock-data"

const categories = [...new Set(mockInfluencers.map((i) => i.category))].sort()
const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn"]

interface ExploreFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  categories: string[]
  platforms: string[]
  ratingRange: [number, number]
  tags: string[]
  verified: boolean | null
}

export function ExploreFilters({ onFilterChange }: ExploreFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    platforms: [],
    ratingRange: [0, 100],
    tags: [],
    verified: null,
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <Card className="p-6 sticky top-24 h-fit">
      <h3 className="font-semibold mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.categories, cat]
                    : filters.categories.filter((c) => c !== cat)
                  updateFilters({ categories: updated })
                }}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Platforms</h4>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <label key={platform} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.platforms.includes(platform)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.platforms, platform]
                    : filters.platforms.filter((p) => p !== platform)
                  updateFilters({ platforms: updated })
                }}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">
          Rating Range: {filters.ratingRange[0]} - {filters.ratingRange[1]}
        </h4>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.ratingRange[0]}
          onChange={(e) => {
            const newMin = Math.min(Number.parseInt(e.target.value), filters.ratingRange[1])
            updateFilters({ ratingRange: [newMin, filters.ratingRange[1]] })
          }}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filters.ratingRange[1]}
          onChange={(e) => {
            const newMax = Math.max(Number.parseInt(e.target.value), filters.ratingRange[0])
            updateFilters({ ratingRange: [filters.ratingRange[0], newMax] })
          }}
          className="w-full"
        />
      </div>

      {/* Trust Tags */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Trust Tags</h4>
        <div className="flex flex-wrap gap-2">
          {mockTags.map((tag) => (
            <Badge
              key={tag.id}
              variant={filters.tags.includes(tag.label) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const updated = filters.tags.includes(tag.label)
                  ? filters.tags.filter((t) => t !== tag.label)
                  : [...filters.tags, tag.label]
                updateFilters({ tags: updated })
              }}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verified === true}
            onChange={(e) => {
              updateFilters({ verified: e.target.checked ? true : null })
            }}
            className="w-4 h-4 rounded border-border"
          />
          <span className="text-sm">Verified Only</span>
        </label>
      </div>

      {/* Reset */}
      {Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v !== null)) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const reset: FilterState = {
              categories: [],
              platforms: [],
              ratingRange: [0, 100],
              tags: [],
              verified: null,
            }
            setFilters(reset)
            onFilterChange(reset)
          }}
          className="w-full"
        >
          Reset Filters
        </Button>
      )}
    </Card>
  )
}
