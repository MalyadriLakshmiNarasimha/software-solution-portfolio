import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

const TESTIMONIALS = [
  {
    quote: "NexaForge delivered our enterprise platform 3 weeks ahead of schedule, with zero critical bugs at launch. Their architecture decisions saved us months of future refactoring.",
    name: "David Park",
    role: "CTO, FinCorp International",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
    company: "FinCorp",
  },
  {
    quote: "The team's deep understanding of distributed systems helped us handle 10x traffic growth during our peak season. The performance improvements exceeded every KPI we set.",
    name: "Elena Vasquez",
    role: "VP Engineering, RetailNext Group",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80",
    company: "RetailNext",
  },
  {
    quote: "What impressed us most was their ability to translate complex healthcare regulations into elegant technical solutions. Our HIPAA compliance audit was a breeze thanks to their work.",
    name: "Dr. Samuel Okoye",
    role: "Chief Product Officer, HealthPlus",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    company: "HealthPlus",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 bg-light dark:bg-primary-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
              Client Stories
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary-900 dark:text-white tracking-tight">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map((t, i) =>
              i === current ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center text-center"
                >
                  <Quote className="w-10 h-10 text-accent-500 mb-6 opacity-60" />
                  <p className="text-xl sm:text-2xl text-primary-700 dark:text-primary-200 leading-relaxed font-medium mb-8 max-w-3xl">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={52}
                      height={52}
                      loading="lazy"
                      className="w-13 h-13 rounded-full object-cover border-2 border-accent-500/30"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-primary-900 dark:text-white">{t.name}</p>
                      <p className="text-sm text-muted dark:text-primary-400">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2.5 bg-accent-500' : 'w-2.5 h-2.5 bg-primary-300 dark:bg-primary-700 hover:bg-accent-400'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
