import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { formatDate } from '../../utils/format';
import { toast } from 'sonner';

interface Post {
  _id: string;
  title: string;
  category: string;
  status: string;
  author: { name: string };
  createdAt: string;
  readTime: number;
}

type FormData = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: string;
  tags: string;
  authorName: string;
  authorRole: string;
};

function PostForm({ initial, onSave, onCancel }: { initial?: Partial<Post & { excerpt: string; content: string; coverImage: string; tags: string[]; author: { name: string; role: string } }>; onSave: (d: FormData) => void; onCancel: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      ...initial,
      tags: initial?.tags?.join(', ') || '',
      authorName: initial?.author?.name || '',
      authorRole: initial?.author?.role || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-primary-300 mb-1">Title *</label>
          <input {...register('title', { required: true })} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Category *</label>
          <select {...register('category', { required: true })} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500">
            <option value="">Select</option>
            {['Engineering', 'Frontend', 'Security', 'AI/ML', 'DevOps', 'Design'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Author Name</label>
          <input {...register('authorName')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Author Role</label>
          <input {...register('authorRole')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Status</label>
          <select {...register('status')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Tags (comma-separated)</label>
          <input {...register('tags')} placeholder="React, Node.js" className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Cover Image URL</label>
        <input {...register('coverImage')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" placeholder="https://..." />
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Excerpt *</label>
        <textarea {...register('excerpt', { required: true })} rows={2} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Content (HTML) *</label>
        <textarea {...register('content', { required: true })} rows={12} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-accent-500" placeholder="<p>Article content here...</p>" />
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-300 hover:bg-primary-800 transition-colors text-sm">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-lg bg-accent-600 text-white font-semibold hover:bg-accent-500 transition-colors text-sm disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}

export default function AdminBlog() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => api.get('/blog/admin/all').then(r => r.data),
  });

  const transform = (d: FormData) => ({
    ...d,
    tags: (d.tags as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean),
    author: { name: d.authorName, role: d.authorRole },
  });

  const createMut = useMutation({
    mutationFn: (data: FormData) => api.post('/blog', transform(data)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); setShowForm(false); toast.success('Post created'); },
    onError: () => toast.error('Failed to save'),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.put(`/blog/${id}`, transform(data)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); setEditing(null); toast.success('Post updated'); },
    onError: () => toast.error('Failed to update'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.delete(`/blog/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); toast.success('Deleted'); },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Blog Posts</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-accent-600 text-white rounded-lg hover:bg-accent-500 transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {(showForm || editing) && (
        <div className="mb-8 p-6 bg-primary-900 rounded-2xl border border-primary-800">
          <h2 className="text-lg font-heading font-semibold text-white mb-5">{editing ? 'Edit Post' : 'New Post'}</h2>
          <PostForm
            initial={editing || undefined}
            onSave={(d) => editing ? updateMut.mutate({ id: editing._id, data: d }) : createMut.mutate(d)}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      <div className="rounded-2xl border border-primary-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary-800 bg-primary-900/50">
              <th className="text-left p-4 text-primary-400 font-medium">Title</th>
              <th className="text-left p-4 text-primary-400 font-medium hidden sm:table-cell">Category</th>
              <th className="text-left p-4 text-primary-400 font-medium hidden md:table-cell">Author</th>
              <th className="text-left p-4 text-primary-400 font-medium">Status</th>
              <th className="text-right p-4 text-primary-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p: Post) => (
              <tr key={p._id} className="border-b border-primary-800/50 bg-primary-900 hover:bg-primary-800/30 transition-colors">
                <td className="p-4">
                  <p className="text-white font-medium line-clamp-1">{p.title}</p>
                  <p className="text-primary-500 text-xs">{formatDate(p.createdAt)} · {p.readTime} min read</p>
                </td>
                <td className="p-4 text-primary-300 hidden sm:table-cell">{p.category}</td>
                <td className="p-4 text-primary-300 hidden md:table-cell">{p.author?.name}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === 'published' ? 'bg-success-500/20 text-success-500' : 'bg-warning-500/20 text-warning-500'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg text-primary-400 hover:text-accent-400 hover:bg-primary-800 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteMut.mutate(p._id)} className="p-1.5 rounded-lg text-primary-400 hover:text-error-500 hover:bg-primary-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
