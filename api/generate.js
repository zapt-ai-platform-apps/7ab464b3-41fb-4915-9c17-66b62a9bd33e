import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log('API: /api/generate endpoint called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const user = await authenticateUser(req);
    const { platform, niche, audience, contentType } = req.body;
    
    if (!platform || !niche) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    console.log('Generating content for:', { platform, niche, audience, contentType });
    
    // Create the prompt for OpenAI
    const prompt = `Generate a social media content idea for ${platform}.
Niche: ${niche}
Target Audience: ${audience || 'General audience interested in this niche'}
Content Type: ${contentType || 'Post'}

Please provide:
1. An engaging title/headline
2. A compelling caption (2-3 paragraphs)
3. 5-7 relevant hashtags`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert social media content creator and marketer. Your job is to generate highly engaging, platform-appropriate content ideas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const response = completion.choices[0].message.content;
    console.log('Successfully generated content');
    
    // Parse the response (simple parsing assuming standard format)
    let title = '';
    let caption = '';
    let hashtags = '';
    
    // Extract title (first non-empty line)
    const lines = response.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      title = lines[0].replace(/^(title|headline):\s*/i, '');
    }
    
    // Extract caption (paragraphs after title, before hashtags)
    const captionLines = [];
    let captionStarted = false;
    let hashtagsStarted = false;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.toLowerCase().includes('hashtag') || line.startsWith('#')) {
        hashtagsStarted = true;
      }
      
      if (!hashtagsStarted && (captionStarted || !line.toLowerCase().includes('caption'))) {
        if (line.toLowerCase().includes('caption')) {
          captionStarted = true;
          continue;
        }
        captionLines.push(line);
        captionStarted = true;
      } else if (hashtagsStarted) {
        hashtags += (hashtags ? ' ' : '') + line.replace(/^hashtags:\s*/i, '');
      }
    }
    
    caption = captionLines.join('\n');
    
    return res.status(200).json({
      content: {
        title: title.trim(),
        caption: caption.trim(),
        hashtags: hashtags.trim()
      },
      rawResponse: response
    });
    
  } catch (error) {
    console.error('Error generating content:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}