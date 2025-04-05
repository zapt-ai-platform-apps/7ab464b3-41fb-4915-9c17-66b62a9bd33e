import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { userNiches } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: /api/niches endpoint called with method:', req.method);
  
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // GET: Retrieve user's saved niches
    if (req.method === 'GET') {
      console.log('Fetching niches for user:', user.id);
      const niches = await db.select()
        .from(userNiches)
        .where(eq(userNiches.userId, user.id));
      
      console.log(`Found ${niches.length} niches`);
      return res.status(200).json({ niches });
    }
    
    // POST: Save a new niche
    if (req.method === 'POST') {
      const { niche, audience } = req.body;
      
      if (!niche || !audience) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      console.log('Creating new niche:', { niche, audience });
      const [newNiche] = await db.insert(userNiches)
        .values({
          userId: user.id,
          niche,
          audience
        })
        .returning();
      
      console.log('Created new niche with ID:', newNiche.id);
      return res.status(201).json({ niche: newNiche });
    }
    
    // DELETE: Remove a niche
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Missing niche ID' });
      }
      
      console.log('Deleting niche with ID:', id);
      await db.delete(userNiches)
        .where(eq(userNiches.id, parseInt(id)))
        .where(eq(userNiches.userId, user.id));
      
      console.log('Successfully deleted niche');
      return res.status(200).json({ success: true });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in niches API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}