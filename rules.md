# TechWants Infotech – Development Rules & Standards

## Rule 1 — Zero Breaking Changes
Never break existing UI components, data structures, or route contracts. Test every view thoroughly after any modification.

## Rule 2 — Centralized Company Configuration
Do NOT hard-code phone numbers, founder names, emails, taglines, or WhatsApp links directly inside JSX files.
All company metadata MUST be consumed directly from `src/data/company.js`.

## Rule 3 — Answer Engine & Generative AI Optimization (AEO + GEO)
- Every primary page MUST employ an **Answer-First** content layout (H1 headline followed immediately by a direct 1-2 sentence definition/summary).
- All structured data MUST be injected using `src/utils/schema.js` and match visible page content.
- Do NOT invent fake questions, fake reviews, or hidden text.

## Rule 4 — Standardized WhatsApp Utility
Never construct raw `https://wa.me/...` URLs manually in components.
Always use `getWhatsAppUrl()` from `src/utils/contact.js` to ensure proper URL encoding and dynamic message formatting.

## Rule 5 — Strict Authenticity (No Fake Information)
- Do NOT invent fake client reviews, fake testimonials, fake client logos, or fake awards.
- Do NOT create fake percentage skill bars (e.g. "React 95%").
- Only present actual verified founder details: **Mansuri Mohammad (Founder & Technology Consultant)**.

## Rule 6 — Visual Excellence & Design Tokens
- Maintain strict alignment with visual identity: White background, Electric/Royal Blue (`#0066FF`), Dark Navy (`#0A1128`), soft blue gradients, and glassmorphism cards.
- Use rounded container corners (`rounded-2xl`, `rounded-3xl`), crisp borders, and subtle layered box shadows.

## Rule 7 — 100/100 Lighthouse Performance & Accessibility
- Code splitting via `React.lazy` in `App.jsx`.
- Image elements must include explicit, descriptive `alt` text and dimensions.
- All form controls MUST have associated `<label htmlFor="...">` and `id` attributes.
- Icon buttons MUST include explicit `aria-label` attributes.
