"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import AnimatedTitle from "../../components/AnimatedTitle";

// Sample judge data
const judges = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "CTO, TechVision",
    image: "https://i.pravatar.cc/300?img=1",
    bio: "20+ years in AI and machine learning, leading innovation at major tech companies."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Venture Capitalist",
    image: "https://i.pravatar.cc/300?img=3",
    bio: "Founded three successful startups and now invests in early-stage tech companies."
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Professor of CS",
    image: "https://i.pravatar.cc/300?img=5",
    bio: "Award-winning researcher in distributed systems and blockchain technology."
  },
  {
    id: 4,
    name: "Raj Patel",
    role: "Design Director",
    image: "https://i.pravatar.cc/300?img=7",
    bio: "Leading UX/UI innovation with experience across Fortune 500 companies."
  },
  {
    id: 5,
    name: "Elena Gomez",
    role: "Innovation Lead",
    image: "https://i.pravatar.cc/300?img=9",
    bio: "Specializes in emerging technologies and sustainable tech solutions."
  },
  {
    id: 6,
    name: "David Kim",
    role: "Product Strategist",
    image: "https://i.pravatar.cc/300?img=12",
    bio: "Expert in bringing tech products from concept to market quickly."
  }
];

export default function AboutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardsInView, setCardsInView] = useState(3); // Default for desktop

  useEffect(() => {
    // Adjust cards in view based on screen width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsInView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsInView(2); // Tablet
      } else {
        setCardsInView(3); // Desktop
      }
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = judges.length - cardsInView + 1;

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="pt-4 px-4 text-center">
        <Link href="/">
          <AnimatedTitle 
            text="THE WORLD'S LARGEST HACKATHON" 
            className="text-3xl md:text-4xl text-gray-100 mb-0"
          />
        </Link>
        <Nav variant="dark" />
      </header>

      <main className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tight">
            It started with a tweet...
          </h2>
          
          <div className="mb-16">
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id lectus volutpat, aliquet erat quis, posuere felis. Suspendisse malesuada mi vitae lorem egestas condimentum. Suspendisse gravida tempus turpis, sed dignissim ipsum accumsan nec. Nunc nec tincidunt ex, at fringilla turpis.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id lectus volutpat, aliquet erat quis, posuere felis. Suspendisse malesuada mi vitae lorem egestas condimentum. Suspendisse gravida tempus turpis, sed dignissim ipsum accumsan nec. Nunc nec tincidunt ex, at fringilla turpis.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  The Experience
                </h3>
                <p className="text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id lectus volutpat, aliquet erat quis, posuere felis. Suspendisse malesuada mi vitae lorem egestas condimentum. Suspendisse gravida tempus turpis, sed dignissim ipsum accumsan nec. Nunc nec tincidunt ex, at fringilla turpis.
                </p>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Judges
            </h3>
            <p className="text-gray-300 mb-6">
              Our hackathon features industry-leading judges who evaluate projects based on innovation, 
              technical complexity, design, and real-world impact.
            </p>
            
            {/* Judges Carousel */}
            <div className="relative">
              <div 
                ref={carouselRef}
                className="overflow-hidden"
              >
                <div 
                  className="flex transition-transform duration-300 ease-in-out" 
                  style={{ transform: `translateX(-${currentIndex * (100 / cardsInView)}%)` }}
                >
                  {judges.map((judge) => (
                    <div 
                      key={judge.id} 
                      className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-3`}
                    >
                      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={judge.image} 
                            alt={judge.name}
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="p-5 flex-grow">
                          <h4 className="text-xl font-bold text-white">{judge.name}</h4>
                          <p className="text-red-500 font-medium mb-2">{judge.role}</p>
                          <p className="text-gray-400">{judge.bio}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide} 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none z-10 hover:bg-opacity-75"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none z-10 hover:bg-opacity-75"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Carousel Indicator Dots */}
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`mx-1 w-2 h-2 rounded-full focus:outline-none ${
                      index === currentIndex ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Sponsors Section */}
            <h3 className="text-3xl font-bold text-white mb-4 mt-20">
              Sponsors
            </h3>
            <p className="text-gray-300 mb-8">
              Our hackathon is supported by leading technology companies and organizations 
              committed to fostering innovation and the next generation of tech talent.
            </p>
            
            {/* Sponsor Tiers */}
            <div className="space-y-12">
              {/* Platinum Sponsors */}
              <div>
                <h4 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  Platinum Sponsors
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2].map((index) => (
                    <div key={`platinum-${index}`} className="bg-gray-900 p-8 flex items-center justify-center h-40 rounded-lg shadow-md">
                      <div className="flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                          <span className="text-gray-500 font-bold text-4xl">P{index}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gold Sponsors */}
              <div>
                <h4 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  Gold Sponsors
                </h4>
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map((index) => (
                    <div key={`gold-${index}`} className="bg-gray-900 p-6 flex items-center justify-center h-32 rounded-lg shadow-md">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                          <span className="text-gray-500 font-bold text-3xl">G{index}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Silver Sponsors */}
              <div>
                <h4 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  Silver Sponsors
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={`silver-${index}`} className="bg-gray-900 p-4 flex items-center justify-center h-24 rounded-lg shadow-md">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500 font-bold text-2xl">S{index}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bronze Sponsors */}
              <div>
                <h4 className="text-xl font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  Bronze Sponsors
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={`bronze-${index}`} className="bg-gray-900 p-3 flex items-center justify-center h-20 rounded-lg shadow-md">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500 font-bold">B{index}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 