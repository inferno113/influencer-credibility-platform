export type UserRole = "public" | "brand" | "influencer" | "admin"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

export interface Influencer {
  id: string
  name: string
  avatar: string
  bio: string
  category: string
  niche: string[]
  platforms: {
    youtube?: string
    instagram?: string
    tiktok?: string
    twitter?: string
    linkedin?: string
  }
  credibilityRating: number
  engagementRate: number
  growthStability: number
  contentQuality: number
  authenticity: number
  followers: number
  verified: boolean
  status: "approved" | "pending" | "rejected"
  trustTags: string[]
  joinedDate: string
  ratingHistory: RatingChange[]
}

export interface RatingChange {
  date: string
  rating: number
  change: number
}

export interface Tag {
  id: string
  label: string
  category: "trust" | "content" | "engagement" | "growth"
  description: string
}

export interface SavedInfluencer {
  userId: string
  influencerId: string
  savedDate: string
}

export interface AdminStats {
  totalInfluencers: number
  verified: number
  pending: number
  rejected: number
  averageRating: number
}
