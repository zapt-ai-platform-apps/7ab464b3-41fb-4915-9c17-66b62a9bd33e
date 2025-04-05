import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { SparklesIcon, CalendarIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { fetchUserStats } from '../services/dashboardService';
import StatCard from '../components/StatCard';
import RecentIdeasList from '../components/RecentIdeasList';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    generatedIdeas: 0,
    savedIdeas: 0,
    scheduledPosts: 0,
    subscription: 'Free'
  });
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (user) {
          const { stats, recentIdeas } = await fetchUserStats(user.id);
          setStats(stats);
          setRecentIdeas(recentIdeas);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Link
          to="/generator"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-colors cursor-pointer"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Content</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Generated Ideas"
          value={stats.generatedIdeas}
          icon={<SparklesIcon className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Saved Ideas"
          value={stats.savedIdeas}
          icon={<BookmarkIcon className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Scheduled Posts"
          value={stats.scheduledPosts}
          icon={<CalendarIcon className="h-6 w-6" />}
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Ideas</h2>
          <Link
            to="/saved"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            View All
          </Link>
        </div>

        {recentIdeas.length > 0 ? (
          <RecentIdeasList ideas={recentIdeas} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No content ideas generated yet</p>
            <Link
              to="/generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow transition-colors cursor-pointer"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>Generate Your First Idea</span>
            </Link>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Your Subscription: {stats.subscription}
            </h2>
            <p className="text-blue-100">
              {stats.subscription === 'Premium' 
                ? 'Enjoy unlimited content generation and all premium features!'
                : 'Upgrade to Premium for unlimited content generation and premium features'}
            </p>
          </div>
          {stats.subscription !== 'Premium' && (
            <Link
              to="/subscription"
              className="whitespace-nowrap px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 shadow transition-colors cursor-pointer"
            >
              Upgrade Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}