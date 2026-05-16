import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScrollReveal from '../components/common/ScrollReveal';

interface Metric {
  label: string;
  value: string;
}

interface Project {
  title: string;
  slug: string;
  client: string;
  category: string;
  year: number;
  coverImage: string;
  gallery: string[];
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  metrics: Metric[];
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['project', slug],
    queryFn: () => api.get(`/projects/${slug}`).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const { data: allProjects } = useQuery({
    queryKey: ['projects', 'all-list'],
    queryFn: () => api.get('/projects?limit=20').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingSpinner className="min-h-screen" />;
  if (!project) return <div className="min-h-screen flex items-center justify-center text-primary-400">Project not found.</div>;

  const allList = allProjects?.projects || [];
  const idx = allList.findIndex((p: { slug: string }) => p.slug === slug);
  const nextProject = allList[idx + 1] || allList[0];
  const related = allList.filter((_: unknown, i: number) => i !== idx).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{project.title} — NexaForge Portfolio</title>
        <meta name="description" content={project.summary} />
        <meta property="og:image" content={project.coverImage} />
        <link rel="canonical" href={`https://nexaforge.io/portfolio/${slug}`} />
      </Helmet>

      {/* Hero */}
      <div className="relative h-72 sm:h-96 lg:h-[500px] overflow-hidden">
        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" width={1400} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-300 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <span className="block text-accent-400 text-sm font-semibold mb-2">{project.category} · {project.client} · {project.year}</span>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight max-w-3xl leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main */}
            <div className="flex-1 min-w-0">
              <ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
                  {project.metrics?.map((m, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent2-500/10 border border-accent-500/20 text-center">
                      <p className="text-3xl font-heading font-bold text-gradient mb-2">{m.value}</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{m.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {[
                { heading: 'Overview', body: project.overview },
                { heading: 'The Problem', body: project.problem },
                { heading: 'Our Solution', body: project.solution },
              ].map(({ heading, body }) => body ? (
                <ScrollReveal key={heading} className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-4">{heading}</h2>
                  <p className="text-primary-600 dark:text-primary-300 leading-body">{body}</p>
                </ScrollReveal>
              ) : null)}

              {project.features?.length > 0 && (
                <ScrollReveal className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-5">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                        <span className="text-primary-600 dark:text-primary-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {/* Gallery */}
              {project.gallery?.length > 0 && (
                <ScrollReveal className="mb-10">
                  <h2 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-5">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setLightboxIdx(i); setLightboxOpen(true); }}
                        className="relative aspect-video rounded-xl overflow-hidden group"
                      >
                        <img src={img} alt="" width={400} height={300} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0 space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800">
                <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-4">Project Details</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: 'Client', value: project.client },
                    { label: 'Category', value: project.category },
                    { label: 'Year', value: project.year },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-muted dark:text-primary-400 font-medium">{label}</dt>
                      <dd className="text-primary-900 dark:text-white font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800">
                <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 rounded-lg text-xs font-semibold border border-accent-200 dark:border-accent-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all duration-200"
              >
                Start a Similar Project
              </Link>
            </aside>
          </div>

          {/* Next project */}
          {nextProject && (
            <div className="mt-16 p-8 rounded-2xl bg-primary-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-primary-400 text-sm mb-1">Next Project</p>
                <h3 className="text-xl font-heading font-semibold text-white">{nextProject.title}</h3>
              </div>
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-accent-500 text-accent-400 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-all"
              >
                View Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-6">Related Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rp: { _id: string; coverImage: string; category: string; title: string; client: string; year: number; slug: string }) => (
                  <Link key={rp._id} to={`/portfolio/${rp.slug}`} className="group rounded-2xl overflow-hidden border border-primary-100 dark:border-primary-800 hover:border-accent-500/50 transition-all bg-white dark:bg-primary-900">
                    <img src={rp.coverImage} alt={rp.title} width={600} height={300} loading="lazy" className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    <div className="p-5">
                      <span className="text-xs text-accent-500 font-semibold">{rp.category}</span>
                      <h4 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mt-1">{rp.title}</h4>
                      <p className="text-xs text-muted dark:text-primary-400 mt-1">{rp.client} · {rp.year}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIdx}
        slides={project.gallery?.map((src) => ({ src })) || []}
      />
    </>
  );
}
