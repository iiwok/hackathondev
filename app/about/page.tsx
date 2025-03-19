'use client';

// Judge type definition
interface Judge {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
}

// Sample judges data
const judgesData: Judge[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Chief Technology Officer",
    company: "TechForward",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Alex"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "AI Research Director",
    company: "InnovateAI",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Venture Capitalist",
    company: "Future Fund",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Marcus"
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Engineering Director",
    company: "GlobalTech",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Priya"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Product Lead",
    company: "InnovateCorp",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=David"
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "UX Research Lead",
    company: "DesignForward",
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Elena"
  }
];

export default function About() {
  return (
    <div className="p-8 text-white overflow-y-auto scrollbar-thin h-full">
      <h1 className="text-4xl font-bold mb-6 font-golos-800">About</h1>
      
      <div className="max-w-4xl space-y-8">
        <p className="text-lg">
          Welcome to The World's Largest Hackathon, a groundbreaking event that brings together 30,000 developers, designers, and innovators from around the globe.
        </p>
        
        <p>
          Our mission is to foster collaboration, creativity, and technological advancement on an unprecedented scale. By connecting thousands of brilliant minds, we aim to tackle some of the world's most pressing challenges and push the boundaries of what's possible.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4 font-golos-700">Our Vision</h2>
        <p>
          We believe in the power of community-driven innovation. The World's Largest Hackathon isn't just about building projects—it's about building a movement that demonstrates the collective potential of global collaboration.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-6 font-golos-700">Judges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judgesData.map((judge) => (
            <div key={judge.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={judge.image} 
                  alt={judge.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold font-golos-600">{judge.name}</h3>
                <p className="text-red-400">{judge.role}</p>
                <p className="text-sm text-gray-400">{judge.company}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-10 mb-6 font-golos-700">Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Omega'].map((sponsor) => (
            <div key={sponsor} className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-xl font-bold mb-2 font-golos-600">{sponsor}</div>
              <div className="text-sm text-gray-300">Platinum Sponsor</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 