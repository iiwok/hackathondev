'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AnimatedTitle from '../components/AnimatedTitle';
import './globals.css';

// Import minimap-related components and functions
import MinimapNavigator from '@/components/MinimapNavigator';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Custom stacked navigation items for the sidebar
  const NavItems = () => (
    <div className="flex flex-col items-start space-y-4 mt-8 text-lg font-golos-600">
      <Link 
        href="/about" 
        className={`${pathname === '/about' ? 'text-white' : 'text-gray-300'} hover:text-white hover:underline`}
      >
        About
      </Link>
      <Link 
        href="/events" 
        className={`${pathname === '/events' ? 'text-white' : 'text-gray-300'} hover:text-white hover:underline`}
      >
        Details
      </Link>
    </div>
  );

  return (
    <html lang="en">
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Krona+One&display=swap');
        </style>
      </head>
      <body className="h-screen w-screen overflow-hidden bg-black font-golos">
        <div className="h-screen w-screen overflow-hidden bg-black relative flex">
          {/* Left sidebar - persistent across all pages */}
          <div className="w-64 flex-shrink-0 bg-black border-r border-gray-800 h-full z-10 p-6 flex flex-col">
            {/* Title in sidebar */}
            <div className="mt-4">
              <Link href="/">
                <AnimatedTitle 
                  text="THE WORLD'S LARGEST HACKATHON" 
                  className="text-2xl text-gray-100 mb-6 text-left whitespace-normal break-words font-golos-700"
                />
              </Link>
            </div>
            
            {/* Navigation stacked vertically */}
            <NavItems />
            
            {/* Map navigator - only shown on homepage */}
            {isHomePage && (
              <div className="mt-auto mb-6">
                <MinimapNavigator />
              </div>
            )}
          </div>
          
          {/* Main content area */}
          <div className="flex-grow h-full relative overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
