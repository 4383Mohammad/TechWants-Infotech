import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Tag } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
          decoding="async"
          width="600"
          height="338"
        />
        
        {/* Category Overlay Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="blue" className="bg-white/90 backdrop-blur-md shadow-md">
            {project.category}
          </Badge>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Link
            to={`/projects/${project.slug}`}
            aria-label={`View ${project.title} details`}
            className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl hover:bg-brand-600 hover:text-white transition-colors"
            title="View Project Details"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live website for ${project.title}`}
              className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
              title="Visit Live Site"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {project.client && (
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{project.client}</span>
            </div>
          )}

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 mt-2 line-clamp-2 leading-relaxed font-normal">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-[11px] font-bold">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            aria-label={`View project details for ${project.title}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 group-hover:translate-x-1 transition-all"
          >
            <span>VIEW PROJECT DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
