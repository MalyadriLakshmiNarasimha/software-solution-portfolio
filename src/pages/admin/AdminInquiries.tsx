import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Trash2, Mail, Building2, DollarSign, Calendar } from 'lucide-react';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { formatDate } from '../../utils/format';
import { toast } from 'sonner';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  projectType?: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function AdminInquiries() {
  const qc = useQueryClient();

  const { data: inquiries = [] } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => api.get('/contact').then(r => r.data),
  });

  const markReadMut = useMutation({
    mutationFn: (id: string) => api.put(`/contact/${id}/read`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inquiries'] }); toast.success('Marked as read'); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => api.delete(`/contact/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inquiries'] }); toast.success('Deleted'); },
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Inquiries</h1>
        <p className="text-primary-400 text-sm mt-1">
          {inquiries.filter((i: Inquiry) => !i.read).length} unread of {inquiries.length} total
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq: Inquiry) => (
          <div key={inq._id} className={`p-6 rounded-2xl border transition-all ${inq.read ? 'bg-primary-900 border-primary-800' : 'bg-primary-900 border-accent-500/40 shadow-lg shadow-accent-500/5'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {!inq.read && <span className="w-2 h-2 bg-accent-400 rounded-full flex-shrink-0" />}
                  <h3 className="text-white font-semibold">{inq.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${inq.read ? 'bg-primary-700 text-primary-400' : 'bg-accent-500/20 text-accent-400'}`}>
                    {inq.read ? 'Read' : 'New'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs text-primary-400">
                  <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {inq.email}</div>
                  {inq.company && <div className="flex items-center gap-1.5"><Building2 className="w-3 h-3" /> {inq.company}</div>}
                  {inq.budget && <div className="flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> {inq.budget}</div>}
                  <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {formatDate(inq.createdAt)}</div>
                </div>

                {inq.projectType && (
                  <span className="inline-block px-3 py-1 bg-primary-800 text-primary-300 text-xs rounded-full mb-3">{inq.projectType}</span>
                )}

                <p className="text-primary-300 text-sm leading-relaxed">{inq.message}</p>
              </div>

              <div className="flex sm:flex-col gap-2">
                {!inq.read && (
                  <button onClick={() => markReadMut.mutate(inq._id)} className="flex items-center gap-1.5 px-3 py-2 bg-success-500/20 text-success-500 rounded-lg text-xs font-medium hover:bg-success-500/30 transition-colors">
                    <Check className="w-3.5 h-3.5" /> Mark Read
                  </button>
                )}
                <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 px-3 py-2 bg-primary-800 text-primary-300 rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Reply
                </a>
                <button onClick={() => deleteMut.mutate(inq._id)} className="flex items-center gap-1.5 px-3 py-2 bg-error-500/10 text-error-500 rounded-lg text-xs font-medium hover:bg-error-500/20 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-24 text-primary-500">No inquiries yet.</div>
        )}
      </div>
    </AdminLayout>
  );
}
