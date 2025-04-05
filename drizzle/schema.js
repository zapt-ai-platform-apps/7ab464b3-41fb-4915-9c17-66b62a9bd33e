import { pgTable, uuid, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  subscriptionStatus: text('subscription_status').default('free'),
  subscriptionExpires: timestamp('subscription_expires')
});

export const contentIdeas = pgTable('content_ideas', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  platform: text('platform').notNull(),
  niche: text('niche').notNull(),
  title: text('title').notNull(),
  caption: text('caption'),
  hashtags: text('hashtags'),
  createdAt: timestamp('created_at').defaultNow(),
  scheduledFor: timestamp('scheduled_for')
});

export const userNiches = pgTable('user_niches', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  niche: text('niche').notNull(),
  audience: text('audience').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  status: text('status').notNull(),
  priceId: text('price_id'),
  startedAt: timestamp('started_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow()
});