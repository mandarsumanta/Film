import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { filmsData, categories, roles, getProjectsByCategory, roleSynonyms, getCategoryDisplayName } from '../data/filmsData';
import ProjectModal from './ProjectModal';
import ProjectPlaceholder from './ProjectPlaceholder';
import { useIntersectionObserver } from '../utils/useScrollAnimation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRole, setActiveRole] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(filmsData);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    let filtered = getProjectsByCategory(activeFilter);

    if (activeRole !== 'all') {
      const roleLower = activeRole.toLowerCase();
      // Get synonyms for the selected role (e.g., "Director of Photography" matches "Cinematographer")
      const synonyms = roleSynonyms[roleLower] || [roleLower];
      
      filtered = filtered.filter(project =>
        Array.isArray(project.roles) &&
        project.roles.some(r => {
          const projectRoleLower = r.toLowerCase();
          // Check exact match or if it's in the synonyms list
          return synonyms.includes(projectRoleLower) || projectRoleLower === roleLower;
        })
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(0);
  }, [activeFilter, activeRole]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const handleRoleChange = (event) => {
    setActiveRole(event.target.value);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const paginatedProjects = filteredProjects.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="section-padding bg-primary-bg/80 backdrop-blur-sm relative overflow-hidden"
      id="portfolio"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Floating Film Reels */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border-2 border-accent-gold/20 rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 35}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
          >
            <div className="absolute inset-2 border border-accent-gold/30 rounded-full">
              <div className="absolute inset-1 bg-accent-gold/10 rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
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
            SELECTED WORKS
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-accent-gold mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={isVisible ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          
          <motion.p 
            className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A comprehensive showcase of my filmmaking journey across various genres and formats, 
            each project representing a unique story and creative vision.
          </motion.p>
        </motion.div>

        {/* Filters: Categories + Roles */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
          variants={filterVariants}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium relative overflow-hidden ${
                  activeFilter === category.id
                    ? 'bg-accent-gold text-primary-bg shadow-lg shadow-accent-gold/30'
                    : 'bg-primary-bg-light text-text-secondary hover:text-accent-gold hover:bg-primary-bg-light/80 border border-gray-700 hover:border-accent-gold/30'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(212,175,55,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
              >
                <motion.span
                  className="relative z-10"
                  animate={activeFilter === category.id ? {
                    textShadow: "0 0 10px rgba(0,0,0,0.5)"
                  } : {}}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-70">({category.count})</span>
                </motion.span>
              </motion.button>
            ))}
          </div>

          {/* Roles filter on the right */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary hidden md:inline">Filter by role:</span>
            <select
              value={activeRole}
              onChange={handleRoleChange}
              className="bg-primary-bg-light text-text-primary text-sm px-3 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-gold"
            >
              <option value="all">All roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Projects Grid with side navigation */}
        <div className="relative px-0 md:px-16">
          {filteredProjects.length > itemsPerPage && (
            <>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={!canGoPrev}
                className={`hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-700 bg-primary-bg-light/70 backdrop-blur transition z-20 ${
                  !canGoPrev
                    ? 'opacity-40 cursor-not-allowed pointer-events-none'
                    : 'hover:border-accent-gold hover:text-accent-gold'
                }`}
              >
                <span className="sr-only">Previous projects</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                disabled={!canGoNext}
                className={`hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-700 bg-primary-bg-light/70 backdrop-blur transition z-20 ${
                  !canGoNext
                    ? 'opacity-40 cursor-not-allowed pointer-events-none'
                    : 'hover:border-accent-gold hover:text-accent-gold'
                }`}
              >
                <span className="sr-only">Next projects</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-8">
            {paginatedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>

        {/* Pagination indicator / mobile controls */}
        {filteredProjects.length > itemsPerPage && (
          <div className="flex items-center justify-center gap-4 mt-8 text-sm text-text-secondary">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={!canGoPrev}
              className="md:hidden px-4 py-2 rounded-full border border-gray-700 disabled:opacity-40"
            >
              Prev
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={!canGoNext}
              className="md:hidden px-4 py-2 rounded-full border border-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-secondary">
              Try selecting a different category to see more projects.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

// Individual Project Card Component
const ProjectCard = ({ project, index, isVisible, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-primary-bg-light rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        boxShadow: "0 25px 50px rgba(212,175,55,0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Loading Placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-accent-gold/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c0-1.1-.9-2-2-2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        )}

        {/* Error Placeholder */}
        {imageError && (
          <div className="absolute inset-0">
            <ProjectPlaceholder project={project} className="w-full h-full" />
          </div>
        )}

        {/* Actual Image */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true); // Show content even if image fails
          }}
          loading="lazy"
        />

        {/* Animated Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        />

        {/* Animated Play Button - Centered (clickable on desktop & mobile) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0.9, scale: 0.9 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-16 h-16 bg-accent-gold/90 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(212,175,55,0.6)"
            }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(212,175,55,0)",
                "0 0 20px rgba(212,175,55,0.4)",
                "0 0 0px rgba(212,175,55,0)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { duration: 0.2 }
            }}
            onClick={onClick}
          >
            <motion.svg 
              className="w-8 h-8 text-primary-bg ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ scale: 1.2 }}
            >
              <path d="M8 5v14l11-7z"/>
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6 z-0"
          initial={{ y: 16 }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-accent-gold/90 text-primary-bg text-xs font-medium rounded-full uppercase tracking-wider">
              {getCategoryDisplayName(project.category)}
            </span>
          </div>

          {/* Title and Year */}
          <h3 className="text-lg lg:text-xl font-heading font-bold text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
            {project.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>{project.year}</span>
            <span>{project.duration}</span>
          </div>

          {/* Roles summary */}
          {project.roles && project.roles.length > 0 && (
            <div className="mt-1 text-xs text-accent-gold/90 line-clamp-1">
              {project.roles.join(' • ')}
            </div>
          )}
        </motion.div>

        {/* Animated Film Strip Effect */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-gold/30 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent to-accent-gold/30"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Animated Hover Border Effect */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none"
        whileHover={{ borderColor: "rgba(212,175,55,0.3)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default PortfolioGrid;
