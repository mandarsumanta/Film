import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  id,
  background = 'default',
  padding = 'default',
  ...props 
}) => {
  const backgrounds = {
    default: 'bg-primary-bg',
    light: 'bg-primary-bg-light',
    transparent: 'bg-transparent',
  };

  const paddings = {
    none: '',
    small: 'py-8 lg:py-12',
    default: 'section-padding',
    large: 'px-4 sm:px-6 lg:px-8 py-24 lg:py-32',
  };

  const sectionClasses = `${backgrounds[background]} ${paddings[padding]} ${className}`;

  return (
    <section 
      id={id}
      className={sectionClasses}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;

