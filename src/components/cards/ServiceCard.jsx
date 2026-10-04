import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageSquareCode, Code2, TrendingUp, Cpu, Smartphone, Layout, Bot, ShoppingBag, ShieldCheck } from 'lucide-react';
import { generateServiceWhatsAppUrl } from '../../utils/contact';

const iconMap = {
  Code2,
  TrendingUp,
  Cpu,
  Smartphone,
  Layout,
  Bot,
  ShoppingBag,
  ShieldCheck
};

export const ServiceCard = ({ service, onOpenInquiryModal }) => {
  const IconComponent = iconMap[service.icon] || Code2;
  const whatsappUrl = generateServiceWhatsAppUrl(service.title);

  return (
    <div className="group relative bg-gradient-to-br from-pink-50/70 via-white to-pink-50/20 rounded-3xl p-6 sm:p-8 border border-pink-100/90 shadow-sm hover:shadow-xl hover:border-brand-600/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Subtle background glow on hover — opacity only (no blur = no repaint) */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-600/0 group-hover:bg-brand-600/8 rounded-full transition-colors duration-300"></div>

      <div>
        {/* Header: Icon & Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/25 group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-7 h-7" />
          </div>
          <span className="text-3xl font-black text-slate-400 group-hover:text-brand-600 transition-colors">
            {service.number}
          </span>
        </div>

        {/* Service Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-brand-600 transition-colors">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
          {service.shortDescription}
        </p>

        {/* Features Checklist */}
        <div className="space-y-2.5 border-t border-pink-100/60 pt-6 mb-8">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get Quote for ${service.title} on WhatsApp`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-600/20"
        >
          <MessageSquareCode className="w-4 h-4" />
          <span>Get Quote</span>
        </a>

        <Link
          to="/services"
          aria-label={`View Service Details for ${service.title}`}
          className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-pink-50 text-slate-700 hover:text-brand-600 border border-slate-200 transition-colors"
          title="View Service Details"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
