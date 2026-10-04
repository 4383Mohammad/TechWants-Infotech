import React from 'react';
import { ArrowUpRight, MessageSquareCode, Sparkles, Zap, Globe, TrendingUp } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/contact';
import { useScrollReveal } from '../../hooks/useAnimation';

export const CTASection = ({ onOpenInquiryModal }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 rounded-3xl p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-slate-800 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
          }`}
        >
          
          {/* Ambient glows (desktop only — blur is expensive on mobile) */}
          <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden md:block absolute bottom-0 left-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Grid overlay (desktop only) */}
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(219,39,119,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(219,39,119,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none rounded-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            
            {/* Left: Text content */}
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Let's Build Something Great</span>
              </div>

              <h2
                className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold tracking-tight text-white leading-tight"
                style={{ animation: isVisible ? 'fadeUp 0.7s ease-out 0.2s both' : 'none' }}
              >
                READY TO GROW{' '}
                <span className="text-gradient-animated">YOUR BUSINESS?</span>
              </h2>

              <p
                className="text-slate-300 text-base sm:text-lg leading-relaxed"
                style={{ animation: isVisible ? 'fadeUp 0.7s ease-out 0.35s both' : 'none' }}
              >
                Let's turn your idea into a powerful digital product. From responsive web applications to custom ERP software and data-driven SEO campaigns.
              </p>

              {/* Mini stat badges */}
              <div
                className="flex flex-wrap items-center gap-3 pt-1"
                style={{ animation: isVisible ? 'fadeUp 0.7s ease-out 0.5s both' : 'none' }}
              >
                {[
                  { icon: Zap, text: 'Fast Delivery' },
                  { icon: Globe, text: 'SEO Optimized' },
                  { icon: TrendingUp, text: 'Growth Focused' },
                ].map((badge, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold">
                    <badge.icon className="w-3.5 h-3.5 text-pink-400" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0"
              style={{ animation: isVisible ? 'slideInRight 0.7s ease-out 0.4s both' : 'none' }}
            >
              <button
                onClick={onOpenInquiryModal}
                aria-label="Start a project with TechWants Infotech"
                className="btn-ripple inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talk on WhatsApp with TechWants Infotech"
                className="btn-ripple inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <MessageSquareCode className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>TALK ON WHATSAPP</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
