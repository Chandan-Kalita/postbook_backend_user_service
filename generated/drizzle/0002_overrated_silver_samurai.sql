CREATE TABLE "following" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"following_id" uuid NOT NULL,
	"created_at" integer DEFAULT extract(epoch from now())
);
--> statement-breakpoint
ALTER TABLE "following" ADD CONSTRAINT "following_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "following" ADD CONSTRAINT "following_following_id_users_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;