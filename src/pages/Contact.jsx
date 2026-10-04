import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquareCode, Send, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { company } from '../data/company';
import { services } from '../data/services';
import { getWhatsAppUrl, generateFormWhatsAppUrl } from '../utils/contact';
import { submitLead } from '../services/leadService';
import { updateSEO } from '../utils/seo';

export const Contact = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    updateSEO({
      title: "Contact Us",
      description: `Contact ${company.name} and Founder Mansuri Mohammad. Phone / WhatsApp: ${company.phone}. Direct project inquiries and consultations.`,
      canonicalUrl: `${company.website}/contact`
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    service: 'WEB DEVELOPMENT',
    budget: '₹50,000 - ₹1,00,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert("Please complete all required fields marked with *");
      return;
    }

    await submitLead({
      ...formData,
      source: "Contact Page Form"
    });

    setSubmitted(true);

    const waUrl = generateFormWhatsAppUrl(formData);
    // Open synchronously to avoid popup blockers
    window.open(waUrl, '_blank');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="pt-28">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            GET IN TOUCH
          </div>
          <h1 className="text-[clamp(1.75rem,6vw,3.25rem)] font-black text-slate-900 tracking-tight leading-tight">
            LET'S DISCUSS <span className="text-gradient">YOUR NEXT PROJECT</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Have a project requirement or looking to automate your business software? Reach out to Founder & Technology Consultant Mansuri Mohammad.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Founder Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{company.name}</h2>
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mt-1">
                    {company.tagline}
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700 uppercase">Phone & WhatsApp</div>
                      <a href={`tel:${company.phoneRaw}`} className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block">{company.phone}</a>
                      <div className="text-xs text-slate-600 font-medium">Direct Founder Line: {company.founder}</div>
                    </div>
                  </div>

                  {company.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-700 uppercase">Email Address</div>
                        <a href={`mailto:${company.email}`} className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors block">{company.email}</a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-700 uppercase">Business Hours</div>
                      <div className="text-sm font-bold text-slate-900">{company.hours}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <a
                    href={`tel:${company.phoneRaw}`}
                    aria-label={`Call TechWants Infotech: ${company.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now ({company.phone})</span>
                  </a>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Consultation with TechWants Infotech"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-black text-white font-bold text-sm shadow-md shadow-brand-600/20 border border-slate-800 transition-colors"
                  >
                    <MessageSquareCode className="w-4 h-4 text-pink-400" />
                    <span>WhatsApp Consultation</span>
                  </a>
                </div>

              </div>

              {/* Verified Trust Card */}
              <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Direct Communication Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every inquiry submitted here is directly routed to the <strong>{company.name}</strong> tech team. Fast response, direct assistance, and zero delays.
                </p>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
                
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Client Inquiry Form</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Send Us A Message</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Fill in your details below to generate an instant formatted WhatsApp inquiry.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-pink-100 text-brand-900 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">Connecting to WhatsApp...</h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Opening WhatsApp to send your inquiry directly to Founder Mansuri Mohammad.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. ABC Pvt Ltd"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Required Service *
                        </label>
                        <select
                          id="contact-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium bg-white"
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Estimated Budget
                        </label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium bg-white"
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
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Requirement Details *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirement or business automation goals..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-pink-100 outline-none text-sm font-medium resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-slate-950 hover:bg-brand-600 text-white font-bold text-base shadow-lg shadow-pink-600/20 border border-slate-800 transition-all duration-200 active:scale-98"
                    >
                      <MessageSquareCode className="w-5 h-5" />
                      <span>SUBMIT & OPEN WHATSAPP INQUIRY</span>
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};
