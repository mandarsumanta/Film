import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '../utils/animations';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-primary-bg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? buttonHover : {}}
      whileTap={!disabled ? buttonTap : {}}
      {...props}
    >
      <motion.span
        className="relative z-10"
        initial={false}
        animate={{ opacity: disabled ? 0.5 : 1 }}
      >
        {children}
      </motion.span>
      
      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 to-transparent rounded-lg"
        initial={{ opacity: 0, x: "-100%" }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default Button;
