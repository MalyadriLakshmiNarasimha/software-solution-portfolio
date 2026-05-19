import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Linkedin, Github, Twitter, Target, Eye, Heart, ExternalLink } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';

const MILESTONES = [
  {
    year: '2025',
    title: 'KLD Technologies Founded',
    desc: 'Kalyan, Narasimha, and Dhruv launched KLD Technologies with a clear mission — build purposeful, high-quality software solutions for businesses and communities that truly need them.',
  },
  {
    year: '2025',
    title: 'Freelancing Portal',
    desc: 'Launched our first in-house product — a freelancing portal connecting skilled professionals with clients, enabling seamless project collaboration and secure payments.',
  },
  {
    year: '2025',
    title: 'KrishiSathi — AgriTech Platform',
    desc: 'Built KrishiSathi, an agriculture-focused platform empowering farmers with market insights, weather data, and direct buyer connections to improve livelihoods.',
  },
  {
    year: '2025',
    title: 'SLNB Builders — Client Project',
    desc: 'Delivered a full-stack digital presence for Sri Lakshmi Narasimha Builders, including a property listing portal, inquiry management, and an admin dashboard tailored for real-estate operations.',
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Mission',
    desc: 'To build software that creates real impact — for businesses, communities, and individuals — through purposeful engineering and honest collaboration.',
  },
  {
    icon: Eye,
    title: 'Vision',
    desc: 'A future where ambitious startups and growing enterprises in every industry have access to world-class software without compromising on quality or transparency.',
  },
  {
    icon: Heart,
    title: 'Values',
    desc: 'Craftsmanship over shortcuts. Transparency over spin. Relationships over transactions. We grow when the people we build for grow.',
  },
];

const PROJECTS = [
  {
    name: 'Freelancing Portal',
    type: 'In-House Product',
    desc: 'A platform connecting skilled freelancers with clients across domains — from design and development to content and consulting. Features include smart matching, secure escrow payments, and real-time project tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Payments'],
    badge: 'Product',
    badgeColor: 'bg-accent-500/20 text-accent-400',
  },
  {
    name: 'KrishiSathi',
    type: 'AgriTech Platform',
    desc: 'An agriculture-first platform built to empower farmers with live mandi prices, crop advisory, weather alerts, and direct market access — bridging the digital gap in rural India.',
    tags: ['React Native', 'Python', 'ML', 'GIS'],
    badge: 'Product',
    badgeColor: 'bg-accent-500/20 text-accent-400',
  },
  {
    name: 'Sri Lakshmi Narasimha Builders',
    type: 'Client Project',
    desc: 'A full-scale digital solution for SLNB Builders — covering a property listing portal, lead capture forms, an admin dashboard for inquiry management, and SEO-optimised landing pages to drive real estate leads.',
    tags: ['Next.js', 'Tailwind', 'CMS', 'SEO'],
    badge: 'Client',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
  },
];

const FOUNDERS = [
  {
    name: 'Kalyan',
    role: 'Founder & CEO',
    bio: "Visionary behind KLD Technologies. Kalyan drives the company's product strategy, client relationships, and engineering culture — committed to building software that makes a real difference.",
    initials: 'K',
  },
  {
    name: 'Narasimha',
    role: 'Co-Founder & CTO',
    bio: 'The technical backbone of KLD. Narasimha architects scalable systems and leads the engineering team with a focus on performance, reliability, and developer experience.',
    initials: 'N',
  },
  {
    name: 'Dhruv',
    role: 'Co-Founder & COO',
    bio: 'Dhruv keeps the gears turning — from project delivery and operations to client success. He ensures every engagement is smooth, on-time, and exceeds expectations.',
    initials: 'D',
  },
];

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export default function AboutPage() {
  const { data: team = [] } = useQuery<TeamMember[]>({
    queryKey: ['team'],
    queryFn: () => api.get('/team').then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <Helmet>
        <title>About — KLD Technologies</title>
        <meta
          name="description"
          content="Meet the team behind KLD Technologies — engineers and builders crafting purposeful software for startups, enterprises, and communities."
        />
        <link rel="canonical" href="https://kldtech.io/about" />
      </Helmet>

      <PageHero
        title="We're KLD Technologies"
        subtitle="A passionate team of engineers and builders crafting software that creates real impact — from freelancing platforms to agritech and real estate."
        breadcrumb="About Us"
      />

      {/* Company Story */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                Our Story
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary-900 dark:text-white mb-6 tracking-tight">
                Built with purpose, from day one
              </h2>
              <p className="text-primary-600 dark:text-primary-300 leading-body mb-4">
                KLD Technologies was founded in 2025 by Kalyan, Narasimha, and Dhruv — three builders who believed great software shouldn't be a privilege reserved for well-funded companies alone.
              </p>
              <p className="text-primary-600 dark:text-primary-300 leading-body mb-4">
                From day one, our approach has been different: listen deeply, engineer rigorously, and build lasting relationships with every client and community we serve. Whether it's empowering freelancers, supporting farmers, or helping real estate businesses go digital — we build with intention.
              </p>
              <p className="text-primary-600 dark:text-primary-300 leading-body">
                In our first year, we've already shipped three meaningful projects and are just getting started. Transparency, craftsmanship, and genuine partnership are not buzzwords here — they're how we work every single day.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                  alt="KLD Technologies team"
                  width={700}
                  height={500}
                  loading="lazy"
                  className="rounded-2xl w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 p-5 bg-primary-900 rounded-2xl shadow-xl border border-primary-800">
                  <p className="text-3xl font-heading font-bold text-gradient">2025</p>
                  <p className="text-primary-400 text-sm mt-1">Founded & Shipping</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-primary-800 border border-primary-700 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent2-500/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">{title}</h3>
                  <p className="text-primary-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                Leadership
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary-900 dark:text-white tracking-tight">
                The Founders Behind KLD
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FOUNDERS.map((founder, i) => (
              <ScrollReveal key={founder.name} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 hover:border-accent-500/50 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent2-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-heading font-bold shadow-lg">
                    {founder.initials}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-1">{founder.name}</h3>
                  <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-3">{founder.role}</p>
                  <p className="text-xs text-muted dark:text-primary-400 leading-relaxed">{founder.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                Our Work
              </span>
              <h2 className="text-4xl font-heading font-bold text-white tracking-tight">
                Projects We're Proud Of
              </h2>
              <p className="text-primary-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                From in-house products to client engagements, every project we ship reflects our commitment to quality and meaningful impact.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <ScrollReveal key={project.name} delay={i * 0.1}>
                <div className="group p-7 rounded-2xl bg-primary-800 border border-primary-700 hover:border-accent-500/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${project.badgeColor}`}>
                        {project.badge}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-white">{project.name}</h3>
                      <p className="text-xs text-accent-400 font-medium mt-0.5">{project.type}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary-600 group-hover:text-accent-400 transition-colors mt-1 flex-shrink-0" />
                  </div>
                  <p className="text-primary-400 text-sm leading-relaxed flex-1">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-primary-700 text-primary-400 text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-primary-900 dark:text-white tracking-tight">Our Journey</h2>
              <p className="text-primary-500 dark:text-primary-400 mt-3 text-sm">One year in — and we're just getting started.</p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700 -translate-x-1/2" />
            <div className="space-y-10">
              {MILESTONES.map(({ year, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 0.08}>
                  <div className={`relative flex flex-col lg:flex-row gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 lg:text-${i % 2 === 0 ? 'right' : 'left'} pl-12 lg:pl-0`}>
                      <div className={`p-6 rounded-2xl bg-white dark:bg-primary-800 border border-primary-100 dark:border-primary-700 shadow-sm ${i % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                        <span className="text-accent-500 dark:text-accent-400 font-bold text-sm">{year}</span>
                        <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mt-1 mb-2">{title}</h3>
                        <p className="text-primary-500 dark:text-primary-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-500 border-4 border-white dark:border-primary-950 top-6 z-10" />
                    <div className="flex-1 hidden lg:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team (API-driven, if available) */}
      {team.length > 0 && (
        <section className="py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                  The Team
                </span>
                <h2 className="text-4xl font-heading font-bold text-white tracking-tight">
                  The People Behind the Work
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {team.map((member, i) => (
                <ScrollReveal key={member._id} delay={i * 0.08}>
                  <div className="group p-6 rounded-2xl bg-primary-800 border border-primary-700 hover:border-accent-500/50 hover:shadow-xl transition-all duration-300 text-center">
                    <img
                      src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                      alt={member.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-accent-500/20"
                    />
                    <h3 className="text-base font-heading font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-xs text-accent-400 font-medium mb-3">{member.role}</p>
                    <p className="text-xs text-primary-400 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-700 text-muted hover:text-accent-500 transition-colors">
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a href={member.socials.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-700 text-muted hover:text-accent-500 transition-colors">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-700 text-muted hover:text-accent-500 transition-colors">
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}