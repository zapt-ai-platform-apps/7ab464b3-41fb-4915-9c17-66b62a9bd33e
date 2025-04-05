import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="container-fluid">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
            © {new Date().getFullYear()} SocialAI Content Generator. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}