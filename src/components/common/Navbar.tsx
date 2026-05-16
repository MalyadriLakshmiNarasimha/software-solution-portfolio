import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Code2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel) {
      setScrolled(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navBase = scrolled
    ? 'bg-primary-900/95 backdrop-blur-md shadow-lg'
    : 'bg-transparent';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent2-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-heading font-bold text-xl tracking-tight">
                Nexa<span className="text-gradient">Forge</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md group
                    ${isActive ? 'text-accent-400' : 'text-primary-300 hover:text-white'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-accent-500 to-accent2-500 rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="p-2 text-primary-300 hover:text-white transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-600 to-accent2-600 text-white text-sm font-semibold rounded-lg hover:from-accent-500 hover:to-accent2-500 transition-all duration-200 shadow-lg shadow-accent-500/25"
              >
                Get a Quote
              </Link>

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 text-primary-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-primary-900 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full p-6 pt-20">
                <nav className="flex flex-col gap-1 flex-1">
                  {NAV_LINKS.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200
                        ${isActive ? 'bg-accent-500/20 text-accent-400' : 'text-primary-300 hover:bg-primary-800 hover:text-white'}`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
                <Link
                  to="/contact"
                  className="mt-6 w-full text-center px-5 py-3 bg-gradient-to-r from-accent-600 to-accent2-600 text-white font-semibold rounded-lg"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
