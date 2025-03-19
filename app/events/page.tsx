"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import AnimatedTitle from "../../components/AnimatedTitle";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("when");
  
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <header className="pt-4 px-4 text-center">
        <Link href="/">
          <AnimatedTitle 
            text="THE WORLD'S LARGEST HACKATHON" 
            className="text-3xl md:text-4xl text-gray-100 mb-0"
          />
        </Link>
        <Nav variant="dark" />
      </header>

      <main className="flex-grow flex flex-col px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full h-[calc(100vh-220px)] flex flex-col">
          {/* Event content with sidebar and content area */}
          <div className="flex flex-1 mt-4 h-full overflow-hidden">
            {/* Sidebar Menu - made responsive */}
            <EventSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Main Content Area - with overflow scrolling */}
            <EventContent activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar menu component
function EventSidebar({ 
  activeTab, 
  setActiveTab 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}) {
  return (
    <div className="w-28 md:w-40 pr-2 md:pr-4 flex-shrink-0">
      <nav className="space-y-6 md:space-y-8">
        <SidebarItem 
          id="when" 
          label="When" 
          isActive={activeTab === "when"} 
          onClick={() => setActiveTab("when")} 
        />
        <SidebarItem 
          id="who" 
          label="Who" 
          isActive={activeTab === "who"} 
          onClick={() => setActiveTab("who")} 
        />
        <SidebarItem 
          id="prize" 
          label="Prize" 
          isActive={activeTab === "prize"} 
          onClick={() => setActiveTab("prize")} 
        />
      </nav>
    </div>
  );
}

// Sidebar item component
function SidebarItem({ 
  id, 
  label, 
  isActive,
  onClick
}: { 
  id: string, 
  label: string, 
  isActive: boolean,
  onClick: () => void
}) {
  return (
    <div 
      className={`text-lg md:text-xl font-bold cursor-pointer transition-colors ${
        isActive 
          ? 'text-red-600 relative before:absolute before:left-[-15px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-2 md:before:w-3 before:h-2 md:before:h-3 before:bg-red-600 before:rounded-full' 
          : 'text-gray-300 hover:text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

// Main content area component
function EventContent({ activeTab }: { activeTab: string }) {
  const contentContainerClass = "flex-1 pl-6 md:pl-12 border-l border-gray-700 h-full overflow-y-auto scrollbar-thin";
  
  // Render different content based on the active tab
  if (activeTab === "prize") {
    return (
      <div className={contentContainerClass}>
        <div className="space-y-6 pb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white pt-2 sticky top-0 bg-black">
            $75,000 in Total Prizes
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Grand Prize</h4>
              <p className="text-sm md:text-base text-gray-300">$30,000 + Investor introductions + Accelerator placement</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Runner-up</h4>
              <p className="text-sm md:text-base text-gray-300">$15,000 + Cloud credits + Development support</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Best Technical Innovation</h4>
              <p className="text-sm md:text-base text-gray-300">$10,000 + Hardware packages</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Best Design</h4>
              <p className="text-sm md:text-base text-gray-300">$5,000 + Professional design tools and mentorship</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Best Social Impact</h4>
              <p className="text-sm md:text-base text-gray-300">$5,000 + NGO partnerships</p>
            </div>
            
            {/* Added more content to demonstrate scrolling */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Special Categories</h4>
              <p className="text-sm md:text-base text-gray-300">
                Additional prizes for AI Innovation, Sustainability, Healthcare Solutions, and more specialized categories
              </p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Sponsor Prizes</h4>
              <p className="text-sm md:text-base text-gray-300">
                Various prizes from our technology partners including cloud credits, hardware, and software licenses
              </p>
            </div>
            
            {/* Additional content to ensure scrolling is visible */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Community Awards</h4>
              <p className="text-sm md:text-base text-gray-300">
                Peer-voted awards for Most Helpful Team, Best Presentation, and Most Creative Solution
              </p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Global Recognition</h4>
              <p className="text-sm md:text-base text-gray-300">
                Winning projects will be featured in tech publications and showcased at industry conferences worldwide
              </p>
            </div>
            
            {/* Even more content to ensure scrolling is clearly visible */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Mentorship Opportunities</h4>
              <p className="text-sm md:text-base text-gray-300">
                Top teams receive 3 months of mentorship from industry leaders and startup accelerators
              </p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Investment Potential</h4>
              <p className="text-sm md:text-base text-gray-300">
                Venture capitalists will be present at the final ceremony looking for promising projects to invest in
              </p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">International Exposure</h4>
              <p className="text-sm md:text-base text-gray-300">
                Winners will have the opportunity to present their projects at international tech conferences
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === "when") {
    return (
      <div className={contentContainerClass}>
        <div className="space-y-6 pb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white pt-2 sticky top-0 bg-black">
            March 15-17, 2024
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Day 1 - March 15</h4>
              <p className="text-sm md:text-base text-gray-300">Team registration, keynote speakers, and hackathon kickoff</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Day 2 - March 16</h4>
              <p className="text-sm md:text-base text-gray-300">Full day of hacking, workshops, and mentorship sessions</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Day 3 - March 17</h4>
              <p className="text-sm md:text-base text-gray-300">Project submission, demos, judging, and award ceremony</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg md:text-xl font-semibold text-white">Location</h4>
            <p className="text-sm md:text-base text-gray-300">Tech Innovation Center, Palo Alto</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === "who") {
    return (
      <div className={contentContainerClass}>
        <div className="space-y-6 pb-16">
          <h3 className="text-xl md:text-2xl font-bold text-white pt-2 sticky top-0 bg-black">
            Participants
          </h3>
          
          <p className="text-sm md:text-base text-gray-300">
            Our hackathon attracts a diverse community of innovators:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Developers</h4>
              <p className="text-sm md:text-base text-gray-300">Software engineers, full-stack developers, mobile specialists, and more</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Designers</h4>
              <p className="text-sm md:text-base text-gray-300">UX/UI designers, graphic artists, and creative minds</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Entrepreneurs</h4>
              <p className="text-sm md:text-base text-gray-300">Startup founders, product managers, and business innovators</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Students</h4>
              <p className="text-sm md:text-base text-gray-300">From high school to graduate level, representing the next generation of tech talent</p>
            </div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white pt-6">
            Judges & Mentors
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Industry Leaders</h4>
              <p className="text-sm md:text-base text-gray-300">CTOs and executives from leading tech companies</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Venture Capitalists</h4>
              <p className="text-sm md:text-base text-gray-300">Investors looking for the next big innovation</p>
            </div>
            
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-white">Technical Experts</h4>
              <p className="text-sm md:text-base text-gray-300">Specialized engineers and developers to help guide your project</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default fallback (should never reach here with the current implementation)
  return null;
} 