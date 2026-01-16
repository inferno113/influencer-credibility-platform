# Creator Intelligence Platform - Authentication & User Flow

## Overview
The platform supports 4 distinct user roles with separate dashboards and feature sets:

1. **Public User** - Unauthenticated, view-only access
2. **Brand / Sponsor** - Logged-in, partnership discovery
3. **Creator / Influencer** - Logged-in, profile management
4. **Admin** - Logged-in, platform management

## Authentication Flow

### Step 1: Sign In Page (`/auth`)
Users select their role from 4 options:
- Public User (browsing only)
- Brand (partnership discovery)
- Creator (profile management)
- Admin (platform control)

Each role shows specific features available to that user type.

### Step 2: Login Form
- Enter any email and password (mock auth)
- System creates session and stores in sessionStorage
- User is redirected to role-specific dashboard

### Step 3: Role-Based Routing
After login, users are automatically routed to:
- **Public Users** → `/explore` (public pages)
- **Brands** → `/dashboard/brand`
- **Creators** → `/dashboard/influencer`
- **Admins** → `/admin`

## Key Components

### AuthProvider (`components/auth-provider.tsx`)
Global context for authentication state:
- `user` - Current logged-in user object
- `loading` - Auth state loading flag
- `isAuthenticated` - Boolean check
- `login(email, password, role)` - Login function
- `logout()` - Logout function

### useAuth Hook
Use anywhere in the app with:
```tsx
const { user, isAuthenticated, logout } = useAuth()
```

### RoleGuard Component (`components/role-guard.tsx`)
Protects dashboard pages:
```tsx
<RoleGuard allowedRoles={["brand", "admin"]}>
  {children}
</RoleGuard>
```

## Page Access

### Public Pages (No Login Required)
- `/` - Home page
- `/explore` - Creator directory with filters
- `/profile/[id]` - Public creator profile

### Brand Dashboard (Login Required)
- `/dashboard/brand` - Brand home with KPIs
- `/dashboard/brand/explore` - Advanced discovery
- `/dashboard/brand/saved` - Saved creators
- `/dashboard/brand/settings` - Brand settings

### Creator Dashboard (Login Required)
- `/dashboard/influencer` - Influencer home with analytics
- `/dashboard/influencer/profile` - Edit profile
- `/dashboard/influencer/network` - Creator network
- `/dashboard/influencer/insights` - Performance analytics
- `/dashboard/influencer/settings` - Creator settings

### Admin Panel (Admin Only)
- `/admin` - Admin dashboard
- `/admin/influencers` - Manage influencers
- `/admin/rating-system` - Control rating weights
- `/admin/analytics` - Platform analytics
- `/admin/moderation` - Review queue
- `/admin/settings` - Admin settings

## Session Management

Session is stored in `sessionStorage`:
- Persists across page refreshes within same browser tab
- Clears when browser tab is closed
- Can be extended to localStorage for "Remember Me"

## Sign Out

Click dropdown menu → "Sign Out" to:
- Clear session from sessionStorage
- Reset user state to null
- Redirect to home page

## Navigation Updates

Navbar automatically shows:
- Links visible to current user role
- User avatar and name when logged in
- Sign Out button instead of Sign In when authenticated
- Role indicator in user dropdown
