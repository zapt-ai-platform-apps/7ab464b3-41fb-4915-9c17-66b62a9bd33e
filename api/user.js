import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('API: /api/user endpoint called with method:', req.method);
  
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // GET: Retrieve user profile
    if (req.method === 'GET') {
      console.log('Fetching user profile for:', user.id);
      
      // Check if user exists in our database
      let userProfile = await db.select()
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);
      
      // If user doesn't exist in our database yet, create them
      if (userProfile.length === 0) {
        console.log('Creating new user profile in database');
        [userProfile] = await db.insert(users)
          .values({
            id: user.id,
            email: user.email,
          })
          .returning();
      } else {
        userProfile = userProfile[0];
      }
      
      console.log('User profile retrieved');
      return res.status(200).json({ 
        user: {
          id: userProfile.id,
          email: userProfile.email,
          subscriptionStatus: userProfile.subscriptionStatus,
          subscriptionExpires: userProfile.subscriptionExpires
        }
      });
    }
    
    // PATCH: Update user profile
    if (req.method === 'PATCH') {
      // Only allow updating certain fields
      const { subscriptionStatus, subscriptionExpires } = req.body;
      const updateData = {};
      
      if (subscriptionStatus) {
        updateData.subscriptionStatus = subscriptionStatus;
      }
      
      if (subscriptionExpires) {
        updateData.subscriptionExpires = subscriptionExpires;
      }
      
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }
      
      console.log('Updating user profile:', updateData);
      const [updatedUser] = await db.update(users)
        .set(updateData)
        .where(eq(users.id, user.id))
        .returning();
      
      console.log('User profile updated');
      return res.status(200).json({ user: updatedUser });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in user API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}