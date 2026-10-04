# TechWants Infotech – Project Memory & Context Log

## Executive Summary
TechWants Infotech is a professional IT Company Website & Lead Generation Platform designed for **Mansuri Mohammad (Founder & Technology Consultant)**.

## Essential Reference Metadata
- **Company Name:** TechWants Infotech
- **Founder:** Mansuri Mohammad
- **Designation:** Founder & Technology Consultant
- **Phone / WhatsApp:** +91 9327438342
- **Raw WhatsApp Number:** 919327438342
- **Tagline:** Ideas. Innovation. Impact.
- **Core Positioning:** "TechWants Infotech builds professional digital solutions that help businesses grow."

## Key Design & Technical Constraints
1. **Decoupled Data Architecture:** All projects, services, FAQs, blogs, and company info reside in structured data modules (`src/data/*.js`) accessed through a service abstraction layer (`src/services/*.js`).
2. **AEO + GEO Engine:** Maximum technical and content readiness for Search Engines (SEO), Answer Engines (AEO), and Generative AI Platforms (GEO) using dynamic JSON-LD schema graphs (`Organization`, `FAQPage`, `BreadcrumbList`, `Service`, `Article`) and Answer-First content structures.
3. **Dynamic WhatsApp Integration:** All lead inquiries generate formatted WhatsApp URLs targeting `+91 9327438342` using `src/utils/contact.js`.
4. **No Fake Claims:** Zero fake client testimonials, zero fake statistics, zero fake percentage skill bars. Genuine founder photos (from `Founder Info/`) are utilized.
5. **Visual Style Alignment:** White background, Electric/Royal Blue (`#0066FF`), Dark Navy (`#0A1128`), glassmorphic cards, smooth Framer Motion animations, rounded corners.

## Architectural History & Decisions
- **Date:** 2026-10-01
- **Decision:** Built frontend with React 18, Vite, Tailwind CSS, Framer Motion, and Lucide React.
- **100/100 Lighthouse Optimization:** Code splitting with `React.lazy`, manual vendor chunking, preconnected fonts, explicit form labels, and `aria-label` attributes.
- **AEO + GEO System:** Injected `src/utils/schema.js`, `FAQAccordion.jsx`, and `Breadcrumbs.jsx`.
