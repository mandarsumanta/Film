import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver, useCountUp } from '../utils/useScrollAnimation';
import { fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';
import { aboutData } from '../data/aboutData';

// Enhanced animation variants
const enhancedContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

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
  const [experienceCount, startExperience, , experienceStarted] = useCountUp(aboutData.stats[0].value, 2000);
  const [projectsCount, startProjects, , projectsStarted] = useCountUp(aboutData.stats[1].value, 2500);
  const [rolesCount, startRoles, , rolesStarted] = useCountUp(aboutData.stats[2].value, 2200);
  const [countriesCount, startCountries, , countriesStarted] = useCountUp(aboutData.stats[3].value, 1800);

  const startCounters = useCallback(() => {
    if (!experienceStarted) {
      setTimeout(() => startExperience(), 200);
    }
    if (!projectsStarted) {
      setTimeout(() => startProjects(), 400);
    }
    if (!rolesStarted) {
      setTimeout(() => startRoles(), 600);
    }
    if (!countriesStarted) {
      setTimeout(() => startCountries(), 800);
    }
  }, [startExperience, startProjects, startRoles, startCountries, experienceStarted, projectsStarted, rolesStarted, countriesStarted]);

  useEffect(() => {
    if (isVisible) {
      startCounters();
    }
  }, [isVisible, startCounters]);

  const skillIcons = {
    // Directing – clapperboard
    'Directing': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6l2.5-3L9 6l2.5-3L14 6l2.5-3L19 6v12a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V6zM6 10h12v8H7a1 1 0 0 1-1-1v-7z" />
      </svg>
    ),
    // Cinematography – camera
    'Cinematography': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 7a3 3 0 0 1 3-3h3l2-2h2l2 2h1a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
    // Editing – scissors
    'Editing': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 5a3 3 0 1 0-2.83 4H12l-2 3.46A3 3 0 1 0 11 15l1-1.73 4.5 7.79 1.73-1-4.5-7.79L18 5h-2.35l-2.3 4H8.17A3 3 0 0 0 9 5zM6 6.5A1.5 1.5 0 1 1 4.5 8 1.5 1.5 0 0 1 6 6.5zm0 9A1.5 1.5 0 1 1 4.5 18 1.5 1.5 0 0 1 6 15.5z" />
      </svg>
    ),
    // Color grading – color wheel
    'Color Grading': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 2a7.93 7.93 0 0 1 3.5.84L12 12zM4.84 8.5A8.01 8.01 0 0 1 11 4.07V12zM11 19.93A8.01 8.01 0 0 1 4.07 13H11zm2 0V13h6.93A8.01 8.01 0 0 1 13 19.93zM13 12l3.5-6.66A8 8 0 0 1 19.93 11z" />
      </svg>
    ),
    // Storytelling – book / script
    'Storytelling': (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 4a3 3 0 0 0-3 3v11h2a3 3 0 0 1 3 3h11V7a3 3 0 0 0-3-3zm0 2h9a1 1 0 0 1 1 1v12H9a3 3 0 0 0-2-.78H4V7a1 1 0 0 1 1-1zm3 3v2h5V9zm0 4v2h3v-2z" />
      </svg>
    ),
  };

  const stats = [
    { label: aboutData.stats[0].label, value: experienceCount, suffix: aboutData.stats[0].suffix },
    { label: aboutData.stats[1].label, value: projectsCount, suffix: aboutData.stats[1].suffix },
    { label: aboutData.stats[2].label, value: rolesCount, suffix: aboutData.stats[2].suffix },
    { label: aboutData.stats[3].label, value: countriesCount, suffix: aboutData.stats[3].suffix }
  ];

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
                    src="/images/about-portrait.jpg"  /* put your file here: public/images/about-portrait.jpg */
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
