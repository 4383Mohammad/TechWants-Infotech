import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TopProgressBar — thin animated progress bar at the very top of the page
 * that fires on every route change (similar to YouTube / GitHub's progress bar).
 */
export const TopProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start progress
    setVisible(true);
    setProgress(0);

    // Ramp up quickly to ~70%, then slow down (natural feel)
    const t1 = setTimeout(() => setProgress(30), 50);
    const t2 = setTimeout(() => setProgress(60), 200);
    const t3 = setTimeout(() => setProgress(80), 450);
    const t4 = setTimeout(() => setProgress(92), 750);

    // Complete + hide
    const t5 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 350);
    }, 900);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <>
      {/* Main bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[10000] h-[3px] pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.05)' }}
      >
        <div
          className="h-full rounded-r-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #db2777, #f43f5e, #f472b6)',
            transition: progress === 100
              ? 'width 0.2s ease, opacity 0.3s ease 0.15s'
              : 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: progress === 100 ? 0 : 1,
            boxShadow: '0 0 12px rgba(219,39,119,0.7)',
          }}
        />
      </div>

      {/* Glowing dot at the tip */}
      <div
        aria-hidden="true"
        className="fixed top-0 z-[10001] w-5 h-5 pointer-events-none -translate-y-1/2"
        style={{
          left: `calc(${progress}% - 10px)`,
          transition: progress === 100
            ? 'left 0.2s ease'
            : 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: progress === 100 ? 0 : 1,
        }}
      >
        <div className="w-3 h-3 rounded-full bg-brand-600 shadow-[0_0_8px_rgba(219,39,119,0.8)] mx-auto mt-[-4px]" />
      </div>
    </>
  );
};
