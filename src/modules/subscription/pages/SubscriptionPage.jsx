import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToast } from '../../ui/contexts/ToastContext';
import SubscriptionPlans from '../components/SubscriptionPlans';
import SubscriptionBenefits from '../components/SubscriptionBenefits';
import { fetchUserSubscription } from '../services/subscriptionService';

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const data = await fetchUserSubscription(user.id);
        setSubscription(data);
      } catch (error) {
        console.error('Error loading subscription:', error);
        notify('Failed to load subscription details', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, [user, notify]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Choose Your Subscription Plan
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Upgrade to unlock unlimited content generation, advanced features, and premium support
        </p>
      </div>

      <SubscriptionPlans currentPlan={subscription?.plan || 'free'} />
      
      <SubscriptionBenefits />
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Can I cancel my subscription at any time?
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              What happens to my saved content if I downgrade?
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              All your saved content and scheduled posts remain intact even if you downgrade. However, you'll be limited in creating new content based on your plan's restrictions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Do you offer refunds?
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              We offer a 7-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 7 days of your purchase.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Can I change plans later?
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}