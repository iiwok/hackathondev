'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-secondary/70 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold neon-text-blue">TechFusion</span>
            <span className="font-mono text-sm text-text-secondary">Hackathon 2024</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-text-primary hover:neon-text-blue transition-all">
              Home
            </Link>
            <Link href="/events" className="text-text-primary hover:neon-text-blue transition-all">
              Events
            </Link>
            <Link href="/about" className="text-text-primary hover:neon-text-blue transition-all">
              About
            </Link>
            <Link href="/projects" className="text-text-primary hover:neon-text-blue transition-all">
              Projects
            </Link>
          </div>

          {/* Submit Project Button */}
          <div className="hidden md:block">
            <Link href="/submit" className="btn btn-primary">
              Submit Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-secondary rounded-lg p-4 shadow-neon-blue">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-text-primary hover:neon-text-blue transition-all" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/events" className="text-text-primary hover:neon-text-blue transition-all" onClick={toggleMenu}>
                Events
              </Link>
              <Link href="/about" className="text-text-primary hover:neon-text-blue transition-all" onClick={toggleMenu}>
                About
              </Link>
              <Link href="/projects" className="text-text-primary hover:neon-text-blue transition-all" onClick={toggleMenu}>
                Projects
              </Link>
              <Link href="/submit" className="btn btn-primary text-center" onClick={toggleMenu}>
                Submit Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 