import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../utils/useScrollAnimation';
import Button from './Button';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const videoVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

const playButtonVariants = {
  hidden: { 
    scale: 0,
    rotate: -180
  },
  visible: { 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.5
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    boxShadow: "0 0 30px rgba(212,175,55,0.4)",
    transition: {
      duration: 0.3
    }
  },
  tap: {
    scale: 0.95
  }
};

const ShowreelSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver();
  const videoRef = useRef(null);

  // Static paths to downloadable assets in public/files
const RESUME_URL = '/files/sumanta-mandar-portfolio.pdf';

  // Showreel data
  const showreelData = {
    title: "DIRECTOR'S SHOWREEL",
    videoUrl: "https://youtu.be/xF4n6yFOS5A?si=k4FBgIEFkj8W-29G", // Demo showreel - replace with actual
    duration: "2:30",
    description: "A showcase of my filmmaking journey across narrative, documentary, and commercial projects. Each piece represents a commitment to visual storytelling, technical excellence, and collaborative creativity developed through my MFA studies and professional work.",
    year: "2024"
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      // Handle YouTube URLs
      if (showreelData.videoUrl.includes('youtube.com/embed/')) {
        videoRef.current.src = `${showreelData.videoUrl}?autoplay=1&mute=1&rel=0`;
      } else {
        // Handle Vimeo URLs (fallback)
        videoRef.current.src = `${showreelData.videoUrl}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0`;
      }
    }
  };

  const handleViewCV = () => {
    // Open CV/resume PDF in a new tab (served from public/files)
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="section-padding bg-primary-bg/80 backdrop-blur-sm relative overflow-hidden"
      id="showreel"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-0 left-1/3 w-96 h-96 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/3 w-72 h-72 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Floating Film Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-3 bg-accent-gold/10 rounded-sm"
            style={{
              top: `${15 + i * 20}%`,
              left: `${5 + i * 25}%`,
            }}
            animate={{
              x: [0, 150, 0],
              rotate: [0, 360, 720],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 4
            }}
          >
            <div className="flex justify-between items-center h-full px-1">
              {[...Array(8)].map((_, j) => (
                <div key={j} className="w-0.5 h-0.5 bg-accent-gold rounded-full" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 cinematic-text"
            whileHover={{
              textShadow: [
                "0 0 30px rgba(212,175,55,0.3)",
                "0 0 50px rgba(212,175,55,0.5)",
                "0 0 30px rgba(212,175,55,0.3)"
              ],
              scale: 1.02
            }}
            transition={{ duration: 0.5 }}
          >
            {showreelData.title}
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1 bg-accent-gold mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={isVisible ? { width: 128, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          
          <motion.p 
            className="text-base md:text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience my cinematic vision through this carefully curated showcase of narrative, 
            documentary, and commercial work developed during my MFA studies and professional projects.
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="max-w-5xl mx-auto mb-12"
          variants={videoVariants}
        >
          <motion.div 
            className="relative group"
            whileHover={{ 
              scale: 1.02,
              rotateX: 2,
              rotateY: 2
            }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated Golden Border Frame */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-r from-accent-gold via-accent-gold to-accent-gold rounded-2xl"
              animate={{
                opacity: [0.75, 1, 0.75],
                boxShadow: [
                  "0 0 20px rgba(212,175,55,0.3)",
                  "0 0 40px rgba(212,175,55,0.6)",
                  "0 0 20px rgba(212,175,55,0.3)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Video Player Container */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              {/* Video Player */}
              <iframe
                ref={videoRef}
                src={isPlaying ? 
                  (showreelData.videoUrl.includes('youtube.com/embed/') ? 
                    `${showreelData.videoUrl}?autoplay=1&mute=1&rel=0` : 
                    `${showreelData.videoUrl}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0`
                  ) : 
                  (showreelData.videoUrl.includes('youtube.com/embed/') ? 
                    `${showreelData.videoUrl}?rel=0` : 
                    `${showreelData.videoUrl}?color=d4af37&title=0&byline=0&portrait=0`
                  )
                }
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={showreelData.title}
              ></iframe>

              {/* Custom Play Button Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                    onClick={handlePlayClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="relative"
                      variants={playButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {/* Pulsing Ring Effect */}
                      <motion.div
                        className="absolute inset-0 w-32 h-32 border-2 border-accent-gold rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Outer Ring */}
                      <motion.div 
                        className="w-32 h-32 border-2 border-accent-gold rounded-full flex items-center justify-center relative z-10"
                        whileHover={{ 
                          borderColor: "#ffffff",
                          boxShadow: "0 0 30px rgba(212,175,55,0.6)"
                        }}
                      >
                        {/* Inner Ring */}
                        <motion.div 
                          className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center"
                          whileHover={{ 
                            backgroundColor: "#ffffff",
                            scale: 1.1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Play Icon */}
                          <motion.svg 
                            className="w-8 h-8 text-primary-bg ml-1" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                            whileHover={{ 
                              color: "#d4af37",
                              scale: 1.2
                            }}
                          >
                            <path d="M8 5v14l11-7z"/>
                          </motion.svg>
                        </motion.div>
                      </motion.div>
                      
                      {/* Pulse Animation */}
                      <motion.div 
                        className="absolute inset-0 w-32 h-32 border-2 border-accent-gold rounded-full opacity-20"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Play Text */}
                    <motion.div 
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <motion.p 
                        className="text-white font-medium text-base mb-1"
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Watch Showreel
                      </motion.p>
                      <p className="text-accent-gold text-xs">{showreelData.duration}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Film Strip Decoration */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-accent-gold/30 via-accent-gold/60 to-accent-gold/30"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-accent-gold/30 via-accent-gold/60 to-accent-gold/30"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Video Information */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 mb-6 text-text-secondary"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="flex items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, color: "#d4af37" }}
            >
              <motion.svg 
                className="w-5 h-5 text-accent-gold mr-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </motion.svg>
              <span className="font-medium">Duration: {showreelData.duration}</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, color: "#d4af37" }}
            >
              <motion.svg 
                className="w-5 h-5 text-accent-gold mr-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zM4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"/>
              </motion.svg>
              <span className="font-medium">Updated: {showreelData.year}</span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-base text-text-secondary leading-relaxed mb-8"
            variants={itemVariants}
          >
            {showreelData.description}
          </motion.p>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="primary" 
                className="text-lg px-8 py-4 group relative overflow-hidden"
                onClick={handleViewCV}
              >
                <motion.span 
                  className="flex items-center relative z-10"
                  whileHover={{
                    textShadow: "0 0 10px rgba(212,175,55,0.5)"
                  }}
                >
                  View CV
                  <motion.svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </motion.svg>
                </motion.span>
                
                {/* Button Border Glow Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-accent-gold/50 rounded-lg opacity-0"
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
          
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ShowreelSection;
