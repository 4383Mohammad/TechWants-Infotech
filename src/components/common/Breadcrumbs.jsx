import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 px-1 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-brand-600 font-medium transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-800" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link to={item.url} className="hover:text-brand-600 font-medium transition-colors">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
