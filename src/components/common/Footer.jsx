import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { company } from '../../data/company';
import { services } from '../../data/services';
import { getWhatsAppUrl } from '../../utils/contact';
import { Logo } from './Logo';

export const Footer = ({ onOpenInquiryModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" aria-label="TechWants Infotech Home" className="inline-block hover:opacity-90 transition-opacity">
              <Logo variant="dark" />
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Digital solutions that help businesses build, grow and scale. Smart strategy, clean code, and business-focused results.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={`tel:${company.phoneRaw}`}
                aria-label={`Call TechWants Infotech: ${company.phone}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                <span className="truncate max-w-[140px] sm:max-w-none">{company.phone}</span>
              </a>
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  aria-label={`Email TechWants Infotech: ${company.email}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                  <span className="truncate max-w-[160px] sm:max-w-none">{company.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-brand-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-brand-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-300 hover:text-brand-400 transition-colors">Projects & Portfolio</Link>
              </li>
              <li>
                <Link to="/technologies" className="text-slate-300 hover:text-brand-400 transition-colors">Technologies</Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-brand-400 transition-colors">Insights & Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-brand-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="text-slate-300 hover:text-brand-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Start A Project
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Have an idea or need to automate your business software? Let's discuss your requirements today.
            </p>
            <button
              onClick={onOpenInquiryModal}
              aria-label="Request Quote"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-600/20"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Consultation"
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-brand-600 border border-pink-900/40 hover:border-pink-500 text-pink-300 hover:text-white font-semibold text-xs transition-colors"
            >
              <span>Direct WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 text-center sm:text-left">
          <div>
            © {currentYear} <span className="text-white font-semibold">{company.name}</span>. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Verified Tech Partner</span>
            </span>
            <span>Founder: {company.founder}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
