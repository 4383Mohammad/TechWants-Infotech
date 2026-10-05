import React, { useEffect } from 'react';
import { services } from '../data/services';
import { ServiceCard } from '../components/cards/ServiceCard';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CTASection } from '../components/widgets/CTASection';
import { updateSEO } from '../utils/seo';
import { buildBreadcrumbSchema, buildFAQSchema } from '../utils/schema';
import { faqs } from '../data/faqs';
import { company } from '../data/company';

export const Services = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    const breadcrumbSchema = buildBreadcrumbSchema([
      { name: "Services", url: `${company.website}/services` }
    ]);
    const faqSchema = buildFAQSchema(faqs);

    updateSEO({
      title: "Our IT & Software Services",
      description: `TechWants Infotech provides five core IT services: Web Development, Technical SEO, Custom ERP Software, E-Commerce Development, and Website Maintenance.`,
      canonicalUrl: `${company.website}/services`,
      schemaData: {
        "@context": "https://schema.org",
        "@graph": [breadcrumbSchema, faqSchema]
      }
    });
  }, []);

  return (
    <main className="pt-28">
      {/* Header with Breadcrumbs & Answer-First Summary */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <Breadcrumbs items={[{ name: "Services", url: "/services" }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
              OUR CORE OFFERINGS
            </div>
            
            <h1 className="text-[clamp(1.75rem,6vw,3.25rem)] font-black text-slate-900 tracking-tight leading-tight">
              COMPREHENSIVE <span className="text-gradient">IT &amp; SOFTWARE SERVICES</span>
            </h1>

            {/* Answer-First Content Summary */}
            <div className="mt-4 p-4 rounded-2xl bg-pink-50/70 border border-pink-100/80 text-slate-800 text-base font-semibold leading-relaxed">
              TechWants Infotech provides five core digital services: Web Development (React & Vite), Technical SEO & Digital Marketing, Custom ERP & Software Solutions, E-Commerce Development, and Continuous Website Maintenance.
            </div>
          </div>

        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Cards Slider (Full Bleed) */}
          <div className="relative group/slider -mx-4 sm:-mx-6 lg:-mx-8 mt-8">
            
            {/* Right Edge Fade Mask (indicates more content) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Left Button */}
            <button 
              onClick={() => document.getElementById('services-slider').scrollBy({ left: -400, behavior: 'smooth' })}
              className="hidden md:flex absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-pink-100/50 text-brand-600 p-3.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-brand-50 hover:scale-110 active:scale-95 items-center justify-center"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div 
              id="services-slider"
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-12 pt-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {services.map((service) => (
                <div key={service.id} className="snap-start shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] flex items-stretch">
                  <ServiceCard
                    service={service}
                    onOpenInquiryModal={onOpenInquiryModal}
                  />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button 
              onClick={() => document.getElementById('services-slider').scrollBy({ left: 400, behavior: 'smooth' })}
              className="hidden md:flex absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-pink-100/50 text-brand-600 p-3.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:bg-brand-50 hover:scale-110 active:scale-95 items-center justify-center"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Services Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Factual answers regarding our technology services and delivery model.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
