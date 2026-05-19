import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import ScrollReveal from '../components/common/ScrollReveal';

// Static projects (3)
const STATIC_PROJECTS = [
  {
    _id: 'p1',
    title: 'Freelancing Portal',
    slug: 'freelancing-portal',
    client: 'KLD Technologies (In-House)',
    category: 'Web Platform',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80',
    summary: 'A full-featured freelancing platform connecting skilled professionals with clients across domains.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
  },
  {
    _id: 'p2',
    title: 'KrishiSathi',
    slug: 'krishisathi',
    client: 'KLD Technologies (In-House)',
    category: 'AgriTech',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80',
    summary: 'An AgriTech platform empowering Indian farmers with market prices, crop advisory, and direct buyer access.',
    techStack: ['React Native', 'Python', 'ML'],
  },
  {
    _id: 'p3',
    title: 'Sri Lakshmi Narasimha Builders',
    slug: 'slnb-builders',
    client: 'Sri Lakshmi Narasimha Builders',
    category: 'Real Estate',
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80',
    summary: 'A complete digital presence for SLNB Builders — property listings, lead management, and an admin dashboard.',
    techStack: ['Next.js', 'Tailwind', 'MongoDB'],
  },
];

export default function PortfolioPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    STATIC_PROJECTS.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return STATIC_PROJECTS.filter((p) => {
      if (category && p.category !== category) return false;
      if (query && !(`${p.title} ${p.summary} ${p.techStack?.join(' ')}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [category, query]);

  return (
    <>
      <Helmet>
        <title>Portfolio — KLD Technologies</title>
        <meta name="description" content="Selected projects by KLD Technologies." />
        <link rel="canonical" href="https://kldtech.io/portfolio" />
      </Helmet>

      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold tracking-wide uppercase mb-4">Our Work</span>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight">Portfolio</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-primary-800 rounded-lg px-3 py-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects"
                    className="bg-transparent text-sm text-primary-300 outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setCategory(null)} className={`px-3 py-1 text-sm rounded-md ${category ? 'bg-primary-800 text-primary-300' : 'bg-accent-500/90 text-white'}`}>All</button>
                  {categories.map((c) => (
                    <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 text-sm rounded-md ${category === c ? 'bg-accent-500/90 text-white' : 'bg-primary-800 text-primary-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 0.08}>
                <div className="group relative rounded-2xl overflow-hidden bg-primary-800 border border-primary-700 hover:border-accent-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/10">
                  <div className="relative h-52 overflow-hidden">
                    <img src={project.coverImage} alt={project.title} width={600} height={400} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-500/90 text-white">{project.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary-400 text-sm mb-1">{project.client} · {project.year}</p>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3 leading-snug">{project.title}</h3>
                    <p className="text-primary-400 text-sm leading-relaxed mb-5 line-clamp-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-primary-700 rounded-md text-xs text-primary-300 font-medium">{tech}</span>
                      ))}
                    </div>
                    <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-accent-400 text-sm font-semibold hover:text-accent-300 transition-colors group/link">
                      Case Study <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}