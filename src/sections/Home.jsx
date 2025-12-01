import React, { useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ShowreelSection from '../components/ShowreelSection';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [videoError, setVideoError] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  
  // Hide video when scrolling past Hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current && videoRef.current) {
        const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
        // Hide video when Hero section is completely out of view
        if (heroBottom <= 0) {
          setIsScrolledPastHero(true);
          // Pause video to save resources
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else {
          setIsScrolledPastHero(false);
          // Resume video when back in Hero section
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(err => console.log('Video play error:', err));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // This component ONLY renders on "/" route, so video will only exist here
  useEffect(() => {
    // Cleanup function - removes video when component unmounts
    return () => {
      const video = videoRef.current;
      const container = containerRef.current;
      
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.src = '';
        video.load();
      }
      
      // Remove from DOM when component unmounts
      if (container) {
        try {
          container.remove();
        } catch (e) {
          // Already removed
        }
      }
    };
  }, []);
  
  useEffect(() => {
    // Setup video - this only runs when Home component is mounted (i.e., on "/" route)
    const timer = setTimeout(() => {
      const video = videoRef.current;
      const container = containerRef.current;
      
      if (!video) {
        console.warn('Video ref not found');
        return;
      }
      
      if (!container) {
        console.warn('Container ref not found');
        return;
      }

      console.log('Setting up video on home page');

      // Ensure container is absolute and visible - contained within Hero section
      container.style.cssText = 'position: absolute !important; display: block !important; visibility: visible !important; opacity: 1 !important; pointer-events: none !important; z-index: 0 !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100% !important; height: 100% !important;';

      // Ensure video is visible - override any CSS that might hide it
      video.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; height: 100% !important; position: absolute !important; top: 0 !important; left: 0 !important; object-fit: cover !important; z-index: 0 !important;';

      // Handle video load errors
      const handleVideoError = (e) => {
        console.error('Video error:', e);
        console.error('Video error details:', video.error);
        setVideoError(true);
      };

      const handleVideoLoad = () => {
        console.log('Video loaded successfully');
      };

      const handleCanPlay = () => {
        console.log('Video can play');
        // Try to play when ready
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video is playing');
            })
            .catch((error) => {
              console.error('Video play error:', error);
            });
        }
      };

      video.addEventListener('error', handleVideoError);
      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('canplay', handleCanPlay);
      
      // Try to play the video immediately
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video is playing');
          })
          .catch((error) => {
            console.error('Video play error (will retry on canplay):', error);
          });
      }
    }, 100);

    // Cleanup - Remove video when component unmounts (route change)
    return () => {
      clearTimeout(timer);
      const video = videoRef.current;
      const container = containerRef.current;
      
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.src = '';
        video.load();
      }
      
      if (container) {
        try {
          container.remove();
        } catch (e) {
          // Already removed
        }
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Content with relative positioning - All sections on Home page */}
      <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
        {/* Hero Section with Video Background - Video only shows in Hero section */}
        <div 
          ref={heroSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          {/* Video Background - Contained only in Hero section, hidden when scrolled past */}
          <div 
            ref={containerRef}
            id="home-video-background"
            key="home-video-container"
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              zIndex: 0, 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              display: isScrolledPastHero ? 'none' : 'block',
              opacity: isScrolledPastHero ? 0 : 1,
              transition: 'opacity 0.5s ease-out'
            }}
          >
            {!videoError ? (
              <video
                key="home-background-video-element"
                ref={videoRef}
                id="home-background-video"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              >
                <source src="/videos/hero-background.mp4" type="video/mp4" />
                <source src="/videos/hero-background.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : null}
            {/* Dark overlay for content readability */}
            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }}></div>
            {/* Additional gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" style={{ zIndex: 1 }}></div>
          </div>
          
          {/* Hero Section Content */}
          <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
            <Hero />
          </div>
        </div>
        
        {/* Showreel Section - Solid background, no video */}
        <div id="showreel" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <ShowreelSection />
        </div>
        
        {/* Portfolio Section - Solid background, no video (SELECTED WORKS) */}
        <div id="featured-work" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <PortfolioGrid />
        </div>

        {/* Services Section - Solid background, no video (WHAT I DO) */}
        <div id="services" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <ServicesSection />
        </div>
        
        {/* About Section - Solid background, no video */}
        <div id="about" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <AboutSection />
        </div>
        
        {/* Contact Section - Solid background, no video */}
        <div id="contact" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Home;