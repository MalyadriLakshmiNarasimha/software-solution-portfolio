import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import ScrollReveal from '../common/ScrollReveal';
import LoadingSpinner from '../common/LoadingSpinner';

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  summary: string;
  coverImage: string;
  techStack: string[];
  year: number;
}

export default function FeaturedProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => api.get('/projects?featured=true&limit=3').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-24 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold tracking-wide uppercase mb-4">
                Featured Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white tracking-tight">
                Projects That Define Us
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="flex-shrink-0 inline-flex items-center gap-2 text-accent-400 font-semibold hover:text-accent-300 transition-colors group"
            >
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <LoadingSpinner className="py-20" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.projects || []).map((project: Project, i: number) => (
              <ScrollReveal key={project._id} delay={i * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden bg-primary-800 border border-primary-700 hover:border-accent-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-500/10">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-500/90 text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary-400 text-sm mb-1">{project.client} · {project.year}</p>
                    <h3 className="text-xl font-heading font-semibold text-white mb-3 leading-snug">{project.title}</h3>
                    <p className="text-primary-400 text-sm leading-relaxed mb-5 line-clamp-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-primary-700 rounded-md text-xs text-primary-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-2 text-accent-400 text-sm font-semibold hover:text-accent-300 transition-colors group/link"
                    >
                      Case Study <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
