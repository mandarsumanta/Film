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
    // Narrative Films – clapperboard
    film: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6l2.5-3L9 6l2.5-3L14 6l2.5-3L19 6v12a2 2 0 0 1-2 2H7a3 3 0 0 1-3-3V6zM6 10h12v8H7a1 1 0 0 1-1-1v-7z" />
      </svg>
    ),
    // Documentary Production – video camera
    camera: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 7a3 3 0 0 1 3-3h3l2-2h2l2 2h1a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
    // Commercial & Brand Content – loudspeaker
    megaphone: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 10v4a2 2 0 0 0 2 2h1l2 4h2v-4h2l7 3V7l-7 3H7a2 2 0 0 0-2 2z" />
      </svg>
    ),
    // Post‑Production Services – edit pencil
    edit: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.3a1 1 0 0 0-1.41 0L15.13 5.1l3.75 3.75z" />
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
              className="relative z-10"
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};



export default ServicesSection;
