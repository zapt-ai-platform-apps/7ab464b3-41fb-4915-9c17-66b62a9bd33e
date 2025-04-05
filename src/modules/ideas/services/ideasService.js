import { supabase } from '../../../supabaseClient';

export async function fetchSavedIdeas(userId) {
  // This would normally make an API call to our backend
  // For now, we'll simulate the response with mock data
  
  // In real implementation:
  // const response = await fetch('/api/ideas/saved', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   }
  // });
  // return await response.json();
  
  // For demo purposes, return mock data
  return [
    {
      id: 1,
      platform: 'instagram',
      title: 'Day in the Life: The Honest Version',
      caption: 'Ever wonder what my day REALLY looks like? Swipe to see the behind-the-scenes reality of what goes into creating content for my business.',
      hashtags: '#dayinthelife #behindthescenes #contentcreator #smallbusiness',
      createdAt: '2023-09-12T15:30:00Z',
      niche: 'Digital Marketing'
    },
    {
      id: 2,
      platform: 'twitter',
      title: 'Quick Tip for Better Results',
      caption: 'Just discovered that changing the order of my morning tasks boosted my productivity by 40%. Start with the one task that requires the most creativity, not the most urgency.',
      createdAt: '2023-09-10T09:15:00Z',
      niche: 'Productivity'
    },
    {
      id: 3,
      platform: 'linkedin',
      title: 'How I Helped Clients Achieve a 300% ROI',
      caption: 'After working with 20+ clients across different industries, I've identified the three factors that consistently lead to the highest ROI. Here's what you need to know:',
      createdAt: '2023-09-05T14:45:00Z',
      niche: 'Business Consulting',
      scheduledFor: '2023-09-20T09:00:00Z'
    },
    {
      id: 4,
      platform: 'youtube',
      title: 'The Ultimate Guide to Content Strategy (Step-by-Step Tutorial)',
      caption: 'In this comprehensive guide, I'm breaking down the exact process I use with clients to develop content strategies that drive real business results.',
      createdAt: '2023-08-28T11:20:00Z',
      niche: 'Content Marketing'
    },
    {
      id: 5,
      platform: 'tiktok',
      title: '3 Mistakes You're Making (& How to Fix Them)',
      caption: 'You're doing these 3 things wrong and it's costing you followers! #contentcreator #growthtips',
      hashtags: '#tiktokgrowth #creatortips #socialmediamarketing #viralcontent',
      createdAt: '2023-08-22T16:10:00Z',
      niche: 'Social Media'
    }
  ];
}

export async function deleteIdea(ideaId) {
  // This would normally make an API call to our backend
  // For now, we'll simulate the response with mock data
  
  // In real implementation:
  // const response = await fetch(`/api/ideas/${ideaId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   }
  // });
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}