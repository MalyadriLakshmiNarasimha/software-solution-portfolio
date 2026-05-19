import { Link } from 'react-router-dom';
import { Code2, Twitter, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Our Work' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const SERVICE_LINKS = [
  { to: '/services', label: 'Web Development' },
  { to: '/services', label: 'Mobile Apps' },
  { to: '/services', label: 'Cloud Solutions' },
  { to: '/services', label: 'AI/ML Integration' },
  { to: '/services', label: 'DevOps & CI/CD' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-primary-900 text-primary-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent2-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-heading font-bold text-xl">
                KLD <span className="text-gradient">TECHNOLOGIES</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              We build scalable software solutions that transform enterprise businesses and drive measurable results.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-primary-800 flex items-center justify-center hover:bg-accent-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm hover:text-accent-400 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm hover:text-accent-400 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Get the latest insights on software engineering and technology trends.</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-sm text-white placeholder-primary-500 focus:outline-none focus:border-accent-500 transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-accent-600 to-accent2-600 rounded-lg hover:from-accent-500 hover:to-accent2-500 transition-all"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-500">
            &copy; {new Date().getFullYear()} KLD TECHNOLOGIES. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
