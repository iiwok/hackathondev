import React, { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  position: number;
  color: string;
  name: string;
  // Extended project properties for the card
  team?: string;
  description?: string;
  projectLink?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectCard({ project, onClose }: ProjectCardProps) {
  // Handle image loading errors
  const [imageError, setImageError] = useState(false);
  
  // Default values for missing properties
  const {
    name,
    team = 'Unknown Team',
    description = 'This project was created during the world\'s largest hackathon. No additional description available.',
    projectLink = '#',
    image = '/placeholder-project.jpg', // Default placeholder image
    color,
    id
  } = project;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-auto relative animate-fadeIn"
        style={{ border: `2px solid ${color}` }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-opacity-70 transition-all z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Project image or color gradient banner */}
        <div className="relative w-full h-48 bg-gray-800">
          <div 
            className="w-full h-full bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${color}22, ${color}88)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold opacity-20 text-white">{name.charAt(0)}</div>
            </div>
          </div>
          
          {/* Project ID badge */}
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
            ID: {id.replace('project-', '#')}
          </div>
        </div>
        
        {/* Project details */}
        <div className="p-5">
          <h3 className="text-xl font-golos-700 text-white mb-3">{name}</h3>
          
          <div className="flex flex-wrap mb-4">
            <span 
              className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium mr-2 mb-2"
              style={{ backgroundColor: `${color}22`, color: color }}
            >
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
              </svg>
              {team}
            </span>
            
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium mr-2 mb-2 bg-gray-800 text-gray-300">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              Created during hackathon
            </span>
          </div>
          
          <div className="bg-black bg-opacity-30 p-3 rounded-lg mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          </div>
          
          <div className="flex flex-wrap justify-between items-center">
            <a 
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              View Project
            </a>
            
            <button 
              className="text-gray-400 hover:text-white text-sm underline"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 