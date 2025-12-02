import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver, useCountUp } from '../utils/useScrollAnimation';
import { fadeInRight, staggerContainer } from '../utils/animations';
import { aboutData } from '../data/aboutData';

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateY: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const AboutSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();
  // Guard against missing stats entries
  const statsSource = aboutData.stats || [];
  const [experienceCount, startExperience, , experienceStarted] = useCountUp(
    statsSource[0]?.value ?? 0,
    2000
  );
  const [projectsCount, startProjects, , projectsStarted] = useCountUp(
    statsSource[1]?.value ?? 0,
    2500
  );

  const startCounters = useCallback(() => {
    if (!experienceStarted) {
      setTimeout(() => startExperience(), 200);
    }
    if (!projectsStarted) {
      setTimeout(() => startProjects(), 400);
    }
  }, [startExperience, startProjects, experienceStarted, projectsStarted]);

  useEffect(() => {
    if (isVisible) {
      startCounters();
    }
  }, [isVisible, startCounters]);

  const skillIcons = {
    // Directing – Director's cut clapperboard (hinged slate)
    'Directing': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        {/* Bottom board */}
        <rect x="3" y="9" width="18" height="10" rx="1.5" />
        {/* Top hinged slate */}
        <path d="M4 5.5c0-.8.6-1.5 1.4-1.5H20l-1 4H4V5.5z" />
        {/* Diagonal stripes on slate */}
        <path d="M6 4.5h2.2l1.8 2.5H7.6L6 4.5z" fill="white" />
        <path d="M9.4 4.5h2.2l1.8 2.5h-2.4L9.4 4.5z" fill="white" />
        <path d="M12.8 4.5H15l1.8 2.5h-2.4L12.8 4.5z" fill="white" />
        {/* Simple \"cut\" mark on board */}
        <path d="M8 13h8v1.2H8z" fill="white" />
      </svg>
    ),
    // Cinematography – Video camera with viewfinder
    'Cinematography': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
        <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
    // Editing – Video editing monitor with play button and timeline
    'Editing': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        {/* Monitor frame */}
        <rect x="3" y="4" width="18" height="12" rx="2" />
        {/* Play triangle */}
        <path d="M11 9l4 3-4 3V9z" />
        {/* Timeline bar */}
        <rect x="5" y="17" width="14" height="1.5" />
        {/* Playhead */}
        <rect x="11" y="16" width="2" height="3" />
      </svg>
    ),
    // Color Grading – Color wheel with grading sliders
    'Color Grading': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        {/* Outer color wheel */}
        <circle cx="12" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        {/* Wheel segments / markers */}
        <circle cx="12" cy="5" r="0.9" />
        <circle cx="15.5" cy="7" r="0.9" />
        <circle cx="8.5" cy="7" r="0.9" />
        <circle cx="9" cy="12.5" r="0.9" />
        <circle cx="15" cy="12.5" r="0.9" />
        {/* Center point */}
        <circle cx="12" cy="10" r="1.1" />
        {/* Grading sliders under the wheel */}
        <rect x="5" y="16" width="14" height="1.3" rx="0.6" />
        <rect x="7" y="18.2" width="10" height="1.3" rx="0.6" />
        {/* Slider knobs */}
        <circle cx="9" cy="16.65" r="0.8" fill="black" />
        <circle cx="14" cy="19" r="0.8" fill="black" />
      </svg>
    ),
    // Storytelling – Script/document with lines (screenplay)
    'Storytelling': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        <path d="M8 8h5v1.5H8V8zm0 3h8v1.5H8V11zm0 3h6v1.5H8V14z"/>
      </svg>
    ),
  };

  const stats = [
    statsSource[0] && {
      label: statsSource[0].label,
      value: experienceCount,
      suffix: statsSource[0].suffix
    },
    statsSource[1] && {
      label: statsSource[1].label,
      value: projectsCount,
      suffix: statsSource[1].suffix
    }
  ].filter(Boolean);

  return (
    <motion.section 
      ref={sectionRef}
      className="section-padding bg-primary-bg-light/80 backdrop-blur-sm relative overflow-hidden"
      id="about"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-1/4 right-0 w-96 h-96 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-accent-gold/20 rounded-full"
            style={{
              top: `${15 + i * 20}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            variants={imageVariants}
          >
            <motion.div 
              className="relative group"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: 2
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Portrait Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-full transform group-hover:scale-105 transition-transform duration-500"></div>
                
                {/* Border Ring */}
                <div className="absolute inset-2 border-2 border-accent-gold/30 rounded-full group-hover:border-accent-gold/50 transition-colors duration-500"></div>
                
                {/* Image Container */}
                <div className="absolute inset-4 rounded-full overflow-hidden group-hover:shadow-2xl group-hover:shadow-accent-gold/20 transition-all duration-500">
                  <img
                    src="/images/about-portrait.JPG"
                    alt="Sumanta Mandar Portrait"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-gold rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-gold rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={fadeInRight}>
            
            {/* Section Heading */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4 cinematic-text">
                ABOUT ME
              </h2>
              <div className="w-20 h-1 bg-accent-gold"></div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6 mb-10">
              {aboutData.bio.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base text-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>


            {/* Enhanced Skills Section */}
            <motion.div 
              className="mb-12"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h3 
                className="text-xl font-heading font-semibold text-text-primary mb-6"
                variants={skillVariants}
              >
                Core Expertise
              </motion.h3>
              <div className="space-y-6">
                {aboutData.skills.map((skillCategory, categoryIndex) => (
                  <motion.div 
                    key={skillCategory.category}
                    variants={skillVariants}
                  >
                    <motion.h4 
                      className="text-base font-medium text-accent-gold mb-3"
                      whileHover={{ x: 5, textShadow: "0 0 10px rgba(212,175,55,0.5)" }}
                    >
                      {skillCategory.category}
                    </motion.h4>
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <motion.div 
                          key={skill}
                          className="flex items-center space-x-3 p-3 bg-primary-bg rounded-lg relative overflow-hidden"
                          variants={skillVariants}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(26, 26, 26, 0.8)",
                            boxShadow: "0 10px 25px rgba(212,175,55,0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="text-accent-gold"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: skillIndex * 0.5 }}
                          >
                            {skillIcons[skill] || (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            )}
                          </motion.div>
                          <span className="text-text-primary font-medium text-sm relative z-10">{skill}</span>
                          
                          {/* Hover glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Stats Counter */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center p-4 bg-primary-bg rounded-lg relative overflow-hidden"
                  variants={statVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    boxShadow: "0 15px 35px rgba(212,175,55,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="text-2xl lg:text-3xl font-heading font-bold text-accent-gold mb-2"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(212,175,55,0)",
                        "0 0 20px rgba(212,175,55,0.6)",
                        "0 0 0px rgba(212,175,55,0)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <motion.div 
                    className="text-xs text-text-secondary font-medium"
                    whileHover={{ color: "#d4af37", y: -2 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
