import React from 'react';
import { motion } from 'framer-motion';

const ProjectPlaceholder = ({ project, className = "" }) => {
  return (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${className}`}>
      <div className="text-center p-6">
        <motion.svg 
          className="w-16 h-16 text-accent-gold/50 mx-auto mb-4" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
        </motion.svg>
        <h3 className="text-accent-gold font-bold text-lg mb-2">{project.title}</h3>
        <p className="text-text-secondary text-sm mb-2">{project.year} • {project.duration}</p>
        <span className="inline-block px-3 py-1 bg-accent-gold/20 text-accent-gold text-xs font-medium rounded-full uppercase tracking-wider">
          {project.category.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
};

export default ProjectPlaceholder;


