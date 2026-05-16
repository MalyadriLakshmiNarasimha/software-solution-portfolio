import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'sonner';

interface Member {
  _id: string;
  name: string;
  role: string;
  photo?: string;
  bio: string;
  order: number;
  socials?: { linkedin?: string; github?: string; twitter?: string };
}

type FormData = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  order: number;
  linkedin: string;
  github: string;
  twitter: string;
};

function MemberForm({ initial, onSave, onCancel }: { initial?: Partial<Member>; onSave: (d: FormData) => void; onCancel: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      ...initial,
      linkedin: initial?.socials?.linkedin || '',
      github: initial?.socials?.github || '',
      twitter: initial?.socials?.twitter || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-primary-300 mb-1">Name *</label>
          <input {...register('name', { required: true })} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Role *</label>
          <input {...register('role', { required: true })} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Photo URL</label>
          <input {...register('photo')} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm text-primary-300 mb-1">Display Order</label>
          <input {...register('order', { valueAsNumber: true })} type="number" className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-primary-300 mb-1">Bio</label>
        <textarea {...register('bio')} rows={3} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['linkedin', 'github', 'twitter'].map((soc) => (
          <div key={soc}>
            <label className="block text-sm text-primary-300 mb-1 capitalize">{soc}</label>
            <input {...register(soc as keyof FormData)} className="w-full px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:outline-none focus:border-accent-500" placeholder="https://..." />
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-primary-700 text-primary-300 hover:bg-primary-800 transition-colors text-sm">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-lg bg-accent-600 text-white font-semibold hover:bg-accent-500 transition-colors text-sm disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Member'}
        </button>
      </div>
    </form>
  );
}

export default function AdminTeam() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);

  const { data: team = [] } = useQuery({ queryKey: ['team'], queryFn: () => api.get('/team').then(r => r.data) });

  const transform = (d: FormData) => ({
    name: d.name, role: d.role, photo: d.photo, bio: d.bio, order: d.order,
    socials: { linkedin: d.linkedin, github: d.github, twitter: d.twitter },
  });

  const createMut = useMutation({
    mutationFn: (d: FormData) => api.post('/team', transform(d)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); setShowForm(false); toast.success('Member added'); },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.put(`/team/${id}`, transform(data)),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); setEditing(null); toast.success('Updated'); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.delete(`/team/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Deleted'); },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Team Members</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-accent-600 text-white rounded-lg hover:bg-accent-500 transition-colors text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {(showForm || editing) && (
        <div className="mb-8 p-6 bg-primary-900 rounded-2xl border border-primary-800">
          <h2 className="text-lg font-heading font-semibold text-white mb-5">{editing ? 'Edit Member' : 'New Member'}</h2>
          <MemberForm
            initial={editing || undefined}
            onSave={(d) => editing ? updateMut.mutate({ id: editing._id, data: d }) : createMut.mutate(d)}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((m: Member) => (
          <div key={m._id} className="p-5 rounded-2xl bg-primary-900 border border-primary-800 flex items-start gap-4">
            <img src={m.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=0EA5E9&color=fff`} alt={m.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{m.name}</p>
              <p className="text-accent-400 text-xs">{m.role}</p>
              <p className="text-primary-400 text-xs mt-1 line-clamp-2">{m.bio}</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setEditing(m)} className="p-1.5 rounded text-primary-400 hover:text-accent-400 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => deleteMut.mutate(m._id)} className="p-1.5 rounded text-primary-400 hover:text-error-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
