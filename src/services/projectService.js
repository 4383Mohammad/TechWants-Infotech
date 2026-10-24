// Project Service backed exclusively by Firebase Cloud Firestore
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'projects';
const STORAGE_KEY = 'techwants_projects_store';

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error loading projects from storage:', err);
  }
  return [];
};

const saveToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn('Error saving projects to storage:', err);
  }
};

export const getProjects = async () => {
  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    const cloudProjects = [];
    snap.forEach((d) => {
      cloudProjects.push({ id: d.id, ...d.data() });
    });

    // Update local cache with exact cloud state
    saveToStorage(cloudProjects);
    return cloudProjects;
  } catch (err) {
    console.warn('Firestore fetch error, falling back to local cache:', err);
    return loadFromStorage();
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
    image: projectData.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gallery: projectData.image ? [projectData.image] : ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"],
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
  await setDoc(doc(db, COLLECTION_NAME, docId), newProject);

  // Update local cache
  const current = loadFromStorage();
  const updated = [newProject, ...current.filter((p) => p.slug !== newProject.slug && p.id !== newProject.id)];
  saveToStorage(updated);
  return newProject;
};

export const deleteProject = async (id) => {
  const currentProjects = await getProjects();

  // Find doc to delete
  const target = currentProjects.find((p) => p.id === id || p.slug === id || String(p.id) === String(id));
  const docId = String(target?.slug || target?.id || id);

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId));
  } catch (err) {
    console.error("Error deleting project from Firestore:", err);
  }

  const updated = currentProjects.filter((p) => p.id !== id && p.slug !== id && String(p.id) !== String(id));
  saveToStorage(updated);
  return updated;
};

export const resetProjects = async () => {
  saveToStorage([]);
  return [];
};


