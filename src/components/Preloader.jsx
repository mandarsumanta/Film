import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-primary-bg flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-accent-gold mb-2">
                SUMANTA MANDAR
              </h1>
              <p className="text-text-secondary text-lg tracking-wider">
                FILMMAKER & VISUAL STORYTELLER
              </p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              {/* Film Reel Animation */}
              <div className="relative w-16 h-16 mx-auto mb-6">
                <motion.div
                  className="w-16 h-16 border-4 border-accent-gold/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute inset-2 border-2 border-accent-gold/40 rounded-full">
                    <div className="absolute inset-2 bg-accent-gold/60 rounded-full flex items-center justify-center">
                      <motion.div
                        className="w-2 h-2 bg-primary-bg rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-gold to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Progress Text */}
              <motion.p
                className="text-accent-gold text-sm mt-4 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading Experience... {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-gold/30 rounded-full">
              <motion.div
                className="w-full h-full bg-accent-gold/60 rounded-full"
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent-gold/30 rounded-full">
              <motion.div
                className="w-full h-full bg-accent-gold/60 rounded-full"
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

