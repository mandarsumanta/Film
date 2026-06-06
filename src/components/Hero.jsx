import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('portfolio');
    if (workSection) {
      workSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 lg:pt-28 film-grain"
      id="hero"
      style={{ y, opacity, background: 'transparent' }}
    >
      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Main Title */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-text-primary mb-6 cinematic-text tracking-wider"
          variants={fadeInUp}
          whileHover={{
            textShadow: [
              "0 0 0px rgba(212,175,55,0)",
              "0 0 20px rgba(212,175,55,0.6)",
              "0 0 0px rgba(212,175,55,0)"
            ],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          SUMANTA MANDAR
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-accent-gold font-medium mb-12 tracking-wide"
          variants={fadeInUp}
        >
          FILMMAKER & VISUAL STORYTELLER
        </motion.p>

        {/* Description */}
        <motion.p 
          className="text-sm md:text-base text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          Director • Cinematographer • Colorist • Editor based in San Diego.
          MFA (Film & TV Production), San Diego State University ('26).
          Available for narrative, documentary, and commercial work.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={fadeInUp}>
          <motion.button
            onClick={scrollToWork}
            className="btn-hero group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              View My Work
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-gold to-yellow-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator directly under CTA, centered (extra small) */}
        <motion.div 
          className="mt-8 flex justify-center scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToWork}
            className="flex flex-col items-center space-y-2 group"
            aria-label="Scroll to portfolio"
            whileHover={{ y: -5 }}
          >
            <span className="text-xs font-medium tracking-wider">SCROLL</span>
            <motion.div 
              className="w-px h-6 bg-accent-gold opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.svg 
              className="w-3 h-3 group-hover:text-accent-gold transition-colors duration-300" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Film Strips */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`film-${i}`}
            className="absolute opacity-10"
            style={{
              top: `${20 + i * 30}%`,
              left: `-10%`,
            }}
            animate={{
              x: ["0vw", "110vw"],
              rotate: [0, 360],
            }}
            transition={{
              x: { duration: 25 + i * 8, repeat: Infinity, ease: "linear" },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="w-24 h-4 bg-accent-gold/30 rounded-sm relative">
              {/* Film Perforations */}
              <div className="flex justify-between items-center h-full px-1">
                {[...Array(10)].map((_, j) => (
                  <div key={j} className="w-1 h-1 bg-black/40 rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-accent-gold/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Lens Flares */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`flare-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              top: `${30 + i * 40}%`,
              right: `${10 + i * 20}%`,
              background: `radial-gradient(circle, rgba(212,175,55,${0.1 - i * 0.03}) 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 15, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}

        {/* Geometric Shapes */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-accent-gold/20"
            style={{
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              top: `${15 + i * 20}%`,
              left: `${10 + i * 25}%`,
              borderRadius: i % 2 === 0 ? '50%' : '0%'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              borderColor: [
                "rgba(212,175,55,0.2)", 
                "rgba(212,175,55,0.4)", 
                "rgba(212,175,55,0.2)"
              ]
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}

        {/* Subtle Grid Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-20"></div>
      </div>
    </motion.section>
  );
};

export default Hero;