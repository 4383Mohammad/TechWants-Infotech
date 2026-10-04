# TechWants Infotech – Development Task Tracker

## Phase 1 — Foundation & Project Setup
- [x] Create project documentation (`prd.md`, `architecture.md`, `rules.md`, `design.md`, `tasks.md`, `memory.md`)
- [x] Initialize React + Vite project structure
- [x] Configure Tailwind CSS & PostCSS
- [x] Install dependencies (`framer-motion`, `lucide-react`, `react-router-dom`)
- [x] Create `src/data/company.js` with verified founder information
- [x] Create `src/utils/contact.js` WhatsApp URL generator

## Phase 2 — Data Models & Service Abstraction
- [x] Create `src/data/projects.js` with comprehensive project dataset
- [x] Create `src/data/services.js` with 5 core service offerings
- [x] Create `src/data/faqs.js` structured FAQ dataset
- [x] Create `src/data/technologies.js` categorized tech stacks
- [x] Create `src/data/blogs.js` structured insight articles
- [x] Create `src/services/projectService.js`
- [x] Create `src/services/leadService.js`

## Phase 3 — Core Navigation & Reusable Components
- [x] Build sticky frosted Glassmorphism `Navbar.jsx` with mobile drawer
- [x] Build `Footer.jsx` with dynamic company info & quick links
- [x] Build `Breadcrumbs.jsx` navigation component
- [x] Build `FAQAccordion.jsx` Answer-First FAQ component
- [x] Build `ProjectInquiryModal.jsx` with pre-filled WhatsApp action
- [x] Build `FloatingWhatsApp.jsx` button with pulse animation
- [x] Build reusable `ServiceCard.jsx`, `ProjectCard.jsx`, `TrustCard.jsx`, `BlogCard.jsx`

## Phase 4 — AEO + GEO Optimization Engine
- [x] Create `src/utils/seo.js` dynamic metadata manager
- [x] Create `src/utils/schema.js` JSON-LD schema builder (Organization, FAQPage, BreadcrumbList, Service, Article)
- [x] Answer-First content architecture on all primary pages
- [x] Entity optimization for **TechWants Infotech** & **Mansuri Mohammad**
- [x] Topic cluster internal linking between blogs, services, and projects

## Phase 5 — Page Implementations
- [x] **Home Page:** Hero visual, Trust bar, Services preview, Featured Projects, Process, Why Us, AEO FAQs, CTA
- [x] **About Page:** Company Mission, Vision, Values & Founder Spotlight (Mansuri Mohammad)
- [x] **Services Page:** 5 core service blocks with Answer-First summaries, breadcrumbs, and FAQs
- [x] **Projects Page:** Portfolio showcase with category filtering & real-time search
- [x] **Project Details Page (`/projects/:slug`):** Overview, Challenge, Solution, Tech Stack, Features, Breadcrumb Schema
- [x] **Technologies Page:** Frontend, Backend, Database, Cloud/Tools, SEO/Marketing grids
- [x] **Blog Page (`/blog` & `/blog/:slug`):** Tech articles, Article Schema, & insight detail pages
- [x] **Contact Page:** Form validation, direct phone call, email, and instant WhatsApp inquiry submission
- [x] **Admin Dashboard (`/admin`):** Lead table status management, project & lead metrics

## Phase 6 — Quality Assurance & Verification
- [x] Verify responsiveness on Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- [x] Verify WhatsApp dynamic URL encoding for every service & form payload
- [x] Verify 100/100 Lighthouse Performance, Accessibility, and SEO readiness
- [x] Verify build completion with zero linter or syntax errors
