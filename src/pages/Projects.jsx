import React, { useState, useEffect } from 'react';
import { getProjects, getProjectCategories, getAllTechnologies } from '../services/projectService';
import { ProjectCard } from '../components/cards/ProjectCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/widgets/CTASection';
import { Search, Filter, FolderKanban, Sparkles } from 'lucide-react';
import { updateSEO } from '../utils/seo';
import { buildBreadcrumbSchema } from '../utils/schema';
import { company } from '../data/company';

export const Projects = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: "Projects", url: `${company.website}/projects` }
    ]);

    updateSEO({
      title: "Projects & Portfolio Showcase",
      description: `Explore digital projects built by TechWants Infotech: custom Web Applications, ERP inventory systems, and e-commerce platforms.`,
      canonicalUrl: `${company.website}/projects`,
      schemaData: breadcrumbSchema
    });
  }, []);

  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [technologies, setTechnologies] = useState(["All"]);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProjects().then(data => {
      setAllProjects(data);
      setFilteredProjects(data);
      setCategories(getProjectCategories());
      setTechnologies(getAllTechnologies());
    });
  }, []);

  useEffect(() => {
    let result = [...allProjects];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedTech !== "All") {
      result = result.filter(p => p.technologies.some(t => t.toLowerCase() === selectedTech.toLowerCase()));
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, selectedTech, searchQuery, allProjects]);

  return (
    <main className="pt-28">
      {/* Header */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <Breadcrumbs items={[{ name: "Projects", url: "/projects" }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>OUR PORTFOLIO</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              EXPLORE OUR <span className="text-gradient">FEATURED PROJECTS</span>
            </h1>

            <div className="mt-4 p-4 rounded-2xl bg-pink-50/70 border border-pink-100/80 text-slate-800 text-base font-semibold leading-relaxed">
              TechWants Infotech develops custom digital solutions to solve real business problems. Filter projects below by category or technology stack.
            </div>
          </div>

        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[72px] z-30 backdrop-blur-xl bg-white/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="project-search" className="sr-only">Search Projects</label>
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="project-search"
                type="text"
                placeholder="Search projects by keyword, tech, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-xs sm:text-sm font-medium text-slate-800"
              />
            </div>

            {/* Category Pills & Tech Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tech Filter Select */}
              <div className="flex items-center gap-2">
                <label htmlFor="tech-select" className="sr-only">Filter by technology</label>
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <select
                  id="tech-select"
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white outline-none focus:border-brand-600"
                >
                  <option value="All">All Tech Stacks</option>
                  {technologies.filter(t => t !== "All").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {allProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 p-8 sm:p-12 space-y-5 shadow-sm max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 text-brand-900 flex items-center justify-center mx-auto border border-pink-100">
                <FolderKanban className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">New Case Studies Launching Soon</h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                We are currently curating detailed case studies for our recent client web applications, ERP software systems, and e-commerce platforms. Have a custom project in mind? Let's engineer your digital solution today!
              </p>
              <button
                onClick={onOpenInquiryModal}
                aria-label="Discuss Your Project Requirement"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-600/20 transition-all inline-flex items-center gap-2"
              >
                <span>Discuss Your Project Requirement</span>
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-xl mx-auto">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h2 className="text-xl font-bold text-slate-800">No Projects Found</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                No project matches your search criteria "{searchQuery}". Try resetting your search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

        </div>
      </section>

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
