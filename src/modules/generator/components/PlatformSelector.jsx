import React from 'react';

const platforms = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: '📸', 
    description: 'Visual content, Stories, Reels' 
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: '🎵', 
    description: 'Short-form videos, trends' 
  },
  { 
    id: 'twitter', 
    name: 'Twitter', 
    icon: '🐦', 
    description: 'Short posts, threads, news' 
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: '🎬', 
    description: 'Long-form videos, tutorials' 
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: '💼', 
    description: 'Professional content, articles' 
  }
];

export default function PlatformSelector({ onSelectPlatforms, selectedPlatforms }) {
  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      onSelectPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onSelectPlatforms([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        Select the platforms you want to generate content ideas for:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`p-4 border rounded-xl cursor-pointer transition-colors ${
              selectedPlatforms.includes(platform.id)
                ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-400'
                : 'bg-white border-gray-200 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{platform.icon}</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {platform.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {platform.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}