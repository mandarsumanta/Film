import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExpandableGallery from '../components/ui/gallery-animation';
import {
  getCategoryDisplayName,
  getProjectById,
  getProjectDescription,
} from '../data/filmsData';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-primary-bg px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            Project not found
          </h1>
          <p className="text-text-secondary mb-8">
            The project you are looking for does not exist or is no longer available.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center rounded-full bg-accent-gold px-6 py-3 text-sm font-medium text-primary-bg transition hover:opacity-90"
          >
            Back to selected works
          </Link>
        </div>
      </div>
    );
  }

  const images =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.thumbnail
        ? [project.thumbnail]
        : [];

  return (
    <div className="min-h-screen bg-primary-bg px-4 pb-14 pt-28 md:px-6 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="py-2"
        >
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-accent-gold text-primary-bg text-[10px] font-medium rounded-full uppercase tracking-wider">
                {getCategoryDisplayName(project.category)}
              </span>
              <span className="text-text-secondary text-xs">{project.year}</span>
              <span className="text-text-secondary text-xs">{project.duration}</span>
              <span className="text-text-secondary text-xs">{project.genre}</span>
            </div>

            <h1 className="text-xl md:text-3xl font-heading font-bold text-text-primary mb-3">
              {project.title}
            </h1>

            {project.roles && project.roles.length > 0 && (
              <p className="text-accent-gold text-xs md:text-sm mb-4">
                {project.roles.join(' • ')}
              </p>
            )}

            <p className="max-w-3xl text-text-secondary text-xs md:text-sm leading-relaxed border-l-2 border-accent-gold/40 pl-4">
              {getProjectDescription(project)}
            </p>
          </div>

          <ExpandableGallery images={images} project={project} className="w-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
