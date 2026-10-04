import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { updateSEO } from '../utils/seo';

export const NotFound = () => {
  useEffect(() => {
    updateSEO({
      title: "404 - Page Not Found",
      description: "The page you are looking for doesn't exist or has been moved.",
    });
  }, []);

  return (
    <main className="pt-28 pb-20 min-h-[70vh] flex items-center justify-center bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated 404 Text */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-pink-200 blur-[60px] opacity-50 rounded-full"></div>
          <h1 className="relative text-[clamp(6rem,15vw,12rem)] font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-pink-500 leading-none select-none">
            404
          </h1>
        </div>
        
        {/* Content */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-brand-900 text-sm font-bold tracking-wider mb-6">
          <AlertCircle className="w-4 h-4" />
          <span>PAGE NOT FOUND</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Oops! You've ventured into the unknown.
        </h2>
        
        <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable. Let's get you back on track.
        </p>
        
        {/* Action Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          <Home className="w-5 h-5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </main>
  );
};
