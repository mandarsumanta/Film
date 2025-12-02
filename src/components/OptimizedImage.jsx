import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../utils/useScrollAnimation';
import SkeletonLoader from './SkeletonLoader';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  aspectRatio = '16/9',
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const shouldLoad = priority || isVisible;

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Generate WebP and fallback sources
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // If it's already a WebP or external URL, return as is
    if (originalSrc.includes('.webp') || originalSrc.startsWith('http')) {
      return originalSrc;
    }
    
    // Convert to WebP for better compression
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const webpSrc = getOptimizedSrc(src);
  const fallbackSrc = src;

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio, width, height }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <SkeletonLoader 
          width="100%" 
          height="100%" 
          className="absolute inset-0"
        />
      )}

      {/* Error Placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c0-1.1-.9-2-2-2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Optimized Image */}
      {shouldLoad && !hasError && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <motion.img
            src={fallbackSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ scale: 1.1 }}
            animate={{ scale: isLoaded ? 1 : 1.1 }}
            transition={{ duration: 0.6 }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;

