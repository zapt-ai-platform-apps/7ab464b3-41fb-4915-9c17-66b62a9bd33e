import React, { useState } from 'react';

export default function NicheForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    niche: '',
    audience: '',
    goals: '',
    tone: 'Professional',
    contentType: '',
  });

  const toneOptions = [
    'Professional', 'Casual', 'Humorous', 'Educational', 
    'Inspirational', 'Conversational', 'Authoritative', 'Friendly'
  ];

  const contentTypeOptions = [
    'Educational', 'Entertaining', 'Inspirational', 'Promotional',
    'Behind-the-scenes', 'User-generated', 'Trending topics', 'Q&A/FAQ'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Define Your Content Focus
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The more details you provide, the more tailored your content ideas will be.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label 
            htmlFor="niche" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Your Niche or Industry *
          </label>
          <input
            type="text"
            id="niche"
            name="niche"
            placeholder="e.g. Fitness coaching, Sustainable fashion, Tech startup"
            value={formData.niche}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          />
        </div>
        
        <div>
          <label 
            htmlFor="audience" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Target Audience *
          </label>
          <input
            type="text"
            id="audience"
            name="audience"
            placeholder="e.g. Busy professionals, New parents, College students"
            value={formData.audience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          />
        </div>

        <div>
          <label 
            htmlFor="goals" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content Goals
          </label>
          <input
            type="text"
            id="goals"
            name="goals"
            placeholder="e.g. Build brand awareness, Drive sales, Grow email list"
            value={formData.goals}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          />
        </div>

        <div>
          <label 
            htmlFor="tone" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Preferred Tone
          </label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          >
            {toneOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label 
            htmlFor="contentType" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Preferred Content Type
          </label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          >
            <option value="">Select a content type</option>
            {contentTypeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
}