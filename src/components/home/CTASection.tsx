import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-accent-500/15 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6 tracking-tight">
            Ready to build something{' '}
            <span className="text-gradient">great?</span>
          </h2>
          <p className="text-lg text-primary-400 mb-10 max-w-xl mx-auto">
            Let's discuss your project and explore how we can help you achieve your business goals through exceptional software.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-bold text-lg rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all duration-200 shadow-2xl shadow-accent-500/30 group"
          >
            Talk to Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
