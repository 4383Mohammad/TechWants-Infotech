import React from 'react';
import { company } from '../../data/company';
import logoImg from '../../assets/logo.webp';

/**
 * TechWants Infotech Icon Logo (transparent)
 */
export const LogoIcon = ({ className = 'h-10 w-auto' }) => (
  <img
    src={logoImg}
    alt={company.name}
    width="208"
    height="120"
    decoding="async"
    loading="eager"
    fetchpriority="high"
    className={`object-contain ${className}`}
  />
);

/**
 * Full TechWants Infotech Logo (transparent)
 */
export const Logo = ({ className = '', imgClassName = 'h-10 sm:h-12 w-auto' }) => (
  <div className={`inline-flex items-center ${className}`}>
    <img
      src={logoImg}
      alt={company.name}
      width="208"
      height="120"
      decoding="async"
      loading="eager"
      fetchpriority="high"
      className={`object-contain ${imgClassName}`}
    />
  </div>
);
