import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — professional fade + subtle slide-up on every route change.
 * No dramatic curtain. Just a clean, modern content reveal like Linear, Vercel, or Stripe.
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState('visible'); // 'visible' | 'out' | 'in'
  const prevPath = useRef(location.pathname);
  const timer1 = useRef(null);
  const timer2 = useRef(null);

  useEffect(() => {
    if (location.pathname === prevPath.current) {
      setDisplayChildren(children);
      return;
    }

    prevPath.current = location.pathname;
    clearTimeout(timer1.current);
    clearTimeout(timer2.current);

    // Step 1: fade + slide content out
    setPhase('out');

    // Step 2: swap content while invisible, then fade + slide back in
    timer1.current = setTimeout(() => {
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setPhase('in');

      // Step 3: settle to visible
      timer2.current = setTimeout(() => setPhase('visible'), 420);
    }, 220);

    return () => {
      clearTimeout(timer1.current);
      clearTimeout(timer2.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Keep in sync when same path (e.g. modal opens/closes)
  useEffect(() => {
    if (phase === 'visible') {
      setDisplayChildren(children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const style = {
    transition: 'opacity 220ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: phase === 'out' ? 0 : 1,
    transform:
      phase === 'out' ? 'translateY(12px)' :
      phase === 'in'  ? 'translateY(0px)'  :
      'translateY(0px)',
    willChange: 'opacity, transform',
  };

  return (
    <div style={style}>
      {displayChildren}
    </div>
  );
};
