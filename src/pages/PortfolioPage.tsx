import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/common/PageHero';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'Cloud', 'E-Commerce'];

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  year: number;
  coverImage: string;
  techStack: string[];
  summary: string;
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', activeCategory, page],
    queryFn: () =>
      api.get(`/projects?${activeCategory !== 'All' ? `category=${activeCategory}&` : ''}page=${page}&limit=9`).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio — NexaForge Solutions</title>
        <meta name="description" content="Browse our portfolio of 120+ enterprise software projects across web, mobile, AI/ML, cloud, and e-commerce." />
        <link rel="canonical" href="https://nexaforge.io/portfolio" />
      </Helmet>

      <PageHero
        title="Our Work"
        subtitle="A curated collection of enterprise projects that showcase our technical depth and creative problem-solving."
        breadcrumb="Portfolio"
      />

      <section className="py-16 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-500/30'
                    : 'bg-white dark:bg-primary-800 text-primary-600 dark:text-primary-300 border border-primary-200 dark:border-primary-700 hover:border-accent-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <LoadingSpinner className="py-24" />
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {(data?.projects || []).map((project: Project) => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          width={600}
                          height={400}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Link
                            to={`/portfolio/${project.slug}`}
                            className="px-6 py-3 bg-accent-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-accent-500 transition-colors"
                          >
                            View Case Study <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-accent-500/90 text-white rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="text-primary-400 text-xs font-medium uppercase tracking-wide mb-1">
                          {project.client} · {project.year}
                        </p>
                        <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3 leading-snug">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack?.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2.5 py-1 bg-primary-50 dark:bg-primary-800 rounded-md text-xs text-muted dark:text-primary-400 font-medium">
                              {tech}
                            </span>
                          ))}
                          {project.techStack?.length > 3 && (
                            <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-800 rounded-md text-xs text-muted dark:text-primary-400">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load more */}
              {data && page < data.pages && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-8 py-3 border border-accent-500 text-accent-600 dark:text-accent-400 font-semibold rounded-xl hover:bg-accent-500 hover:text-white transition-all duration-200"
                  >
                    Load More Projects
                  </button>
                </div>
              )}

              {(!data?.projects || data.projects.length === 0) && (
                <div className="text-center py-24 text-muted dark:text-primary-400">
                  No projects found in this category.
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
