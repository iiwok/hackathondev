"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import AnimatedTitle from "../../components/AnimatedTitle";

// Colors for the occupied squares
const projectColors = ["#FACC15", "#38BDF8", "#FB7185", "#4ADE80", "#A78BFA"];

// Project type definition
interface Project {
  id: string;
  position: number;
  color: string;
  name: string;
}

// Generate dummy data - about 100 colored squares
function generateDummyProjects(count = 100): Project[] {
  const projects = [];
  for (let i = 0; i < count; i++) {
    // Use modulo to spread projects across the whole map
    const position = Math.floor(Math.random() * 100000);
    const colorIndex = Math.floor(Math.random() * projectColors.length);
    projects.push({
      id: `project-${i}`,
      position,
      color: projectColors[colorIndex],
      name: `Project ${i}`,
    });
  }
  return projects;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gridSize, setGridSize] = useState(316); // ~ sqrt(100,000)
  const [visiblePixels, setVisiblePixels] = useState(1000); // Number of pixels visible at once
  const [startPixel, setStartPixel] = useState(0); // Starting position in the overall grid
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Calculating visible area dimensions
  const pixelsPerRow = Math.ceil(Math.sqrt(visiblePixels));
  const pixelsPerCol = Math.ceil(visiblePixels / pixelsPerRow);
  
  // Current viewport position in the grid
  const currentCol = startPixel % gridSize;
  const currentRow = Math.floor(startPixel / gridSize);
  
  // Initialize projects on client-side
  useEffect(() => {
    // Generate the projects
    setProjects(generateDummyProjects());
    
    // Update visible pixels based on screen size
    const updateVisiblePixels = () => {
      const pixelSize = 12; // Size of each pixel in px
      const gap = 1; // Gap between pixels in px
      
      // Use full window dimensions
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      
      const pixelsPerRow = Math.floor(availableWidth / (pixelSize + gap));
      const pixelsPerCol = Math.floor(availableHeight / (pixelSize + gap));
      
      setVisiblePixels(pixelsPerRow * pixelsPerCol);
    };
    
    // Call initially and add resize listener
    updateVisiblePixels();
    window.addEventListener('resize', updateVisiblePixels);
    
    return () => {
      window.removeEventListener('resize', updateVisiblePixels);
    };
  }, []);

  // Create a map of occupied positions for faster lookup
  const occupiedPositions: Record<number, Project> = {};
  projects.forEach(project => {
    occupiedPositions[project.position] = project;
  });
  
  // Navigation functions - move 10 at a time
  const moveGrid = (direction: 'up' | 'down' | 'left' | 'right') => {
    const moveAmount = 10; // Move 10 pixels at a time
    
    switch(direction) {
      case 'up':
        setStartPixel(Math.max(0, startPixel - (pixelsPerRow * moveAmount)));
        break;
      case 'down':
        setStartPixel(Math.min(100000 - visiblePixels, startPixel + (pixelsPerRow * moveAmount)));
        break;
      case 'left':
        setStartPixel(Math.max(0, startPixel - moveAmount));
        break;
      case 'right':
        setStartPixel(Math.min(100000 - visiblePixels, startPixel + moveAmount));
        break;
      default:
        break;
    }
  };
  
  // Jump to a specific region on the minimap
  const jumpToRegion = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const y = event.clientY - rect.top;  // y position within the element
    
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    const targetPosition = Math.floor(percentY * gridSize) * gridSize + Math.floor(percentX * gridSize);
    setStartPixel(Math.min(100000 - visiblePixels, Math.max(0, targetPosition)));
  };
  
  // Generate grid cells
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
            width: "12px", 
            height: "12px", 
            backgroundColor,
            outline: hoveredPixel === i ? "1px solid white" : "none",
          }}
          onMouseEnter={() => project && setHoveredPixel(i)}
          onMouseLeave={() => setHoveredPixel(null)}
          onClick={() => project && alert(`Clicked on ${project.name}`)}
        />
      );
    }
    
    return cells;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Projects Grid - Full Screen Background */}
      <div 
        ref={gridRef}
        className="grid gap-[1px] absolute inset-0" 
        style={{ 
          gridTemplateColumns: `repeat(${pixelsPerRow}, 12px)`,
          width: "100vw",
          height: "100vh",
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Overlay elements */}
      {/* Header - Overlaid on top of grid */}
      <header className="absolute top-0 left-0 right-0 py-4 px-4 text-center z-10">
        <div className="bg-black bg-opacity-60 py-2 px-4 rounded-lg inline-block">
          <Link href="/">
            <AnimatedTitle 
              text="THE WORLD'S LARGEST HACKATHON" 
              className="text-3xl md:text-4xl text-gray-100 mb-0"
            />
          </Link>
          <Nav variant="dark" />
        </div>
      </header>
      
      {/* Project info overlay */}
      {hoveredPixel !== null && occupiedPositions[hoveredPixel] && (
        <div className="absolute top-20 right-4 text-white bg-black bg-opacity-80 px-4 py-2 rounded-md z-20">
          {occupiedPositions[hoveredPixel].name}
        </div>
      )}
      
      {/* Minimap with integrated controls - no container */}
      <div className="absolute bottom-28 right-4 z-20 flex flex-col items-center">
        <button
          onClick={() => moveGrid('up')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mb-2"
          aria-label="Move up"
        >
          ↑
        </button>
        
        <div className="flex items-center">
          <button
            onClick={() => moveGrid('left')}
            className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mr-2"
            aria-label="Move left"
          >
            ←
          </button>
          
          <div 
            className="relative w-40 h-40 bg-black border border-gray-600 cursor-pointer"
            onClick={jumpToRegion}
          >
            {/* Dots for projects */}
            {projects.map((project) => {
              const x = (project.position % gridSize) / gridSize * 100;
              const y = Math.floor(project.position / gridSize) / gridSize * 100;
              return (
                <div
                  key={project.id}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    width: '2px',
                    height: '2px',
                    backgroundColor: project.color
                  }}
                />
              );
            })}
            
            {/* Viewport indicator */}
            <div
              style={{
                position: 'absolute',
                left: `${(currentCol / gridSize) * 100}%`,
                top: `${(currentRow / gridSize) * 100}%`,
                width: `${(pixelsPerRow / gridSize) * 100}%`,
                height: `${(pixelsPerCol / gridSize) * 100}%`,
                border: '1px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none'
              }}
            />
          </div>
          
          <button
            onClick={() => moveGrid('right')}
            className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center ml-2"
            aria-label="Move right"
          >
            →
          </button>
        </div>
        
        <button
          onClick={() => moveGrid('down')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mt-2"
          aria-label="Move down"
        >
          ↓
        </button>
      </div>
    </div>
  );
} 