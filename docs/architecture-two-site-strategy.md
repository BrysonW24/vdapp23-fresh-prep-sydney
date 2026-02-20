# Fresh Prep Sydney — Two-Site Architecture

> Why we separate the business site from the recipe blog, and how they work together.

---

## The Core Problem

A single site can't serve two masters:

- **Business site** needs to be clean, brand-focused, and convert visitors into customers
- **Recipe blog** needs to be content-heavy, SEO-optimised, and covered in display ads for passive income

Ads plastered over a business site screams amateur. A customer trying to order meal prep doesn't want to dodge sneaker ads between the menu and the order button.

**Solution: Two sites, one brand, feeding each other.**

---

## The Two Sites

### Site 1: Business Site — `freshprepsydney.com`

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Convert visitors into meal prep customers |
| **Stack** | Next.js (vdapp23) |
| **Managed by** | Bryson (dev) + Aun (content via CMS admin panel) |
| **Revenue model** | Direct sales — meal prep orders |
| **Ads** | None. Zero. Clean brand experience. |
| **Design** | Minimal, brand-focused, fast, conversion-oriented |

**What lives here:**
- Homepage with brand story and value prop
- Weekly menu / meal prep offerings
- Pricing and ordering
- About Aun / the brand story
- Testimonials and social proof
- Contact / enquiries
- Instagram feed embed

**Aun's admin capabilities (no developer needed):**
- Update weekly menus and pricing
- Add/edit testimonials
- Update photos
- Toggle items on/off
- Change announcement banners

### Site 2: Recipe Blog — `blog.freshprepsydney.com` or separate domain

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Attract organic traffic → earn ad revenue + funnel to business |
| **Stack** | Self-hosted WordPress + WP Recipe Maker |
| **Managed by** | Aun (100% independent, no developer needed) |
| **Revenue model** | Display ads (Raptive/AdThrive) + affiliate links + brand sponsorships |
| **Ads** | Yes — maximised for revenue |
| **Design** | Content-heavy, long-form, SEO-optimised |

**What lives here:**
- Full recipe posts (2,000+ words each)
- Recipe cards with structured data (JSON-LD for Google rich snippets)
- Food photography and embedded video
- Storage/reheating guides, tips, substitutions
- Display ads throughout (Raptive)
- Affiliate links for kitchen equipment and ingredients
- Cross-links to business site ("Want us to prep this for you?")

**Aun's admin capabilities (no developer needed):**
- Write and publish new recipes
- Upload photos and videos
- WP Recipe Maker handles all structured data automatically
- WordPress admin dashboard — full control

---

## How They Feed Each Other

```
Recipe Blog (WordPress)              Business Site (Next.js)
─────────────────────                ──────────────────────
Publishes 2-3 recipes/week          Clean ordering experience
Raptive ads = passive $$             Orders = active $$
SEO traffic from Google              Direct/social traffic
        │                                     │
        │    "Want us to prep this             │
        ├──── for you? Order from  ───────────►│
        │     Fresh Prep Sydney"               │
        │                                      │
        │◄──── "Check out our latest ──────────┤
        │       recipes on the blog"           │
        │                                      │
   Builds authority                    Builds trust
   Drives organic traffic              Converts to revenue
   Earns ad income                     Earns order income
```

### Cross-Linking Strategy

**Blog → Business site:**
- Every recipe post includes a CTA box: "Love this recipe but short on time? Fresh Prep Sydney delivers chef-prepared meals to your door."
- Sidebar widget with business site link
- Navigation menu includes "Order Meal Prep" linking to business site

**Business site → Blog:**
- "Recipes & Inspiration" section on homepage
- Footer link to recipe blog
- Blog posts embedded or previewed on business site
- Builds SEO authority through backlinks

---

## Solving the Developer Dependency Problem

The key question: **How does Aun update things without calling Bryson every time?**

### Blog (WordPress) — Zero developer dependency

| Task | How Aun does it |
|------|-----------------|
| Publish new recipe | WordPress admin → New Post → Write → Publish |
| Add photos | Drag and drop into media library |
| Add recipe card | WP Recipe Maker block in post editor |
| Update about page | WordPress admin → Pages → Edit |
| View traffic stats | WordPress dashboard or Raptive dashboard |
| Respond to brand enquiries | Contact form submissions go to her email |

WordPress is designed for non-technical users. Once set up, Aun never needs a developer for content.

### Business Site (Next.js) — Minimal developer dependency

| Task | How Aun does it | Developer needed? |
|------|-----------------|-------------------|
| Update weekly menu | CMS admin panel (Sanity/Payload) | No |
| Change pricing | CMS admin panel | No |
| Add testimonials | CMS admin panel | No |
| Update photos | CMS admin panel | No |
| Toggle menu items | CMS admin panel | No |
| Change site layout | Needs Bryson | Yes |
| Add new features | Needs Bryson | Yes |
| Fix bugs | Needs Bryson | Yes |

**The CMS admin panel is the key.** It gives Aun a simple interface to manage day-to-day content while Bryson retains full control over the codebase.

### Recommended CMS for Business Site

| Option | Pros | Cons |
|--------|------|------|
| **Sanity** | Beautiful editor, free tier, real-time preview | Slight learning curve |
| **Payload CMS** | Self-hosted, full control, great admin UI | More setup work |
| **Notion as CMS** | Aun probably already uses Notion | Limited, hacky integration |
| **Simple admin route** | Built into Next.js, fully custom | You build and maintain it |

**Recommendation: Sanity.** Free tier covers this use case. Great visual editor for non-technical users. Aun logs in, edits content, hits publish — changes go live instantly.

---

## Domain Strategy

### Option A: Subdomain (Recommended)

```
freshprepsydney.com          → Business site (Next.js on Vercel)
blog.freshprepsydney.com     → Recipe blog (WordPress on Cloudways)
```

**Pros:** Single brand, shared domain authority for SEO, clear relationship
**Cons:** Slightly more complex DNS setup

### Option B: Separate Domains

```
freshprepsydney.com          → Business site
freshprepsydneyrecipes.com   → Recipe blog
```

**Pros:** Completely independent, easy to sell blog separately later
**Cons:** No shared SEO authority, two domains to manage

### Option C: Subdirectory (Not recommended)

```
freshprepsydney.com          → Business site
freshprepsydney.com/blog     → Recipe blog
```

**Pros:** Best for SEO (single domain authority)
**Cons:** Technically complex to run WordPress and Next.js on same domain. Possible but messy.

**Go with Option A.** Best balance of SEO benefit and operational simplicity.

---

## Tech Stack Summary

| Component | Business Site | Recipe Blog |
|-----------|--------------|-------------|
| **Framework** | Next.js (vdapp23) | WordPress (self-hosted) |
| **Hosting** | Vercel | Cloudways (~$14/mo) |
| **CMS** | Sanity (free tier) | WordPress admin (built-in) |
| **Recipe data** | N/A | WP Recipe Maker (WPRM) |
| **SEO** | Next.js metadata API | Yoast SEO + WPRM schema |
| **Ads** | None | Raptive (once qualified) |
| **Analytics** | Google Analytics / Vercel | Google Analytics + Raptive dashboard |
| **Domain** | freshprepsydney.com | blog.freshprepsydney.com |
| **SSL** | Vercel (automatic) | Cloudways (automatic) |
| **Admin** | Sanity Studio | WordPress dashboard |

### Cost Breakdown

| Item | Monthly | Annual |
|------|---------|--------|
| Vercel (business site) | $0 (free tier) | $0 |
| Cloudways (blog hosting) | $14 | $168 |
| Domain | — | ~$15 |
| Sanity CMS | $0 (free tier) | $0 |
| WP Recipe Maker Pro | — | $49 |
| Yoast SEO Premium (optional) | — | $99 |
| **Total** | **~$14/mo** | **~$331/year** |

---

## Revenue Model

### Passive Income (Recipe Blog)

| Source | When it kicks in | Estimated |
|--------|-----------------|-----------|
| Google AdSense | Day 1 (low RPM) | $50–500/mo |
| Mediavine | 50K sessions/mo | $750–2,000/mo |
| Raptive | 100K pageviews/mo | $1,500–8,000/mo |
| Affiliate links | Day 1 | $100–1,000/mo |
| Brand sponsorships | 10K+ followers | $1,000–10,000/deal |

### Active Income (Business Site)

| Source | Detail |
|--------|--------|
| Meal prep orders | Direct revenue from customers |
| Catering enquiries | Higher-value one-off jobs |
| Corporate meal plans | Recurring B2B revenue |

### Combined Potential at Maturity (Year 2+)

```
Blog passive income:     $3,000–10,000/mo
Business active income:  Depends on order volume
                         ─────────────────────
Total:                   Two independent revenue streams
                         from one brand and one content effort
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1–2)

- [ ] Register domain: freshprepsydney.com
- [ ] Set up Cloudways hosting for WordPress blog
- [ ] Install WordPress + theme + WP Recipe Maker + Yoast SEO
- [ ] Configure blog.freshprepsydney.com subdomain
- [ ] Set up Sanity CMS project for business site
- [ ] Deploy business site (vdapp23) to Vercel
- [ ] Configure DNS for both sites

### Phase 2: Content Engine (Weeks 2–4)

- [ ] Aun publishes first 5 recipes on blog
- [ ] Set up TikTok and Instagram accounts
- [ ] Create content workflow: shoot → edit → post video → write blog post
- [ ] Add Google AdSense to blog (starter ad network)
- [ ] Build out business site pages (menu, pricing, about, contact)
- [ ] Connect Sanity CMS to business site for Aun's admin access

### Phase 3: Growth (Months 2–6)

- [ ] Publish 2–3 recipes per week consistently
- [ ] Grow social following with short-form video content
- [ ] Add affiliate links for kitchen equipment and meal prep containers
- [ ] Implement cross-linking between blog and business site
- [ ] Monitor Google Search Console for keyword opportunities
- [ ] Set up email newsletter (ConvertKit or Beehiiv)

### Phase 4: Monetise (Months 6–12)

- [ ] Apply to Mediavine at 50K sessions/mo
- [ ] Graduate to Raptive at 100K pageviews/mo
- [ ] Open contact page for brand sponsorship enquiries
- [ ] Consider paid weekly meal plan subscription
- [ ] Add meal prep ordering functionality to business site

---

## Key Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Separate blog from business site | Yes | Ads hurt business conversion; different goals require different UX |
| WordPress for blog | Yes | Fastest path to content publishing; Aun can manage independently |
| Next.js for business site | Yes | Full dev control; app-like features later; already scaffolded |
| Sanity for business CMS | Yes | Free tier; great admin UX for non-technical users; real-time |
| Subdomain strategy | Yes | Shared brand authority; operationally simple; clear separation |
| Raptive as target ad network | Yes | Highest RPM for food content; proven with butterhand model |
