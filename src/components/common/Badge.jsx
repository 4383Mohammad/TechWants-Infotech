import React from 'react';

export const Badge = ({ children, variant = "blue", className = "" }) => {
  const variants = {
    blue: "bg-pink-50 text-brand-900 border-pink-200/80",
    pink: "bg-pink-50 text-brand-900 border-pink-200/80",
    navy: "bg-slate-900 text-pink-400 border-slate-700",
    gradient: "bg-gradient-to-r from-brand-600 via-rose-500 to-pink-500 text-white border-transparent",
    outline: "bg-white/80 text-slate-700 border-slate-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase ${variants[variant] || variants.blue} ${className}`}>
      {children}
    </span>
  );
};
