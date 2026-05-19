import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, Upload, X } from 'lucide-react';
import api from '../services/api';
import PageHero from '../components/common/PageHero';
import ScrollReveal from '../components/common/ScrollReveal';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget range'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => v && formData.append(k, v));
      if (attachment) formData.append('attachment', attachment);
      await api.post('/contact', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSubmitted(true);
    } catch {
      toast.error('Failed to send. Please try again.');
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 bg-white dark:bg-primary-900 border rounded-xl text-primary-900 dark:text-white placeholder-muted focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? 'border-error-500 focus:ring-error-500/30'
        : 'border-primary-200 dark:border-primary-700 focus:border-accent-500 focus:ring-accent-500/30'
    }`;

  return (
    <>
      <Helmet>
        <title>Contact — KLD TECHNOLOGIES</title>
        <meta name="description" content="Start a project with KLD TECHNOLOGIES. Tell us about your needs and we'll get back to you within 24 hours." />
        <link rel="canonical" href="https://kldtech.io/contact" />
      </Helmet>

      <PageHero
        title="Let's Build Together"
        subtitle="Tell us about your project and we'll get back to you within one business day."
        breadcrumb="Contact"
      />

      <section className="py-16 bg-light dark:bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Full Name *</label>
                        <input {...register('name')} placeholder="Alex Johnson" className={inputClass(!!errors.name)} />
                        {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Email Address *</label>
                        <input {...register('email')} type="email" placeholder="alex@company.com" className={inputClass(!!errors.email)} />
                        {errors.email && <p className="text-error-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Company</label>
                      <input {...register('company')} placeholder="Your company name" className={inputClass()} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Budget Range *</label>
                        <select {...register('budget')} className={inputClass(!!errors.budget)}>
                          <option value="">Select budget</option>
                          <option value="<$5k">Under $5,000</option>
                          <option value="$5k-$20k">$5,000 – $20,000</option>
                          <option value="$20k-$50k">$20,000 – $50,000</option>
                          <option value="$50k+">$50,000+</option>
                        </select>
                        {errors.budget && <p className="text-error-500 text-xs mt-1">{errors.budget.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Project Type *</label>
                        <select {...register('projectType')} className={inputClass(!!errors.projectType)}>
                          <option value="">Select type</option>
                          <option value="Web Application">Web Application</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                          <option value="AI/ML Solution">AI/ML Solution</option>
                          <option value="DevOps Setup">DevOps Setup</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.projectType && <p className="text-error-500 text-xs mt-1">{errors.projectType.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Message *</label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className={inputClass(!!errors.message)}
                      />
                      {errors.message && <p className="text-error-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Attachment */}
                    <div>
                      <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1.5">Attachment (PDF/DOC, max 5MB)</label>
                      {attachment ? (
                        <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-xl">
                          <span className="flex-1 text-sm text-primary-700 dark:text-primary-200 truncate">{attachment.name}</span>
                          <button type="button" onClick={() => setAttachment(null)} className="text-muted hover:text-error-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-primary-200 dark:border-primary-700 rounded-xl cursor-pointer hover:border-accent-400 transition-colors">
                          <Upload className="w-4 h-4 text-muted" />
                          <span className="text-sm text-muted">Click to attach a file</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                          />
                        </label>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-xl hover:from-accent-500 hover:to-accent2-500 transition-all duration-200 shadow-lg shadow-accent-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-success-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-heading font-bold text-primary-900 dark:text-white mb-3">
                      Message Received!
                    </h3>
                    <p className="text-muted dark:text-primary-400 max-w-sm">
                      Thank you for reaching out. Our team will review your inquiry and respond within one business day.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact info */}
            <aside className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <div className="p-8 rounded-2xl bg-primary-900 text-white">
                  <h3 className="text-xl font-heading font-bold mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, label: 'Email', value: 'hello@kldtech.io' },
                      { icon: Phone, label: 'Phone', value: '+1 (415) 555-0190' },
                      { icon: MapPin, label: 'Address', value: '101 Market Street, Suite 1800\nSan Francisco, CA 94105' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-primary-400 text-xs font-medium uppercase tracking-wide">{label}</p>
                          <p className="text-white text-sm mt-1 whitespace-pre-line">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden h-64 bg-primary-800 border border-primary-700">
                  <iframe
                    src="https://maps.google.com/maps?q=101+Market+Street,+San+Francisco,+CA&output=embed"
                    title="Office Location"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent2-500/10 border border-accent-500/20">
                  <p className="text-sm font-semibold text-primary-900 dark:text-white mb-2">Response Time</p>
                  <p className="text-sm text-muted dark:text-primary-400">
                    We respond to all inquiries within <strong className="text-accent-600 dark:text-accent-400">24 business hours</strong>. For urgent projects, call us directly.
                  </p>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
