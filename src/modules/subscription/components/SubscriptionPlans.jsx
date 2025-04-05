import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useToast } from '../../ui/contexts/ToastContext';

export default function SubscriptionPlans({ currentPlan }) {
  const { notify } = useToast();
  
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Basic content generation for casual creators',
      features: [
        '5 content ideas per month',
        'Access to 3 social platforms',
        'Basic content calendar',
        'Standard support'
      ],
      buttonText: currentPlan === 'free' ? 'Current Plan' : 'Downgrade',
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Perfect for serious content creators',
      features: [
        '50 content ideas per month',
        'Access to all social platforms',
        'Advanced content calendar',
        'Caption & hashtag generation',
        'Priority support'
      ],
      buttonText: currentPlan === 'pro' ? 'Current Plan' : 'Upgrade',
      highlighted: true
    },
    {
      id: 'business',
      name: 'Business',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and professional creators',
      features: [
        'Unlimited content ideas',
        'Access to all social platforms',
        'Advanced analytics',
        'Team collaboration',
        'Custom exports',
        'Priority support',
        'API access'
      ],
      buttonText: currentPlan === 'business' ? 'Current Plan' : 'Upgrade',
      highlighted: false
    }
  ];

  const handleSubscriptionChange = (planId) => {
    if (planId === currentPlan) {
      return;
    }
    
    notify('Subscription feature will be implemented soon', 'info');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={`rounded-xl shadow-md overflow-hidden ${
            plan.highlighted
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white ring-2 ring-blue-500 ring-offset-2'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className="p-6">
            <h3 className={`text-xl font-bold ${
              plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
            } mb-2`}>
              {plan.name}
            </h3>
            
            <div className="flex items-baseline mb-4">
              <span className={`text-3xl font-extrabold ${
                plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {plan.price}
              </span>
              <span className={`ml-1 text-sm ${
                plan.highlighted ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
                /{plan.period}
              </span>
            </div>
            
            <p className={`text-sm ${
              plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'
            } mb-6`}>
              {plan.description}
            </p>
            
            <button
              onClick={() => handleSubscriptionChange(plan.id)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.highlighted
                  ? currentPlan === plan.id
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                  : currentPlan === plan.id
                    ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500'
              } cursor-pointer`}
              disabled={currentPlan === plan.id}
            >
              {plan.buttonText}
            </button>
          </div>
          
          <div className={`px-6 pb-6 pt-2 ${
            plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'
          }`}>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className={`h-5 w-5 mr-2 ${
                    plan.highlighted ? 'text-blue-200' : 'text-green-500 dark:text-green-400'
                  }`} />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}