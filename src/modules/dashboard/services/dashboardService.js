import { supabase } from '../../../supabaseClient';

export async function fetchUserStats(userId) {
  // This would normally make API calls to our backend, but for now we'll mock the response
  
  // In real implementation:
  // const response = await fetch('/api/dashboard/stats', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   }
  // });
  // return await response.json();
  
  // For demo purposes, return mock data
  return {
    stats: {
      generatedIdeas: 12,
      savedIdeas: 5,
      scheduledPosts: 2,
      subscription: 'Free'
    },
    recentIdeas: [
      {
        id: 1,
        platform: 'Instagram',
        title: 'Behind the Scenes',
        caption: 'Take your followers behind the scenes of your latest project. Show the process and share insights about what goes into your work.',
        createdAt: '2023-09-15T10:30:00Z',
        scheduledFor: '2023-09-20T09:00:00Z'
      },
      {
        id: 2,
        platform: 'Twitter',
        title: 'Industry Tips Thread',
        caption: 'Share a thread of 5 top tips for beginners in your industry. Numbers and specific advice perform well on Twitter!',
        createdAt: '2023-09-14T14:20:00Z'
      },
      {
        id: 3,
        platform: 'LinkedIn',
        title: 'Case Study',
        caption: 'Present a case study of how you helped a client achieve impressive results. Include specific metrics and the methods you used.',
        createdAt: '2023-09-13T11:15:00Z'
      }
    ]
  };
}