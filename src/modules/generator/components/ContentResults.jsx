import React, { useState } from 'react';
import { useToast } from '../../ui/contexts/ToastContext';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { saveContentIdea, scheduleContentIdea } from '../services/generatorService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ContentResults({ content, userId, nicheData }) {
  const { notify } = useToast();
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [scheduleDates, setScheduleDates] = useState({});
  const [showScheduler, setShowScheduler] = useState({});
  const [saving, setSaving] = useState({});
  const [scheduling, setScheduling] = useState({});

  const handleSaveIdea = async (idea) => {
    if (savedIdeas.includes(idea.id)) {
      notify('This idea is already saved', 'info');
      return;
    }

    setSaving(prev => ({ ...prev, [idea.id]: true }));
    
    try {
      await saveContentIdea(userId, {
        ...idea,
        niche: nicheData.niche
      });
      
      setSavedIdeas(prev => [...prev, idea.id]);
      notify('Content idea saved!', 'success');
    } catch (error) {
      console.error('Error saving idea:', error);
      notify('Failed to save idea', 'error');
    } finally {
      setSaving(prev => ({ ...prev, [idea.id]: false }));
    }
  };

  const toggleScheduler = (ideaId) => {
    setShowScheduler(prev => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
  };

  const handleDateChange = (date, ideaId) => {
    setScheduleDates(prev => ({
      ...prev,
      [ideaId]: date
    }));
  };

  const handleScheduleIdea = async (idea) => {
    if (!scheduleDates[idea.id]) {
      notify('Please select a date first', 'error');
      return;
    }

    setScheduling(prev => ({ ...prev, [idea.id]: true }));
    
    try {
      await scheduleContentIdea(userId, {
        ...idea,
        niche: nicheData.niche,
        scheduledFor: scheduleDates[idea.id]
      });
      
      notify('Content scheduled successfully!', 'success');
      setShowScheduler(prev => ({ ...prev, [idea.id]: false }));
    } catch (error) {
      console.error('Error scheduling idea:', error);
      notify('Failed to schedule idea', 'error');
    } finally {
      setScheduling(prev => ({ ...prev, [idea.id]: false }));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => notify('Copied to clipboard!', 'success'))
      .catch(() => notify('Failed to copy', 'error'));
  };

  return (
    <div className="space-y-8">
      {content.map((item) => (
        <div 
          key={item.id} 
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <span className="inline-block h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 mr-3 text-center leading-8">
                {item.platform === 'instagram' ? '📸' :
                 item.platform === 'tiktok' ? '🎵' :
                 item.platform === 'twitter' ? '🐦' : 
                 item.platform === 'youtube' ? '🎬' : 
                 item.platform === 'linkedin' ? '💼' : '📱'}
              </span>
              <h3 className="text-lg font-semibold capitalize">
                {item.platform}
              </h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleSaveIdea(item)}
                disabled={saving[item.id] || savedIdeas.includes(item.id)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Save idea"
              >
                {savedIdeas.includes(item.id) ? (
                  <BookmarkSolidIcon className="h-5 w-5 text-blue-600" />
                ) : (
                  <BookmarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              
              <button 
                onClick={() => toggleScheduler(item.id)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Schedule post"
              >
                <CalendarIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <button 
                onClick={() => copyToClipboard(`${item.title}\n\n${item.caption}\n\n${item.hashtags || ''}`)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label="Copy to clipboard"
              >
                <ShareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Post Title
              </h4>
              <p className="text-gray-900 dark:text-white">
                {item.title}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Caption
              </h4>
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {item.caption}
              </p>
            </div>
            
            {item.hashtags && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Hashtags
                </h4>
                <p className="text-blue-600 dark:text-blue-400">
                  {item.hashtags}
                </p>
              </div>
            )}
          </div>
          
          {showScheduler[item.id] && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Schedule this post
              </h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <DatePicker
                  selected={scheduleDates[item.id]}
                  onChange={(date) => handleDateChange(date, item.id)}
                  minDate={new Date()}
                  placeholderText="Select a date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
                />
                <button
                  onClick={() => handleScheduleIdea(item)}
                  disabled={scheduling[item.id] || !scheduleDates[item.id]}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {scheduling[item.id] ? 'Scheduling...' : 'Schedule'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="flex justify-center pt-4">
        <button
          onClick={() => notify('Export feature will be available in the premium version', 'info')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors cursor-pointer"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          <span>Export All Ideas</span>
        </button>
      </div>
    </div>
  );
}