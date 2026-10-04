import React, { useEffect } from 'react';
import { FounderSection } from '../components/founder/FounderSection';
import { WhyTechWantsSection } from '../components/home/WhyTechWantsSection';
import { ProcessTimelineSection } from '../components/home/ProcessTimelineSection';
import { CTASection } from '../components/widgets/CTASection';
import { Target, Compass, ShieldCheck } from 'lucide-react';
import { company } from '../data/company';
import { updateSEO } from '../utils/seo';

export const About = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    updateSEO({
      title: "About Us & Founder",
      description: `Learn about TechWants Infotech and Founder & Technology Consultant Mansuri Mohammad. Custom web development, ERP software, and SEO.`,
      canonicalUrl: `${company.website}/about`
    });
  }, []);

  return (
    <main className="pt-28">
      {/* Header */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            ABOUT TECHWANTS INFOTECH
          </div>
          <h1 className="text-[clamp(1.75rem,6vw,3.25rem)] font-black text-slate-900 tracking-tight leading-tight">
            WE TURN IDEAS INTO <span className="text-gradient">DIGITAL REALITY.</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            {company.bio}
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <FounderSection onOpenInquiryModal={onOpenInquiryModal} />

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-brand-900 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To build modern, high-performance web applications, reliable custom ERP systems, and targeted digital marketing strategies that turn online traffic into verified client leads.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-pink-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To establish TechWants Infotech as a premier technology consultancy known for engineering excellence, clean scalable architecture, and honest long-term client support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyTechWantsSection />
      <ProcessTimelineSection />
      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
