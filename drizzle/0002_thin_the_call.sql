ALTER TABLE "sessionChatTable" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ALTER COLUMN "sessionId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ALTER COLUMN "conversation" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ALTER COLUMN "report" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "createdOn" varchar(255);--> statement-breakpoint
ALTER TABLE "sessionChatTable" ADD COLUMN "selectedDoctor" jsonb;