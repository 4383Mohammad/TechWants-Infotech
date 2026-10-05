import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2, Zap, Code, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '../../data/company';

// Words to cycle through in the headline
const CYCLE_WORDS = ['SOLUTIONS', 'EXPERIENCES', 'PRODUCTS', 'PLATFORMS'];

export const HeroSection = ({ onOpenInquiryModal }) => {
  const [wordIdx, setWordIdx] = useState(0);

  // Cycle through headline words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
  };

  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden bg-gradient-to-b from-pink-50/60 via-white to-slate-50/50">
      
      {/* ── Animated Morphing Orbs (desktop only) ── */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-12 left-[-60px] w-72 h-72 bg-pink-400/20 blur-2xl rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-32 right-[-40px] w-56 h-56 bg-rose-400/15 blur-3xl rounded-full pointer-events-none" 
      />

      {/* ── Dot Grid Pattern ── */}
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ── LEFT: Typography & CTAs ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-brand-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-700 flex-shrink-0" />
              <span>TECHWANTS INFOTECH</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-[clamp(2.5rem,7vw,4rem)] font-black text-slate-900 tracking-tight leading-[1.1]">
                WE BUILD{' '}
                <br className="hidden sm:block" />
                <div className="h-[1.1em] overflow-hidden inline-flex relative w-full sm:w-auto align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIdx}
                      initial={{ y: 50, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -50, opacity: 0, rotateX: 90 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="text-gradient-animated inline-block transform-gpu origin-bottom"
                    >
                      DIGITAL {CYCLE_WORDS[wordIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <br />
                THAT DRIVE{' '}
                <span className="text-gradient-electric">GROWTH</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-lg sm:text-xl font-bold text-slate-700 tracking-tight">
              Smart Strategy. Clean Code. Real Results.
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              {company.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col xs:flex-row items-stretch gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenInquiryModal}
                className="btn-ripple relative overflow-hidden group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-700 shadow-xl shadow-brand-700/30 transition-colors hover:bg-brand-800"
              >
                <span className="relative z-10 text-white font-bold text-sm sm:text-base">START A PROJECT</span>
                <ArrowRight className="relative z-10 w-5 h-5 text-white flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:border-brand-600/50 transition-colors"
                >
                  <span className="text-slate-900 font-bold text-sm sm:text-base">EXPLORE OUR WORK</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div variants={itemVariants} className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-700">
              {['Custom React Development', 'SEO & Lead Growth', 'Custom Business ERP'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* ── RIGHT: Animated Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            className="hidden md:block lg:col-span-5 relative perspective-1000"
          >
            {/* Ambient Backlight */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-600 to-rose-600 rounded-3xl opacity-20 blur-2xl" />

            {/* Laptop Frame */}
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-slate-950 rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-800"
            >
              
              {/* Window Dots */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-auto text-[10px] text-slate-300 font-mono">techwants.in</div>
              </div>

              {/* Screen Content */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4 overflow-hidden relative">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-bold tracking-tight text-slate-200">Growth Dashboard</span>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1 }}
                    className="px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-pink-300 text-[10px] font-bold"
                  >
                    +200% Organic Growth
                  </motion.div>
                </div>

                {/* Animated Bar Chart */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Monthly Traffic &amp; Leads</span>
                    <TrendingUp className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="flex items-end gap-2 h-24 pt-4 px-2">
                    {[35, 48, 65, 80, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ type: "spring", damping: 15, delay: 0.8 + i * 0.1 }}
                        className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-gradient-to-t from-brand-600 to-pink-400 shadow-lg shadow-brand-500/50' : 'bg-brand-600/' + (30 + i * 10)}`}
                        style={{
                          background: i === 4
                            ? 'linear-gradient(to top, #db2777, #f472b6)'
                            : `rgba(219,39,119,${0.2 + i * 0.12})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Widgets */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Code Quality', value: '100% Scalable', color: 'text-pink-400' },
                    { label: 'Inquiries', value: 'Live WhatsApp', color: 'text-pink-300' },
                  ].map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.2 }}
                      className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 hover:border-brand-700/50 transition-colors"
                    >
                      <div className="text-[10px] text-slate-300 uppercase font-bold">{w.label}</div>
                      <div className={`text-sm font-bold ${w.color} mt-1`}>{w.value}</div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute -bottom-6 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-pink-100 items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Modern Stack</div>
                <div className="text-[10px] text-slate-600 font-semibold">React • Vite • Node</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:flex absolute -top-6 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-pink-100 items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-black text-pink-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Ultra Fast</div>
                <div className="text-[10px] text-slate-600 font-semibold">Core Web Vitals</div>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* ── Stats Bar ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mt-16 pt-10 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 relative z-20"
        >
          {[
            { value: 'Top', label: 'Custom Solutions', color: 'text-brand-600' },
            { value: '100%', label: 'Client Satisfaction', color: 'text-slate-900' },
            { value: '3+', label: 'Years Experience', color: 'text-brand-600' },
            { value: '24/7', label: 'Technical Support', color: 'text-slate-900' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" } }
              }}
              className="text-center sm:text-left group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, originX: 0 }}
                className={`text-2xl sm:text-3xl font-black ${stat.color} inline-block origin-left`}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
