// Performance optimization utilities

// Lazy load images with intersection observer
export const lazyLoadImage = (img, src) => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = src;
        lazyImage.classList.remove('lazy');
        imageObserver.unobserve(lazyImage);
      }
    });
  });
  
  imageObserver.observe(img);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero background image
  const heroImage = new Image();
  heroImage.src = '/images/hero-bg.webp';
  
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
};

// Optimize video loading
export const optimizeVideo = (videoElement) => {
  // Add loading="lazy" for videos below the fold
  if ('loading' in HTMLVideoElement.prototype) {
    videoElement.loading = 'lazy';
  }
  
  // Preload metadata only
  videoElement.preload = 'metadata';
  
  // Add poster image for better UX
  if (!videoElement.poster) {
    videoElement.poster = '/images/video-poster.jpg';
  }
};

// Debounce scroll events for performance
export const debounceScroll = (func, wait = 16) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle resize events
export const throttleResize = (func, limit = 100) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationConfig = () => {
  const isLowEndDevice = navigator.hardwareConcurrency <= 4;
  const prefersReduced = prefersReducedMotion();
  
  if (prefersReduced || isLowEndDevice) {
    return {
      duration: 0.2,
      ease: 'linear',
      stagger: 0.05
    };
  }
  
  return {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
    stagger: 0.1
  };
};

// Web Vitals tracking
export const trackWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Critical resource hints
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'player.vimeo.com',
    'www.youtube.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Register service worker for caching
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

