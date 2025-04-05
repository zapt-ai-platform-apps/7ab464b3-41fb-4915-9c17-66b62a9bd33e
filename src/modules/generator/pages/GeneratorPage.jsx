import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../ui/contexts/ToastContext';
import NicheForm from '../components/NicheForm';
import PlatformSelector from '../components/PlatformSelector';
import ContentResults from '../components/ContentResults';
import { generateContentIdeas } from '../services/generatorService';
import PremiumBanner from '../../subscription/components/PremiumBanner';

export default function GeneratorPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [step, setStep] = useState(1);
  const [nicheData, setNicheData] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(5);

  const handleNicheSubmit = (data) => {
    setNicheData(data);
    setStep(2);
  };

  const handlePlatformSelect = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  const handleGenerateContent = async () => {
    if (selectedPlatforms.length === 0) {
      notify('Please select at least one platform', 'error');
      return;
    }
    
    if (remainingGenerations <= 0) {
      notify('You have reached your free generation limit', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const content = await generateContentIdeas(
        user.id, 
        nicheData, 
        selectedPlatforms
      );
      
      setGeneratedContent(content);
      setRemainingGenerations(prev => prev - 1);
      setStep(3);
    } catch (error) {
      console.error('Error generating content:', error);
      notify('Failed to generate content ideas. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setNicheData(null);
    setSelectedPlatforms([]);
    setGeneratedContent([]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Idea Generator
        </h1>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Remaining Free Generations: {remainingGenerations}
        </div>
      </div>

      <PremiumBanner />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {step === 1 && (
            <NicheForm onSubmit={handleNicheSubmit} />
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Select Platforms
                </h2>
                <PlatformSelector 
                  onSelectPlatforms={handlePlatformSelect} 
                  selectedPlatforms={selectedPlatforms}
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateContent}
                  disabled={loading || selectedPlatforms.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    'Generate Content Ideas'
                  )}
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Generated Content Ideas
                </h2>
                <button
                  onClick={handleStartOver}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                >
                  Start Over
                </button>
              </div>
              
              <ContentResults 
                content={generatedContent} 
                userId={user.id}
                nicheData={nicheData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}