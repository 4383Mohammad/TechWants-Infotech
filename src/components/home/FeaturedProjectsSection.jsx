import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../../services/projectService';
import { ProjectCard } from '../cards/ProjectCard';
import { ArrowRight, FolderKanban } from 'lucide-react';

export const FeaturedProjectsSection = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getFeaturedProjects().then(setFeatured);
  }, []);

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
              <FolderKanban className="w-3.5 h-3.5 text-brand-600" />
              <span>OUR RECENT WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              FEATURED <span className="text-gradient">PROJECTS & CASE STUDIES</span>
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Digital products built to solve real business problems.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 transition-colors shrink-0"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};
