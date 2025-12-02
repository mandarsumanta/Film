import React from 'react';
import { motion } from 'framer-motion';

const SkipLink = () => {
  const handleSkipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href="#main-content"
      onClick={handleSkipToContent}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-accent-gold text-primary-bg px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-primary-bg"
      whileFocus={{ scale: 1.05 }}
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipLink;

