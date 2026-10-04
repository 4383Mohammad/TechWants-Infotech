# TechWants Infotech – Product Requirements Document (PRD)

## 1. Product Overview
**TechWants Infotech** is a premium, modern, responsive, and scalable IT company website and client lead-generation platform. It showcases digital solutions including Web Development, Technical SEO, Custom ERP & Software Solutions, E-Commerce Development, and Maintenance.

The platform is designed to build trust, communicate business value, showcase real client projects, generate dynamic WhatsApp & form inquiries, and be 100% future-ready for REST API, Supabase/Firebase backend, CMS, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and an Admin Lead Management Dashboard.

---

## 2. Company & Founder Information
- **Company Name:** TechWants Infotech
- **Founder:** Mansuri Mohammad
- **Designation:** Founder & Technology Consultant
- **Phone / WhatsApp:** +91 9327438342
- **Raw Phone / WhatsApp:** 919327438342
- **Tagline:** Ideas. Innovation. Impact.
- **Brand Positioning:** *"TechWants Infotech builds professional digital solutions that help businesses grow."*

---

## 3. Product Goals
1. **Establish Brand Trust:** Present a high-end corporate identity with electric blue gradients, dark navy accents, and clean white space.
2. **Dynamic Project Portfolio System:** Allow effortless project additions via decoupled data structures (`projects.js` / API) without editing React UI code.
3. **AEO & GEO Readiness:** Maximum technical and content readiness for Search Engines, Answer Engines (Google Snippets, Voice Search), and Generative AI Platforms (ChatGPT, Perplexity, Gemini, Claude).
4. **Dynamic Lead Generation Flow:** Service-specific quote triggers and Inquiry Modals generating structured WhatsApp payloads.
5. **5 Core Service Showcases:** Web Development, SEO & Digital Marketing, Custom ERP, E-Commerce, and Maintenance.
6. **Future-Proof Admin & CMS Architecture:** Prepared models for leads, projects, services, blogs, FAQs, and testimonials.

---

## 4. Target Audience
- **Business Owners & SMBs:** Seeking modern, responsive business websites or e-commerce platforms.
- **Startups & Entrepreneurs:** Requiring custom web apps, MVP development, and UI/UX design.
- **Enterprise & Industry Clients:** Looking for ERP, CRM, inventory, and workflow automation.
- **Local & Digital Businesses:** Needing Technical SEO, AEO, GEO, and Google Business Profile management.

---

## 5. Core Website Pages & Routing
| Path | Page Name | Primary Objective |
| :--- | :--- | :--- |
| `/` | **Home** | Hero visual, Trust Bar, Founder spotlight, Services preview, Featured Projects, AEO FAQs, CTA |
| `/about` | **About Us** | Mission, Vision, Company Values, Detailed Founder Spotlight |
| `/services` | **Services** | 5 core service offerings with answer-first summaries, breadcrumbs, and FAQs |
| `/projects` | **Projects Portfolio** | Filterable project showcase with category & tech filters and breadcrumbs |
| `/projects/:slug` | **Project Details** | Dynamic detail page displaying Overview, Challenge, Solution, Features, & Breadcrumb Schema |
| `/technologies` | **Technologies** | Structured grid of Frontend, Backend, Database, Tools, and SEO/Marketing tech stacks |
| `/blog` | **Blog / Insights** | Article listing covering SEO, AEO, GEO, ERP automation, and Web Dev |
| `/blog/:slug` | **Blog Article** | Clean reading experience with author credibility, Article Schema, & Breadcrumbs |
| `/contact` | **Contact** | Full contact details, interactive contact form with WhatsApp auto-generation |
| `/admin` | **Admin Dashboard** | Lead Management table, status tracking, and AEO/GEO metadata management |

---

## 6. AEO + GEO Content & Technical Requirements
- **Answer-First Structure:** Direct definitions and 1-2 sentence concise summaries immediately below page headers.
- **Structured Data Suite (`src/utils/schema.js`):** Organization, BreadcrumbList, Service, Article, and FAQPage JSON-LD Schema.
- **Topic Clusters:** AEO & GEO content clusters linking blogs to services and services to projects.
- **Entity Integrity:** Consistent brand entity information across all views (Company: TechWants Infotech, Founder: Mansuri Mohammad).
