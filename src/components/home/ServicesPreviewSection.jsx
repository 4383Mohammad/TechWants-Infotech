import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { ServiceCard } from '../cards/ServiceCard';
import { ArrowRight } from 'lucide-react';

export const ServicesPreviewSection = ({ onOpenInquiryModal }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
              WHAT WE DO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              EXPERT DIGITAL & <span className="text-gradient">SOFTWARE SERVICES</span>
            </h2>
            <p className="text-slate-600 text-base mt-2">
              From web development and local SEO to custom ERP software and e-commerce solutions.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shrink-0"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Cards Slider (Full Bleed) */}
        <div className="relative group/slider -mx-4 sm:-mx-6 lg:-mx-8 mt-8">
          
          {/* Right Edge Fade Mask (indicates more content) */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300"></div>
          )}

          {/* Left Button */}
          {canScrollLeft && (
            <button 
              onClick={scrollLeft}
              className="flex absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-pink-100/50 text-brand-600 p-2.5 md:p-3.5 rounded-full opacity-90 hover:opacity-100 transition-all duration-300 hover:bg-brand-50 hover:scale-110 active:scale-95 items-center justify-center"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 sm:gap-8 pb-12 pt-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8 hide-scrollbar scroll-smooth"
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
          {canScrollRight && (
            <button 
              onClick={scrollRight}
              className="flex absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-pink-100/50 text-brand-600 p-2.5 md:p-3.5 rounded-full opacity-90 hover:opacity-100 transition-all duration-300 hover:bg-brand-50 hover:scale-110 active:scale-95 items-center justify-center"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
