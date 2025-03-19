"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";

// Colors for the occupied squares
const projectColors = ["#FACC15", "#38BDF8", "#FB7185", "#4ADE80", "#A78BFA"];

// Project type definition
interface Project {
  id: string;
  position: number;
  color: string;
  name: string;
  // Extended project properties
  team?: string;
  description?: string;
  projectLink?: string;
  image?: string;
}

// Generate dummy data - about 30,000 colored squares
function generateDummyProjects(count = 30000): Project[] {
  // Sample project names, teams and descriptions for more realistic data
  const projectNames = [
    "Blockchain Voting System", "AI Health Assistant", "Smart City Dashboard", 
    "Eco Tracker", "Decentralized Exchange", "Neural Art Generator", 
    "AR Navigation App", "ML Recommendation Engine", "IoT Home Network", 
    "Virtual Reality Classroom"
  ];
  
  const teamNames = [
    "ByteBuilders", "CodeCrafters", "DevDynamos", "TechTitans", 
    "QuantumQuants", "CyberSolutions", "AlgoAces", "CloudCommanders", 
    "DataDreamers", "NetworkNinjas"
  ];
  
  const projectDescriptions = [
    "A platform that leverages cutting-edge technology to solve real-world problems.",
    "An innovative solution designed during the hackathon to address user needs efficiently.",
    "This project focuses on sustainable technology for a better future.",
    "We built this to make complex processes simple and accessible to everyone.",
    "Our hackathon project aims to transform how people interact with technology daily."
  ];

  const projects = [];
  for (let i = 0; i < count; i++) {
    // Use modulo to spread projects across the whole map
    const position = Math.floor(Math.random() * 100000);
    const colorIndex = Math.floor(Math.random() * projectColors.length);
    
    // Select random names and descriptions from our sample data
    const nameIndex = i % projectNames.length;
    const teamIndex = Math.floor(Math.random() * teamNames.length);
    const descIndex = Math.floor(Math.random() * projectDescriptions.length);
    
    // Add sequential numbers to make each project unique
    const projectName = `${projectNames[nameIndex]} ${Math.floor(i / projectNames.length) + 1}`;
    const teamName = `${teamNames[teamIndex]} ${Math.floor(Math.random() * 100)}`;
    
    // Add extended project info for a richer experience
    projects.push({
      id: `project-${i}`,
      position,
      color: projectColors[colorIndex],
      name: projectName,
      team: teamName,
      description: projectDescriptions[descIndex],
      projectLink: `https://example.com/projects/${i}`,
      // Using the project color for image background, handled in the ProjectCard component
    });
  }
  return projects;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gridSize, setGridSize] = useState(316); // ~ sqrt(100,000)
  const [visiblePixels, setVisiblePixels] = useState(2000); // Increased initial visible pixels
  const [startPixel, setStartPixel] = useState(0);
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [pixelsPerRow, setPixelsPerRow] = useState(0);
  
  // Calculating visible area dimensions
  const pixelsPerCol = Math.ceil(visiblePixels / pixelsPerRow);
  
  // Initialize projects on client-side with more density
  useEffect(() => {
    if (!projects.length) {
      setProjects(generateDummyProjects(30000));
    }
    
    // Update visible pixels based on screen size
    const updateVisiblePixels = () => {
      if (gridRef.current) {
        const sidebarWidth = 256; // Width of the sidebar
        
        // Calculate available width accounting for sidebar
        const availableWidth = window.innerWidth - sidebarWidth + 1; // Add 1px to ensure coverage
        const availableHeight = window.innerHeight + 1; // Add 1px to ensure coverage
        
        // Calculate number of pixels that can fit in the viewport
        const pixelsPerRow = Math.ceil(availableWidth / 10); // Using Math.ceil to fill entire width
        const pixelsPerCol = Math.ceil(availableHeight / 10); // Using Math.ceil to fill entire height
        
        setVisiblePixels(pixelsPerRow * pixelsPerCol);
        setPixelsPerRow(pixelsPerRow);
        
        // Update pixel dimensions in localStorage for persistence and sync with minimap
        localStorage.setItem('pixelsPerRow', pixelsPerRow.toString());
        localStorage.setItem('visiblePixels', (pixelsPerRow * pixelsPerCol).toString());
      }
    };
    
    // Check for stored start position
    const storedStartPixel = localStorage.getItem('startPixel');
    if (storedStartPixel) {
      setStartPixel(Number(storedStartPixel));
    }
    
    // Add storage event listener to sync with minimap controls
    const handleStorageChange = () => {
      const updatedStartPixel = localStorage.getItem('startPixel');
      if (updatedStartPixel) {
        setStartPixel(Number(updatedStartPixel));
      }
    };
    
    // Call initially and add resize listener
    updateVisiblePixels();
    window.addEventListener('resize', updateVisiblePixels);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('resize', updateVisiblePixels);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [projects.length]);

  // Create a map of occupied positions for faster lookup
  const occupiedPositions: Record<number, Project> = {};
  projects.forEach(project => {
    occupiedPositions[project.position] = project;
  });
  
  // Generate grid cells - optimized for large number of projects
  const renderGrid = () => {
    const cells = [];
    const endPixel = Math.min(startPixel + visiblePixels, 100000);
    
    for (let i = startPixel; i < endPixel; i++) {
      const project = occupiedPositions[i];
      const backgroundColor = project ? project.color : "#000000";
      
      cells.push(
        <div 
          key={i}
          className="cursor-pointer transition-colors duration-200"
          style={{ 
            width: "10px", // Smaller pixels to fit more in view
            height: "10px", 
            backgroundColor,
            outline: hoveredPixel === i ? "1px solid white" : "none",
          }}
          onMouseEnter={() => project && setHoveredPixel(i)}
          onMouseLeave={() => setHoveredPixel(null)}
          onClick={() => project && setSelectedProject(project)}
        />
      );
    }
    
    return cells;
  };

  return (
    <>
      {/* Projects Grid */}
      <div 
        ref={gridRef}
        className="grid gap-[1px] absolute inset-0" 
        style={{ 
          gridTemplateColumns: `repeat(${pixelsPerRow}, 10px)`,
          width: "calc(100% + 1px)", // Ensure coverage to the very edge
          height: "calc(100vh + 1px)",
          right: 0,
          left: 0,
          marginRight: 0,
          paddingRight: 0,
          overflow: 'hidden'
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Project info overlay on hover */}
      {hoveredPixel !== null && occupiedPositions[hoveredPixel] && (
        <div className="absolute top-4 right-4 text-white bg-black bg-opacity-80 px-4 py-2 rounded-md z-20">
          {occupiedPositions[hoveredPixel].name}
        </div>
      )}
      
      {/* Project card popup when a project is clicked */}
      {selectedProject && (
        <ProjectCard 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}
