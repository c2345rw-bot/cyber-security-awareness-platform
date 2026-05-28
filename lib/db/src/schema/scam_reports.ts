import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const scamReportsTable = pgTable("scam_reports", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  category: text("category").notNull(),
  platform: text("platform").notNull(),
  reporterName: text("reporter_name"),
  upvotes: integer("upvotes").notNull().default(0),
  warningEn: text("warning_en"),
  warningUz: text("warning_uz"),
  warningRu: text("warning_ru"),
  reportedAt: timestamp("reported_at").defaultNow().notNull(),
});

export const insertScamReportSchema = createInsertSchema(scamReportsTable).omit({ id: true, upvotes: true, reportedAt: true });
export type InsertScamReport = z.infer<typeof insertScamReportSchema>;
export type ScamReport = typeof scamReportsTable.$inferSelect;
