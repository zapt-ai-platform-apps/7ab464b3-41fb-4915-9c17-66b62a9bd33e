import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col gap-8">
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Generate AI-Powered Content Ideas for Social Media
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Create engaging content for Instagram, TikTok, Twitter, YouTube, and LinkedIn with our AI assistant
          </p>
          {user ? (
            <Link 
              to="/generator" 
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg cursor-pointer"
            >
              Create Content Now
            </Link>
          ) : (
            <Link 
              to="/auth" 
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg cursor-pointer"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Define Your Niche
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your niche, target audience, and content goals
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Generate Ideas
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI creates platform-specific content ideas, captions, and hashtags
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Organize & Export
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Save your favorite ideas, organize with our content calendar, and export
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100 dark:bg-gray-800 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Platforms We Support
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Generate content ideas for all your favorite social media platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Instagram', color: 'bg-pink-500' },
              { name: 'TikTok', color: 'bg-black dark:bg-gray-900' },
              { name: 'Twitter', color: 'bg-blue-400' },
              { name: 'YouTube', color: 'bg-red-600' },
              { name: 'LinkedIn', color: 'bg-blue-700' }
            ].map((platform) => (
              <div 
                key={platform.name}
                className={`${platform.color} text-white p-6 rounded-xl shadow-md flex items-center justify-center`}
              >
                <span className="text-lg font-semibold">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Social Media Content?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of creators who use SocialAI to stand out and engage their audience
          </p>
          {user ? (
            <Link 
              to="/generator" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
            >
              Start Creating Now
            </Link>
          ) : (
            <Link 
              to="/auth" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
            >
              Sign Up Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}