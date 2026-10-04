# TechWants Infotech – Technical Architecture Document

## 1. Architecture Overview
TechWants Infotech is built using a modern **Decoupled Frontend-First Architecture** with 100/100 readiness for **Search Engines (SEO)**, **Answer Engines (AEO)**, and **Generative AI Engines (GEO)**.

The data layer is completely abstracted into central Javascript modules (`projects.js`, `services.js`, `faqs.js`, `blogs.js`, `company.js`) and service abstractions (`projectService.js`, `leadService.js`, `blogService.js`), guaranteeing seamless migration to REST APIs, Supabase, Firebase, or Node.js backends.

---

## 2. Technology Stack & Optimization Layer
- **Framework:** React 18 (Vite + Code Splitting via `React.lazy` & `Suspense`)
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + Custom Design Tokens + Glassmorphism
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **SEO / AEO / GEO Engine:** `src/utils/seo.js` & `src/utils/schema.js` (Dynamic metadata & JSON-LD graph)

---

## 3. Directory Structure
```
TechWants-Infotech/
├── prd.md
├── architecture.md
├── rules.md
├── design.md
├── tasks.md
├── memory.md
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── assets/
    │   └── founder/
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Breadcrumbs.jsx
    │   │   ├── FAQAccordion.jsx
    │   │   └── ProjectInquiryModal.jsx
    │   ├── cards/
    │   │   ├── ServiceCard.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── BlogCard.jsx
    │   │   └── TrustCard.jsx
    │   ├── home/
    │   │   ├── HeroSection.jsx
    │   │   ├── TrustSection.jsx
    │   │   ├── AboutPreviewSection.jsx
    │   │   ├── ServicesPreviewSection.jsx
    │   │   ├── FeaturedProjectsSection.jsx
    │   │   ├── WhyTechWantsSection.jsx
    │   │   ├── ProcessTimelineSection.jsx
    │   │   ├── TechnologiesPreviewSection.jsx
    │   │   └── SEOSection.jsx
    │   ├── widgets/
    │   │   ├── FloatingWhatsApp.jsx
    │   │   └── CTASection.jsx
    │   └── founder/
    │       └── FounderSection.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Services.jsx
    │   ├── Projects.jsx
    │   ├── ProjectDetails.jsx
    │   ├── Technologies.jsx
    │   ├── Blog.jsx
    │   ├── BlogDetails.jsx
    │   ├── Contact.jsx
    │   └── AdminDashboard.jsx
    ├── data/
    │   ├── company.js
    │   ├── projects.js
    │   ├── services.js
    │   ├── faqs.js
    │   ├── technologies.js
    │   ├── blogs.js
    │   └── testimonials.js
    ├── services/
    │   ├── projectService.js
    │   ├── leadService.js
    │   └── blogService.js
    ├── utils/
    │   ├── contact.js
    │   ├── seo.js
    │   └── schema.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

---

## 4. Structured Data Architecture (`src/utils/schema.js`)
The application generates dynamic JSON-LD graphs containing:
1. `Organization`: Factual entity details for TechWants Infotech & Mansuri Mohammad.
2. `FAQPage`: Question and Answer entity mapping matching visible content.
3. `BreadcrumbList`: Structural hierarchy for search crawlers.
4. `Article`: Publication date, modified date, author profile, and headline.
5. `Service`: Service type, provider, and target area.
