import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Project } from '@/types/types';

// This makes the page dynamic to ensure we always get fresh data
export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  
  // Sample project data
  const sampleProjects: Record<number, Project> = {
    1: {
      id: 1,
      username: 'techgenius',
      social_link: 'https://github.com/techgenius',
      title: 'EcoTrack',
      project_link: 'https://ecotrack.demo',
      description: 'A sustainable living app that tracks your carbon footprint and suggests improvements. EcoTrack helps users monitor their daily activities and provides actionable insights to reduce their environmental impact. Features include transportation tracking, meal carbon calculations, and personalized recommendations based on lifestyle.',
      image_url: '/sample-blue.jpg',
      created_at: new Date().toISOString(),
    },
    2: {
      id: 2,
      username: 'codemaster',
      social_link: 'https://github.com/codemaster',
      title: 'MindMesh',
      project_link: 'https://mindmesh.demo',
      description: 'AI-powered mental health companion that offers personalized mindfulness exercises. MindMesh uses machine learning to adapt to your emotional patterns and provide targeted meditation, breathing exercises, and cognitive behavioral therapy techniques.',
      image_url: '/sample-purple.jpg',
      created_at: new Date().toISOString(),
    },
    3: {
      id: 3,
      username: 'devdreamer',
      social_link: 'https://github.com/devdreamer',
      title: 'CryptoSafe',
      project_link: 'https://cryptosafe.demo',
      description: 'Secure wallet for cryptocurrency that uses biometric authentication. CryptoSafe implements multi-factor authentication including fingerprint, facial recognition, and voice verification to ensure maximum security for digital assets.',
      image_url: '/sample-pink.jpg',
      created_at: new Date().toISOString(),
    },
    4: {
      id: 4,
      username: 'pixelwizard',
      social_link: 'https://github.com/pixelwizard',
      title: 'ARLens',
      project_link: 'https://arlens.demo',
      description: 'Augmented reality application that helps identify plants and provides care information. ARLens uses computer vision to recognize thousands of plant species and overlays care instructions, growth patterns, and compatibility with your local climate.',
      image_url: '/sample-green.jpg',
      created_at: new Date().toISOString(),
    },
    5: {
      id: 5,
      username: 'datasculptor',
      social_link: 'https://github.com/datasculptor',
      title: 'SoundScape',
      project_link: 'https://soundscape.demo',
      description: 'Audio visualization tool that creates stunning visuals from music in real-time. SoundScape analyzes audio input to generate dynamic, responsive visual patterns that react to rhythm, frequency, and volume.',
      image_url: '/sample-yellow.jpg',
      created_at: new Date().toISOString(),
    },
    6: {
      id: 6,
      username: 'webcrafter',
      social_link: 'https://github.com/webcrafter',
      title: 'NutriScan',
      project_link: 'https://nutriscan.demo',
      description: 'Mobile app that scans food items and provides nutritional information instantly. NutriScan uses image recognition to identify foods and ingredients, providing detailed nutritional data including calories, macronutrients, vitamins, and potential allergens.',
      image_url: '/sample-blue.jpg',
      created_at: new Date().toISOString(),
    },
  };

  // Get the project from the sample data
  const displayProject = sampleProjects[projectId];

  // If no project is found, return 404
  if (!displayProject) {
    notFound();
  }

  // Get color based on project ID
  const colors = ['blue', 'purple', 'pink', 'green', 'yellow'];
  const color = colors[projectId % colors.length];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Project Hero Section */}
      <section className="py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Background Gradient Effects */}
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-radial from-accent-${color}/20 via-transparent to-transparent opacity-30`}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link href="/projects" className="inline-flex items-center text-text-secondary hover:text-text-primary mb-8 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Projects
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project Image */}
            <div className={`h-80 rounded-lg overflow-hidden bg-accent-${color}/30 flex items-center justify-center`}>
              <span className={`text-6xl font-bold neon-text-${color}`}>
                {displayProject.title.charAt(0)}
              </span>
            </div>
            
            {/* Project Info */}
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 neon-text-${color}`}>
                {displayProject.title}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className={`w-10 h-10 rounded-full bg-accent-${color}/40 flex items-center justify-center mr-3`}>
                  <span className="text-sm font-bold">
                    {displayProject.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{displayProject.username}</p>
                  <p className="text-sm text-text-secondary">
                    Submitted on {formatDate(displayProject.created_at)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Project Description</h2>
                  <p className="text-text-secondary">
                    {displayProject.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href={displayProject.project_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center btn bg-accent-${color}/20 hover:bg-accent-${color}/40 text-text-primary transition-all`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Visit Project
                  </a>
                  
                  <a 
                    href={displayProject.social_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                    </svg>
                    Creator's GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Projects Section */}
      <section className="py-16 px-4 md:px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            More <span className="neon-text-purple">Projects</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(sampleProjects)
              .filter(p => p.id !== projectId)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <div key={relatedProject.id} className="card group hover:shadow-neon-purple transition-all">
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <div className={`w-full h-full bg-accent-${colors[index % colors.length]}/30 flex items-center justify-center`}>
                      <span className={`text-2xl font-bold neon-text-${colors[index % colors.length]}`}>
                        {relatedProject.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <h3 className="text-xl font-bold mb-2 group-hover:neon-text-purple transition-all">
                    {relatedProject.title}
                  </h3>
                  <p className="text-text-secondary mb-4 line-clamp-2">
                    {relatedProject.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">
                      By: {relatedProject.username}
                    </span>
                    <Link href={`/projects/${relatedProject.id}`} className={`text-accent-${colors[index % colors.length]} hover:neon-text-${colors[index % colors.length]} transition-all`}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="btn btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 