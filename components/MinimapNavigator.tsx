"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Colors for the occupied squares - same as in the main grid
const projectColors = ["#FACC15", "#38BDF8", "#FB7185", "#4ADE80", "#A78BFA"];

// Project type from the main page
interface Project {
  id: string;
  position: number;
  color: string;
  name: string;
}

// Props to communicate with the main grid
interface MinimapNavigatorProps {
  // Optional props here when needed
}

export default function MinimapNavigator() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gridSize, setGridSize] = useState(316); // ~ sqrt(100,000)
  const [startPixel, setStartPixel] = useState(0);
  const [visiblePixels, setVisiblePixels] = useState(2000);
  const [pixelsPerRow, setPixelsPerRow] = useState(200);
  const [pixelsPerCol, setPixelsPerCol] = useState(100);
  
  // Current viewport position in the grid
  const currentCol = startPixel % gridSize;
  const currentRow = Math.floor(startPixel / gridSize);

  // Generate dummy data - matches the main grid
  const generateDummyProjects = (count = 30000): Project[] => {
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
  };

  // Initialize projects on component mount
  useEffect(() => {
    if (!projects.length) {
      setProjects(generateDummyProjects(30000));
    }
    
    // Get stored pixelsPerRow and visiblePixels from localStorage
    const storedPixelsPerRow = localStorage.getItem('pixelsPerRow');
    const storedVisiblePixels = localStorage.getItem('visiblePixels');
    const storedStartPixel = localStorage.getItem('startPixel');
    
    if (storedPixelsPerRow) {
      setPixelsPerRow(Number(storedPixelsPerRow));
    }
    
    if (storedVisiblePixels) {
      setVisiblePixels(Number(storedVisiblePixels));
    }
    
    if (storedStartPixel) {
      setStartPixel(Number(storedStartPixel));
    }
    
    // Setup listener to update when main grid changes
    const handleStorageChange = () => {
      const updatedPixelsPerRow = localStorage.getItem('pixelsPerRow');
      const updatedVisiblePixels = localStorage.getItem('visiblePixels');
      const updatedStartPixel = localStorage.getItem('startPixel');
      
      if (updatedPixelsPerRow) {
        setPixelsPerRow(Number(updatedPixelsPerRow));
      }
      
      if (updatedVisiblePixels) {
        setVisiblePixels(Number(updatedVisiblePixels));
      }
      
      if (updatedStartPixel) {
        setStartPixel(Number(updatedStartPixel));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Calculate pixelsPerCol based on pixelsPerRow and visiblePixels
    setPixelsPerCol(Math.ceil(visiblePixels / pixelsPerRow));
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [projects.length, pixelsPerRow, visiblePixels]);
  
  // Navigation functions - move 10 at a time
  const moveGrid = (direction: 'up' | 'down' | 'left' | 'right') => {
    const moveAmount = 10; // Move 10 pixels at a time
    let newStartPixel = startPixel;
    
    switch(direction) {
      case 'up':
        newStartPixel = Math.max(0, startPixel - (pixelsPerRow * moveAmount));
        break;
      case 'down':
        newStartPixel = Math.min(100000 - visiblePixels, startPixel + (pixelsPerRow * moveAmount));
        break;
      case 'left':
        newStartPixel = Math.max(0, startPixel - moveAmount);
        break;
      case 'right':
        newStartPixel = Math.min(100000 - visiblePixels, startPixel + moveAmount);
        break;
      default:
        break;
    }
    
    setStartPixel(newStartPixel);
    // Update localStorage so main grid can sync
    localStorage.setItem('startPixel', newStartPixel.toString());
    // Dispatch storage event for syncing
    window.dispatchEvent(new Event('storage'));
  };
  
  // Jump to a specific region on the minimap
  const jumpToRegion = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const y = event.clientY - rect.top;  // y position within the element
    
    const percentX = x / rect.width;
    const percentY = y / rect.height;
    
    const newStartPixel = Math.floor(percentY * gridSize) * gridSize + Math.floor(percentX * gridSize);
    const constrainedStartPixel = Math.min(100000 - visiblePixels, Math.max(0, newStartPixel));
    
    setStartPixel(constrainedStartPixel);
    // Update localStorage so main grid can sync
    localStorage.setItem('startPixel', constrainedStartPixel.toString());
    // Dispatch storage event for syncing
    window.dispatchEvent(new Event('storage'));
  };

  // Format project count with commas
  const formatProjectCount = (count: number): string => {
    return count.toLocaleString();
  };

  return (
    <>
      {/* Project count indicator above minimap */}
      <div className="text-center text-2xl font-golos-700 text-white mb-4">
        {formatProjectCount(30000)}
      </div>
      
      {/* Minimap */}
      <div 
        className="relative w-full h-40 bg-black border border-gray-600 cursor-pointer mb-2"
        onClick={jumpToRegion}
      >
        {/* Dots for projects - optimized for 30k projects with density heat map */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={`zone-${i}`}
              className="absolute" 
              style={{
                left: `${(i % 5) * 20}%`,
                top: `${Math.floor(i / 5) * 20}%`,
                width: '20%',
                height: '20%',
                backgroundColor: projectColors[i % projectColors.length],
                opacity: 0.3 + (projects.filter(p => 
                  Math.floor((p.position % gridSize) / gridSize * 5) === (i % 5) && 
                  Math.floor(Math.floor(p.position / gridSize) / gridSize * 5) === Math.floor(i / 5)
                ).length / 1000)
              }}
            />
          ))}
        </div>
        
        {/* Sample of projects on minimap */}
        {projects.filter((_, idx) => idx % 200 === 0).map((project) => {
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
                backgroundColor: project.color,
                zIndex: 2
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
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-center mt-2">
        <button
          onClick={() => moveGrid('up')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mx-1"
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          onClick={() => moveGrid('left')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mx-1"
          aria-label="Move left"
        >
          ←
        </button>
        <button
          onClick={() => moveGrid('right')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mx-1"
          aria-label="Move right"
        >
          →
        </button>
        <button
          onClick={() => moveGrid('down')}
          className="bg-black border border-gray-600 text-white p-1 w-8 h-8 rounded-full hover:bg-gray-800 flex items-center justify-center mx-1"
          aria-label="Move down"
        >
          ↓
        </button>
      </div>
    </>
  );
} 