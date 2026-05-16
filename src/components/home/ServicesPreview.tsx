import { Link } from 'react-router-dom';
import { Globe, Smartphone, Cloud, Brain, GitBranch, Palette, ArrowRight } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Scalable, performant web applications built with modern frameworks and battle-tested architecture.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS and Android apps that deliver native-quality experiences to millions of users.',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Multi-cloud infrastructure design, migration, and optimization for enterprise-grade reliability.',
    color: 'from-sky-500/20 to-blue-500/20',
  },
  {
    icon: Brain,
    title: 'AI/ML Integration',
    desc: 'Embed intelligent features into your products — from recommendation engines to computer vision.',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    desc: 'Automated pipelines, container orchestration, and observability to ship faster with confidence.',
    color: 'from-rose-500/20 to-pink-500/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Research-driven product design that converts users into loyal customers through exceptional experiences.',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-light dark:bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold tracking-wide uppercase mb-4">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-primary-900 dark:text-white mb-4 tracking-tight">
              End-to-End Software Services
            </h2>
            <p className="text-lg text-muted dark:text-primary-400 max-w-2xl mx-auto">
              From ideation to production, we cover every layer of the modern technology stack.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, color }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <div className={`group relative p-8 rounded-2xl border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900 hover:border-accent-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-primary-700 dark:text-primary-200" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-900 dark:text-white mb-3">{title}</h3>
                <p className="text-muted dark:text-primary-400 text-sm leading-relaxed mb-5">{desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-accent-600 dark:text-accent-400 text-sm font-semibold hover:gap-3 transition-all duration-200"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
