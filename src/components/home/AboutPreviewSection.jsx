import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../ui/AnimatedSection';
import { useScrollReveal } from '../../hooks/useAnimation';

const cards = [
  {
    icon: Target,
    iconBg: 'bg-pink-50 text-brand-900',
    border: 'hover:border-pink-300',
    title: 'Our Mission',
    description: 'To empower businesses with high-performance web applications, reliable custom ERP systems, and targeted digital marketing that generates measurable client leads.',
  },
  {
    icon: Compass,
    iconBg: 'bg-rose-50 text-rose-600',
    border: 'hover:border-rose-300',
    title: 'Our Vision',
    description: 'To be the most trusted technology partner for growing businesses, delivering clean scalable code, transparent communication, and long-term technical value.',
  },
  {
    icon: Award,
    iconBg: 'bg-black text-pink-400',
    border: 'hover:border-pink-300',
    title: 'Why TechWants',
    description: 'We do not build basic freelancer templates. Every solution is custom-architected for speed, security, lead conversion, and future API expansion.',
  },
];

export const AboutPreviewSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background orb (desktop only) */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-3xl mb-14 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            ABOUT TECHWANTS INFOTECH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            WE TURN IDEAS INTO{' '}
            <span className="text-gradient-animated">DIGITAL REALITY.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            TechWants Infotech provides modern digital and technology solutions for businesses looking to establish, automate, and expand their online presence.
          </p>
        </div>

        {/* Mission/Vision/Values cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <AnimatedSection
                key={idx}
                variant="fade-up"
                delay={`delay-${idx * 200}`}
                duration="duration-700"
                className={`bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm transition-all duration-300 space-y-4 group card-hover-lift ${card.border}`}
              >
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
                {/* Animated bottom border reveal */}
                <div className="h-0.5 w-0 bg-gradient-to-r from-brand-600 to-rose-600 group-hover:w-full transition-all duration-500 rounded-full" />
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA Link */}
        <AnimatedSection variant="fade-up" delay="delay-500" className="mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 animated-underline group"
          >
            <span>LEARN MORE ABOUT OUR COMPANY &amp; FOUNDER</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
};
