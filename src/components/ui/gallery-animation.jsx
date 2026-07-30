import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategoryDisplayName, getProjectDescription } from '../../data/filmsData';

const ExpandableGallery = ({ images, project, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const setImageViewMode = (open) => {
    window.dispatchEvent(
      new CustomEvent('image-view-mode', {
        detail: { open: Boolean(open) },
      }),
    );
  };

  const imageList = images.length > 0 ? images : [];

  const openImage = (index) => {
    setImageViewMode(true);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setImageViewMode(false);
    setSelectedIndex(null);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % imageList.length);
    }
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + imageList.length) % imageList.length);
    }
  };

  const getCardWidth = (index) => {
    if (hoveredIndex === null) {
      return '150px';
    }

    return hoveredIndex === index ? 'min(72vw, 540px)' : '110px';
  };

  if (imageList.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 rounded-md bg-primary-bg border border-gray-700 text-text-secondary ${className}`}>
        No gallery images available
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex w-full items-center justify-center gap-3 overflow-x-auto pb-2">
        {imageList.map((image, index) => (
          <motion.div
            key={index}
            className="relative h-56 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-primary-bg sm:h-64 md:h-80"
            animate={{ width: getCardWidth(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            <img
              src={image}
              alt={project ? `${project.title} still ${index + 1}` : `Gallery image ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${
                hoveredIndex === index ? 'scale-100' : 'scale-80'
              }`}
            />
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0.05 : 0.28 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={() => closeImage()}
          >
            <button
              className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:text-accent-gold"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
              aria-label="Close image"
            >
              <X className="h-4 w-4" />
            </button>

            {imageList.length > 1 && (
              <button
                className="absolute left-4 z-10 text-white hover:text-accent-gold transition-colors"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}

            <motion.div
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={imageList[selectedIndex]}
                alt={project ? `${project.title} still ${selectedIndex + 1}` : `Gallery image ${selectedIndex + 1}`}
                className="w-full max-h-[52vh] object-contain rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              {project && (
                <div className="mt-5 w-full max-w-2xl text-center px-4">
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-accent-gold text-primary-bg text-[10px] font-medium rounded-full uppercase tracking-wider">
                      {getCategoryDisplayName(project.category)}
                    </span>
                    <span className="text-text-secondary text-xs">{project.year}</span>
                    <span className="text-text-secondary text-xs">{project.duration}</span>
                    <span className="text-text-secondary text-xs">{project.genre}</span>
                  </div>

                  <h3 className="text-lg md:text-xl font-heading font-bold text-text-primary mb-2">
                    {project.title}
                  </h3>

                  {project.roles && project.roles.length > 0 && (
                    <p className="text-accent-gold text-xs mb-3">
                      {project.roles.join(' • ')}
                    </p>
                  )}

                  <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                    {getProjectDescription(project)}
                  </p>
                </div>
              )}
            </motion.div>

            {imageList.length > 1 && (
              <button
                className="absolute right-4 z-10 text-white hover:text-accent-gold transition-colors"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs bg-black/50 px-4 py-2 rounded-md">
              {selectedIndex + 1} / {imageList.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProjectGalleryModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) {
    return null;
  }

  const images =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.thumbnail
        ? [project.thumbnail]
        : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-6xl bg-primary-bg-light rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <div className="mb-6 pr-12">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-accent-gold text-primary-bg text-xs font-medium rounded-full uppercase tracking-wider">
                {getCategoryDisplayName(project.category)}
              </span>
              <span className="text-text-secondary text-sm">{project.year}</span>
              <span className="text-text-secondary text-sm">{project.duration}</span>
              <span className="text-text-secondary text-sm">{project.genre}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-heading font-bold text-text-primary mb-2">
              {project.title}
            </h2>

            {project.roles && project.roles.length > 0 && (
              <p className="text-accent-gold text-sm mb-3">
                {project.roles.join(' • ')}
              </p>
            )}

            <p className="text-text-secondary text-sm md:text-base leading-relaxed border-l-2 border-accent-gold/40 pl-4">
              {getProjectDescription(project)}
            </p>
          </div>

          <ExpandableGallery images={images} project={project} className="w-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandableGallery;
