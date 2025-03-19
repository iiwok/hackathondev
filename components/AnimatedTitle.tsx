"use client";

import { useState, useEffect, useRef } from "react";

// The same colors used for project pixels and home page title
const titleColors = ["#FACC15", "#38BDF8", "#FB7185", "#4ADE80", "#A78BFA"];

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export default function AnimatedTitle({ text, className = "" }: AnimatedTitleProps) {
  const [letterColors, setLetterColors] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize colors for each letter
  useEffect(() => {
    // Initial assignment of colors ensuring adjacent letters have different colors
    const initialColors: string[] = [];
    const totalLength = text.length;
    
    for (let i = 0; i < totalLength; i++) {
      let randomColorIndex;
      
      // Make sure adjacent letters have different colors
      if (i > 0) {
        // Get a new random color that's different from the previous one
        let prevColorIndex = titleColors.indexOf(initialColors[i-1]);
        do {
          randomColorIndex = Math.floor(Math.random() * titleColors.length);
        } while (randomColorIndex === prevColorIndex);
      } else {
        randomColorIndex = Math.floor(Math.random() * titleColors.length);
      }
      
      initialColors.push(titleColors[randomColorIndex]);
    }
    setLetterColors(initialColors);
  }, [text]);
  
  // Start/stop animation based on hover state
  useEffect(() => {
    if (isHovered) {
      // Set up the "computational" color changing effect only when hovered
      intervalRef.current = setInterval(() => {
        // Change a random subset of letters (1-5 letters each time)
        const numToChange = Math.floor(Math.random() * 5) + 1;
        const totalLength = text.length;
        
        setLetterColors(prev => {
          const newColors = [...prev];
          
          // Select random positions to change
          for (let i = 0; i < numToChange; i++) {
            const position = Math.floor(Math.random() * totalLength);
            
            // Ensure the new color is different from adjacent colors
            let newColorIndex;
            const leftPos = position > 0 ? position - 1 : -1;
            const rightPos = position < totalLength - 1 ? position + 1 : -1;
            
            do {
              newColorIndex = Math.floor(Math.random() * titleColors.length);
            } while (
              (leftPos >= 0 && titleColors[newColorIndex] === newColors[leftPos]) || 
              (rightPos >= 0 && titleColors[newColorIndex] === newColors[rightPos])
            );
            
            newColors[position] = titleColors[newColorIndex];
          }
          
          return newColors;
        });
      }, 150); // Fast interval for computational feel
    } else if (intervalRef.current) {
      // Clear the interval when not hovered
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, text]);

  // Split text into words for better wrapping
  const words = text.split(' ');

  return (
    <h1 
      className={`font-bold tracking-tight ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block max-w-full overflow-hidden">
          {word.split('').map((letter, letterIndex) => {
            const overallIndex = text.slice(0, text.indexOf(word) + letterIndex).length;
            return (
              <span 
                key={`letter-${wordIndex}-${letterIndex}`} 
                style={{ 
                  color: isHovered ? letterColors[overallIndex] || '#FFFFFF' : '#FFFFFF',
                  transition: 'color 0.3s'
                }}
                className="inline-block"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
} 