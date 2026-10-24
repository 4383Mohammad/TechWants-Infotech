// Blog Service with Firebase Cloud Firestore persistence & LocalStorage fallback
import { blogs as initialBlogs } from '../data/blogs';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'blogs';
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
    console.warn('Error loading blogs from storage:', err);
  }
  return [...initialBlogs];
};

const saveToStorage = (blogsList) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogsList));
  } catch (err) {
    console.warn('Error saving blogs to storage:', err);
  }
};

export const getBlogs = async () => {
  const localBlogs = loadFromStorage();

  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    const cloudBlogs = [];
    snap.forEach((d) => {
      cloudBlogs.push({ id: d.id, ...d.data() });
    });

    // Merge cloud blogs with initial blogs
    const mergedMap = new Map();
    // Default initial blogs first
    initialBlogs.forEach((b) => mergedMap.set(b.slug, b));
    // Cloud blogs overwrite / add
    cloudBlogs.forEach((b) => mergedMap.set(b.slug, b));

    // Also migrate any unique local blogs to cloud
    for (const lb of localBlogs) {
      if (!mergedMap.has(lb.slug) && lb.title) {
        const docId = String(lb.slug || lb.id || Date.now());
        try {
          await setDoc(doc(db, COLLECTION_NAME, docId), lb);
          mergedMap.set(lb.slug, lb);
        } catch (uploadErr) {
          console.warn("Could not sync local blog to cloud:", uploadErr);
        }
      }
    }

    const mergedList = Array.from(mergedMap.values());
    saveToStorage(mergedList);
    return mergedList;
  } catch (err) {
    console.warn('Firestore error in getBlogs, using local fallback:', err);
    return localBlogs;
  }
};

export const getBlogBySlug = async (slug) => {
  const blogsList = await getBlogs();
  return blogsList.find((b) => b.slug === slug || String(b.id) === String(slug)) || null;
};

export const getBlogCategories = (blogsList) => {
  const blogs = blogsList || loadFromStorage();
  const cats = new Set(["All"]);
  blogs.forEach((b) => {
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
  if (currentBlogs.some((b) => b.slug === slug)) {
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
    tags = blogData.tags.split(',').map((t) => t.trim()).filter(Boolean);
  } else {
    tags = ["TechWants Infotech", "Technology"];
  }

  // Process FAQ items for AEO rich snippets
  let faqItems = [];
  if (Array.isArray(blogData.faqItems)) {
    faqItems = blogData.faqItems.filter((f) => f.question && f.answer);
  }

  const currentDate = getFormattedDate();

  const newBlog = {
    id: Date.now(),
    slug: slug,
    title: blogData.title || "Untitled Article",
    category: blogData.category || "Technology Insights",
    author: blogData.author || "TechWants Team",
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

  // Save to Cloud Firestore
  try {
    await setDoc(doc(db, COLLECTION_NAME, newBlog.slug), newBlog);
  } catch (err) {
    console.error("Error saving blog to Firestore:", err);
  }

  const updated = [newBlog, ...currentBlogs.filter((b) => b.slug !== newBlog.slug)];
  saveToStorage(updated);
  return newBlog;
};

export const deleteBlog = async (id) => {
  const currentBlogs = loadFromStorage();
  const target = currentBlogs.find((b) => b.id === id || b.slug === id || String(b.id) === String(id));
  const docId = String(target?.slug || target?.id || id);

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId));
  } catch (err) {
    console.error("Error deleting blog from Firestore:", err);
  }

  const updated = currentBlogs.filter((b) => b.id !== id && b.slug !== id && String(b.id) !== String(id));
  saveToStorage(updated);
  return updated;
};

export const resetBlogs = async () => {
  saveToStorage(initialBlogs);
  return [...initialBlogs];
};

