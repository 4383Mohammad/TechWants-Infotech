import React from 'react';
import { Search, Compass, Layout, Code2, ShieldCheck, Rocket, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useAnimation';

const steps = [
  { step: "01", title: "DISCOVER", description: "Understand business goals, target audience, and core product requirements.", icon: Search, color: 'from-brand-600 to-rose-400' },
  { step: "02", title: "PLAN", description: "Define strategy, technology architecture, component mapping, and timeline roadmap.", icon: Compass, color: 'from-pink-600 to-pink-400' },
  { step: "03", title: "DESIGN", description: "Create responsive UI/UX prototypes, design tokens, and user flow wireframes.", icon: Layout, color: 'from-brand-600 to-slate-900' },
  { step: "04", title: "DEVELOP", description: "Build scalable solution with React, Vite, clean code, and API-ready service layer.", icon: Code2, color: 'from-pink-600 to-rose-400' },
  { step: "05", title: "TEST", description: "Quality assurance, cross-device responsiveness, security updates, and speed audit.", icon: ShieldCheck, color: 'from-slate-900 to-brand-600' },
  { step: "06", title: "LAUNCH", description: "Deploy to high-speed cloud infrastructure with domain configuration & SSL.", icon: Rocket, color: 'from-brand-600 to-pink-400' },
  { step: "07", title: "GROW", description: "Continuous SEO growth, Google Business optimization, marketing, and feature expansion.", icon: TrendingUp, color: 'from-slate-950 to-brand-600' },
];

/**
 * StepCard — extracted as a proper component so useScrollReveal()
 * is called at the TOP LEVEL of a component (not inside a .map loop).
 * Calling hooks inside loops / callbacks violates React Rules of Hooks
 * and causes a full app crash.
 */
const StepCard = ({ item, idx }) => {
  const { ref, isVisible } = useScrollReveal();
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-all duration-500 space-y-3 flex flex-col justify-between group cursor-default ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-black text-brand-500 group-hover:scale-110 transition-transform inline-block">
            {item.step}
          </span>
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-xs font-bold tracking-wider text-white uppercase group-hover:text-pink-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom sweep line on hover */}
      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent transition-all duration-500 rounded-full" />
    </div>
  );
};

export const ProcessTimelineSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background glows (desktop only) */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-brand-600/10 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern (desktop only) */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(219,39,119,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(219,39,119,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
            HOW WE WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            OUR PROVEN{' '}
            <span className="text-gradient-electric">DEVELOPMENT PROCESS</span>
          </h2>
          <p className="text-slate-300 text-base mt-3">
            A disciplined 7-step roadmap designed to launch high-performance digital products.
          </p>
        </div>

        {/* Steps — each card is its own component so hooks work correctly */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {steps.map((item, idx) => (
            <StepCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
