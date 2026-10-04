import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { ServiceCard } from '../cards/ServiceCard';
import { ArrowRight } from 'lucide-react';

export const ServicesPreviewSection = ({ onOpenInquiryModal }) => {
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

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenInquiryModal={onOpenInquiryModal}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
