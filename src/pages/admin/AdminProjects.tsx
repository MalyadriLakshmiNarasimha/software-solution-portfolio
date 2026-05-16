import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'sonner';

interface Project {
  _id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  status: string;
  featured: boolean;
  slug: string;
}

type FormData = {
  title: string;
  category: string;
  client: string;
  year: number;
  summary: string;
  coverImage: string;
  status: string;
  featured: boolean;
  techStack: string;
  features: string;
  overview: string;
  problem: string;
  solution: string;
};

function ProjectForm({ initial, onSave, onCancel }: { initial?: Partial<Project & { techStack: string[]; features: string[]; overview: string; problem: string; solution: string; summary: string; coverImage: string }>; onSave: (d: FormData) => void; onCancel: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      ...initial,
      techStack: initial?.techStack?.join(', ') || '',
      features: initial?.features?.join('\n') || '',
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
            {['Web', 'Mobile', 'AI/ML', 'Cloud', 'E-Commerce'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Client *</label>
          <input {...register('client', { required: true })} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Year</label>
          <input {...register('year', { valueAsNumber: true })} type="number" className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Status</label>
          <select {...register('status')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input {...register('featured')} type="checkbox" id="featured" className="rounded" />
          <label htmlFor="featured" className="text-sm text-primary-300">Featured project</label>
        </div>
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Cover Image URL</label>
        <input {...register('coverImage')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" placeholder="https://..." />
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Summary</label>
        <textarea {...register('summary')} rows={2} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Overview</label>
        <textarea {...register('overview')} rows={3} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-primary-300 mb-1">Problem Statement</label>
          <textarea {...register('problem')} rows={3} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Solution</label>
          <textarea {...register('solution')} rows={3} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Tech Stack (comma-separated)</label>
        <input {...register('techStack')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" placeholder="React, Node.js, MongoDB" />
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Key Features (one per line)</label>
        <textarea {...register('features')} rows={4} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-300 hover:bg-primary-800 transition-colors text-sm">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-lg bg-accent-600 text-white font-semibold hover:bg-accent-500 transition-colors text-sm disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}

export default function AdminProjects() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => api.get('/projects/admin/all').then(r => r.data),
  });

  const createMut = useMutation({
    mutationFn: (data: FormData) => api.post('/projects', {
      ...data,
      techStack: (data.techStack as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean),
      features: (data.features as unknown as string).split('\n').filter(Boolean),
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); setShowForm(false); toast.success('Project created'); },
    onError: () => toast.error('Failed to save'),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.put(`/projects/${id}`, {
      ...data,
      techStack: (data.techStack as unknown as string).split(',').map((s: string) => s.trim()).filter(Boolean),
      features: (data.features as unknown as string).split('\n').filter(Boolean),
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); setEditing(null); toast.success('Project updated'); },
    onError: () => toast.error('Failed to update'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); toast.success('Deleted'); },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Projects</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-accent-600 text-white rounded-lg hover:bg-accent-500 transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {(showForm || editing) && (
        <div className="mb-8 p-6 bg-primary-900 rounded-2xl border border-primary-800">
          <h2 className="text-lg font-heading font-semibold text-white mb-5">{editing ? 'Edit Project' : 'New Project'}</h2>
          <ProjectForm
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
              <th className="text-left p-4 text-primary-400 font-medium hidden md:table-cell">Client</th>
              <th className="text-left p-4 text-primary-400 font-medium">Status</th>
              <th className="text-right p-4 text-primary-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: Project) => (
              <tr key={p._id} className="border-b border-primary-800/50 bg-primary-900 hover:bg-primary-800/30 transition-colors">
                <td className="p-4">
                  <p className="text-white font-medium">{p.title}</p>
                  <p className="text-primary-500 text-xs">{p.year}</p>
                </td>
                <td className="p-4 text-primary-300 hidden sm:table-cell">{p.category}</td>
                <td className="p-4 text-primary-300 hidden md:table-cell">{p.client}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === 'published' ? 'bg-success-500/20 text-success-500' : 'bg-warning-500/20 text-warning-500'}`}>
                    {p.status}
                  </span>
                  {p.featured && <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-accent-500/20 text-accent-400">Featured</span>}
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
