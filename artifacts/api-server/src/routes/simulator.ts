import { Router } from "express";
import { db } from "@workspace/db";
import { simulatorScenariosTable, userProgressTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubmitSimulatorAnswerBody } from "@workspace/api-zod";

const router = Router();

router.get("/simulator/scenarios", async (_req, res) => {
  const scenarios = await db.select().from(simulatorScenariosTable);
  res.json(scenarios);
});

router.post("/simulator/answer", async (req, res) => {
  const parsed = SubmitSimulatorAnswerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { scenarioId, username, answeredScam } = parsed.data;

  const [scenario] = await db
    .select()
    .from(simulatorScenariosTable)
    .where(eq(simulatorScenariosTable.id, scenarioId));

  if (!scenario) {
    res.status(404).json({ error: "Scenario not found" });
    return;
  }

  const correct = answeredScam === scenario.isScam;
  const xpEarned = correct ? 10 : 0;

  // Award XP for correct answer
  if (username && correct) {
    const [existing] = await db
      .select()
      .from(userProgressTable)
      .where(eq(userProgressTable.username, username));
    if (existing) {
      await db
        .update(userProgressTable)
        .set({ totalXp: existing.totalXp + xpEarned })
        .where(eq(userProgressTable.username, username));
    }
  }

  res.json({
    correct,
    isScam: scenario.isScam,
    explanationEn: scenario.explanationEn,
    explanationUz: scenario.explanationUz,
    explanationRu: scenario.explanationRu,
    warningSignsEn: scenario.warningSignsEn,
    warningSignsUz: scenario.warningSignsUz,
    warningSignsRu: scenario.warningSignsRu,
    xpEarned,
  });
});

export default router;
