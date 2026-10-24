import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — instant, reliable page navigation with a smooth CSS fade-in.
 * Directly renders children on every route change with zero delays, zero state buffering,
 * and zero dropped navigation events.
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-fade-in w-full">
      {children}
    </div>
  );
};

