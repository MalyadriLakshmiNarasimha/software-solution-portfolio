import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Linkedin, Github, Twitter, Target, Eye, Heart } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';

const MILESTONES = [
  { year: '2016', title: 'Company Founded', desc: 'Started in a San Francisco co-working space with a team of 4 engineers and a vision to build enterprise-grade software differently.' },
  { year: '2017', title: 'First Enterprise Client', desc: 'Landed our first Fortune 500 client and delivered a mission-critical financial reporting platform used by 2,000+ analysts.' },
  { year: '2018', title: 'Expanded to 30 Team Members', desc: 'Grew the team to 30 engineers across 5 countries, establishing our first remote-first operating model.' },
  { year: '2020', title: 'Launched AI/ML Practice', desc: 'Formed a dedicated AI/ML team and delivered our first production machine learning system serving 500K+ users.' },
  { year: '2022', title: '100th Project Milestone', desc: 'Celebrated the delivery of our 100th enterprise project with a 98% client satisfaction rate.' },
  { year: '2024', title: 'Global Expansion', desc: 'Opened offices in London and Singapore, serving clients across 24 countries with a 120-person team.' },
];

const VALUES = [
  { icon: Target, title: 'Mission', desc: 'To accelerate every enterprise\'s journey to digital excellence by delivering software solutions that are not just functional, but transformational.' },
  { icon: Eye, title: 'Vision', desc: 'A world where every organization — regardless of size or technical maturity — can access the software engineering capabilities previously available only to tech giants.' },
  { icon: Heart, title: 'Values', desc: 'Quality over speed. Transparency over comfort. Long-term partnership over short-term contracts. We succeed when our clients succeed.' },
];

const CLIENT_LOGOS = [
  'FinCorp', 'RetailNext', 'HealthPlus', 'CyberShield', 'TechGiant', 'LogiCo',
  'MediaFlow', 'EduTech', 'GreenEnergy', 'UrbanMobility',
];

export default function AboutPage() {
  const { data: team = [] } = useQuery({
    queryKey: ['team'],
    queryFn: () => api.get('/team').then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <>
      <Helmet>
        <title>About — NexaForge Solutions</title>
        <meta name="description" content="Meet the team behind NexaForge — 120 engineers building enterprise software for clients across 24 countries." />
        <link rel="canonical" href="https://nexaforge.io/about" />
      </Helmet>

      <PageHero
        title="We're NexaForge"
        subtitle="A team of 120+ engineers, designers, and strategists united by a passion for building software that matters."
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
                Built by engineers, for engineering excellence
              </h2>
              <p className="text-primary-600 dark:text-primary-300 leading-body mb-4">
                NexaForge was founded in 2016 by Alex Chen and Sarah Kim, two senior engineers who had seen too many enterprise software projects fail — not from lack of talent, but from lack of process, communication, and genuine partnership.
              </p>
              <p className="text-primary-600 dark:text-primary-300 leading-body mb-4">
                We set out to build a software company that operated differently: transparent pricing, rigorous engineering standards, and relationships built on honest communication rather than sales spin.
              </p>
              <p className="text-primary-600 dark:text-primary-300 leading-body">
                Eight years later, we've delivered 120+ projects for 80+ clients across 24 countries, maintaining a 98% client satisfaction rate and 85% repeat business rate that we're deeply proud of.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                  alt="NexaForge team"
                  width={700}
                  height={500}
                  loading="lazy"
                  className="rounded-2xl w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 p-5 bg-primary-900 rounded-2xl shadow-xl border border-primary-800">
                  <p className="text-3xl font-heading font-bold text-gradient">98%</p>
                  <p className="text-primary-400 text-sm mt-1">Client Satisfaction</p>
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

      {/* Team */}
      <section className="py-24 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-wide mb-4">
                The Team
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary-900 dark:text-white tracking-tight">
                The People Behind the Work
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member: { _id: string; name: string; role: string; photo?: string; bio: string; socials?: { linkedin?: string; github?: string; twitter?: string } }, i: number) => (
              <ScrollReveal key={member._id} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 hover:border-accent-500/50 hover:shadow-xl transition-all duration-300 text-center">
                  <img
                    src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                    alt={member.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-accent-500/20"
                  />
                  <h3 className="text-base font-heading font-semibold text-primary-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-muted dark:text-primary-400 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-50 dark:bg-primary-800 text-muted hover:text-accent-500 transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a href={member.socials.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-50 dark:bg-primary-800 text-muted hover:text-accent-500 transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="p-1.5 rounded-md bg-primary-50 dark:bg-primary-800 text-muted hover:text-accent-500 transition-colors">
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

      {/* Timeline */}
      <section className="py-24 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-white tracking-tight">Our Journey</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-primary-700 -translate-x-1/2" />
            <div className="space-y-10">
              {MILESTONES.map(({ year, title, desc }, i) => (
                <ScrollReveal key={year} delay={i * 0.08}>
                  <div className={`relative flex flex-col lg:flex-row gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 lg:text-${i % 2 === 0 ? 'right' : 'left'} pl-12 lg:pl-0`}>
                      <div className={`p-6 rounded-2xl bg-primary-800 border border-primary-700 ${i % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                        <span className="text-accent-400 font-bold text-sm">{year}</span>
                        <h3 className="text-lg font-heading font-semibold text-white mt-1 mb-2">{title}</h3>
                        <p className="text-primary-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-500 border-4 border-primary-900 top-6 z-10" />
                    <div className="flex-1 hidden lg:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-16 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted dark:text-primary-500 mb-10">
              Trusted by leading enterprises worldwide
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {CLIENT_LOGOS.map((logo, i) => (
              <ScrollReveal key={logo} delay={i * 0.05}>
                <div className="group h-14 bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 rounded-xl flex items-center justify-center text-primary-300 dark:text-primary-600 font-heading font-bold text-sm hover:text-accent-500 hover:border-accent-500/50 transition-all duration-200 grayscale hover:grayscale-0">
                  {logo}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
