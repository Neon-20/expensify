CREATE TABLE IF NOT EXISTS "figures" (
	"id" text PRIMARY KEY NOT NULL,
	"random_id" text,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "random_id" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "plaid_id";