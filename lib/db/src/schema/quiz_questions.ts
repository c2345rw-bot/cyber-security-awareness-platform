import { pgTable, serial, integer, text, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const quizQuestionsTable = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  questionEn: text("question_en").notNull(),
  questionUz: text("question_uz").notNull(),
  questionRu: text("question_ru").notNull(),
  options: jsonb("options").notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanationEn: text("explanation_en").notNull(),
  explanationUz: text("explanation_uz").notNull(),
  explanationRu: text("explanation_ru").notNull(),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestionsTable).omit({ id: true });
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quizQuestionsTable.$inferSelect;
