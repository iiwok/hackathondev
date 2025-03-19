"use client";

import { useState, useEffect } from "react";

// The same colors used for project pixels and home page title
const titleColors = ["#FACC15", "#38BDF8", "#FB7185", "#4ADE80", "#A78BFA"];

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export default function AnimatedTitle({ text, className = "" }: AnimatedTitleProps) {
  const [letterColors, setLetterColors] = useState<string[]>([]);

  // Initialize random colors for each letter
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
    
    // Set up the "computational" color changing effect
    const interval = setInterval(() => {
      // Change a random subset of letters (1-5 letters each time)
      const numToChange = Math.floor(Math.random() * 5) + 1;
      
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
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className={`font-bold tracking-tight inline-block ${className}`}>
      {text.split('').map((letter, index) => (
        <span 
          key={index} 
          style={{ 
            color: letterColors[index] || '#FFFFFF',
          }}
          className={letter === ' ' ? 'w-4 inline-block' : 'inline-block'}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
} 