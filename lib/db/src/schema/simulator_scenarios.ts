import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const simulatorScenariosTable = pgTable("simulator_scenarios", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  platform: text("platform").notNull(),
  messageEn: text("message_en").notNull(),
  messageUz: text("message_uz").notNull(),
  messageRu: text("message_ru").notNull(),
  senderName: text("sender_name"),
  senderAvatar: text("sender_avatar"),
  isScam: boolean("is_scam").notNull(),
  warningSignsEn: text("warning_signs_en").notNull(),
  warningSignsUz: text("warning_signs_uz").notNull(),
  warningSignsRu: text("warning_signs_ru").notNull(),
  explanationEn: text("explanation_en").notNull(),
  explanationUz: text("explanation_uz").notNull(),
  explanationRu: text("explanation_ru").notNull(),
});

export const insertSimulatorScenarioSchema = createInsertSchema(simulatorScenariosTable).omit({ id: true });
export type InsertSimulatorScenario = z.infer<typeof insertSimulatorScenarioSchema>;
export type SimulatorScenario = typeof simulatorScenariosTable.$inferSelect;
