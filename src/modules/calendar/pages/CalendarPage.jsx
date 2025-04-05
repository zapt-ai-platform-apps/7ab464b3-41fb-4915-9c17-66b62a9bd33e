import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../ui/contexts/ToastContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { fetchScheduledContent, updateScheduledContent } from '../services/calendarService';

export default function CalendarPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledContent, setScheduledContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const loadScheduledContent = async () => {
      try {
        const content = await fetchScheduledContent(user.id);
        setScheduledContent(content);
      } catch (error) {
        console.error('Error loading scheduled content:', error);
        notify('Failed to load scheduled content', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadScheduledContent();
  }, [user, notify]);

  useEffect(() => {
    // Generate days for the current month view
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    setCalendarDays(days);
  }, [currentMonth]);

  const getContentForDate = (date) => {
    return scheduledContent.filter(item => 
      isSameDay(new Date(item.scheduledFor), date)
    );
  };

  const selectedDateContent = getContentForDate(selectedDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (date) => {
    setCurrentMonth(date);
  };

  const handleReschedule = async (contentId, newDate) => {
    try {
      await updateScheduledContent(contentId, newDate);
      
      // Update local state to reflect the change
      setScheduledContent(prev => 
        prev.map(item => 
          item.id === contentId 
            ? { ...item, scheduledFor: newDate } 
            : item
        )
      );
      
      notify('Post rescheduled successfully', 'success');
    } catch (error) {
      console.error('Error rescheduling post:', error);
      notify('Failed to reschedule post', 'error');
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Calendar</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange}
              inline
              monthsShown={1}
              renderDayContents={(day, date) => (
                <div className="relative">
                  <span>{day}</span>
                  {getContentForDate(date).length > 0 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            
            {selectedDateContent.length > 0 ? (
              <div className="space-y-4">
                {selectedDateContent.map((content) => (
                  <div 
                    key={content.id} 
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        content.platform === 'instagram' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300' :
                        content.platform === 'tiktok' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' :
                        content.platform === 'twitter' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        content.platform === 'youtube' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        content.platform === 'linkedin' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                      </span>
                      
                      <DatePicker
                        selected={new Date(content.scheduledFor)}
                        onChange={(date) => handleReschedule(content.id, date)}
                        customInput={
                          <button className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Reschedule
                          </button>
                        }
                      />
                    </div>
                    
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {content.title}
                    </h3>
                    
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {content.caption}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No content scheduled for this date
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}