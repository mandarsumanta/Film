import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  width = '100%', 
  height = '200px', 
  className = '',
  variant = 'rectangular' 
}) => {
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 ${variants[variant]} ${className}`}
      style={{ width, height }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      initial={{ backgroundSize: '200% 100%' }}
    />
  );
};

// Skeleton for project cards
export const ProjectCardSkeleton = () => (
  <div className="bg-primary-bg-light rounded-xl p-6 animate-pulse">
    <SkeletonLoader height="200px" className="mb-4" />
    <SkeletonLoader width="60%" height="20px" className="mb-2" />
    <SkeletonLoader width="40%" height="16px" className="mb-4" />
    <SkeletonLoader width="100%" height="14px" className="mb-2" />
    <SkeletonLoader width="80%" height="14px" />
  </div>
);

// Skeleton for award cards
export const AwardCardSkeleton = () => (
  <div className="bg-primary-bg rounded-xl p-6 animate-pulse">
    <SkeletonLoader width="80px" height="20px" className="mb-4" />
    <SkeletonLoader width="70%" height="24px" className="mb-3" />
    <SkeletonLoader width="50%" height="16px" className="mb-4" />
    <SkeletonLoader width="100%" height="14px" className="mb-2" />
    <SkeletonLoader width="90%" height="14px" />
  </div>
);

// Skeleton for text content
export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-3">
    {[...Array(lines)].map((_, i) => (
      <SkeletonLoader
        key={i}
        width={i === lines - 1 ? '75%' : '100%'}
        height="16px"
        variant="text"
      />
    ))}
  </div>
);

export default SkeletonLoader;

