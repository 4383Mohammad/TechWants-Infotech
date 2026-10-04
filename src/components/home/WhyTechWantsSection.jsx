import React from 'react';
import { Layers, ShieldCheck, Cpu, Search, Smartphone, MessageSquare, Clock, Headphones } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useScrollReveal } from '../../hooks/useAnimation';

const reasons = [
  {
    icon: Layers,
    title: "Business-Focused Solutions",
    description: "We don't build generic templates. Every feature is engineered to convert visitors into inquiries and grow revenue.",
    color: "bg-pink-50 text-brand-900",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description: "Built using React 18, Vite, Tailwind CSS, and cloud architecture for sub-second speeds and ultra-smooth experience.",
    color: "bg-slate-950 text-white",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Scalable Code",
    description: "Component-driven, decoupled data structures ready for REST API, Supabase, Firebase, and future CMS integration.",
    color: "bg-pink-100 text-brand-900",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: Search,
    title: "SEO-Friendly Development",
    description: "Structured Schema, semantic HTML5, canonical tags, and Core Web Vitals optimization built into every page.",
    color: "bg-black text-pink-400",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Flawless mobile-first experience designed specifically for smartphones, tablets, laptops, and 4K displays.",
    color: "bg-pink-50 text-brand-900",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description: "Direct access to Founder & Technology Consultant Mansuri Mohammad throughout your project lifecycle.",
    color: "bg-slate-950 text-white",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Clear milestone roadmap, disciplined development sprints, and guaranteed on-time project launches.",
    color: "bg-pink-100 text-brand-900",
    glow: "hover:shadow-brand-600/20",
  },
  {
    icon: Headphones,
    title: "Long-Term Support",
    description: "Continuous post-launch technical assistance, bug fixes, security updates, and performance monitoring.",
    color: "bg-black text-pink-400",
    glow: "hover:shadow-brand-600/20",
  }
];

export const WhyTechWantsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="why-techwants" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration (desktop only — blur is expensive on mobile) */}
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-72 h-72 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            THE TECHWANTS ADVANTAGE
          </div>
          <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold text-slate-900 tracking-tight leading-tight">
            WHY BUSINESSES CHOOSE{' '}
            <span className="text-gradient-animated">TECHWANTS INFOTECH</span>
          </h2>
          <p className="text-slate-600 text-base mt-3">
            We bridge the gap between complex software engineering and practical business growth.
          </p>
        </div>

        {/* Cards Grid — staggered reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={idx}
                variant="fade-up"
                delay={`delay-${Math.min(idx * 100, 700)}`}
                duration="duration-700"
                className={`bg-slate-50 hover:bg-white p-6 rounded-3xl border border-slate-200/70 hover:border-pink-200 transition-all duration-300 space-y-3 group card-hover-lift hover:shadow-xl ${item.glow}`}
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} shadow-sm border border-slate-200/60 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
};
