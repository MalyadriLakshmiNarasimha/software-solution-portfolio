import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import { useEffect } from 'react';

const SETTING_FIELDS = [
  { key: 'company_name', label: 'Company Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'email', label: 'Contact Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'address', label: 'Address' },
  { key: 'social_twitter', label: 'Twitter URL' },
  { key: 'social_linkedin', label: 'LinkedIn URL' },
  { key: 'social_github', label: 'GitHub URL' },
];

export default function AdminSettings() {
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then(r => r.data),
  });

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const updateMut = useMutation({
    mutationFn: (data: Record<string, string>) => api.put('/settings', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['settings'] }); toast.success('Settings saved'); },
    onError: () => toast.error('Failed to save settings'),
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Site Settings</h1>
        <p className="text-primary-400 text-sm mt-1">Update company information and social links.</p>
      </div>

      <form onSubmit={handleSubmit((d) => updateMut.mutate(d as Record<string, string>))} className="max-w-2xl space-y-5">
        <div className="p-6 bg-primary-900 rounded-2xl border border-primary-800 space-y-5">
          {SETTING_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-primary-300 mb-1.5">{label}</label>
              <input
                {...register(key)}
                className="w-full px-4 py-3 bg-primary-800 border border-primary-700 rounded-xl text-white focus:outline-none focus:border-accent-500 transition-colors"
              />
            </div>
          ))}
        </div>

        <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </AdminLayout>
  );
}
