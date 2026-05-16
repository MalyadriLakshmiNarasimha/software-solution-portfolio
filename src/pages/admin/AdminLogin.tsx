import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent2-500 flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Admin Login</h1>
          <p className="text-primary-400 text-sm mt-2">NexaForge CMS</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-primary-900 rounded-2xl p-8 border border-primary-800 space-y-5">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-1.5">Email</label>
            <input {...register('email')} type="email" placeholder="admin@example.com" className="w-full px-4 py-3 bg-primary-800 border border-primary-700 rounded-xl text-white placeholder-primary-500 focus:outline-none focus:border-accent-500 transition-colors" />
            {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-1.5">Password</label>
            <input {...register('password')} type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-primary-800 border border-primary-700 rounded-xl text-white placeholder-primary-500 focus:outline-none focus:border-accent-500 transition-colors" />
            {errors.password && <p className="text-error-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all disabled:opacity-60">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
