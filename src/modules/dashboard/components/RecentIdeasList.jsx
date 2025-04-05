import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function RecentIdeasList({ ideas }) {
  const getPlatformClasses = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      case 'tiktok':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'twitter':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'youtube':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'linkedin':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {ideas.map((idea) => (
        <div key={idea.id} className="py-4">
          <div className="flex items-start gap-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformClasses(idea.platform)}`}>
              {idea.platform}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {idea.title}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {idea.caption}
              </p>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {format(new Date(idea.createdAt), 'MMM d')}
            </div>
          </div>
          {idea.scheduledFor && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Scheduled for: {format(new Date(idea.scheduledFor), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}