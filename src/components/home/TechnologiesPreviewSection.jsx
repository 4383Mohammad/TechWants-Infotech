import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { technologyCategories } from '../../data/technologies';
import { ArrowRight, Code } from 'lucide-react';

export const TechnologiesPreviewSection = () => {
  const [activeTab, setActiveTab] = useState(technologyCategories[0].id);

  const activeCategory = technologyCategories.find(c => c.id === activeTab) || technologyCategories[0];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>MODERN STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            POWERFUL <span className="text-gradient">TECHNOLOGY STACK</span>
          </h2>
          <p className="text-slate-600 text-base mt-2">
            We use production-proven, enterprise-grade frameworks to build secure and scalable digital solutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {technologyCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === cat.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Tech Items Grid */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">{activeCategory.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{activeCategory.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.items.map((tech, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center font-bold text-xs shrink-0">
                  {tech.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{tech.name}</div>
                  <div className="text-xs text-slate-600 mt-0.5 font-medium">{tech.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:underline"
          >
            <span>EXPLORE OUR COMPLETE TECH ECOSYSTEM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
