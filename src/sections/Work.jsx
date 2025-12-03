import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ShowreelSection from '../components/ShowreelSection';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactSection from '../components/ContactSection';

const Work = () => {
  return (
    <div className="relative overflow-hidden bg-primary-bg min-h-screen">
      {/* All sections like home page, but without video background */}
      <div className="relative" style={{ zIndex: 10, position: 'relative' }}>
        {/* Hero Section */}
        <Hero />
        
        {/* Services Section */}
        {/* <div id="services">
          <ServicesSection />
        </div> */}
        
        {/* Showreel Section */}
        <div id="showreel">
          <ShowreelSection />
        </div>
        
        {/* Portfolio Section */}
        <div id="featured-work">
          <PortfolioGrid />
        </div>
        
        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>
        
        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Work;
