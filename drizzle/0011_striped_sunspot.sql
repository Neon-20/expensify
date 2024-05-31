ALTER TABLE "transactions" ADD COLUMN "xyz" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "amount";