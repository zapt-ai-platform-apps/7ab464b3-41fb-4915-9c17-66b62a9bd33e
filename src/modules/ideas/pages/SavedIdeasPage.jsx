import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../ui/contexts/ToastContext';
import { fetchSavedIdeas, deleteIdea } from '../services/ideasService';
import { format } from 'date-fns';
import { CalendarIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function SavedIdeasPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    platform: 'all',
    search: ''
  });
  const [deleting, setDeleting] = useState({});

  useEffect(() => {
    const loadSavedIdeas = async () => {
      try {
        const fetchedIdeas = await fetchSavedIdeas(user.id);
        setIdeas(fetchedIdeas);
      } catch (error) {
        console.error('Error loading saved ideas:', error);
        notify('Failed to load saved ideas', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadSavedIdeas();
  }, [user, notify]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteIdea = async (ideaId) => {
    setDeleting(prev => ({ ...prev, [ideaId]: true }));
    
    try {
      await deleteIdea(ideaId);
      setIdeas(prev => prev.filter(idea => idea.id !== ideaId));
      notify('Idea deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting idea:', error);
      notify('Failed to delete idea', 'error');
    } finally {
      setDeleting(prev => ({ ...prev, [ideaId]: false }));
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesPlatform = filters.platform === 'all' || idea.platform === filters.platform;
    const matchesSearch = 
      idea.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      idea.caption.toLowerCase().includes(filters.search.toLowerCase()) ||
      (idea.hashtags && idea.hashtags.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesPlatform && matchesSearch;
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Ideas</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            name="platform"
            value={filters.platform}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter</option>
            <option value="youtube">YouTube</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          
          <input
            type="text"
            name="search"
            placeholder="Search ideas..."
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
          />
        </div>
      </div>

      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div 
              key={idea.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    idea.platform === 'instagram' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' :
                    idea.platform === 'tiktok' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' :
                    idea.platform === 'twitter' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    idea.platform === 'youtube' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    idea.platform === 'linkedin' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {idea.platform.charAt(0).toUpperCase() + idea.platform.slice(1)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {idea.scheduledFor && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {format(new Date(idea.scheduledFor), 'MMM d')}
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleDeleteIdea(idea.id)}
                      disabled={deleting[idea.id]}
                      className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {idea.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                  {idea.caption}
                </p>
                
                {idea.hashtags && (
                  <div className="text-xs text-blue-600 dark:text-blue-400 line-clamp-1">
                    {idea.hashtags}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
                Saved on {format(new Date(idea.createdAt), 'MMMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {ideas.length > 0 
              ? 'No ideas match your current filters' 
              : 'You haven\'t saved any content ideas yet'}
          </p>
        </div>
      )}
    </div>
  );
}