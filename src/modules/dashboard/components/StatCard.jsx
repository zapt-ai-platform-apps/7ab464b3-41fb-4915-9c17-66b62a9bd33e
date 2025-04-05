import React from 'react';

export default function StatCard({ title, value, icon, color }) {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
      case 'green':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'purple':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300';
      case 'orange':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-full p-3 ${getColorClasses()}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}