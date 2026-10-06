import { company } from '../data/company';

/**
 * Updates document title, meta description, canonical URL, and JSON-LD schema dynamically
 */
export const updateSEO = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaData = null
}) => {
  const currentUrl = canonicalUrl || window.location.href;
  const defaultImage = `${company.website}/logo.webp`;
  const finalImage = ogImage || defaultImage;

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

  // Open Graph Image
  let ogImg = document.querySelector('meta[property="og:image"]');
  if (!ogImg) {
    ogImg = document.createElement('meta');
    ogImg.setAttribute('property', 'og:image');
    document.head.appendChild(ogImg);
  }
  ogImg.content = finalImage;

  // Open Graph URL
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.content = currentUrl;

  // Open Graph Type
  let typeMeta = document.querySelector('meta[property="og:type"]');
  if (!typeMeta) {
    typeMeta = document.createElement('meta');
    typeMeta.setAttribute('property', 'og:type');
    document.head.appendChild(typeMeta);
  }
  typeMeta.content = ogType;

  // Twitter Card
  let twCard = document.querySelector('meta[name="twitter:card"]');
  if (!twCard) {
    twCard = document.createElement('meta');
    twCard.setAttribute('name', 'twitter:card');
    document.head.appendChild(twCard);
  }
  twCard.content = 'summary_large_image';

  // Twitter Title
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twTitle) {
    twTitle = document.createElement('meta');
    twTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twTitle);
  }
  twTitle.content = siteTitle;

  // Twitter Description
  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twDesc) {
    twDesc = document.createElement('meta');
    twDesc.setAttribute('name', 'twitter:description');
    document.head.appendChild(twDesc);
  }
  twDesc.content = metaDesc;

  // Twitter Image
  let twImage = document.querySelector('meta[name="twitter:image"]');
  if (!twImage) {
    twImage = document.createElement('meta');
    twImage.setAttribute('name', 'twitter:image');
    document.head.appendChild(twImage);
  }
  twImage.content = finalImage;

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = currentUrl;

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
    "logo": `${company.website}/favicon-512x512.png`,
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
