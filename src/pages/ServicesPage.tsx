import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Cloud, Brain, GitBranch, Palette, Search, Pencil, Code, TestTube, Rocket, HeadphonesIcon, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    desc1: 'We architect and build high-performance web applications using modern React, Next.js, and Node.js stacks. Our solutions are engineered for scalability, handling millions of concurrent users without degradation.',
    desc2: 'From API design to frontend accessibility, every layer of your web application receives meticulous attention to ensure it exceeds enterprise standards for performance, security, and maintainability.',
    deliverables: ['Custom web application development', 'API design and implementation', 'Progressive Web Apps (PWA)', 'Performance optimization & Core Web Vitals', 'Accessibility (WCAG 2.1 AA) compliance', 'Third-party integrations'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
    desc1: 'We deliver cross-platform iOS and Android applications using React Native that match the quality of fully native apps. Our mobile team has shipped apps with 1M+ downloads and 4.8+ App Store ratings.',
    desc2: 'From UX prototyping to App Store submission, we handle the complete mobile product lifecycle with a focus on performance, offline capability, and seamless backend integration.',
    deliverables: ['iOS & Android development (React Native)', 'App architecture and state management', 'Push notifications & real-time features', 'Offline-first data sync', 'App Store Optimization (ASO)', 'CI/CD for mobile deployments'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    color: 'from-sky-500/20 to-blue-500/20',
    iconColor: 'text-sky-500',
    desc1: 'We design, migrate, and optimize cloud infrastructure across AWS, Azure, and GCP. Our architects have managed infrastructure serving hundreds of millions of requests per day.',
    desc2: 'We apply infrastructure-as-code principles with Terraform and Pulumi to ensure your infrastructure is reproducible, auditable, and disaster-recovery ready at all times.',
    deliverables: ['Multi-cloud architecture design', 'Cloud migration strategy & execution', 'Kubernetes and container orchestration', 'Cost optimization and FinOps', 'Disaster recovery planning', 'Infrastructure as Code (Terraform)'],
  },
  {
    icon: Brain,
    title: 'AI/ML Integration',
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
    desc1: 'Our AI/ML team integrates intelligent features into your products — from fine-tuning LLMs for domain-specific tasks to deploying computer vision models at the edge.',
    desc2: 'We focus on practical AI: building features your users will actually trust and adopt. We handle the full ML lifecycle from data preparation and model training to deployment and monitoring.',
    deliverables: ['LLM integration & prompt engineering', 'Custom ML model development', 'Recommendation systems', 'Computer vision & OCR', 'MLOps pipeline implementation', 'AI feature explainability & trust design'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    color: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-500',
    desc1: 'We transform your engineering velocity through automated pipelines, containerization, and observability platforms. Our clients typically see 5-10x improvement in deployment frequency.',
    desc2: 'We implement GitOps workflows, comprehensive monitoring with Prometheus and Grafana, distributed tracing, and incident response automation to give you complete production confidence.',
    deliverables: ['CI/CD pipeline design (GitHub Actions, Jenkins)', 'Docker containerization', 'Kubernetes cluster management', 'Observability stack (Prometheus, Grafana, Jaeger)', 'Secret management (Vault, AWS SSM)', 'Security scanning and SBOM generation'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    color: 'from-violet-500/20 to-fuchsia-500/20',
    iconColor: 'text-violet-500',
    desc1: 'Our design team creates research-driven product experiences that convert users into loyal customers. We specialize in complex enterprise UIs that balance information density with usability.',
    desc2: 'We deliver comprehensive design systems that scale across your entire product suite and empower your engineering teams to build consistent, accessible interfaces without constant design bottlenecks.',
    deliverables: ['UX research and user journey mapping', 'Wireframing and interactive prototyping', 'UI design in Figma', 'Design system creation', 'Usability testing and iteration', 'Design-to-development handoff'],
  },
];

const PROCESS_STEPS = [
  { icon: Search, num: '01', title: 'Discovery', desc: 'Deep-dive stakeholder interviews, requirements analysis, and technical feasibility assessment to align vision with engineering reality.' },
  { icon: Pencil, num: '02', title: 'Design', desc: 'UX research, wireframing, and interactive prototyping. We validate with real users before writing production code.' },
  { icon: Code, num: '03', title: 'Development', desc: 'Agile sprints with fortnightly demos. Continuous integration ensures quality gates are never skipped.' },
  { icon: TestTube, num: '04', title: 'Testing', desc: 'Automated unit, integration, and E2E testing. Load testing, security audits, and accessibility reviews.' },
  { icon: Rocket, num: '05', title: 'Launch', desc: 'Zero-downtime deployments with feature flags, canary releases, and automated rollback capabilities.' },
  { icon: HeadphonesIcon, num: '06', title: 'Support', desc: '24/7 on-call support, monthly security patches, performance reviews, and a dedicated customer success manager.' },
];

const FAQS = [
  { q: 'How long does a typical project take?', a: 'Project timelines depend on scope and complexity. A typical MVP web application takes 6–12 weeks. Enterprise platforms with complex integrations typically run 4–8 months. We provide detailed timelines during the discovery phase.' },
  { q: 'What is your development methodology?', a: 'We use agile Scrum with 2-week sprints, daily standups, and bi-weekly demo sessions with stakeholders. You have full visibility into progress through Jira and a dedicated Slack channel.' },
  { q: 'Do you sign NDAs and IP transfer agreements?', a: 'Absolutely. All client work is covered by a comprehensive NDA from day one. Full IP ownership transfers to you upon project completion and final payment. We maintain no rights to your codebase.' },
  { q: 'How do you handle project pricing?', a: 'We offer three engagement models: fixed-price (for well-defined scopes), time-and-materials (for exploratory or long-term projects), and dedicated team (staffing augmentation for in-house teams).' },
  { q: 'What security standards do you adhere to?', a: 'We follow OWASP Top 10, implement Helmet.js security headers, enforce input validation, and conduct security audits at each milestone. For regulated industries, we have experience with HIPAA, PCI-DSS, and SOC 2.' },
  { q: 'Can you work with our existing team?', a: 'Yes — we offer a team augmentation model where our engineers work as embedded members of your team, participating in your existing processes and collaborating with your developers.' },
  { q: 'What post-launch support do you provide?', a: 'All projects include a 30-day bug-fix warranty period. Beyond that, we offer three support tiers: Basic (email support, 48h SLA), Standard (Slack + phone, 8h SLA), and Premium (24/7 on-call, 2h SLA).' },
  { q: 'How do you handle scope changes during development?', a: 'We use a formal change request process. All scope changes are documented, estimated, and require written approval before implementation. This keeps your project on track and on budget while remaining flexible.' },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>Services — NexaForge Solutions</title>
        <meta name="description" content="Enterprise software services: web development, mobile apps, cloud solutions, AI/ML, DevOps, and UI/UX design." />
        <link rel="canonical" href="https://nexaforge.io/services" />
      </Helmet>

      <PageHero
        title="Our Services"
        subtitle="Comprehensive software engineering services designed to take your digital products from concept to scale."
        breadcrumb="Services"
      />

      {/* Services detail sections */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES.map(({ icon: Icon, title, color, iconColor, desc1, desc2, deliverables }, i) => (
            <ScrollReveal key={title}>
              <div className={`flex flex-col lg:flex-row gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-primary-900 dark:text-white mb-5 tracking-tight">{title}</h2>
                  <p className="text-primary-600 dark:text-primary-300 leading-body mb-4">{desc1}</p>
                  <p className="text-primary-600 dark:text-primary-300 leading-body">{desc2}</p>
                </div>
                <div className="flex-1">
                  <div className="p-8 rounded-2xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 h-full">
                    <h3 className="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-5">What We Deliver</h3>
                    <ul className="space-y-3">
                      {deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 text-primary-700 dark:text-primary-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                How We Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight">
                Our Delivery Process
              </h2>
            </div>
          </ScrollReveal>

          {/* Desktop: horizontal, Mobile: vertical */}
          <div className="hidden lg:flex items-start gap-0">
            {PROCESS_STEPS.map(({ icon: Icon, num, title, desc }, i) => (
              <div key={num} className="flex-1 relative">
                <ScrollReveal delay={i * 0.1}>
                  <div className="pr-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent2-500/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-400" />
                      </div>
                      <span className="text-3xl font-heading font-bold text-primary-700">{num}</span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">{title}</h3>
                    <p className="text-primary-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-6 right-0 w-6 flex items-center">
                      <ArrowRight className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                </ScrollReveal>
              </div>
            ))}
          </div>

          <div className="lg:hidden space-y-6">
            {PROCESS_STEPS.map(({ icon: Icon, num, title, desc }, i) => (
              <ScrollReveal key={num} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent2-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent-400" />
                    </div>
                    {i < PROCESS_STEPS.length - 1 && <div className="w-0.5 flex-1 bg-primary-700 mt-2 min-h-[40px]" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-heading font-bold text-primary-700">{num}</span>
                      <h3 className="text-lg font-heading font-semibold text-white">{title}</h3>
                    </div>
                    <p className="text-primary-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-4xl font-heading font-bold text-primary-900 dark:text-white mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-primary-50 dark:hover:bg-primary-800/50 transition-colors"
                  >
                    <span className="text-base font-semibold text-primary-900 dark:text-white pr-4">{q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-primary-600 dark:text-primary-300 text-sm leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-heading font-bold text-white mb-4 tracking-tight">
              Not sure which service fits your needs?
            </h2>
            <p className="text-primary-300 mb-8">Book a free 30-minute discovery call and let's figure it out together.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all group"
            >
              Schedule a Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
