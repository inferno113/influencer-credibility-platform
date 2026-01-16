import type { UserRole } from "./types"

export const canViewAdvancedFilters = (role: UserRole): boolean => {
  return role === "brand" || role === "admin" || role === "influencer"
}

export const canViewDetailedAnalytics = (role: UserRole): boolean => {
  return role === "influencer" || role === "admin"
}

export const canManageInfluencers = (role: UserRole): boolean => {
  return role === "admin"
}

export const canSaveInfluencers = (role: UserRole): boolean => {
  return role === "brand" || role === "influencer"
}

export const canEditProfile = (role: UserRole, isOwnProfile: boolean): boolean => {
  if (role === "influencer" && isOwnProfile) return true
  return role === "admin"
}
