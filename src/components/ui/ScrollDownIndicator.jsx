import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * ScrollDownIndicator — animated scroll-down indicator shown at the
 * bottom of the Hero section. Bounces gently to invite users to scroll.
 * Auto-hides once the user scrolls more than 120px.
 */
export const ScrollDownIndicator = ({ targetId = 'main-content' }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="hidden md:flex justify-center mt-10 sm:mt-14"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        onClick={handleClick}
        aria-label="Scroll down to explore"
        className="group flex flex-col items-center gap-2 focus:outline-none"
      >
        {/* Mouse icon */}
        <div className="relative w-6 h-10 border-2 border-slate-400 group-hover:border-brand-600 rounded-full flex items-start justify-center pt-1.5 transition-colors duration-300">
          {/* Scroll dot */}
          <div
            className="w-1 h-2 bg-slate-400 group-hover:bg-brand-600 rounded-full transition-colors duration-300"
            style={{ animation: 'scrollDot 1.6s ease-in-out infinite' }}
          />
        </div>

        {/* Bouncing chevrons */}
        <div className="flex flex-col items-center -space-y-2">
          <ChevronDown
            className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors"
            style={{ animation: 'chevronBounce 1.6s ease-in-out 0.1s infinite' }}
          />
          <ChevronDown
            className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors"
            style={{ animation: 'chevronBounce 1.6s ease-in-out 0.35s infinite' }}
          />
        </div>

        <span className="text-[10px] font-bold text-slate-400 group-hover:text-brand-600 tracking-[0.15em] uppercase transition-colors duration-300">
          SCROLL
        </span>
      </button>

      {/* Keyframes injected as a style tag */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          50%  { transform: translateY(8px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
