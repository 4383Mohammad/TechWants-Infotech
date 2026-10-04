import React from 'react';
import { useScrollReveal } from '../../hooks/useAnimation';

const variants = {
  'fade-up':    'translate-y-10 opacity-0',
  'fade-down':  '-translate-y-10 opacity-0',
  'fade-left':  '-translate-x-10 opacity-0',
  'fade-right': 'translate-x-10 opacity-0',
  'fade-in':    'opacity-0',
  'zoom-in':    'scale-95 opacity-0',
};

/**
 * AnimatedSection — Wraps children with scroll-triggered reveal animation.
 *
 * @param {string} variant    - 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'zoom-in'
 * @param {number} delay      - Tailwind delay class (e.g. 'delay-200')
 * @param {string} className  - Extra classes for the wrapper
 * @param {string} as         - HTML tag to render ('div', 'section', 'article', etc.)
 */
export const AnimatedSection = ({
  children,
  variant = 'fade-up',
  delay = '',
  duration = 'duration-700',
  className = '',
  as: Tag = 'div',
}) => {
  const { ref, isVisible } = useScrollReveal();

  const base = variants[variant] || variants['fade-up'];

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out ${duration} ${delay} ${
        isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100' : base
      } ${className}`}
      style={!isVisible ? { willChange: 'transform, opacity' } : undefined}
    >
      {children}
    </Tag>
  );
};
