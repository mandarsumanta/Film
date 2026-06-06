import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo, getCurrentSection } from '../utils/animations';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Only track sections on the home page
      if (location.pathname === '/') {
        setActiveSection(getCurrentSection());
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', section: 'hero' },
    { name: 'Work', path: '/work', section: 'featured-work' },
    { name: 'About', path: '/about', section: 'about' },
    { name: 'Contact', path: '/contact', section: 'contact' },
  ];

  const isActive = (link) => {
    // On home page, highlight based on scroll position / section
    if (location.pathname === '/') {
      return activeSection === link.section;
    }
    // On other pages, highlight based on route path
    return location.pathname === link.path;
  };

  const handleNavClick = (link, e) => {
    if (location.pathname === '/' && link.section) {
      e.preventDefault();
      smoothScrollTo(link.section);
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-bg/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              onClick={(e) => {
                // If already on home, smooth-scroll to hero instead of re-navigating
                if (location.pathname === '/') {
                  e.preventDefault();
                  smoothScrollTo('hero');
                }
              }}
              className="text-xl lg:text-2xl font-heading font-bold text-accent-gold hover:text-opacity-80 transition-colors duration-300"
            >
              Sumanta Mandar
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`text-sm lg:text-base font-medium transition-colors duration-300 hover:text-accent-gold relative ${
                    isActive(link)
                      ? 'text-accent-gold'
                      : 'text-text-secondary'
                  }`}
                >
                  {link.name}
                  {isActive(link) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-gold"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-text-secondary hover:text-accent-gold transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.path
                variants={{
                  closed: { d: "M4 6h16M4 12h16M4 18h16" },
                  open: { d: "M6 18L18 6M6 6l12 12" }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-primary-bg-light/95 backdrop-blur-md rounded-lg mt-2 py-4 shadow-lg"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavClick(link, e)}
                      className={`block px-4 py-3 text-base font-medium transition-colors duration-300 hover:text-accent-gold hover:bg-primary-bg/50 ${
                        isActive(link)
                          ? 'text-accent-gold bg-primary-bg/30'
                          : 'text-text-secondary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
