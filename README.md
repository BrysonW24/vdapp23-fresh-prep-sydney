# Fresh Prep Sydney

Meal prep delivery platform for Sydney — built with Next.js 15, React 19, and Stripe.

## Overview

Fresh Prep Sydney is a full-stack e-commerce app for ordering weekly meal prep deliveries. Includes a customer-facing shop, admin dashboard, blog CMS, and Stripe checkout.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **State:** Zustand 5 + TanStack React Query
- **Database:** Prisma ORM
- **Payments:** Stripe
- **Auth:** NextAuth.js v5
- **Email:** Resend
- **i18n:** next-intl (English + Korean)
- **Monitoring:** Sentry

## Features

- Meal catalog with filtering, macros, and reviews
- Shopping cart + Stripe checkout with payment intents
- Subscription plans
- Delivery zone validation
- Macro calculator
- Blog CMS (admin)
- Order management (admin)
- Mobile-ready with Capacitor

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── (shop)/          # Customer-facing pages
│   ├── (admin)/         # Admin dashboard
│   ├── (auth)/          # Login, signup, forgot password
│   └── api/             # API routes
├── components/
│   ├── shop/            # E-commerce components
│   ├── layout/          # Header, footer, nav
│   └── ui/              # Shared UI primitives
├── hooks/               # Custom hooks
├── lib/                 # API client, Stripe, Prisma, validators
└── i18n/                # Translations
```

## License

Private — Vivacity Digital
