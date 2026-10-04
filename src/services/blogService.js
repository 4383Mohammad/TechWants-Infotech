// Blog Service with LocalStorage persistence and dynamic CRUD
import { blogs as initialBlogs } from '../data/blogs';

const STORAGE_KEY = 'techwants_blogs_store';

// Helper to format friendly dates like "October 3, 2026"
const getFormattedDate = () => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
};

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading blogs from storage:', err);
  }
  // Initialize with predefined blogs if storage is empty
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
  } catch (e) {
    console.warn('LocalStorage not available:', e);
  }
  return [...initialBlogs];
};

const saveToStorage = (blogsList) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogsList));
  } catch (err) {
    console.error('Error saving blogs to storage:', err);
  }
};

export const getBlogs = async () => {
  return loadFromStorage();
};

export const getBlogBySlug = async (slug) => {
  const blogsList = loadFromStorage();
  return blogsList.find(b => b.slug === slug || String(b.id) === String(slug)) || null;
};

export const getBlogCategories = () => {
  const blogsList = loadFromStorage();
  const cats = new Set(["All"]);
  blogsList.forEach(b => {
    if (b.category) cats.add(b.category);
  });
  return Array.from(cats);
};

export const addBlog = async (blogData) => {
  const currentBlogs = loadFromStorage();
  
  // Format slug or generate from title
  let slug = (blogData.slug || blogData.title || 'article')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  if (!slug) {
    slug = `article-${Date.now().toString().slice(-4)}`;
  }

  // Ensure unique slug
  if (currentBlogs.some(b => b.slug === slug)) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  // Calculate read time if not provided
  let readTime = blogData.readTime;
  if (!readTime && blogData.content) {
    const wordCount = blogData.content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    readTime = `${minutes} min read`;
  } else if (!readTime) {
    readTime = "5 min read";
  }

  // Tags processing
  let tags = [];
  if (Array.isArray(blogData.tags)) {
    tags = blogData.tags;
  } else if (typeof blogData.tags === 'string' && blogData.tags.trim()) {
    tags = blogData.tags.split(',').map(t => t.trim()).filter(Boolean);
  } else {
    tags = ["TechWants Infotech", "Technology"];
  }

  // Process FAQ items for AEO rich snippets
  let faqItems = [];
  if (Array.isArray(blogData.faqItems)) {
    faqItems = blogData.faqItems.filter(f => f.question && f.answer);
  }

  const currentDate = getFormattedDate();

  const newBlog = {
    id: Date.now(),
    slug: slug,
    title: blogData.title || "Untitled Article",
    category: blogData.category || "Technology Insights",
    author: blogData.author || "Mansuri Mohammad",
    date: blogData.date || currentDate,
    updatedAt: currentDate,
    readTime: readTime,
    image: blogData.image || "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    excerpt: blogData.excerpt || blogData.description || "",
    content: blogData.content || "",
    tags: tags,
    schemaType: blogData.schemaType || "Article",
    faqItems: faqItems,
    customSchema: blogData.customSchema || null,
    createdAt: new Date().toISOString()
  };

  const updated = [newBlog, ...currentBlogs];
  saveToStorage(updated);
  
  // Call our local Vite plugin API to save to the actual file system
  try {
    await fetch('/api/save-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog)
    });
  } catch(e) {
    console.error('Failed to save to system file', e);
  }
  
  return newBlog;
};

export const deleteBlog = async (id) => {
  const currentBlogs = loadFromStorage();
  const updated = currentBlogs.filter(b => b.id !== id && b.slug !== id && String(b.id) !== String(id));
  saveToStorage(updated);
  return updated;
};

export const resetBlogs = async () => {
  saveToStorage(initialBlogs);
  return [...initialBlogs];
};
