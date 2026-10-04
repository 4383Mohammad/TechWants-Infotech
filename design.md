# TechWants Infotech – Design System Document

## 1. Brand Visual Identity
The visual identity of TechWants Infotech is designed to convey **Trust, Innovation, Technical Precision, and Business Growth**.
Inspired by modern corporate tech aesthetics, the design uses crisp white canvas backgrounds, deep electric royal blues, sleek dark navy containers, soft blue ambient glows, glassmorphism, and rounded card elements.

---

## 2. Color Palette & Tokens

### Primary Colors
- **Electric / Royal Blue:** `#0066FF` (Tailwind: `blue-600` / custom `--color-primary`)
- **Electric Blue Light:** `#3385FF` (Tailwind: `blue-500`)
- **Dark Navy / Midnight:** `#0B132B` / `#0A1128` (Tailwind: `slate-950` / custom `--color-navy`)
- **Navy Secondary:** `#1C2541` (Tailwind: `slate-900`)

### Secondary & Surface Colors
- **Canvas White:** `#FFFFFF`
- **Soft Ice Blue:** `#F4F8FF` / `#EEF5FF`
- **Card Background:** `rgba(255, 255, 255, 0.85)` with `backdrop-blur-md`
- **Card Border:** `rgba(0, 102, 255, 0.12)`
- **Text Main:** `#0F172A` (Slate 900)
- **Text Muted:** `#475569` (Slate 600)
- **Text Subtle:** `#94A3B8` (Slate 400)

---

## 3. Typography
- **Primary Font:** Inter / Outfit / System Sans (`font-sans`)
- **Headings:** Bold to ExtraBold (`font-bold`, `font-extrabold`), tracking tight (`tracking-tight`)
- **Gradient Headings:** Electric Blue to Deep Navy text gradients (`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-900`)

---

## 4. UI Components & Patterns

### Navbar
- Sticky top navigation bar.
- Starts semi-transparent, transforms into frosted glass backdrop (`backdrop-blur-xl bg-white/90 shadow-sm border-b border-blue-100/50`) on scroll.
- Electric blue active state indicator.

### Hero Section Visual
- Left side: High-impact typography, badge ("TECHWANTS INFOTECH"), highlighted gradient terms ("DIGITAL SOLUTIONS", "GROWTH"), CTA buttons.
- Right side: Interactive angle-tilted dashboard mockup displaying:
  - Organic growth graph (+200%)
  - Analytics cards
  - Floating tech stack badges (React, Node, Tailwind, Cloud) with gentle levitation animations.

### Cards & Glassmorphism
- Service Cards: Soft light blue background gradient (`bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30`), rounded 2xl corners, blue icon badges, feature checklists, "Get Quote" WhatsApp trigger.
- Project Cards: Crisp thumbnail frame, tech tags, category badge, slide-up hover overlay.
- Trust Cards: Clean icon, bold title, dual-line subtitle separated by vertical dividers.

### Buttons & Interactivity
- **Primary Button:** Electric blue background with hover elevation, subtle glow shadow, smooth icon translation (`group-hover:translate-x-1`).
- **Secondary Button:** White surface with subtle border (`border-slate-200 hover:border-blue-500 hover:text-blue-600`).
- **Floating WhatsApp:** Fixed bottom-right green/electric-blue pill with pulsing ring, hover tooltip ("Chat with us"), and pre-filled consultation text.

---

## 5. Motion & Micro-Animations (Framer Motion)
- **Fade Up:** `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}`
- **Hover Scale:** `whileHover={{ y: -5, transition: { duration: 0.2 } }}`
- **Floating Effect:** Y-axis oscillation using infinite keyframes (`animate={{ y: [0, -8, 0] }}`).
