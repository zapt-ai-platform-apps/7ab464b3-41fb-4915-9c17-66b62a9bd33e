import { supabase } from '../../../supabaseClient';

export async function generateContentIdeas(userId, nicheData, platforms) {
  // This would normally make an API call to our backend AI service
  // For now, we'll simulate the response with mock data
  
  // In real implementation:
  // const response = await fetch('/api/generate', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   },
  //   body: JSON.stringify({ userId, nicheData, platforms })
  // });
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const ideas = [];
  
  // Generate mock ideas for each platform
  platforms.forEach(platform => {
    let title = '';
    let caption = '';
    let hashtags = '';
    
    switch (platform) {
      case 'instagram':
        title = getRandomInstagramTitle(nicheData);
        caption = getRandomInstagramCaption(nicheData);
        hashtags = getRandomHashtags(nicheData, platform);
        break;
      case 'tiktok':
        title = getRandomTikTokTitle(nicheData);
        caption = getRandomTikTokCaption(nicheData);
        hashtags = getRandomHashtags(nicheData, platform);
        break;
      case 'twitter':
        title = getRandomTwitterTitle(nicheData);
        caption = getRandomTwitterCaption(nicheData);
        hashtags = getRandomHashtags(nicheData, platform);
        break;
      case 'youtube':
        title = getRandomYouTubeTitle(nicheData);
        caption = getRandomYouTubeCaption(nicheData);
        break;
      case 'linkedin':
        title = getRandomLinkedInTitle(nicheData);
        caption = getRandomLinkedInCaption(nicheData);
        break;
    }
    
    ideas.push({
      id: platform + '-' + Date.now() + Math.floor(Math.random() * 1000),
      platform,
      title,
      caption,
      hashtags
    });
  });
  
  return ideas;
}

export async function saveContentIdea(userId, idea) {
  // In real implementation:
  // const response = await fetch('/api/ideas/save', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   },
  //   body: JSON.stringify({ userId, idea })
  // });
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}

export async function scheduleContentIdea(userId, idea) {
  // In real implementation:
  // const response = await fetch('/api/ideas/schedule', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
  //   },
  //   body: JSON.stringify({ userId, idea })
  // });
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}

// Helper functions for mock content generation
function getRandomInstagramTitle(nicheData) {
  const titles = [
    `${nicheData.niche} Tips for ${nicheData.audience}`,
    "Behind the Scenes: What It Really Takes",
    `5 Ways to Improve Your ${nicheData.niche} Game`,
    "Day in the Life: The Honest Version",
    `Transform Your ${nicheData.niche} Approach with These Secrets`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomInstagramCaption(nicheData) {
  const captions = [
    `Are you struggling with your ${nicheData.niche} journey? Here's what made the biggest difference for me...\n\nDouble tap if you've experienced this too!\n\nWhat's been your biggest challenge so far? Let me know in the comments 👇`,
    
    `The secret to success in ${nicheData.niche} isn't what most people think. After working with hundreds of ${nicheData.audience}, I've discovered that consistency beats perfection every time.\n\nTag someone who needs to hear this message! ✨`,
    
    `This is what ${nicheData.niche} actually looks like behind the scenes! Swipe to see the reality vs what you usually see on social media.\n\nRemember, we're all just figuring it out as we go! 💯`,
    
    `Quick ${nicheData.niche} tip that changed everything for my clients:\n\n1. Start small\n2. Measure results\n3. Adjust your approach\n4. Repeat\n\nSimple but effective! Save this post for later ⭐️`,
    
    `Question for my ${nicheData.audience} followers: What's one ${nicheData.niche} goal you're working toward right now?\n\nI'm creating new content and want to make sure it helps with what you're actually struggling with!`
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomTikTokTitle(nicheData) {
  const titles = [
    `${nicheData.niche} Hack That Nobody Talks About`,
    `How I Grew My ${nicheData.niche} Business to 6 Figures`,
    `${nicheData.niche} Trends That Are Taking Over 2023`,
    `What ${nicheData.audience} Need to Know About ${nicheData.niche}`,
    `3 ${nicheData.niche} Mistakes You're Making (& How to Fix Them)`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomTikTokCaption(nicheData) {
  const captions = [
    `This ${nicheData.niche} hack changed my life! #${nicheData.niche.replace(/\s+/g, '')} #fyp`,
    
    `I can't believe more ${nicheData.audience} don't know this! Stitch with your reaction!`,
    
    `POV: When you discover the secret to ${nicheData.niche} success that nobody talks about...`,
    
    `Day 1 of sharing ${nicheData.niche} tips until I go viral! Follow for more!`,
    
    `${nicheData.audience} be like... 😂 #${nicheData.niche.replace(/\s+/g, '')}Tips`
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomTwitterTitle(nicheData) {
  const titles = [
    `${nicheData.niche} Thread for ${nicheData.audience}`,
    "Controversial Take on Industry Trends",
    `Quick Tip for Better ${nicheData.niche} Results`,
    "The Truth About What's Working Now",
    `Why Most ${nicheData.niche} Advice Fails (and What Works)`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomTwitterCaption(nicheData) {
  const captions = [
    `I've spent 5 years in the ${nicheData.niche} industry working with ${nicheData.audience}.\n\nHere are 5 truths nobody wants to admit:`,
    
    `The ${nicheData.niche} framework that's working in 2023:\n\n1. Start with customer problems\n2. Solve them better than competitors\n3. Communicate clearly\n4. Deliver consistently\n5. Adapt based on feedback\n\nThat's it. That's the framework.`,
    
    `Unpopular opinion: Most ${nicheData.audience} are overthinking ${nicheData.niche}.\n\nYou don't need another course, tool, or guru.\n\nYou need to execute consistently on the basics.`,
    
    `Quick ${nicheData.niche} tip:\n\nBefore creating content, ask:\n\n- Does this solve a real problem?\n- Is this based on experience (not theory)?\n- Would I share this with a friend?\n\nIf yes to all three, publish. If not, rethink.`,
    
    `I asked 50+ successful ${nicheData.niche} professionals what they wish they knew when starting out.\n\nHere's what they said:`
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomYouTubeTitle(nicheData) {
  const titles = [
    `The Ultimate Guide to ${nicheData.niche} for ${nicheData.audience} (Step-by-Step Tutorial)`,
    `How I Built a Successful ${nicheData.niche} Business from Scratch | My Story`,
    `${nicheData.niche} Secrets: What the Experts Don't Tell You`,
    `${nicheData.niche} in 2023: What's Working Now and What's Not`,
    `${nicheData.audience}'s Guide to Mastering ${nicheData.niche} in Just 30 Days`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomYouTubeCaption(nicheData) {
  const captions = [
    `In this comprehensive guide to ${nicheData.niche}, I'm breaking down the exact strategies that have helped me and my clients achieve remarkable results. If you're part of the ${nicheData.audience} community, you'll find actionable tips you can implement today.\n\n🔹 TIMESTAMPS:\n00:00 Introduction\n02:14 Common mistakes to avoid\n08:37 Strategy #1\n15:22 Strategy #2\n23:45 Implementation plan\n31:18 Case study results\n\nFree Resources Mentioned in this Video:\n🔗 ${nicheData.niche} Starter Guide: [LINK]\n🔗 Strategy Template: [LINK]\n\nLet me know in the comments which strategy you're going to try first!`,
    
    `After years of working in the ${nicheData.niche} industry and helping hundreds of ${nicheData.audience}, I've identified the key differences between those who succeed and those who struggle. In this video, I share the exact framework that's bringing results in today's environment.\n\nIf you find this valuable, please give it a thumbs up and subscribe for weekly ${nicheData.niche} content designed specifically for ${nicheData.audience}!\n\n#${nicheData.niche.replace(/\s+/g, '')} #${nicheData.audience.replace(/\s+/g, '')} #Tutorial`,
    
    `Everything changed when I discovered these ${nicheData.niche} techniques. As someone who's worked directly with ${nicheData.audience} for over 5 years, I've tested dozens of approaches, and these are the strategies that consistently deliver results.\n\n📌 Download my free ${nicheData.niche} checklist: [LINK]\n\nQuestion of the day: What's your biggest challenge with ${nicheData.niche} right now? Let me know in the comments!`
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomLinkedInTitle(nicheData) {
  const titles = [
    `The Future of ${nicheData.niche}: Trends to Watch`,
    `How I Helped ${nicheData.audience} Achieve a 300% ROI`,
    `The ${nicheData.niche} Framework That Transformed Our Business`,
    `5 Lessons From Leading ${nicheData.niche} Initiatives`,
    `What ${nicheData.audience} Need to Know About ${nicheData.niche} in 2023`
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomLinkedInCaption(nicheData) {
  const captions = [
    `After leading ${nicheData.niche} initiatives for over 5 years and working directly with ${nicheData.audience}, I've noticed a concerning trend:\n\n73% of businesses are focusing on metrics that don't drive meaningful results.\n\nHere's what actually moves the needle:\n\n1. Customer-centric strategies that address specific pain points\n2. Data-driven decision making (not just collecting data, but acting on it)\n3. Cross-functional collaboration between teams\n4. Consistent execution with regular optimization\n5. Long-term thinking over quick wins\n\nThe organizations that embrace these principles are seeing 3-5x better results than their competitors.\n\nWhat's one principle you'd add to this list?\n\n#${nicheData.niche.replace(/\s+/g, '')} #BusinessStrategy #Leadership`,
    
    `I just wrapped up a 6-month ${nicheData.niche} project with a client in the ${nicheData.audience} space.\n\nThe results?\n• 42% increase in qualified leads\n• 67% improvement in conversion rates\n• 3.2x ROI on total investment\n\nThe key insight: Success wasn't about the latest trends or tools. It came down to these fundamentals:\n\n1️⃣ Deeply understanding customer pain points\n2️⃣ Creating clear, consistent messaging\n3️⃣ Building systems for measurement and optimization\n4️⃣ Focusing on long-term relationships, not transactions\n\nSometimes the biggest breakthroughs come from mastering the basics.\n\nAgreed?`,
    
    `A client recently asked me, "What's the biggest mistake you see companies making with ${nicheData.niche}?"\n\nMy answer surprised them.\n\nIt's not poor strategy. It's not lack of innovation. It's not even insufficient budget.\n\nIt's inconsistency.\n\nMost organizations change direction too frequently, never giving their ${nicheData.niche} initiatives enough time to gain traction.\n\nThey implement a new approach, don't see immediate results, then pivot to something else entirely.\n\nThe most successful ${nicheData.audience} I've worked with do the opposite:\n\n• They develop a sound strategy based on customer insights\n• They commit to that strategy for a meaningful period\n• They make incremental improvements based on data\n• They resist shiny object syndrome\n\nConsistency may not be exciting, but it's effective.\n\nThoughts?`
  ];
  return captions[Math.floor(Math.random() * captions.length)];
}

function getRandomHashtags(nicheData, platform) {
  let niche = nicheData.niche.replace(/\s+/g, '');
  let audience = nicheData.audience.replace(/\s+/g, '');
  
  const commonHashtags = [
    `#${niche}`,
    `#${niche}Tips`,
    `#${audience}`,
    `#${niche}Advice`,
    `#${niche}Strategy`,
    `#${niche}Growth`,
    `#${niche}Success`,
    `#${audience}Problems`,
    `#${niche}Expert`,
    `#${niche}Secrets`
  ];
  
  const platformSpecific = {
    instagram: ['#InstagramTips', '#IGCommunity', '#InstagramStrategy', '#InstagramGrowth', '#IGExpert'],
    tiktok: ['#TikTokTips', '#FYP', '#ForYouPage', '#TikTokStrategy', '#TikTokGrowth', '#TikTokMarketing'],
    twitter: ['#TwitterTips', '#TwitterStrategy', '#TwitterGrowth', '#TwitterMarketing', '#TweetSmarter']
  };
  
  let hashtags = [...commonHashtags];
  
  if (platformSpecific[platform]) {
    hashtags = [...hashtags, ...platformSpecific[platform]];
  }
  
  // Shuffle and take random number of hashtags between 5-10
  const shuffled = hashtags.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 6) + 5; // Random between 5-10
  
  return shuffled.slice(0, count).join(' ');
}