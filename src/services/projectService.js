// Project Service with LocalStorage persistence

const STORAGE_KEY = 'techwants_projects_store';

// Start with empty array as requested by user
const initialProjects = [];

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading projects from storage:', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
  return [...initialProjects];
};

const saveToStorage = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to storage:', err);
  }
};

export const getProjects = async () => {
  return loadFromStorage();
};

export const getFeaturedProjects = async () => {
  const projects = loadFromStorage();
  return projects.filter(p => p.featured);
};

export const getProjectBySlug = async (slug) => {
  const projects = loadFromStorage();
  return projects.find(p => p.slug === slug) || null;
};

export const getProjectCategories = () => {
  const projects = loadFromStorage();
  const cats = new Set(["All"]);
  projects.forEach(p => {
    if (p.category) cats.add(p.category);
  });
  return Array.from(cats);
};

export const getAllTechnologies = () => {
  const projects = loadFromStorage();
  const techs = new Set(["All"]);
  projects.forEach(p => {
    if (Array.isArray(p.technologies)) {
      p.technologies.forEach(t => techs.add(t));
    }
  });
  return Array.from(techs);
};

export const addProject = async (projectData) => {
  const currentProjects = loadFromStorage();
  const slug = (projectData.title || 'project')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

  const newProject = {
    id: Date.now(),
    slug: slug,
    title: projectData.title || "Untitled Project",
    category: projectData.category || "Web Development",
    shortDescription: projectData.shortDescription || projectData.description || "",
    description: projectData.description || "",
    image: projectData.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gallery: projectData.image ? [projectData.image] : ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"],
    technologies: projectData.technologies ? (Array.isArray(projectData.technologies) ? projectData.technologies : projectData.technologies.split(',').map(t => t.trim())) : ["React", "Tailwind CSS"],
    features: projectData.features ? (Array.isArray(projectData.features) ? projectData.features : projectData.features.split('\n').filter(Boolean)) : ["Custom Development", "Responsive Layout"],
    challenge: projectData.challenge || "",
    solution: projectData.solution || "",
    results: projectData.results ? (Array.isArray(projectData.results) ? projectData.results : projectData.results.split('\n').filter(Boolean)) : ["High Performance"],
    client: projectData.client || "Client Project",
    liveUrl: projectData.liveUrl || "",
    githubUrl: projectData.githubUrl || "",
    featured: projectData.featured !== undefined ? projectData.featured : true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  const updated = [newProject, ...currentProjects];
  saveToStorage(updated);
  return newProject;
};

export const deleteProject = async (id) => {
  const currentProjects = loadFromStorage();
  const updated = currentProjects.filter(p => p.id !== id && p.slug !== id);
  saveToStorage(updated);
  return updated;
};

export const resetProjects = async () => {
  saveToStorage([]);
  return [];
};
