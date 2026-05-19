import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Clock, Calendar, Twitter, Linkedin, Link2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate } from '../utils/format';
import { toast } from 'sonner';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage?: string;
  content: string;
  excerpt: string;
  author: { name: string; avatar?: string; role: string };
  readTime: number;
  createdAt: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState('');

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['blog-post', slug],
    queryFn: () => api.get(`/blog/${slug}`).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const { data: allPosts } = useQuery({
    queryKey: ['blog', 'All', '', 1],
    queryFn: () => api.get('/blog?limit=20').then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!contentRef.current) return;
    const els = Array.from(contentRef.current.querySelectorAll('h2, h3')) as HTMLElement[];
    els.forEach((el) => {
      if (!el.id) el.id = el.textContent?.replace(/\s+/g, '-').toLowerCase() || `h-${Math.random()}`;
    });
    setHeadings(els.map((el) => ({ id: el.id, text: el.textContent || '', level: Number(el.tagName[1]) })));
  }, [post]);

  useEffect(() => {
    const handler = () => {
      if (!contentRef.current) return;
      const els = Array.from(contentRef.current.querySelectorAll('h2, h3')) as HTMLElement[];
      for (const el of [...els].reverse()) {
        if (el.getBoundingClientRect().top <= 120) {
          setActiveHeading(el.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [headings]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (isLoading) return <LoadingSpinner className="min-h-screen" />;
  if (!post) return <div className="min-h-screen flex items-center justify-center text-muted">Post not found.</div>;

  const related = (allPosts?.posts || []).filter((p: Post) => p.slug !== slug).slice(0, 3);
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <>
      <Helmet>
        <title>{post.title} — KLD TECHNOLOGIES Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:title" content={post.title} />
        <link rel="canonical" href={`https://kldtech.io/blog/${slug}`} />
      </Helmet>

      {post.coverImage && (
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" width={1400} height={400} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent" />
        </div>
      )}

      <div className="bg-light dark:bg-primary-950 pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted dark:text-primary-400 hover:text-accent-500 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article */}
            <article className="flex-1 min-w-0 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs font-semibold rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary-900 dark:text-white mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Author card */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-900 border border-primary-100 dark:border-primary-800 mb-10">
                <img
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=0EA5E9&color=fff`}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary-900 dark:text-white text-sm">{post.author.name}</p>
                  <p className="text-xs text-muted dark:text-primary-400">{post.author.role}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted dark:text-primary-400">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.createdAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
                </div>
              </div>

              {/* Content */}
              <div
                ref={contentRef}
                className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-code:bg-primary-100 dark:prose-code:bg-primary-800 prose-code:rounded max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-10 pt-6 border-t border-primary-100 dark:border-primary-800">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-primary-100 dark:bg-primary-800 text-muted dark:text-primary-300 text-xs font-medium rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm text-muted dark:text-primary-400 font-medium">Share:</span>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-800 text-muted hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-800 text-muted hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <button onClick={copyLink} className="p-2.5 rounded-lg bg-primary-100 dark:bg-primary-800 text-muted hover:text-accent-500 transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* Sticky Sidebar TOC */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted dark:text-primary-500 mb-4">Table of Contents</p>
                  <nav className="space-y-1">
                    {headings.map(({ id, text, level }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`block text-sm transition-colors duration-200 py-1 border-l-2 ${
                          activeHeading === id
                            ? 'border-accent-500 text-accent-600 dark:text-accent-400 font-medium'
                            : 'border-transparent text-muted dark:text-primary-500 hover:text-primary-900 dark:hover:text-white'
                        } ${level === 3 ? 'pl-7' : 'pl-4'}`}
                      >
                        {level === 3 && <ChevronRight className="w-3 h-3 inline-block mr-1 opacity-50" />}
                        {text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16 max-w-2xl">
              <h3 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((rp: Post) => (
                  <Link key={rp._id} to={`/blog/${rp.slug}`} className="group rounded-xl overflow-hidden bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 hover:border-accent-500/50 transition-all">
                    {rp.coverImage && (
                      <img src={rp.coverImage} alt={rp.title} width={300} height={160} loading="lazy" className="w-full h-32 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    )}
                    <div className="p-4">
                      <span className="text-xs text-accent-500 font-semibold">{rp.category}</span>
                      <h4 className="text-sm font-heading font-semibold text-primary-900 dark:text-white mt-1 line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {rp.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
