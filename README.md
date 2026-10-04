# TechWants Infotech – Premium IT Company Website & Lead Generation Platform

> **Ideas. Innovation. Impact.**
> Professional IT company website for TechWants Infotech, founded by Mansuri Mohammad.

---

## 🌟 Overview
TechWants Infotech is a state-of-the-art Single Page Application (SPA) designed to showcase modern IT services, display dynamic client projects, capture client leads, and drive business growth through tailored digital solutions.

### Key Highlights
- ⚡ **Dynamic Project System:** Easily add new client projects to `src/data/projects.js` without touching React UI components.
- 📱 **WhatsApp Inquiry Integration:** Instant pre-filled WhatsApp lead generation targeted at **+91 9327438342**.
- 💼 **Founder Spotlight:** Highlighting Founder & Technology Consultant **Mansuri Mohammad**.
- 🎨 **Visual Aesthetics:** Electric Royal Blue, Dark Navy accents, White canvas, Soft Blue ambient glows, Glassmorphism, and Framer Motion micro-animations.
- 📊 **Future-Ready Admin Dashboard:** Includes lead management table, status progression (New, Contacted, In Discussion, Converted, Closed), and project analytics.
- 🔍 **SEO & Analytics:** Structured metadata, Open Graph cards, dynamic page titles, and clean semantic markup.

---

## 🚀 Tech Stack
- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Custom Design System
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Routing:** React Router DOM v6

---

## 📁 How to Add New Projects (Crucial Feature)
Adding a project to the platform requires **ZERO React component modifications**.

Simply open `src/data/projects.js` and append your project object to the array:

```javascript
{
  id: 7,
  slug: "custom-erp-system",
  title: "Enterprise ERP & Inventory System",
  category: "ERP",
  shortDescription: "Custom cloud-based ERP for multi-location inventory and billing.",
  description: "Comprehensive ERP solution built to automate sales, stock tracking, and automated invoice generation for enterprise clients.",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
  features: [
    "Multi-branch stock sync",
    "Automated PDF billing",
    "Role-based access control",
    "Real-time analytics dashboard"
  ],
  challenge: "Managing inventory across 5 warehouses with legacy manual entry.",
  solution: "Centralized cloud database with real-time sync and automated alerts.",
  results: [
    "90% reduction in billing time",
    "100% accurate stock count"
  ],
  client: "Enterprise Logistics",
  liveUrl: "https://example.com",
  githubUrl: "",
  featured: true
}
```

The new project will **automatically appear** in:
1. Featured Projects on the **Home Page**
2. Full Portfolio Grid on the **Projects Page**
3. Category & Technology Filter Dropdowns
4. Live Search Results
5. Individual Project Details Page (`/projects/custom-erp-system`)

---

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📞 Contact Information
- **Company:** TechWants Infotech
- **Founder:** Mansuri Mohammad
- **Designation:** Founder & Technology Consultant
- **Phone / WhatsApp:** +91 9327438342
