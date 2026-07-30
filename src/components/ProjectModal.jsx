import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProjectGalleryModal } from './ui/gallery-animation';

const ProjectModal = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <ProjectGalleryModal
          project={project}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
