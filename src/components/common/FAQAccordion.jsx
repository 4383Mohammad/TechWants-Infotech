import React, { useState } from 'react';
import { faqs } from '../../data/faqs';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQAccordion = ({ limit, filterCategory }) => {
  const [openId, setOpenId] = useState("faq-1");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", ...new Set(faqs.map(f => f.category))];

  let displayFaqs = faqs;

  if (filterCategory) {
    displayFaqs = displayFaqs.filter(f => f.category.toLowerCase() === filterCategory.toLowerCase());
  } else if (selectedCat !== "All") {
    displayFaqs = displayFaqs.filter(f => f.category.toLowerCase() === selectedCat.toLowerCase());
  }

  if (limit) {
    displayFaqs = displayFaqs.slice(0, limit);
  }

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      
      {/* Category Pills (Only if not fixed filter) */}
      {!filterCategory && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordions */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {displayFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-600 rounded-2xl"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-600 shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {isOpen && (
                <div id={`faq-answer-${faq.id}`} className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p className="font-semibold text-slate-800">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
