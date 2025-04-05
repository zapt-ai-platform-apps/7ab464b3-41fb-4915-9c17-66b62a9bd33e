import React from 'react';
import { 
  SparklesIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

export default function SubscriptionBenefits() {
  const benefits = [
    {
      icon: SparklesIcon,
      title: 'Unlimited Content Ideas',
      description: 'Generate as many content ideas as you need for all your social platforms'
    },
    {
      icon: CalendarIcon,
      title: 'Advanced Content Calendar',
      description: 'Organize, schedule, and manage your content with our powerful calendar tools'
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Analytics',
      description: 'Track which content types perform best and optimize your strategy'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Invite team members to collaborate on content creation and scheduling'
    },
    {
      icon: CogIcon,
      title: 'Customization Options',
      description: 'Tailor your content to your brand voice, style, and audience preferences'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Premium Benefits
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <benefit.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}