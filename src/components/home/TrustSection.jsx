import React from 'react';
import { trustItems, TrustCard } from '../cards/TrustCard';

export const TrustSection = () => {
  return (
    <section className="py-8 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, idx) => (
            <TrustCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
