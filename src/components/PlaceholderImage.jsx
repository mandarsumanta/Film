import React from 'react';

const PlaceholderImage = ({ 
  width = 400, 
  height = 400, 
  className = '', 
  alt = 'Portrait',
  showIcon = true 
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label={alt}
    >
      {showIcon && (
        <div className="text-center">
          <svg 
            className="w-16 h-16 text-accent-gold/50 mx-auto mb-2" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p className="text-xs text-accent-gold/70 font-medium">
            Portrait Photo
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {width}×{height}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceholderImage;

