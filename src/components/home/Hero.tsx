import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const PHRASES = ['We Build.', 'We Scale.', 'We Transform.'];

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    if (typing) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, phraseIdx]);

  return (
    <section className="relative min-h-screen bg-primary-950 flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent2-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-800/30 rounded-full blur-3xl" />
        {/* SVG mesh grid */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0EA5E9" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div id="hero-sentinel" className="absolute top-0 left-0 w-1 h-1" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Enterprise Software Solutions
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-heading tracking-tighter"
          >
            <span className="text-gradient min-h-[1.2em] block">
              {displayed}<span className="animate-pulse">|</span>
            </span>
            Software That Scales
            <br />
            <span className="text-primary-400">Your Business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-primary-300 mb-10 max-w-2xl leading-body"
          >
            We partner with ambitious enterprises to architect, build, and scale world-class digital products — from MVP to millions of users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all duration-200 shadow-lg shadow-accent-500/25 group"
            >
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-700 text-primary-200 font-semibold rounded-xl hover:border-accent-500 hover:text-accent-400 transition-all duration-200 group"
            >
              <Play className="w-4 h-4" />
              Start a Project
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center gap-6"
          >
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80',
                'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-10 h-10 rounded-full border-2 border-primary-950 object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Trusted by 80+ enterprises</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
