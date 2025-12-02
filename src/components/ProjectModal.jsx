import React, { useEffect, useRef, useState } from 'react';
import { getCategoryDisplayName } from '../data/filmsData';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const iframeRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Helper function to get YouTube embed URL with proper parameters
  const getYouTubeEmbedUrl = (url, autoplay = 0, mute = 0, rel = 0) => {
    if (!url) return '';
    
    // If already an embed URL
    if (url.includes('youtube.com/embed/')) {
      const videoId = url.match(/embed\/([^?]+)/)?.[1] || '';
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&mute=${mute}&rel=${rel}&enablejsapi=1`;
    }
    
    // If regular YouTube URL, extract video ID
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=${autoplay}&mute=${mute}&rel=${rel}&enablejsapi=1`;
    }
    
    return url; // Fallback to original URL
  };

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
      // Reset video playing state when modal opens
      setIsVideoPlaying(false);
    } else {
      setIsVideoPlaying(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, project]);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    // The iframe src will be updated via the getYouTubeEmbedUrl function
  };

  if (!isOpen || !project) {
    return null;
  }

  // Ensure we have a valid video URL
  if (!project.videoUrl) {
    console.warn('Project missing videoUrl:', project);
  }

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
          {/* Video Section - slightly smaller box */}
          <div className="relative aspect-video bg-black w-full max-w-3xl mx-auto mt-6 rounded-xl overflow-hidden">
            <iframe
              ref={iframeRef}
              key={isVideoPlaying ? 'playing' : 'paused'}
              src={isVideoPlaying ? 
                getYouTubeEmbedUrl(project.videoUrl, 1, 1, 0) : 
                getYouTubeEmbedUrl(project.videoUrl, 0, 1, 0)
              }
              title={project.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 'none', display: 'block' }}
            ></iframe>
            
            {/* Custom Play Button Overlay - Absolutely Centered */}
            {!isVideoPlaying && (
              <div 
                className="absolute bg-black/40 cursor-pointer"
                onClick={handlePlayVideo}
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  position: 'absolute'
                }}
              >
                {/* Play Button */}
                <div 
                  className="relative"
                  style={{
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Outer Ring */}
                  <div 
                    className="border-2 border-accent-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      width: '80px',
                      height: '80px',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {/* Inner Ring */}
                    <div 
                      className="bg-accent-gold rounded-full flex items-center justify-center"
                      style={{
                        width: '48px',
                        height: '48px'
                      }}
                    >
                      {/* Play Icon */}
                      <svg 
                        className="text-primary-bg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ 
                          width: '24px',
                          height: '24px',
                          marginLeft: '3px'
                        }}
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Pulse Animation */}
                  <div 
                    className="absolute border-2 border-accent-gold rounded-full animate-ping opacity-20"
                    style={{
                      width: '80px',
                      height: '80px',
                      top: 0,
                      left: 0
                    }}
                  ></div>
                </div>
                
                {/* Play Text */}
                <div 
                  className="text-center"
                  style={{
                    marginTop: '24px'
                  }}
                >
                  <p className="text-white font-medium text-lg mb-1">Play Video</p>
                  <p className="text-accent-gold text-sm">{project.duration}</p>
                </div>
              </div>
            )}
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
                        className="relative rounded-xl overflow-hidden shadow-lg aspect-video bg-gray-900 group"
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
