import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { services } from '../../data/services';
import { generateProjectInquiryWhatsAppUrl } from '../../utils/contact';
import { submitLead } from '../../services/leadService';
import { LogoIcon } from './Logo';
import { company } from '../../data/company';

export const ProjectInquiryModal = ({ isOpen, onClose }) => {
  // ✅ Hooks must always run — BEFORE any conditional return
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    service: 'WEB DEVELOPMENT',
    projectType: 'Custom Solution',
    budget: '₹50,000 - ₹1,00,000',
    timeline: '1 Month',
    projectDescription: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Early return AFTER hooks
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your Name and Phone Number.");
      return;
    }

    // Persist lead to future backend / local store
    await submitLead({
      ...formData,
      source: "Project Inquiry Modal"
    });

    setSubmitted(true);

    // Generate WhatsApp URL and open synchronously to avoid popup blockers
    const waUrl = generateProjectInquiryWhatsAppUrl(formData);
    window.open(waUrl, '_blank');
    
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-600 via-rose-500 to-pink-500 p-5 sm:p-7 text-white relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Close Project Inquiry Modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:ring-2 focus:ring-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
            <span>TechWants Project Portal</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Start A Project
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm mt-1">
            Fill out your requirements to generate an instant WhatsApp project quote.
          </p>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-brand-900 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Connecting to WhatsApp...</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your project details have been formatted. Opening WhatsApp to submit your inquiry directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-5 overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label htmlFor="modal-company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Business Name
                </label>
                <input
                  id="modal-company"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. ABC Pvt Ltd"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Service Category
                </label>
                <select
                  id="modal-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium bg-white"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Budget Range
                </label>
                <select
                  id="modal-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium bg-white"
                >
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                  <option value="₹2,50,000+">₹2,50,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="modal-description" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Project Requirements & Overview *
              </label>
              <textarea
                id="modal-description"
                name="projectDescription"
                rows="3"
                required
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Describe your project, main features needed, or goals..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-brand-600 text-white font-bold text-base shadow-lg shadow-pink-600/20 border border-slate-800 transition-all duration-200 active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              <span>SEND INQUIRY ON WHATSAPP</span>
            </button>

            <p className="text-center text-xs text-slate-600">
              Direct connection with {company.name} team ({company.phone}).
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
