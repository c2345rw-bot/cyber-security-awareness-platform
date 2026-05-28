import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  level: integer("level").notNull(),
  titleEn: text("title_en").notNull(),
  titleUz: text("title_uz").notNull(),
  titleRu: text("title_ru").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionUz: text("description_uz").notNull(),
  descriptionRu: text("description_ru").notNull(),
  contentEn: text("content_en").notNull(),
  contentUz: text("content_uz").notNull(),
  contentRu: text("content_ru").notNull(),
  realExampleEn: text("real_example_en").notNull(),
  realExampleUz: text("real_example_uz").notNull(),
  realExampleRu: text("real_example_ru").notNull(),
  actionStepsEn: text("action_steps_en").notNull(),
  actionStepsUz: text("action_steps_uz").notNull(),
  actionStepsRu: text("action_steps_ru").notNull(),
  xpReward: integer("xp_reward").notNull().default(50),
  estimatedMinutes: integer("estimated_minutes").notNull().default(10),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLessonSchema = createInsertSchema(lessonsTable).omit({ id: true, createdAt: true });
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;
