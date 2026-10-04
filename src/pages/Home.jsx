import React, { useEffect, lazy, Suspense } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustSection } from '../components/home/TrustSection';
import { updateSEO } from '../utils/seo';
import { buildOrganizationSchema, buildFAQSchema } from '../utils/schema';
import { faqs } from '../data/faqs';
import { company } from '../data/company';
import { HelpCircle, Loader2 } from 'lucide-react';

const AboutPreviewSection = lazy(() => import('../components/home/AboutPreviewSection').then(m => ({ default: m.AboutPreviewSection })));
const ServicesPreviewSection = lazy(() => import('../components/home/ServicesPreviewSection').then(m => ({ default: m.ServicesPreviewSection })));
const FeaturedProjectsSection = lazy(() => import('../components/home/FeaturedProjectsSection').then(m => ({ default: m.FeaturedProjectsSection })));
const WhyTechWantsSection = lazy(() => import('../components/home/WhyTechWantsSection').then(m => ({ default: m.WhyTechWantsSection })));
const ProcessTimelineSection = lazy(() => import('../components/home/ProcessTimelineSection').then(m => ({ default: m.ProcessTimelineSection })));
const TechnologiesPreviewSection = lazy(() => import('../components/home/TechnologiesPreviewSection').then(m => ({ default: m.TechnologiesPreviewSection })));
const SEOSection = lazy(() => import('../components/home/SEOSection').then(m => ({ default: m.SEOSection })));
const FounderSection = lazy(() => import('../components/founder/FounderSection').then(m => ({ default: m.FounderSection })));
const FAQAccordion = lazy(() => import('../components/common/FAQAccordion').then(m => ({ default: m.FAQAccordion })));
const CTASection = lazy(() => import('../components/widgets/CTASection').then(m => ({ default: m.CTASection })));


export const Home = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    const orgSchema = buildOrganizationSchema();
    const faqSchema = buildFAQSchema(faqs.slice(0, 5));

    updateSEO({
      title: "Ideas. Innovation. Impact.",
      description: company.bio,
      canonicalUrl: company.website,
      schemaData: {
        "@context": "https://schema.org",
        "@graph": [orgSchema, faqSchema]
      }
    });
  }, []);

  return (
    <main>
      <HeroSection onOpenInquiryModal={onOpenInquiryModal} />
      <TrustSection />
      
      <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 text-brand-500 animate-spin" /></div>}>
        <AboutPreviewSection />
        <ServicesPreviewSection onOpenInquiryModal={onOpenInquiryModal} />
        <FeaturedProjectsSection />
        <WhyTechWantsSection />
        <ProcessTimelineSection />
        <TechnologiesPreviewSection />
        <SEOSection />
        <FounderSection onOpenInquiryModal={onOpenInquiryModal} />

        {/* AEO / GEO FAQ Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                ANSWER ENGINE & <span className="text-gradient">SERVICE FAQS</span>
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Direct, factual answers regarding TechWants Infotech, web development, SEO, AEO, GEO, and custom software solutions.
              </p>
            </div>

            <FAQAccordion limit={6} />
          </div>
        </section>

        <CTASection onOpenInquiryModal={onOpenInquiryModal} />
      </Suspense>
    </main>
  );
};
