import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../ui/contexts/ToastContext';
import { updateUserPreferences } from '../services/settingsService';

export default function SettingsPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    contentReminders: true,
    weeklyDigest: true,
    exportFormat: 'csv'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await updateUserPreferences(user.id, preferences);
      notify('Settings updated successfully', 'success');
    } catch (error) {
      console.error('Error updating settings:', error);
      notify('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="px-6">
            <div className="flex space-x-8">
              <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                Account Preferences
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Subscription
              </button>
            </div>
          </nav>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Notification Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={preferences.emailNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive emails about your account and content updates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="contentReminders"
                      name="contentReminders"
                      type="checkbox"
                      checked={preferences.contentReminders}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="contentReminders" className="font-medium text-gray-700 dark:text-gray-300">
                      Content Reminders
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Get reminders about your scheduled content
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyDigest"
                      name="weeklyDigest"
                      type="checkbox"
                      checked={preferences.weeklyDigest}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="weeklyDigest" className="font-medium text-gray-700 dark:text-gray-300">
                      Weekly Digest
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive a weekly summary of your content performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Export Preferences
              </h2>
              <div>
                <label htmlFor="exportFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Export Format
                </label>
                <select
                  id="exportFormat"
                  name="exportFormat"
                  value={preferences.exportFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="json">JSON</option>
                  <option value="txt">Plain Text</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </h3>
              <p className="mt-1 text-gray-900 dark:text-white">
                {user.email}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Account Created
              </h3>
              <p className="mt-1 text-gray-900 dark:text-white">
                {new Date(user.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Danger Zone
          </h3>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors cursor-pointer"
            onClick={() => notify('Account deletion is only available in the premium version', 'info')}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}