import { useQuery } from '@tanstack/react-query';
import { FolderOpen, FileText, Users, MessageSquare, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { formatDate } from '../../utils/format';

export default function AdminDashboard() {
  const { data: projects } = useQuery({ queryKey: ['admin-projects'], queryFn: () => api.get('/projects/admin/all').then(r => r.data) });
  const { data: posts } = useQuery({ queryKey: ['admin-blog'], queryFn: () => api.get('/blog/admin/all').then(r => r.data) });
  const { data: team } = useQuery({ queryKey: ['team'], queryFn: () => api.get('/team').then(r => r.data) });
  const { data: inquiries } = useQuery({ queryKey: ['inquiries'], queryFn: () => api.get('/contact').then(r => r.data) });

  const unread = inquiries?.filter((i: { read: boolean }) => !i.read).length || 0;

  const stats = [
    { icon: FolderOpen, label: 'Total Projects', value: projects?.length || 0, to: '/admin/projects', color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
    { icon: FileText, label: 'Blog Posts', value: posts?.length || 0, to: '/admin/blog', color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400' },
    { icon: Users, label: 'Team Members', value: team?.length || 0, to: '/admin/team', color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' },
    { icon: MessageSquare, label: 'Unread Inquiries', value: unread, to: '/admin/inquiries', color: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-400' },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-primary-400 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map(({ icon: Icon, label, value, to, color, iconColor }) => (
          <Link key={label} to={to} className="p-6 rounded-2xl bg-primary-900 border border-primary-800 hover:border-accent-500/50 transition-all group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">{value}</p>
            <p className="text-primary-400 text-sm">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-primary-900 border border-primary-800">
          <h3 className="text-white font-semibold mb-1 text-sm">Quick Add</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { to: '/admin/projects/new', label: '+ New Project' },
              { to: '/admin/blog/new', label: '+ New Post' },
              { to: '/admin/team/new', label: '+ Team Member' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="px-4 py-2 bg-primary-800 border border-primary-700 text-primary-300 text-xs font-medium rounded-lg hover:border-accent-500 hover:text-accent-400 transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent inquiries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-heading font-semibold">Recent Inquiries</h2>
          <Link to="/admin/inquiries" className="text-accent-400 text-sm hover:text-accent-300 transition-colors">View all</Link>
        </div>
        <div className="rounded-2xl border border-primary-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-800 bg-primary-900/50">
                <th className="text-left p-4 text-primary-400 font-medium">Name</th>
                <th className="text-left p-4 text-primary-400 font-medium hidden sm:table-cell">Company</th>
                <th className="text-left p-4 text-primary-400 font-medium hidden md:table-cell">Type</th>
                <th className="text-left p-4 text-primary-400 font-medium">Date</th>
                <th className="text-left p-4 text-primary-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(inquiries || []).slice(0, 5).map((inq: { _id: string; name: string; email: string; company?: string; projectType?: string; createdAt: string; read: boolean }) => (
                <tr key={inq._id} className="border-b border-primary-800/50 bg-primary-900 hover:bg-primary-800/50 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-medium">{inq.name}</p>
                    <p className="text-primary-500 text-xs">{inq.email}</p>
                  </td>
                  <td className="p-4 text-primary-300 hidden sm:table-cell">{inq.company || '—'}</td>
                  <td className="p-4 text-primary-300 hidden md:table-cell">{inq.projectType || '—'}</td>
                  <td className="p-4 text-primary-400 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {formatDate(inq.createdAt)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${inq.read ? 'bg-primary-700 text-primary-400' : 'bg-accent-500/20 text-accent-400'}`}>
                      {inq.read ? 'Read' : 'New'}
                    </span>
                  </td>
                </tr>
              ))}
              {(!inquiries || inquiries.length === 0) && (
                <tr><td colSpan={5} className="p-8 text-center text-primary-500">No inquiries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
