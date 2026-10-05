import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { company } from '../../data/company';
import { getWhatsAppUrl } from '../../utils/contact';
import { Logo } from './Logo';

export const Navbar = ({ onOpenInquiryModal }) => {
  const [scrolled, setScrolled]         = useState(false);   // past 10px?
  const [hidden, setHidden]             = useState(false);   // hide on scroll-down
  const [atTop, setAtTop]               = useState(true);    // exactly at top
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  // ── Smart scroll handler ──
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtTop(y < 10);
        setScrolled(y > 10);

        // Hide when scrolling DOWN past 80px; show when scrolling UP
        if (y > lastScrollY.current + 8 && y > 80) {
          setHidden(true);
          setMobileMenuOpen(false);   // close mobile menu on hide
        } else if (y < lastScrollY.current - 8 || y < 80) {
          setHidden(false);
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close mobile menu on route change ──
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',         path: '/' },
    { name: 'About',        path: '/about' },
    { name: 'Services',     path: '/services' },
    { name: 'Projects',     path: '/projects' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Blog',         path: '/blog' },
    { name: 'Contact',      path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* ─────────────────────────────────────────── */}
      {/*  HEADER                                     */}
      {/* ─────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50',
          /* Only transition transform+padding — NOT backdrop-filter (kills mobile) */
          'transition-[transform,background-color,box-shadow,padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          hidden ? '-translate-y-full' : 'translate-y-0',
          /* Mobile: solid white bg (no backdrop-blur — most expensive CSS on phones) */
          /* Desktop: glass effect */
          scrolled
            ? 'bg-white/95 md:bg-white/80 md:backdrop-blur-xl border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
            : 'bg-white/0',
          scrolled ? 'py-2.5' : 'py-4 md:py-5',
        ].join(' ')}
      >
        {/* Animated glass border shimmer when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">

            {/* ── Logo ── */}
            <Link
              to="/"
              aria-label="TechWants Infotech — Go to Homepage"
              className="flex items-center gap-3 group flex-shrink-0"
            >
              {/* Logo scales slightly and glows on hover */}
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo />
              </div>
            </Link>

            {/* ── Desktop Nav (pill style) ── */}
            <nav
              className={[
                'hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1.5 border transition-all duration-300',
                scrolled
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-white/20 border-white/30',
              ].join(' ')}
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={[
                      'relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-white text-brand-600 shadow-sm font-semibold'
                        : scrolled
                          ? 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                          : 'text-slate-700 hover:text-brand-600 hover:bg-white/60',
                    ].join(' ')}
                  >
                    {link.name}
                    {/* Active dot indicator */}
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-600 opacity-0" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {/* WhatsApp subtle link */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message TechWants on WhatsApp"
                className={[
                  'hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 group',
                  scrolled
                    ? 'text-brand-700 bg-pink-50 hover:bg-pink-100 border border-pink-200'
                    : 'text-slate-800 bg-white/80 hover:bg-white border border-pink-100',
                ].join(' ')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-brand-600 group-hover:scale-110 transition-transform duration-200">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.463 3.432 1.27 4.876L2 22l5.27-1.248A9.953 9.953 0 0012.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.126a8.104 8.104 0 01-4.125-1.126l-.296-.176-3.128.74.774-3.047-.193-.313A8.1 8.1 0 013.9 12.004c0-4.472 3.637-8.109 8.104-8.109 4.472 0 8.105 3.637 8.105 8.109 0 4.472-3.633 8.122-8.105 8.122z"/>
                </svg>
                WhatsApp
              </a>

              {/* Primary CTA — "Let's Talk" with shimmer + glow */}
              <button
                onClick={onOpenInquiryModal}
                aria-label="Start a Project — Open Inquiry Form"
                className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #db2777 0%, #e11d48 50%, #f43f5e 100%)',
                  boxShadow: '0 4px 20px rgba(219, 39, 119, 0.35)',
                }}
              >
                {/* Shimmer sweep on hover */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                  }}
                />
                {/* Glow ring pulse */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 0 4px rgba(219, 39, 119, 0.2), 0 0 20px rgba(219, 39, 119, 0.3)' }}
                />
                {/* Ripple on click */}
                <span className="absolute inset-0 rounded-full active:bg-white/20 transition-colors duration-100" />

                <span className="relative z-10">Let’s Talk</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </button>
            </div>

            {/* ── Mobile: WhatsApp icon + hamburger ── */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 rounded-full bg-pink-50 text-brand-900 border border-pink-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.463 3.432 1.27 4.876L2 22l5.27-1.248A9.953 9.953 0 0012.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.126a8.104 8.104 0 01-4.125-1.126l-.296-.176-3.128.74.774-3.047-.193-.313A8.1 8.1 0 013.9 12.004c0-4.472 3.637-8.109 8.104-8.109 4.472 0 8.105 3.637 8.105 8.109 0 4.472-3.633 8.122-8.105 8.122z"/>
                </svg>
              </a>
              <button
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                className={[
                  'p-2.5 rounded-xl transition-all duration-200',
                  scrolled
                    ? 'text-slate-800 hover:bg-slate-100'
                    : 'text-slate-800 bg-white/80 hover:bg-white',
                ].join(' ')}
              >
                {/* Animated hamburger → X */}
                <div className="w-5 h-5 relative flex flex-col justify-center gap-1.5">
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      mobileMenuOpen ? 'rotate-45 translate-y-[8px] w-5' : 'w-5'
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-200 ${
                      mobileMenuOpen ? 'opacity-0 w-3' : 'w-3.5'
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-[8px] w-5' : 'w-5'
                    }`}
                  />
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────── */}
        {/*  MOBILE DRAWER                          */}
        {/* ─────────────────────────────────────── */}
        <div
          className={[
            'md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="bg-white border-t border-slate-100 px-4 pt-4 pb-6 shadow-xl">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {navLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ transitionDelay: mobileMenuOpen ? `${i * 35}ms` : '0ms' }}
                  className={[
                    'flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-200',
                    isActive(link.path)
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-brand-600',
                  ].join(' ')}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className={`w-4 h-4 opacity-50 ${isActive(link.path) ? 'opacity-100' : ''}`} />
                </Link>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
              {/* Start a Project — animated mobile CTA */}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenInquiryModal(); }}
                aria-label="Start a project"
                className="relative w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-base font-bold text-white overflow-hidden group active:scale-95 transition-transform duration-100"
                style={{
                  background: 'linear-gradient(135deg, #db2777 0%, #e11d48 50%, #f43f5e 100%)',
                  boxShadow: '0 6px 24px rgba(219, 39, 119, 0.4)',
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)' }}
                />
                {/* Glow pulse ring */}
                <span
                  className="absolute inset-0 rounded-2xl"
                  style={{ animation: 'glowPulse 2.5s ease-in-out infinite' }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Consultation"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-base font-bold text-slate-900 bg-pink-50 border border-pink-200 hover:bg-pink-100 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform duration-200">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.463 3.432 1.27 4.876L2 22l5.27-1.248A9.953 9.953 0 0012.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.126a8.104 8.104 0 01-4.125-1.126l-.296-.176-3.128.74.774-3.047-.193-.313A8.1 8.1 0 013.9 12.004c0-4.472 3.637-8.109 8.104-8.109 4.472 0 8.105 3.637 8.105 8.109 0 4.472-3.633 8.122-8.105 8.122z"/>
                </svg>
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>

      </header>

      {/* ─────────────────────────────────────── */}
      {/*  Scroll-reveal indicator badge          */}
      {/*  Shows when user scrolls back to top    */}
      {/* ─────────────────────────────────────── */}
      <div
        aria-hidden={atTop}
        className={[
          'fixed bottom-32 right-4 sm:bottom-36 sm:right-6 z-40 transition-all duration-300',
          !atTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          tabIndex={!atTop ? 0 : -1}
          className="w-11 h-11 rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </>
  );
};
