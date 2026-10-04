import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug, getProjects } from '../services/projectService';
import { ProjectCard } from '../components/cards/ProjectCard';
import { CTASection } from '../components/widgets/CTASection';
import { Badge } from '../components/common/Badge';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertCircle, Zap, Tag, MessageSquareCode } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getWhatsAppUrl } from '../utils/contact';
import { updateSEO } from '../utils/seo';
import { buildBreadcrumbSchema } from '../utils/schema';

export const ProjectDetails = ({ onOpenInquiryModal }) => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjectBySlug(slug).then(p => {
      setProject(p);
      setLoading(false);
      if (p) {
        const breadcrumbSchema = buildBreadcrumbSchema([
          { name: "Projects", url: "https://techwantsinfotech.com/projects" },
          { name: p.title, url: `https://techwantsinfotech.com/projects/${p.slug}` }
        ]);

        updateSEO({
          title: p.title,
          description: p.shortDescription || p.description,
          canonicalUrl: `https://techwantsinfotech.com/projects/${p.slug}`,
          schemaData: breadcrumbSchema
        });
      }
    });

    getProjects().then(all => {
      setRelatedProjects(all.filter(p => p.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center text-slate-500 font-bold">
        Loading Project Details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 pb-20 max-w-xl mx-auto text-center px-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
        <p className="text-sm text-slate-600">The requested project could not be found or has been moved.</p>
        <Link to="/projects" className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-28">
      
      {/* Breadcrumb Header */}
      <section className="bg-gradient-to-b from-pink-50/70 to-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <Breadcrumbs items={[
              { name: "Projects", url: "/projects" },
              { name: project.title, url: `/projects/${project.slug}` }
            ]} />
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="pink">{project.category}</Badge>
                {project.client && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-brand-600" />
                    <span>Client: {project.client}</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {project.title}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/25 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Website</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Main Image Showcase */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 aspect-[16/9] max-h-[550px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Overview, Challenge, Solution & Results */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Deep Dive Details */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Overview */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Project Overview</h3>
                <p className="text-slate-700 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.challenge && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">The Challenge</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">Our Solution</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Key Features Built</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results (Only displayed if provided in data) */}
              {project.results && project.results.length > 0 && (
                <div className="bg-gradient-to-br from-brand-600 via-rose-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl space-y-4">
                  <h3 className="text-xl font-bold">Verified Results</h3>
                  <ul className="space-y-2 text-sm font-medium">
                    {project.results.map((res, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Right Column: Sidebar Tech Stack & Quick Action */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-pink-50 text-brand-900 font-bold text-xs border border-pink-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-3xl text-white space-y-4 border border-slate-800">
                <h4 className="text-lg font-bold">Need a similar solution for your business?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Discuss your project requirement with Founder & Technology Consultant Mansuri Mohammad.
                </p>

                <button
                  onClick={onOpenInquiryModal}
                  className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  START A PROJECT LIKE THIS
                </button>

                <a
                  href={getWhatsAppUrl(`Hello Mansuri Mohammad, I reviewed your project '${project.title}' on TechWants Infotech and would like to discuss a similar solution.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black border border-pink-900/50 hover:border-pink-500 hover:bg-brand-600 text-pink-200 hover:text-white font-bold text-xs transition-colors"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Other Recent Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
