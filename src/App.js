import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SkipLink from './components/SkipLink';
import ErrorBoundary from './components/ErrorBoundary';
import { pageTransition } from './utils/animations';
import { initPerformanceOptimizations } from './utils/performance';

// Lazy load components for better performance
const Home = lazy(() => import('./sections/Home'));
const About = lazy(() => import('./sections/About'));
const Work = lazy(() => import('./sections/Work'));
const Contact = lazy(() => import('./sections/Contact'));
const NotFound = lazy(() => import('./sections/NotFound'));

// Animated route wrapper - ensures complete component isolation
const AnimatedRoute = ({ children, routeKey }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Force cleanup of any lingering elements when route changes
    const currentPath = location.pathname;
    if (currentPath !== '/') {
      // Remove any video elements that might persist
      const videos = document.querySelectorAll('video[id*="home"], video[id*="background"], #home-video-background, #home-background-video');
      videos.forEach(el => {
        try {
          el.remove();
        } catch (e) {
          el.style.display = 'none';
        }
      });
    }
  }, [location.pathname]);

  return (
    <motion.div
      key={routeKey || location.pathname}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ position: 'relative', zIndex: 10 }}
    >
      {children}
    </motion.div>
  );
};

// Component to handle background based on route
const AppContent = () => {
  const location = useLocation();
  // Strict check: only index page (exactly '/' or empty string)
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();
  }, []);

  // Effect to add body class for CSS targeting (simplified - components handle their own cleanup)
  useEffect(() => {
    // Add class to body based on route for CSS targeting
    if (isHomePage) {
      document.body.classList.add('is-home-page');
      document.body.classList.remove('not-home-page');
    } else {
      document.body.classList.add('not-home-page');
      document.body.classList.remove('is-home-page');
      
      // Simple cleanup - remove any lingering video elements (safety net)
      // Components should handle their own cleanup, but this is a backup
      const cleanup = () => {
        const video = document.getElementById('home-background-video');
        const container = document.getElementById('home-video-background');
        if (video) {
          video.pause();
          video.src = '';
          try { video.remove(); } catch (e) {}
        }
        if (container) {
          try { container.remove(); } catch (e) {}
        }
      };
      
      // Run cleanup once after a short delay
      const timer = setTimeout(cleanup, 100);
      return () => clearTimeout(timer);
    }
  }, [isHomePage, location.pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Solid background layer for all pages */}
      <div 
        className="fixed inset-0 bg-primary-bg transition-opacity duration-500"
        style={{ 
          zIndex: -1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      />
      
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <SkipLink />
        <Navigation />
          
          <main id="main-content" tabIndex="-1" className="relative" style={{ zIndex: 10 }}>
            <AnimatePresence mode="wait">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading...</p>
                  </div>
                </div>
              }>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={
                    <AnimatedRoute routeKey="home-route">
                      <Home key="home-page-unique" />
                    </AnimatedRoute>
                  } />
                  <Route path="/about" element={
                    <AnimatedRoute routeKey="about-route">
                      <About key="about-page-unique" />
                    </AnimatedRoute>
                  } />
                  <Route path="/work" element={
                    <AnimatedRoute routeKey="work-route">
                      <Work key="work-page-unique" />
                    </AnimatedRoute>
                  } />
                  <Route path="/contact" element={
                    <AnimatedRoute routeKey="contact-route">
                      <Contact key="contact-page-unique" />
                    </AnimatedRoute>
                  } />
                  <Route path="*" element={
                    <AnimatedRoute routeKey="notfound-route">
                      <NotFound key="notfound-page-unique" />
                    </AnimatedRoute>
                  } />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
          
        <Footer />
      </motion.div>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App min-h-screen bg-primary-bg transition-colors duration-300">
          <AppContent />
    </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
