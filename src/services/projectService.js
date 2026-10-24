// Project Service with Firebase Cloud Firestore persistence & LocalStorage fallback
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'projects';
const STORAGE_KEY = 'techwants_projects_store';

// Default initial projects seed
export const defaultProjects = [
  {
    id: 1729800000000,
    slug: 'billboss-billing-software',
    title: 'BillBoss - Billing & Invoicing Web App',
    category: 'Web Development',
    shortDescription: 'Smart GST-compliant billing, invoicing, and inventory tracking platform built with modern web tech and deployed on Vercel.',
    description: 'BillBoss is a modern cloud invoicing and business billing web application built for retailers, distributors, and growing enterprises. It offers real-time GST computation, fast barcode inventory lookup, automated invoice PDF creation, and multi-user access with lightning-fast speeds on Vercel infrastructure.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel', 'Node.js'],
    features: [
      'GST-compliant instant invoicing',
      'Product inventory & low-stock alerts',
      'Cloud sync across multiple devices',
      'High performance hosted on Vercel'
    ],
    challenge: 'Clients needed a simple, accessible billing platform that works from any computer or mobile browser with zero latency.',
    solution: 'Architected a responsive single-page web app deployed globally on Vercel serverless edge with real-time database sync.',
    results: ['75% faster checkout & billing', '100% paperless digital invoices', 'High 99.9% uptime on Vercel'],
    client: 'Retail & Commerce Client',
    liveUrl: 'https://vercel.app',
    githubUrl: '',
    featured: true,
    createdAt: '2026-10-24'
  }
];

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
    console.warn('Error loading projects from storage:', err);
  }
  return [...defaultProjects];
};

const saveToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Error saving projects to storage:', err);
  }
};

export const getProjects = async () => {
  const localProjects = loadFromStorage();

  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    const cloudProjects = [];
    snap.forEach((d) => {
      cloudProjects.push({ id: d.id, ...d.data() });
    });

    if (cloudProjects.length > 0) {
      // Automatic migration: if user added projects on mobile in localStorage that are not yet in Firestore, upload them!
      for (const lp of localProjects) {
        const existsInCloud = cloudProjects.some(
          (cp) => cp.slug === lp.slug || String(cp.id) === String(lp.id) || cp.title === lp.title
        );
        if (!existsInCloud && lp.title) {
          const docId = String(lp.slug || lp.id || Date.now());
          try {
            await setDoc(doc(db, COLLECTION_NAME, docId), lp);
            cloudProjects.unshift(lp);
          } catch (uploadErr) {
            console.warn("Could not sync local project to cloud:", uploadErr);
          }
        }
      }

      saveToStorage(cloudProjects);
      return cloudProjects;
    } else {
      // Cloud was empty: seed default or local projects to Firestore
      const toSeed = localProjects.length > 0 ? localProjects : defaultProjects;
      for (const p of toSeed) {
        const docId = String(p.slug || p.id);
        try {
          await setDoc(doc(db, COLLECTION_NAME, docId), p);
        } catch (seedErr) {
          console.warn("Could not seed project to Firestore:", seedErr);
        }
      }
      saveToStorage(toSeed);
      return toSeed;
    }
  } catch (err) {
    console.warn('Firestore offline/error, using local fallback:', err);
    return localProjects;
  }
};

export const getFeaturedProjects = async () => {
  const projects = await getProjects();
  return projects.filter((p) => p.featured !== false);
};

export const getProjectBySlug = async (slug) => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug || String(p.id) === String(slug)) || null;
};

export const getProjectCategories = (projectsList) => {
  const projects = projectsList || loadFromStorage();
  const cats = new Set(["All"]);
  projects.forEach((p) => {
    if (p.category) cats.add(p.category);
  });
  return Array.from(cats);
};

export const getAllTechnologies = (projectsList) => {
  const projects = projectsList || loadFromStorage();
  const techs = new Set(["All"]);
  projects.forEach((p) => {
    if (Array.isArray(p.technologies)) {
      p.technologies.forEach((t) => techs.add(t));
    }
  });
  return Array.from(techs);
};

export const addProject = async (projectData) => {
  const currentProjects = loadFromStorage();
  const rawSlug = (projectData.title || 'project')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const slug = rawSlug || `project-${Date.now().toString().slice(-4)}`;

  const newProject = {
    id: Date.now(),
    slug: slug,
    title: projectData.title || "Untitled Project",
    category: projectData.category || "Web Development",
    shortDescription: projectData.shortDescription || projectData.description || "",
    description: projectData.description || "",
    image: projectData.image || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    gallery: projectData.image ? [projectData.image] : ["https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"],
    technologies: projectData.technologies 
      ? (Array.isArray(projectData.technologies) ? projectData.technologies : projectData.technologies.split(',').map((t) => t.trim())) 
      : ["React", "Tailwind CSS"],
    features: projectData.features 
      ? (Array.isArray(projectData.features) ? projectData.features : projectData.features.split('\n').filter(Boolean)) 
      : ["Custom Development", "Responsive Layout"],
    challenge: projectData.challenge || "",
    solution: projectData.solution || "",
    results: projectData.results 
      ? (Array.isArray(projectData.results) ? projectData.results : projectData.results.split('\n').filter(Boolean)) 
      : ["High Performance"],
    client: projectData.client || "Client Project",
    liveUrl: projectData.liveUrl || "",
    githubUrl: projectData.githubUrl || "",
    featured: projectData.featured !== undefined ? projectData.featured : true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  // Save to Cloud Firestore
  const docId = String(newProject.slug || newProject.id);
  try {
    await setDoc(doc(db, COLLECTION_NAME, docId), newProject);
  } catch (err) {
    console.error("Error saving project to Firestore:", err);
  }

  // Save to local cache
  const updated = [newProject, ...currentProjects.filter((p) => p.slug !== newProject.slug && p.id !== newProject.id)];
  saveToStorage(updated);
  return newProject;
};

export const deleteProject = async (id) => {
  const currentProjects = loadFromStorage();

  // Find doc to delete
  const target = currentProjects.find((p) => p.id === id || p.slug === id);
  const docId = String(target?.slug || target?.id || id);

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId));
  } catch (err) {
    console.error("Error deleting project from Firestore:", err);
  }

  const updated = currentProjects.filter((p) => p.id !== id && p.slug !== id);
  saveToStorage(updated);
  return updated;
};

export const resetProjects = async () => {
  saveToStorage([]);
  return [];
};

