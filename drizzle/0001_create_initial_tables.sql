CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY,
  "email" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "subscription_status" TEXT DEFAULT 'free',
  "subscription_expires" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "content_ideas" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "platform" TEXT NOT NULL,
  "niche" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "caption" TEXT,
  "hashtags" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "scheduled_for" TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_niches" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "niche" TEXT NOT NULL,
  "audience" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "stripe_customer_id" TEXT,
  "stripe_subscription_id" TEXT,
  "status" TEXT NOT NULL,
  "price_id" TEXT,
  "started_at" TIMESTAMP DEFAULT NOW(),
  "expires_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);