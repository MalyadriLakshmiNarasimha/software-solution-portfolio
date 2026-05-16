import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Search, Clock, Calendar } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate, truncate } from '../utils/format';

const CATEGORIES = ['All', 'Engineering', 'Frontend', 'Security', 'AI/ML', 'DevOps', 'Design'];

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage?: string;
  excerpt: string;
  author: { name: string; avatar?: string; role: string };
  readTime: number;
  createdAt: string;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['blog', activeCategory, search, page],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: '6' });
      if (activeCategory !== 'All') params.set('category', activeCategory);
      if (search) params.set('search', search);
      return api.get(`/blog?${params}`).then((r) => r.data);
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <Helmet>
        <title>Blog — NexaForge Solutions</title>
        <meta name="description" content="Engineering insights, tutorials, and case studies from the NexaForge team." />
        <link rel="canonical" href="https://nexaforge.io/blog" />
      </Helmet>

      <PageHero
        title="The NexaForge Blog"
        subtitle="Deep dives into software architecture, emerging tech, and the lessons we've learned building enterprise products."
        breadcrumb="Blog"
      />

      <section className="py-16 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-xl text-primary-900 dark:text-white placeholder-muted focus:outline-none focus:border-accent-500 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-accent-600 text-white shadow-lg shadow-accent-500/30'
                      : 'bg-white dark:bg-primary-800 text-primary-600 dark:text-primary-300 border border-primary-200 dark:border-primary-700 hover:border-accent-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(data?.posts || []).map((post: BlogPost, i: number) => (
                  <ScrollReveal key={post._id} delay={i * 0.08}>
                    <Link to={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 hover:border-accent-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {post.coverImage && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            width={600}
                            height={300}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold rounded-full mb-3">
                          {post.category}
                        </span>
                        <h3 className="text-lg font-heading font-semibold text-primary-900 dark:text-white mb-3 leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted dark:text-primary-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {truncate(post.excerpt, 120)}
                        </p>
                        <div className="flex items-center gap-3 pt-4 border-t border-primary-100 dark:border-primary-800">
                          <img
                            src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=0EA5E9&color=fff`}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            loading="lazy"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-primary-700 dark:text-primary-200 truncate">{post.author.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted dark:text-primary-500 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime} min read
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {(!data?.posts || data.posts.length === 0) && (
                <div className="text-center py-24 text-muted dark:text-primary-400">No articles found.</div>
              )}

              {/* Pagination */}
              {data && data.pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                        p === page
                          ? 'bg-accent-600 text-white'
                          : 'bg-white dark:bg-primary-800 text-primary-600 dark:text-primary-300 border border-primary-200 dark:border-primary-700 hover:border-accent-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
