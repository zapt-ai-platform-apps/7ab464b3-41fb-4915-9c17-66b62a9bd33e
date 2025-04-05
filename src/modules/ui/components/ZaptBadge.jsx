import React from 'react';

export default function ZaptBadge() {
  return (
    <a 
      href="https://www.zapt.ai" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-40 px-3 py-2 bg-gray-900 text-white text-xs rounded-full shadow-lg hover:bg-gray-800 transition-colors"
    >
      Made on ZAPT
    </a>
  );
}