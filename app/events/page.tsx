'use client';

import { useState } from 'react';

// Event type definition
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
}

// Sample events data
const eventsData: Event[] = [
  {
    id: 1,
    title: "Opening Ceremony",
    date: "June 15, 2023",
    time: "10:00 AM",
    description: "Join us for the grand opening of The World's Largest Hackathon, featuring inspiring keynotes from industry leaders and a preview of what's to come.",
    location: "Main Stage"
  },
  {
    id: 2,
    title: "Workshop: AI & Machine Learning",
    date: "June 15, 2023",
    time: "2:00 PM",
    description: "Learn how to leverage AI and ML in your hackathon projects with practical examples and expert guidance.",
    location: "Workshop Room A"
  },
  {
    id: 3,
    title: "Networking Mixer",
    date: "June 16, 2023",
    time: "7:00 PM",
    description: "Connect with fellow participants, mentors, and sponsors in a relaxed setting with refreshments provided.",
    location: "Social Hall"
  },
  {
    id: 4,
    title: "Technical Talk: Scaling Web Applications",
    date: "June 17, 2023",
    time: "11:00 AM",
    description: "Discover best practices for building applications that can scale to millions of users without breaking.",
    location: "Workshop Room B"
  },
  {
    id: 5,
    title: "Submission Deadline",
    date: "June 17, 2023",
    time: "6:00 PM",
    description: "Final deadline for all project submissions. Make sure your code is committed and your demo is ready!",
    location: "Online"
  },
  {
    id: 6,
    title: "Closing Ceremony & Awards",
    date: "June 18, 2023",
    time: "3:00 PM",
    description: "Celebrate the achievements of all participants and find out which projects won in various categories.",
    location: "Main Stage"
  }
];

export default function Events() {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  
  // Filter events by day if a specific day is selected
  const filteredEvents = selectedDay === "All" 
    ? eventsData 
    : eventsData.filter(event => event.date.includes(selectedDay));
  
  // Get unique days from events
  const uniqueDays = [...new Set(eventsData.map(event => {
    const dateParts = event.date.split(", ");
    return dateParts[0]; // Return just the day part
  }))];
  
  return (
    <div className="p-8 text-white overflow-y-auto scrollbar-thin h-full">
      <h1 className="text-4xl font-bold mb-6 font-golos-800">Events Schedule</h1>
      
      {/* Day filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button 
          onClick={() => setSelectedDay("All")}
          className={`px-4 py-2 rounded-full font-golos-500 ${selectedDay === "All" 
            ? "bg-white text-black" 
            : "bg-gray-800 text-white"}`}
        >
          All Days
        </button>
        {uniqueDays.map((day: string) => (
          <button 
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full font-golos-500 ${selectedDay === day 
              ? "bg-white text-black" 
              : "bg-gray-800 text-white"}`}
          >
            {day}
          </button>
        ))}
      </div>
      
      {/* Events list */}
      <div className="max-w-4xl space-y-6">
        {filteredEvents.map((event: Event) => (
          <div key={event.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h2 className="text-2xl font-bold font-golos-600">{event.title}</h2>
                <div className="text-gray-300 mt-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-golos-500">
                  Add to Calendar
                </button>
              </div>
            </div>
            <p className="mt-4">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 