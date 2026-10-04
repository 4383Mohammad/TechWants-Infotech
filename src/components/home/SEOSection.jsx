import React from 'react';
import { Search, MapPin, Target, BarChart2, TrendingUp, Sparkles } from 'lucide-react';
import { generateServiceWhatsAppUrl } from '../../utils/contact';
import { useScrollReveal } from '../../hooks/useAnimation';
import { AnimatedSection } from '../ui/AnimatedSection';

const seoFeatures = [
  {
    icon: Search,
    title: "Technical & On-Page SEO",
    description: "Core Web Vitals optimization, clean heading hierarchy, dynamic sitemaps, and Schema markup for search engines."
  },
  {
    icon: MapPin,
    title: "Google Business Profile & Local SEO",
    description: "Optimize local citations and local Map Pack visibility so nearby customers call your business directly."
  },
  {
    icon: Sparkles,
    title: "AEO & GEO (AI Search Optimization)",
    description: "Prepare your brand to be cited and referenced by AI search engines like Perplexity, Gemini, and ChatGPT."
  },
  {
    icon: Target,
    title: "Google Ads & Meta Ads Campaigns",
    description: "Targeted paid PPC and social media advertising engineered for cost-effective customer acquisition."
  }
];

export const SEOSection = () => {
  const whatsappUrl = generateServiceWhatsAppUrl("SEO & Digital Marketing");
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Glow orbs (desktop only — blur is expensive on mobile) */}
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern (desktop only) */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(219,39,119,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(219,39,119,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Text */}
          <div
            ref={leftRef}
            className={`lg:col-span-6 space-y-6 transition-all duration-700 ease-out ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 animate-bounce-soft" />
              <span>DIGITAL GROWTH ENGINE</span>
            </div>

            <h2 className="text-[clamp(1.6rem,5vw,3rem)] font-extrabold tracking-tight leading-tight text-white">
              BUILD VISIBILITY{' '}
              <span className="text-gradient-animated">WHERE YOUR CUSTOMERS</span>{' '}
              ARE SEARCHING.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Having a beautiful website is only half the formula. TechWants Infotech structures targeted technical SEO, local map listings, and search optimization that connect your services directly to high-intent buyers.
            </p>

            {/* Animated metric bar */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 space-y-3">
              {[
                { label: 'Organic Traffic Growth', pct: 85 },
                { label: 'Local Search Visibility', pct: 92 },
                { label: 'Lead Conversion Rate', pct: 78 },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                    <span>{metric.label}</span>
                    <span className="text-brand-400">{metric.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-pink-400 rounded-full"
                      style={{
                        width: leftVisible ? `${metric.pct}%` : '0%',
                        transition: `width 1.2s ease-out ${0.3 + i * 0.25}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Free SEO Consultation on WhatsApp"
                className="btn-ripple inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <span>GET FREE SEO CONSULTATION</span>
                <TrendingUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {seoFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AnimatedSection
                  key={idx}
                  variant="fade-up"
                  delay={`delay-${idx * 150}`}
                  duration="duration-600"
                  className="bg-slate-950/80 p-6 rounded-3xl border border-slate-800 hover:border-pink-500/50 transition-all duration-300 space-y-3 group card-hover-lift"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-950/60 text-pink-300 flex items-center justify-center border border-pink-800/40 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </AnimatedSection>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
