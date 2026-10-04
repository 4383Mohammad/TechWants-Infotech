import { company } from '../data/company';

/**
 * Builds Organization JSON-LD Schema
 */
export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": company.name,
  "url": company.website,
  "logo": `${company.website}/favicon.svg`,
  "telephone": company.phone,
  "description": company.bio,
  "founder": {
    "@type": "Person",
    "name": company.founder,
    "jobTitle": company.designation
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": company.phone,
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Gujarati"]
  }
});

/**
 * Builds BreadcrumbList JSON-LD Schema
 * @param {Array<{name: string, url: string}>} items 
 */
export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * Builds FAQPage JSON-LD Schema
 * @param {Array<{question: string, answer: string}>} faqList 
 */
export const buildFAQSchema = (faqList = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqList.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Builds Service JSON-LD Schema
 */
export const buildServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.title,
  "provider": {
    "@type": "Organization",
    "name": company.name
  },
  "description": service.description || service.shortDescription,
  "areaServed": "IN"
});

/**
 * Builds Article JSON-LD Schema
 */
export const buildArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": article.schemaType || "Article",
  "headline": article.title,
  "description": article.excerpt,
  "image": [article.image],
  "datePublished": article.date,
  "dateModified": article.updatedAt || article.date,
  "author": {
    "@type": "Person",
    "name": article.author || company.founder
  },
  "publisher": {
    "@type": "Organization",
    "name": company.name,
    "logo": {
      "@type": "ImageObject",
      "url": `${company.website}/logo_transparent.png`
    }
  }
});
