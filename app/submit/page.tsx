'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    social_link: '',
    title: '',
    project_link: '',
    description: '',
  });
  
  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.title || !formData.description) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Use a dummy image URL for now based on the project title's first letter
      const colors = ['blue', 'purple', 'pink', 'green', 'yellow'];
      const colorIndex = formData.title.charCodeAt(0) % colors.length;
      const dummyImageUrl = `/sample-${colors[colorIndex]}.jpg`;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage('Project submitted successfully! Redirecting to projects page...');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/projects');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting project:', error);
      setErrorMessage('There was an error submitting your project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-accent-yellow/20 via-transparent to-transparent opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Submit Your <span className="neon-text-yellow">Project</span>
          </h1>
          <p className="text-xl mb-8 text-text-secondary max-w-3xl mx-auto">
            Showcase your innovation to the world! Fill out the form below to submit your 
            project to the TechFusion Hackathon.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 md:px-6 flex-grow">
        <div className="container mx-auto max-w-3xl">
          <div className="card bg-[#1E293B]/70">
            {successMessage ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-accent-green/20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 neon-text-green">Success!</h2>
                <p className="text-text-secondary mb-8">{successMessage}</p>
                <div className="animate-pulse">
                  <span className="text-text-secondary">Redirecting...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="bg-accent-pink/10 border border-accent-pink rounded-lg p-4 mb-6">
                    <p className="text-accent-pink">{errorMessage}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="username" className="block font-medium">
                    Your Username <span className="text-accent-pink">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g., techgenius"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="social_link" className="block font-medium">
                    Social Profile Link
                  </label>
                  <input
                    type="url"
                    id="social_link"
                    name="social_link"
                    value={formData.social_link}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                  <p className="text-sm text-text-secondary">
                    GitHub, LinkedIn, Twitter, or any other social profile.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="title" className="block font-medium">
                    Project Title <span className="text-accent-pink">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., EcoTrack"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="project_link" className="block font-medium">
                    Project Link
                  </label>
                  <input
                    type="url"
                    id="project_link"
                    name="project_link"
                    value={formData.project_link}
                    onChange={handleChange}
                    placeholder="https://your-project.com"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                  <p className="text-sm text-text-secondary">
                    GitHub repository, demo site, or any link related to your project.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block font-medium">
                    Project Description <span className="text-accent-pink">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe your project, its features, and what problem it solves..."
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <label className="block font-medium">
                    Project Image
                  </label>
                  <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-primary/40">
                    <svg className="mx-auto h-12 w-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mt-2 text-text-secondary">
                      Drag and drop an image, or click to select a file
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <p className="text-xs text-accent-blue mt-2">
                      NOTE: Image upload not available in this demo - a sample image will be generated.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Link href="/projects" className="btn bg-[#1E293B] hover:bg-[#1E293B]/80 text-text-primary">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Project'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 