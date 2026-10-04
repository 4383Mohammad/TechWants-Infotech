import { company } from '../data/company';

/**
 * Updates document title, meta description, canonical URL, and JSON-LD schema dynamically
 */
export const updateSEO = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  schemaData = null
}) => {
  // Title
  const siteTitle = title ? `${title} | ${company.name}` : `${company.name} | ${company.tagline}`;
  document.title = siteTitle;

  // Description
  const metaDesc = description || company.bio;
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.name = 'description';
    document.head.appendChild(descMeta);
  }
  descMeta.content = metaDesc;

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = siteTitle;

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = metaDesc;

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonicalUrl || window.location.href;

  // JSON-LD Schema
  let schemaScript = document.querySelector('script[type="application/ld+json"]');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": company.name,
    "url": company.website,
    "logo": `${company.website}/favicon.svg`,
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
  };

  schemaScript.textContent = JSON.stringify(schemaData || defaultSchema);
};
