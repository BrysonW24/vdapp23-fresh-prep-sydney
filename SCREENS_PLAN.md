# Next.js 15 Web Boilerplate - Comprehensive Screen Plan

## Overview
Production-ready Next.js 15 boilerplate with 28 screens following developer-first philosophy, SSR/SSG capabilities, and optional Capacitor mobile deployment.

## Target: 28 Screens Total

### 🔐 AUTHENTICATION (6 screens)
```
src/app/(auth)/
├── login/page.tsx                    # Email/password login with SSO options
├── signup/page.tsx                   # User registration with validation
├── forgot-password/page.tsx          # Password reset request
├── reset-password/page.tsx           # New password entry (with token)
├── verify-email/page.tsx             # Email verification flow
└── two-factor/page.tsx               # 2FA setup and verification
```

### 🏠 CORE APP (5 screens)
```
src/app/(app)/
├── dashboard/page.tsx                # Main dashboard with widgets
├── profile/page.tsx                  # User profile view
├── profile/edit/page.tsx             # Edit user information
├── settings/page.tsx                 # App settings & preferences
└── notifications/page.tsx            # Notification center
```

### 📄 INFO & LEGAL (6 screens)
```
src/app/(public)/
├── about/page.tsx                    # About the app/company
├── contact/page.tsx                  # Contact form
├── help/page.tsx                     # Help center & FAQ
├── privacy/page.tsx                  # Privacy policy
├── terms/page.tsx                    # Terms of service
└── pricing/page.tsx                  # Pricing plans (if applicable)
```

### ⚠️ SYSTEM STATES (4 screens)
```
src/app/
├── error.tsx                         # Global error boundary
├── not-found.tsx                     # 404 Not Found
├── maintenance/page.tsx              # Maintenance mode
└── offline/page.tsx                  # Offline state (PWA)
```

### 🛠️ DEVELOPER TOOLS (3 screens) ✨ NEW
```
src/app/(dev)/
├── components/page.tsx               # Component showcase library
├── dev-menu/page.tsx                 # Developer menu & feature flags
└── debug/page.tsx                    # Debug console (logs/network/performance)
```

### 🎨 DEMO & EXAMPLES (4 screens)
```
src/app/(examples)/
├── forms/page.tsx                    # Form patterns & validation examples
├── data-table/page.tsx               # Server-side table with sorting/filtering
├── charts/page.tsx                   # Chart examples (if using charts lib)
└── file-upload/page.tsx              # File upload patterns
```

---

## Technology Stack

### Core Framework
- **Next.js 15** with App Router, Server Components, Server Actions
- **React 19** with latest features
- **TypeScript 5.7** with strict mode

### UI & Styling
- **Tailwind CSS 3.4** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Radix UI** primitives for headless components
- **Lucide React** for icons
- **next-themes** for dark mode

### State Management
- **Zustand** for client state (lightweight, simple)
- **TanStack Query (React Query)** for server state
- **React Hook Form** with Zod validation

### Authentication
- **NextAuth.js v5** (Auth.js) for authentication
- Support for credentials, OAuth providers
- JWT + database sessions

### Data Fetching
- **Server Components** for initial data (SSR/SSG)
- **TanStack Query** for client-side data
- **Axios** for HTTP client with interceptors

### Developer Experience
- **Prettier** for code formatting
- **ESLint** for linting
- **TypeScript** for type safety
- **Playwright** for E2E testing
- **Jest** + React Testing Library for unit tests

### Performance & SEO
- **Next.js Image** optimization
- **Metadata API** for SEO
- **Sitemap** generation
- **OG Image** generation

---

## Screen Details

### 🔐 Authentication Screens

#### `/login` - Login Page
- Email/password form with validation
- Social login buttons (Google, GitHub, etc.)
- "Remember me" checkbox
- Link to signup and forgot password
- **SSG** for fast load, client-side submission

#### `/signup` - Signup Page
- Registration form with validation (email, password, confirm password)
- Terms acceptance checkbox
- Social signup options
- Email verification notice
- **SSG** for fast load

#### `/forgot-password` - Forgot Password
- Email input for password reset
- Success message with instructions
- Link back to login
- **SSG**

#### `/reset-password` - Reset Password
- New password input (with token validation)
- Password strength meter
- Success/error states
- **SSR** to validate token

#### `/verify-email` - Email Verification
- Success/error state based on token
- Resend verification link option
- **SSR** to verify token

#### `/two-factor` - Two-Factor Authentication
- QR code for authenticator app
- Backup codes display
- Verification input
- **SSR** for security

---

### 🏠 Core App Screens

#### `/dashboard` - Main Dashboard
- Welcome message with user info
- Quick stats/metrics cards
- Recent activity feed
- Quick action buttons
- **SSR** with data fetching

#### `/profile` - Profile Page
- Avatar display
- User information (name, email, bio)
- Join date, stats
- Edit profile button
- **SSR** for SEO

#### `/profile/edit` - Edit Profile
- Form with avatar upload
- Name, bio, social links inputs
- Save/cancel buttons
- **SSR** with form actions

#### `/settings` - Settings Page
- Tabbed interface (Account, Privacy, Notifications, Appearance)
- Theme toggle (light/dark/system)
- Language selector
- Delete account option
- **SSR**

#### `/notifications` - Notifications
- List of notifications (read/unread)
- Mark as read functionality
- Filter by type
- Clear all option
- **SSR** with real-time updates option

---

### 📄 Info & Legal Screens

#### `/about` - About Page
- Company/app information
- Mission statement
- Team section (optional)
- Contact CTA
- **SSG** for performance

#### `/contact` - Contact Page
- Contact form (name, email, message)
- Alternative contact methods
- FAQ link
- **SSG**

#### `/help` - Help Center
- Searchable FAQ
- Category navigation
- Common issues
- Contact support CTA
- **SSG**

#### `/privacy` - Privacy Policy
- Full privacy policy text
- Last updated date
- Table of contents
- **SSG**

#### `/terms` - Terms of Service
- Full terms text
- Last updated date
- Acceptance notice
- **SSG**

#### `/pricing` - Pricing Page
- Pricing tiers cards
- Feature comparison table
- FAQ section
- CTA buttons
- **SSG**

---

### ⚠️ System State Screens

#### `/error.tsx` - Error Boundary
- Generic error display
- Error details (dev mode only)
- Reset button
- Link to home

#### `/not-found.tsx` - 404 Page
- Friendly 404 message
- Search bar
- Popular pages links
- Home link
- **SSG**

#### `/maintenance` - Maintenance Mode
- Maintenance notice
- Expected return time
- Contact information
- **SSG**

#### `/offline` - Offline Page
- Offline detection
- Cached content notice
- Retry button
- **For PWA apps**

---

### 🛠️ Developer Tools (NEW)

#### `/components` - Component Showcase
**6-tab interface showcasing all UI components:**

**Tab 1: Buttons**
- Primary, Secondary, Outline, Ghost, Link variants
- With icons, loading states, disabled states
- Sizes: xs, sm, md, lg, xl

**Tab 2: Forms**
- Input fields (text, email, password, number, textarea)
- Select dropdowns
- Checkboxes, Radio groups, Switches
- Date pickers
- File upload
- Validation examples

**Tab 3: Cards & Containers**
- Basic cards
- Cards with images
- Cards with actions
- Accordion
- Tabs
- Dialog/Modal

**Tab 4: Data Display**
- Tables (basic, sortable, filterable)
- Lists (simple, with icons, with actions)
- Badges, Chips
- Avatars
- Progress bars

**Tab 5: Feedback**
- Alerts (success, error, warning, info)
- Toasts/Notifications
- Loading spinners
- Skeleton loaders
- Empty states

**Tab 6: Navigation**
- Breadcrumbs
- Pagination
- Dropdown menus
- Command palette
- Sidebar navigation

#### `/dev-menu` - Developer Menu
**Feature Flags Section:**
- Toggle 8 feature flags (New UI, Analytics, Debug Logging, etc.)
- Persisted to localStorage

**Environment Switching:**
- Development / Staging / Production
- API URL display
- Environment indicator badge

**Quick Actions:**
- Navigate to Component Showcase
- Navigate to Debug Console
- Clear all localStorage
- Clear all cookies
- Reset application state
- Force error (for testing error boundaries)

**Build Information:**
- Next.js version
- React version
- Node version
- Build timestamp
- Git commit hash (if available)

#### `/debug` - Debug Console
**3-tab debug interface:**

**Tab 1: Logs**
- Filterable log entries (All/Debug/Info/Warning/Error)
- Color-coded by level
- Timestamps (relative)
- Click to expand full details
- Copy to clipboard
- Clear logs button
- Export logs (JSON)

**Tab 2: Network**
- HTTP request log
- Method badges (GET, POST, PUT, DELETE)
- Status codes (color-coded)
- Response times
- Request/response preview
- Retry failed requests

**Tab 3: Performance**
- Page load metrics (FCP, LCP, CLS, FID, TTFB)
- React render profiler
- Bundle size analysis
- Memory usage
- Network speed indicator

**Tab 4: System**
- Browser info (name, version)
- OS info
- Screen resolution
- Viewport size
- Device pixel ratio
- Network type (WiFi/4G/5G)
- Copy all info button

---

### 🎨 Demo & Examples Screens

#### `/forms` - Form Patterns
- All input types demonstration
- Complex multi-step form
- Form with dynamic fields
- File upload form
- Validation patterns (Zod schemas)
- **SSG**

#### `/data-table` - Data Table Examples
- Server-side pagination
- Sorting (client and server)
- Filtering
- Row selection
- Bulk actions
- Export to CSV
- **SSR** with server actions

#### `/charts` - Chart Examples
- Line charts
- Bar charts
- Pie charts
- Area charts
- Interactive tooltips
- **SSR** with sample data

#### `/file-upload` - File Upload Patterns
- Single file upload
- Multiple file upload
- Drag-and-drop zone
- Image preview
- Progress indicator
- **SSR**

---

## Routing Structure

```
src/app/
├── (public)/              # Public routes (no auth required)
│   ├── about/
│   ├── contact/
│   ├── help/
│   ├── privacy/
│   ├── terms/
│   └── pricing/
│
├── (auth)/                # Authentication routes
│   ├── login/
│   ├── signup/
│   ├── forgot-password/
│   ├── reset-password/
│   ├── verify-email/
│   └── two-factor/
│
├── (app)/                 # Protected app routes
│   ├── dashboard/
│   ├── profile/
│   ├── settings/
│   └── notifications/
│
├── (dev)/                 # Developer tools (dev only)
│   ├── components/
│   ├── dev-menu/
│   └── debug/
│
├── (examples)/            # Example/demo screens
│   ├── forms/
│   ├── data-table/
│   ├── charts/
│   └── file-upload/
│
├── api/                   # API routes
│   ├── auth/
│   │   └── [...nextauth]/
│   ├── users/
│   └── ...
│
├── layout.tsx             # Root layout
├── page.tsx               # Home page
├── error.tsx              # Error boundary
├── not-found.tsx          # 404 page
├── maintenance/
└── offline/
```

---

## Component Library (shadcn/ui)

### Components to Install
```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add alert
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add toast
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add select
npx shadcn@latest add switch
npx shadcn@latest add slider
npx shadcn@latest add progress
npx shadcn@latest add separator
npx shadcn@latest add table
npx shadcn@latest add accordion
npx shadcn@latest add breadcrumb
npx shadcn@latest add pagination
npx shadcn@latest add skeleton
```

---

## Implementation Priority

### Phase 1: Foundation (Complete First)
1. ✅ Upgrade to Next.js 15
2. ✅ Install shadcn/ui and components
3. ✅ Setup layouts and route groups
4. ✅ Configure NextAuth v5

### Phase 2: Core Screens
1. Authentication screens (6 screens)
2. Core app screens (5 screens)
3. System states (4 screens)

### Phase 3: Content & Legal
1. Info/legal screens (6 screens)

### Phase 4: Developer Tools ✨
1. Component Showcase (1 screen)
2. Dev Menu (1 screen)
3. Debug Console (1 screen)

### Phase 5: Examples (Optional)
1. Demo/example screens (4 screens)

---

## Key Features

### 🚀 Performance
- Server Components by default
- Image optimization
- Font optimization
- Bundle splitting
- ISR (Incremental Static Regeneration) where applicable

### 🔒 Security
- CSRF protection
- XSS prevention
- Secure headers
- Content Security Policy
- Rate limiting on API routes

### ♿ Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA labels

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI
- Progressive enhancement

### 🌍 SEO & Meta
- Metadata API for each page
- Open Graph images
- Structured data
- Sitemap generation
- Robots.txt

### 🎨 Theming
- Light/Dark mode
- System preference detection
- Theme persistence
- Custom color schemes

---

## Next Steps

1. Start with Phase 1 (Foundation)
2. Implement screens in priority order
3. Add comprehensive tests
4. Document each component
5. Create Storybook (optional)
6. Deploy to Vercel

---

**Total Screens: 28**
- Authentication: 6
- Core App: 5
- Info/Legal: 6
- System States: 4
- Developer Tools: 3 ✨
- Examples: 4

**Developer-First Philosophy:**
- Component Showcase for UI library exploration
- Dev Menu for feature flag testing
- Debug Console for development debugging
- Example screens for learning patterns
