import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../utils/useScrollAnimation';
import Button from './Button';
import { servicesData } from '../data/servicesData';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../utils/animations';

// Service icon helper function – icons chosen to match each service heading
const getServiceIcon = (iconName) => {
  const icons = {
    // Narrative Films – film shooting icon (camera on tripod)
    film: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        {/* Camera body */}
        <rect x="5" y="7" width="9" height="6" rx="1.2" />
        {/* Camera lenses / reels */}
        <circle cx="7" cy="6" r="2" />
        <circle cx="11" cy="6" r="2" />
        {/* Lens / viewfinder box */}
        <rect x="14" y="8" width="4" height="4" rx="0.8" />
        {/* Tripod legs */}
        <path d="M9 13.5l-2.5 5h1.8L10 15.5l1.7 3h1.8L11 13.5H9z" />
      </svg>
    ),
    // Documentary Production – film production camera (cinema camera with side handle)
    camera: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        {/* Camera body */}
        <rect x="4" y="8" width="10" height="7" rx="1.5" />
        {/* Top handle */}
        <rect x="6" y="6" width="6" height="1.5" rx="0.75" />
        {/* Lens / matte box */}
        <rect x="14" y="9" width="4" height="5" rx="0.8" />
        {/* Side grip / monitor arm */}
        <path d="M6 15.5h3l-1 3H5.5l.5-1.5z" />
        {/* Record light */}
        <circle cx="7" cy="10" r="0.7" />
      </svg>
    ),
    // Commercial & Brand Content – loudspeaker
    megaphone: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 10v4a2 2 0 0 0 2 2h1l2 4h2v-4h2l7 3V7l-7 3H7a2 2 0 0 0-2 2z" />
      </svg>
    ),
    // Post‑Production Services – film cut icon (scissors cutting film strip)
    edit: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        {/* Film strip */}
        <rect x="3" y="6" width="10" height="4" rx="0.8" />
        <rect x="3" y="14" width="10" height="4" rx="0.8" />
        {/* Perforations */}
        <circle cx="4.5" cy="8" r="0.4" />
        <circle cx="6.5" cy="8" r="0.4" />
        <circle cx="8.5" cy="8" r="0.4" />
        <circle cx="10.5" cy="8" r="0.4" />
        <circle cx="12.5" cy="8" r="0.4" />
        <circle cx="4.5" cy="16" r="0.4" />
        <circle cx="6.5" cy="16" r="0.4" />
        <circle cx="8.5" cy="16" r="0.4" />
        <circle cx="10.5" cy="16" r="0.4" />
        <circle cx="12.5" cy="16" r="0.4" />
        {/* Scissors */}
        <path d="M15 11l2-1.5c.3-.2.7-.1.9.2.2.3.1.7-.2.9L15.8 12l1.9 1.4c.3.2.4.6.2.9-.2.3-.6.4-.9.2L15 13" />
        <circle cx="14" cy="10" r="0.9" />
        <circle cx="14" cy="14" r="0.9" />
      </svg>
    )
  };
  return icons[iconName] || icons.film;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.05,
    rotateX: 5,
    boxShadow: "0 20px 40px rgba(212,175,55,0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
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
      delay: 0.2
    }
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ServicesSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCollaborateClick = () => {
    if (location.pathname === '/') {
      // On home page, smooth-scroll to contact section
      smoothScrollTo('contact');
    } else {
      // On other pages, navigate to contact route
      navigate('/contact');
    }
  };


  return (
    <motion.section
      ref={sectionRef}
      className="section-padding bg-primary-bg/80 backdrop-blur-sm relative overflow-hidden"
      id="services"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Floating Film Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-2 bg-accent-gold/10 rounded-sm"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              x: [0, 100, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
          >
            <div className="flex justify-between items-center h-full px-1">
              {[...Array(6)].map((_, j) => (
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
              textShadow: "0 0 20px rgba(212,175,55,0.5)",
              scale: 1.05
            }}
            transition={{ duration: 0.3 }}
          >
            WHAT I DO
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-accent-gold mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-base md:text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {servicesData.description}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
        >
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-primary-bg-light rounded-xl p-6 cursor-pointer perspective-1000"
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent"
                whileHover={{
                  borderColor: "rgba(212,175,55,0.5)",
                  boxShadow: "inset 0 0 20px rgba(212,175,55,0.1)"
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon with Animation */}
              <motion.div 
                className="text-accent-gold mb-4 flex justify-center"
                variants={iconVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="w-12 h-12 relative"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {getServiceIcon(service.icon)}
                </motion.div>
              </motion.div>

              {/* Title with Hover Effect */}
              <motion.h3 
                className="text-lg font-heading font-bold text-text-primary mb-3 text-center"
                whileHover={{
                  color: "#d4af37",
                  scale: 1.05
                }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-text-secondary leading-relaxed text-sm text-center mb-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {service.description}
              </motion.p>

              {/* Features with Stagger Animation */}
              <motion.div 
                className="space-y-1"
                variants={containerVariants}
              >
                {service.features.slice(0, 3).map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-center text-xs text-text-secondary"
                    variants={itemVariants}
                    whileHover={{
                      x: 5,
                      color: "#d4af37"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.3
                      }}
                    />
                    <span className="truncate">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent opacity-0 rounded-xl pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-primary-bg-light rounded-2xl p-8 md:p-12 relative overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(212,175,55,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px"
              }}
            />

            <motion.h4 
              className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4 relative z-10"
              whileHover={{
                textShadow: "0 0 10px rgba(212,175,55,0.3)"
              }}
            >
              Ready to Bring Your Vision to Life?
            </motion.h4>
            
            <motion.p 
              className="text-base text-text-secondary mb-8 max-w-2xl mx-auto relative z-10"
              variants={itemVariants}
            >
              Let's collaborate to create something extraordinary. Whether it's a commercial,
              documentary, or creative project, I'm here to help tell your story.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <Button 
                variant="primary" 
                className="text-lg px-8 py-4 group relative overflow-hidden"
                onClick={handleCollaborateClick}
              >
                <motion.span 
                  className="flex items-center relative z-10"
                  whileHover={{
                    textShadow: "0 0 10px rgba(255,255,255,0.5)"
                  }}
                >
                  Let's Collaborate
                  <motion.svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{
                      x: [0, 3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </motion.svg>
                </motion.span>
                
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 to-accent-gold/40 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <motion.p
                className="text-sm text-text-secondary text-center max-w-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                For collaboration inquiries and project discussions, feel free to reach out.
                <br className="hidden sm:block" />
                Available for projects worldwide.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};



export default ServicesSection;
