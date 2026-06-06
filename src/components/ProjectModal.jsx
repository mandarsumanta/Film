import React, { useEffect, useState, useRef } from 'react';
import { getCategoryDisplayName } from '../data/filmsData';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, project]);

  if (!isOpen || !project) {
    return null;
  }
  // We'll show the first gallery image in the hero area instead of a video.

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      style={{ zIndex: 9999 }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[85vh] bg-primary-bg-light rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ zIndex: 10000 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero image (use first gallery photo instead of a video) */}
          <div className="relative aspect-video bg-black w-full max-w-3xl mx-auto mt-6 rounded-xl overflow-hidden">
            { (project.gallery && project.gallery.length > 0) || project.thumbnail ? (
              <img
                src={(project.gallery && project.gallery[selectedIndex]) || project.thumbnail}
                alt={project.title + ' hero still'}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                No preview available
              </div>
            ) }
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-accent-gold text-primary-bg text-sm font-medium rounded-full uppercase tracking-wider">
                  {getCategoryDisplayName(project.category)}
                </span>
                <span className="text-text-secondary">{project.year}</span>
                <span className="text-text-secondary">{project.duration}</span>
                <span className="text-text-secondary">{project.genre}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
                {project.title}
              </h2>
              
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex items-center text-accent-gold font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {project.roles && project.roles.join(', ')}
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-10">
              {project.gallery && project.gallery.length > 0 ? (
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className={`relative rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-900 group cursor-pointer transition-transform duration-200 ${selectedIndex === index ? 'ring-4 ring-accent-gold/40' : ''}`}
                        onClick={() => setSelectedIndex(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedIndex(index); }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} still ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center text-text-secondary">
                  No gallery image available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
