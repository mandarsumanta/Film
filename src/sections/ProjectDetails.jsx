import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryDisplayName, getProjectById } from '../data/filmsData';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = useMemo(() => getProjectById(id), [id]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!project) {
    return (
      <section className="min-h-screen bg-primary-bg text-text-primary flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Project not found</h1>
          <p className="text-text-secondary mb-6">
            This project does not exist or the URL is invalid.
          </p>
          <button
            type="button"
            onClick={() => navigate('/work')}
            className="px-6 py-3 rounded-full bg-accent-gold text-primary-bg font-medium"
          >
            Back to Work
          </button>
        </div>
      </section>
    );
  }

  const currentImage = (project.gallery && project.gallery[selectedIndex]) || project.thumbnail;
  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/work', { replace: true });
  };

  return (
    <section
      className="min-h-screen bg-primary-bg text-text-primary"
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close project details"
        className="fixed top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-gray-700 text-white hover:text-accent-gold hover:border-accent-gold transition flex items-center justify-center"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="max-w-2xl mx-auto px-3 sm:px-4 pt-14 pb-3 md:pt-16 md:pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
          {currentImage ? (
            <img
              src={currentImage}
              alt={`${project.title} hero still`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary">
              No preview available
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-accent-gold text-primary-bg text-[10px] font-medium rounded-full uppercase tracking-wider">
              {getCategoryDisplayName(project.category)}
            </span>
            <span className="text-xs text-text-secondary">{project.year}</span>
            <span className="text-xs text-text-secondary">{project.duration}</span>
            <span className="text-xs text-text-secondary">{project.genre}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-heading font-bold mb-2">{project.title}</h1>

          <div className="flex items-center text-accent-gold font-medium text-xs mb-3">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {project.roles && project.roles.join(', ')}
          </div>

          {project.description && (
            <p className="text-xs text-text-secondary leading-relaxed border-l-2 border-accent-gold/40 pl-2.5">
              {project.description}
            </p>
          )}
        </div>

        <div className="mt-5">
          {project.gallery && project.gallery.length > 0 ? (
            <>
              <h2 className="text-sm font-heading font-semibold mb-2">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.gallery.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`relative rounded-md overflow-hidden shadow-lg aspect-video bg-gray-900 text-left ${selectedIndex === index ? 'ring-2 ring-accent-gold/50' : ''}`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} still ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="aspect-video bg-gray-900/50 rounded-md border border-gray-700 flex items-center justify-center text-xs text-text-secondary">
              No gallery image available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
