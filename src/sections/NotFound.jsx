import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { staggerContainer, staggerItem } from '../utils/animations';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div 
          className="mb-8"
          variants={staggerItem}
        >
          <h1 className="text-8xl md:text-9xl font-heading font-bold text-accent-gold mb-4 cinematic-text">
            404
          </h1>
          <div className="w-32 h-1 bg-accent-gold mx-auto"></div>
        </motion.div>

        {/* Error Message */}
        <motion.div 
          className="mb-8"
          variants={staggerItem}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            The page you're looking for seems to have vanished like a perfect take that wasn't recorded. 
            But don't worry, every great story has unexpected turns.
          </p>
        </motion.div>

        {/* Film Strip Decoration */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={staggerItem}
        >
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-6 bg-accent-gold/20 border border-accent-gold/40"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation Options */}
        <motion.div 
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          variants={staggerItem}
        >
          <Link to="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/work">
            <Button variant="secondary" className="w-full sm:w-auto">
              View My Work
            </Button>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-700"
          variants={staggerItem}
        >
          <p className="text-text-secondary text-sm">
            Looking for something specific? Try navigating from the{' '}
            <Link to="/" className="text-accent-gold hover:underline">
              homepage
            </Link>{' '}
            or{' '}
            <Link to="/contact" className="text-accent-gold hover:underline">
              get in touch
            </Link>{' '}
            if you need assistance.
          </p>
        </motion.div>

        {/* Enhanced Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Film Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`film-element-${i}`}
              className="absolute opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            >
              {i % 3 === 0 && (
                <svg className="w-8 h-8 text-accent-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
              )}
              {i % 3 === 1 && (
                <div className="w-6 h-4 bg-accent-gold/30 rounded-sm">
                  <div className="flex justify-between items-center h-full px-0.5">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-0.5 h-0.5 bg-black/40 rounded-full" />
                    ))}
                  </div>
                </div>
              )}
              {i % 3 === 2 && (
                <div className="w-4 h-4 border-2 border-accent-gold/30 rounded-full">
                  <div className="w-full h-full border border-accent-gold/20 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Animated Glow Effects */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Floating Numbers */}
          {['4', '0', '4'].map((num, i) => (
            <motion.div
              key={`floating-${i}`}
              className="absolute text-6xl font-bold text-accent-gold/10"
              style={{
                top: `${20 + i * 30}%`,
                right: `${10 + i * 25}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2
              }}
            >
              {num}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
