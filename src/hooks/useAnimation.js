import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — Triggers when element enters viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {{ ref, isVisible }}
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

/**
 * useCountUp — Animates a number from 0 to target when visible.
 * @param {number} target - The final number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} trigger - Start when true
 */
export const useCountUp = (target, duration = 1800, trigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
};
