import React, { useEffect } from 'react';
import { technologyCategories } from '../data/technologies';
import { CTASection } from '../components/widgets/CTASection';
import { Code, CheckCircle2 } from 'lucide-react';
import { updateSEO } from '../utils/seo';
import { company } from '../data/company';

export const Technologies = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    updateSEO({
      title: "Technology Stack",
      description: `Explore the modern technology stack used by ${company.name}: React, Next.js, Node.js, Express, MySQL, PostgreSQL, Tailwind CSS, Google Search Console, Google Analytics.`,
      canonicalUrl: `${company.website}/technologies`
    });
  }, []);

  return (
    <main className="pt-28">
      {/* Header */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>TECHNOLOGY ECOSYSTEM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            OUR COMPLETE <span className="text-gradient">TECHNOLOGY STACK</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            We build digital products using production-grade frameworks engineered for speed, security, and enterprise scalability.
          </p>
        </div>
      </section>

      {/* Tech Categories Breakdown */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {technologyCategories.map((cat) => (
            <div key={cat.id} className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{cat.title}</h2>
                <p className="text-sm text-slate-600 mt-1">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((tech, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 hover:border-pink-200 transition-colors flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                      {tech.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{tech.name}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
