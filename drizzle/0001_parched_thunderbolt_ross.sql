CREATE TABLE "sessionChatTable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessionChatTable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sessionId" varchar(255),
	"notes" text,
	"conversation" json,
	"report" json,
	"createdBy" varchar(255)
);
--> statement-breakpoint
DROP TABLE "session_chat" CASCADE;