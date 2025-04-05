import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../../supabaseClient';

export default function AuthPage() {
  return (
    <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Sign in with ZAPT
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          <a 
            href="https://www.zapt.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Visit ZAPT
          </a>
        </p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4F46E5',
                brandAccent: '#4338CA',
              },
            },
          },
        }}
        theme="dark"
      />
      
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}