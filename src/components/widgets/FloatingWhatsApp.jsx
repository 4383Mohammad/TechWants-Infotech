import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/contact';
import { company } from '../../data/company';

export const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
      
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="relative bg-white border border-green-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl max-w-[240px] sm:max-w-xs flex items-center gap-2"
          style={{ animation: 'fadeUp 0.3s ease-out both' }}
        >
          <span>Quick Project Chat on <strong>WhatsApp</strong></span>
          <button 
            type="button"
            onClick={handleClose}
            aria-label="Close tooltip"
            className="text-slate-400 hover:text-slate-800 p-1 shrink-0 rounded-full hover:bg-slate-100 transition-colors duration-150 relative z-10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow caret pointing down to the WhatsApp button */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-green-200 rotate-45 pointer-events-none"></div>
        </div>
      )}

      {/* Floating WhatsApp Button with Pulse Effect */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with TechWants Infotech on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-600/60 border border-green-500/30 transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
      >
        {/* Ambient Ring */}
        <span className="absolute -inset-1 rounded-full bg-green-500/20 opacity-60 pointer-events-none"></span>
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-7 sm:h-7 relative z-10"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.463 3.432 1.27 4.876L2 22l5.27-1.248A9.953 9.953 0 0012.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.126a8.104 8.104 0 01-4.125-1.126l-.296-.176-3.128.74.774-3.047-.193-.313A8.1 8.1 0 013.9 12.004c0-4.472 3.637-8.109 8.104-8.109 4.472 0 8.105 3.637 8.105 8.109 0 4.472-3.633 8.122-8.105 8.122z"/>
        </svg>
      </a>

    </div>
  );
};
