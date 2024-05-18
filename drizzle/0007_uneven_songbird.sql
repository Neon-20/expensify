DROP TABLE "categories";--> statement-breakpoint
DROP TABLE "fun";--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "sex_Id" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "plaid_Id";