ALTER TABLE "transactions" ADD COLUMN "amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "xyz";