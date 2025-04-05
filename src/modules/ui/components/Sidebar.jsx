import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  SparklesIcon, 
  CalendarIcon, 
  BookmarkIcon, 
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isOpen, closeSidebar }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Content Generator', path: '/generator', icon: SparklesIcon },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Saved Ideas', path: '/saved', icon: BookmarkIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
  ];
  
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
    }`;
  
  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform transform z-30 lg:translate-x-0 lg:static lg:h-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
          <button 
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
            onClick={closeSidebar}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={navLinkClasses}
              onClick={() => closeSidebar()}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}