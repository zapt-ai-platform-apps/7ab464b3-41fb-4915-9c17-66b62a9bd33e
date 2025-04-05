import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function PremiumBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6 text-yellow-300 mr-3" />
          <div>
            <h3 className="text-white font-medium">
              Upgrade to Premium
            </h3>
            <p className="text-blue-100 text-sm">
              Get unlimited content ideas and premium features
            </p>
          </div>
        </div>
        
        <Link
          to="/subscription"
          className="whitespace-nowrap px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow cursor-pointer"
        >
          See Plans
        </Link>
      </div>
    </div>
  );
}