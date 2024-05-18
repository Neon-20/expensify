ALTER TABLE "accounts" ADD COLUMN "plaid_Id" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "plaid_Id" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "sex_Id";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "bro_Id";