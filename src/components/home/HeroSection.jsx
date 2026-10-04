import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2, Zap, Code, Shield, Globe } from 'lucide-react';
import { company } from '../../data/company';

// Words to cycle through in the headline
const CYCLE_WORDS = ['SOLUTIONS', 'EXPERIENCES', 'PRODUCTS', 'PLATFORMS'];

export const HeroSection = ({ onOpenInquiryModal }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Cycle through headline words
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIdx(prev => (prev + 1) % CYCLE_WORDS.length);
        setIsFading(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden bg-gradient-to-b from-pink-50/60 via-white to-slate-50/50">
      
      {/* ── Animated Morphing Orbs (desktop only — too expensive for mobile) ── */}
      <div className="hidden md:block absolute top-12 left-[-60px] w-72 h-72 bg-pink-400/20 morph-blob blur-2xl pointer-events-none" />
      <div className="hidden md:block absolute top-32 right-[-40px] w-56 h-56 bg-rose-400/15 morph-blob blur-3xl pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="hidden md:block absolute bottom-10 left-1/3 w-40 h-40 bg-brand-600/10 morph-blob blur-2xl pointer-events-none" style={{ animationDelay: '5s' }} />

      {/* ── Dot Grid Pattern (desktop only) ── */}
      <div className="hidden md:block absolute inset-0 dot-pattern pointer-events-none" />

      {/* ── Floating Tech Orbs (desktop only) ── */}
      <div className="hidden lg:block absolute top-28 left-[55%] w-3 h-3 bg-brand-600 rounded-full opacity-60 animate-float" />
      <div className="hidden lg:block absolute top-48 right-[30%] w-2 h-2 bg-rose-400 rounded-full opacity-50" style={{ animation: 'float 5s ease-in-out 1s infinite' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ── LEFT: Typography & CTAs ── */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-brand-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
              <span>TECHWANTS INFOTECH</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-[clamp(2rem,8vw,3.75rem)] font-black text-slate-900 tracking-tight leading-[1.1]">
                WE BUILD{' '}
                <br className="hidden sm:block" />
                <span
                  className="text-gradient-animated inline-block"
                  style={{
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  DIGITAL {CYCLE_WORDS[wordIdx]}
                </span>
                <br />
                THAT DRIVE{' '}
                <span className="text-gradient-electric">GROWTH</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-xl font-bold text-slate-700 tracking-tight">
              Smart Strategy. Clean Code. Real Results.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              {company.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row items-stretch gap-3 pt-2">
              <button
                onClick={onOpenInquiryModal}
                aria-label="Start a project with TechWants Infotech"
                className="btn-ripple inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-700 hover:bg-brand-800 shadow-xl shadow-brand-700/30 hover:shadow-2xl hover:shadow-brand-700/40 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span className="text-white font-bold text-sm sm:text-base">START A PROJECT</span>
                <ArrowRight className="w-5 h-5 text-white flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-brand-600/50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span className="text-slate-900 font-bold text-sm sm:text-base">EXPLORE OUR WORK</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-5 border-t border-slate-200/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700">
              {[
                'Custom React Development',
                'SEO & Lead Growth',
                'Custom Business ERP',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Animated Dashboard Mockup ── */}
          <div
            className="hidden md:block lg:col-span-5 relative"
            style={{ animation: 'slideInRight 0.8s ease-out 0.5s both' }}
          >
            {/* Ambient Backlight (desktop only) */}
            <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-brand-600 to-rose-600 rounded-3xl opacity-20 blur-2xl" />

            {/* Laptop Frame */}
            <div className="relative bg-slate-950 rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-800 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Window Dots */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-auto text-[10px] text-slate-300 font-mono">techwantsinfotech.com</div>
              </div>

              {/* Screen Content */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4 overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-bold tracking-tight text-slate-200">Growth Dashboard</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-pink-300 text-[10px] font-bold">
                    +200% Organic Growth
                  </div>
                </div>

                {/* Animated Bar Chart */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Monthly Traffic &amp; Leads</span>
                    <TrendingUp className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="flex items-end gap-2 h-24 pt-4 px-2">
                    {[35, 48, 65, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-gradient-to-t from-brand-600 to-pink-400 shadow-lg shadow-brand-500/50' : 'bg-brand-600/' + (30 + i * 10)}`}
                        style={{
                          height: `${h}%`,
                          animation: `fadeUp 0.5s ease-out ${0.2 + i * 0.12}s both`,
                          background: i === 4
                            ? 'linear-gradient(to top, #db2777, #f472b6)'
                            : `rgba(219,39,119,${0.2 + i * 0.12})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Widgets */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Code Quality', value: '100% Scalable', color: 'text-pink-400' },
                    { label: 'Inquiries', value: 'Live WhatsApp', color: 'text-pink-300' },
                  ].map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 hover:border-brand-700/50 transition-colors"
                      style={{ animation: `fadeUp 0.5s ease-out ${0.9 + i * 0.15}s both` }}
                    >
                      <div className="text-[10px] text-slate-300 uppercase font-bold">{w.label}</div>
                      <div className={`text-sm font-bold ${w.color} mt-1`}>{w.value}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Floating Badges */}
            <div className="hidden lg:flex absolute -bottom-6 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-pink-100 items-center gap-3 z-20 animate-float">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Modern Stack</div>
                <div className="text-[10px] text-slate-600 font-semibold">React • Vite • Node</div>
              </div>
            </div>

            <div className="hidden lg:flex absolute -top-6 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-pink-100 items-center gap-3 z-20" style={{ animation: 'float 6s ease-in-out 2s infinite' }}>
              <div className="w-9 h-9 rounded-xl bg-black text-pink-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Ultra Fast</div>
                <div className="text-[10px] text-slate-600 font-semibold">Core Web Vitals</div>
              </div>
            </div>

            {/* Extra badge — shield */}
            <div className="hidden xl:flex absolute top-1/2 -right-8 -translate-y-1/2 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-2 z-20" style={{ animation: 'float 6s ease-in-out 4s infinite' }}>
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-bold text-slate-900">100% Secure</div>
            </div>

          </div>

        </div>

        {/* ── Stats Bar ── */}
        <div className="mt-14 pt-10 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[
            { value: 'Top', label: 'Custom Solutions', color: 'text-brand-600' },
            { value: '100%', label: 'Client Satisfaction', color: 'text-slate-900' },
            { value: '3+', label: 'Years Experience', color: 'text-brand-600' },
            { value: '24/7', label: 'Technical Support', color: 'text-slate-900' },
          ].map((stat, i) => (
            <div key={i} className="text-center sm:text-left group">
              <div className={`text-2xl sm:text-3xl font-black ${stat.color} group-hover:scale-110 transition-transform inline-block`}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
