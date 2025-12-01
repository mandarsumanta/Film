import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../utils/useScrollAnimation';
import Button from './Button';
import { contactData } from '../data/contactData';
import { initEmailJS, sendContactEmail } from '../utils/emailService';

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
    scale: 0.95
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

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const infoVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const ContactSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS();
  }, []);

  const getIconForPlatform = (iconName) => {
    const icons = {
      email: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 2.5A4.5 4.5 0 1 0 16.5 11 4.5 4.5 0 0 0 12 6.5zm0 2a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 8.5zm5.25-3.5a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25z" />
        </svg>
      ),
      youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.8 8.001a2.5 2.5 0 0 0-1.76-1.77C18.179 6 12 6 12 6s-6.179 0-8.04.231A2.5 2.5 0 0 0 2.2 8.001 25.78 25.78 0 0 0 2 12a25.78 25.78 0 0 0 .2 3.999 2.5 2.5 0 0 0 1.76 1.77C5.821 18 12 18 12 18s6.179 0 8.04-.231a2.5 2.5 0 0 0 1.76-1.77A25.78 25.78 0 0 0 22 12a25.78 25.78 0 0 0-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      ),
      vimeo: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 0 0 4.192-3.729C5.978 2.4 7.333 1.718 8.222 1.718c2.166-.043 3.501 1.254 4.01 3.887.545 2.838.922 4.604 1.134 5.299.636 2.881 1.356 4.32 2.164 4.32.629 0 1.579-.996 2.857-2.981 1.27-1.985 1.951-3.498 2.019-4.55.136-1.756-.507-2.632-1.928-2.632-.685 0-1.388.165-2.108.495 1.404-4.604 4.078-6.842 8.029-6.715 2.926.1 4.304 1.988 4.147 5.665z"/>
        </svg>
      ),
      website: (
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
      )
    };
    return icons[iconName] || icons.website;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Send email directly using Formspree
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        setSubmitMessage(result.message);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setSubmitMessage('');
        }, 5000);
      } else {
        // Show error message
        setSubmitMessage(result.message || 'Failed to send message. Please try again.');
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setSubmitMessage('');
        }, 5000);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Failed to send message. Please check your internet connection and try again.');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="section-padding bg-primary-bg-light/80 backdrop-blur-sm relative overflow-hidden"
      id="contact"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent-gold rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 cinematic-text">
            GET IN TOUCH
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-primary-bg rounded-2xl p-8">
              <h3 className="text-xl font-heading font-bold text-text-primary mb-6">
                Send a Message
              </h3>

              {(isSubmitted || submitMessage) && (
                <div className={`mb-6 p-4 rounded-lg ${
                  isSubmitted 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-blue-500/10 border border-blue-500/30'
                }`}>
                  <div className={`flex items-center ${
                    isSubmitted ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {submitMessage || 'Thank you! Your message has been sent successfully.'}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg-light border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-600 hover:border-accent-gold/50'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg-light border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-600 hover:border-accent-gold/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg-light border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 ${
                      errors.subject ? 'border-red-500' : 'border-gray-600 hover:border-accent-gold/50'
                    }`}
                    placeholder="Project inquiry, collaboration, etc."
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-primary-bg-light border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-600 hover:border-accent-gold/50'
                    }`}
                    placeholder="Tell me about your project, timeline, budget, and vision..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className={`w-full text-lg py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <svg className="ml-2 w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="space-y-8">
              
              {/* Availability Status */}
              <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-accent-gold font-semibold text-lg">
                    {contactData.availability}
                  </span>
                </div>
                <p className="text-text-secondary mt-2">
                  {contactData.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-heading font-bold text-text-primary">
                  Contact Information
                </h3>

                {/* Email */}
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <svg className="w-6 h-6 text-accent-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-text-primary hover:text-accent-gold transition-colors duration-300">
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <svg className="w-6 h-6 text-accent-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Location</p>
                    <p className="text-text-primary">{contactData.location}</p>
                  </div>
                </div>

              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Follow My Work
                </h4>
                <div className="flex flex-wrap gap-4">
                  {contactData.socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 bg-primary-bg rounded-lg hover:bg-accent-gold/10 hover:border-accent-gold/30 border border-gray-600 transition-all duration-300 group"
                    >
                      <span className="text-accent-gold mr-3 group-hover:scale-110 transition-transform duration-300">
                        {getIconForPlatform(social.icon)}
                      </span>
                      <span className="text-text-secondary group-hover:text-accent-gold transition-colors duration-300 text-sm">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
