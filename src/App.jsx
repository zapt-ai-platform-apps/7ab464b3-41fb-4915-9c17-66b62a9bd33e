import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './modules/auth/hooks/useAuth';

// Layouts
import MainLayout from './modules/ui/layouts/MainLayout';
import AuthLayout from './modules/ui/layouts/AuthLayout';

// Pages
import HomePage from './modules/core/pages/HomePage';
import DashboardPage from './modules/dashboard/pages/DashboardPage';
import GeneratorPage from './modules/generator/pages/GeneratorPage';
import CalendarPage from './modules/calendar/pages/CalendarPage';
import SettingsPage from './modules/settings/pages/SettingsPage';
import AuthPage from './modules/auth/pages/AuthPage';
import SubscriptionPage from './modules/subscription/pages/SubscriptionPage';
import SavedIdeasPage from './modules/ideas/pages/SavedIdeasPage';
import ZaptBadge from './modules/ui/components/ZaptBadge';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <div className="min-h-screen h-full">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route 
            path="auth" 
            element={
              <PublicRoute>
                <AuthLayout>
                  <AuthPage />
                </AuthLayout>
              </PublicRoute>
            } 
          />
        </Route>
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="generator" element={<GeneratorPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="saved" element={<SavedIdeasPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Toaster position="bottom-right" />
      <ZaptBadge />
    </div>
  );
}