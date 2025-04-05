import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar({ toggleSidebar }) {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container-fluid">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {user && (
              <button 
                className="mr-2 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            )}
            
            <Link to="/" className="flex items-center">
              <img
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SocialAI
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/subscription"
                  className="hidden sm:block text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Subscription
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer"
                >
                  Sign Out
                </button>
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}