import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Mail, MessageSquareCode, Linkedin, CheckCircle2, ArrowRight, Maximize2, X, Camera } from 'lucide-react';
import { company } from '../../data/company';
import { getWhatsAppUrl } from '../../utils/contact';
import founderPhotoMain from '../../assets/founder/founder_main.jpg';

const activePhoto = {
  src: founderPhotoMain,
  title: "Mansuri Mohammad",
  alt: "Mansuri Mohammad - Founder TechWants Infotech"
};

export const FounderSection = ({ onOpenInquiryModal }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-pink-50/80 via-white to-pink-50/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-pink-100 shadow-xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Interactive Founder Photo & Gallery */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-xs sm:max-w-sm mx-auto">
                
                {/* Glow Ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-600 to-rose-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                
                {/* Photo Frame */}
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 aspect-[3/4] group">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    width="675"
                    height="1200"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-all duration-500 transform group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20"></div>

                  {/* Top Badge & Lightbox Trigger */}
                  <div className="absolute top-3 right-3 flex items-center justify-end pointer-events-auto">
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      aria-label="Enlarge founder image"
                      className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-brand-600 transition-colors shadow-lg"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-lg font-extrabold leading-tight">{company.founder}</div>
                    <div className="text-xs text-pink-300 font-semibold tracking-wide">
                      {company.designation}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Founder Details & Intro */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
                  MEET THE FOUNDER
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {company.founder}
                </h2>
                
                <div className="flex items-center gap-2.5 mt-2.5 text-sm font-bold text-brand-600 flex-wrap">
                  <span>{company.name}</span>
                  <span className="text-slate-400 font-normal">|</span>
                  <span className="text-slate-700 font-semibold">{company.designation}</span>
                </div>
              </div>

              <blockquote className="text-slate-800 text-sm sm:text-base leading-relaxed italic border-l-4 border-brand-600 pl-4 bg-white/70 p-3 sm:p-4 rounded-r-xl border border-slate-100">
                "{company.founderBio}"
              </blockquote>

              <p className="text-sm text-slate-700 leading-relaxed">
                At TechWants Infotech, we believe that modern businesses require smart digital strategy, clean scalable code, and honest communication. Whether you need a high-converting web application, automated ERP software, or localized search visibility, we build solutions focused strictly on real business growth.
              </p>

              {/* Core Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Business-Focused Architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Clean & Scalable Code</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Transparent Communication</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Long-Term Technical Support</span>
                </div>
              </div>

              {/* Founder Contact Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={onOpenInquiryModal}
                  aria-label="Start a project with founder Mansuri Mohammad"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-600/20"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/20"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  <span>WhatsApp Mansuri Mohammad</span>
                </a>

                <a
                  href={`tel:${company.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call {company.phone}</span>
                </a>

                {company.social.linkedin && (
                  <a
                    href={company.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Mansuri Mohammad LinkedIn profile"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-pink-50 text-brand-900 hover:bg-pink-100 border border-pink-200 font-semibold text-xs transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for HD Viewing */}
      {isLightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close image lightbox"
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
              />
            </div>

            <div className="mt-4 text-center text-white space-y-1">
              <div className="text-xl font-bold">{company.founder}</div>
              <div className="text-xs text-pink-300 font-medium">{activePhoto.title} — {company.designation}</div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

