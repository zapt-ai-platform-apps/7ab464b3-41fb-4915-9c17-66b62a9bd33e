import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { contentIdeas } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: /api/ideas endpoint called with method:', req.method);
  
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // GET: Retrieve user's saved content ideas
    if (req.method === 'GET') {
      console.log('Fetching content ideas for user:', user.id);
      const ideas = await db.select()
        .from(contentIdeas)
        .where(eq(contentIdeas.userId, user.id))
        .orderBy(contentIdeas.createdAt);
      
      console.log(`Found ${ideas.length} content ideas`);
      return res.status(200).json({ ideas });
    }
    
    // POST: Save a new content idea
    if (req.method === 'POST') {
      const { platform, niche, title, caption, hashtags, scheduledFor } = req.body;
      
      if (!platform || !niche || !title) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      console.log('Creating new content idea:', { platform, niche, title });
      const [newIdea] = await db.insert(contentIdeas)
        .values({
          userId: user.id,
          platform,
          niche,
          title,
          caption,
          hashtags,
          scheduledFor: scheduledFor || null
        })
        .returning();
      
      console.log('Created new content idea with ID:', newIdea.id);
      return res.status(201).json({ idea: newIdea });
    }
    
    // DELETE: Remove a content idea
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Missing idea ID' });
      }
      
      console.log('Deleting content idea with ID:', id);
      await db.delete(contentIdeas)
        .where(eq(contentIdeas.id, parseInt(id)))
        .where(eq(contentIdeas.userId, user.id));
      
      console.log('Successfully deleted content idea');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in ideas API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}