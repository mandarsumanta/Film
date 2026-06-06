import React, { useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ShowreelSection from '../components/ShowreelSection';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [videoError, setVideoError] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const videoRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current || !videoRef.current) return;

      const heroBottom = heroSectionRef.current.getBoundingClientRect().bottom;
      const video = videoRef.current;

      if (heroBottom <= 0) {
        setIsScrolledPastHero(true);
        if (!video.paused) {
          video.pause();
        }
      } else {
        setIsScrolledPastHero(false);
        if (video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const handleError = () => setVideoError(true);

    video.addEventListener('canplay', playVideo);
    video.addEventListener('error', handleError);
    playVideo();

    return () => {
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('error', handleError);
      video.pause();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
        <div
          ref={heroSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          <div
            id="home-video-background"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 0,
              display: isScrolledPastHero ? 'none' : 'block',
              opacity: isScrolledPastHero ? 0 : 1,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            {!videoError && (
              <video
                ref={videoRef}
                id="home-background-video"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                src="/videos/hero-background.mp4"
              />
            )}
            <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"
              style={{ zIndex: 1 }}
            />
          </div>

          <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
            <Hero />
          </div>
        </div>

        <div id="showreel" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <ShowreelSection />
        </div>

        <div id="featured-work" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <PortfolioGrid />
        </div>

        <div id="about" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <AboutSection />
        </div>

        <div id="contact" className="relative bg-primary-bg" style={{ zIndex: 20 }}>
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
