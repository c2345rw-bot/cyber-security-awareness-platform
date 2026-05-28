import { Router } from "express";
import { db } from "@workspace/db";
import { quizQuestionsTable, userProgressTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubmitQuizBody } from "@workspace/api-zod";

const router = Router();

/**
 * GET /quizzes/challenge
 * Returns up to 10 randomly ordered questions from all topics combined.
 * Must be registered BEFORE the :lessonId wildcard route.
 */
router.get("/quizzes/challenge", async (_req, res) => {
  const all = await db.select().from(quizQuestionsTable);
  const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10);
  res.json(shuffled);
});

router.get("/quizzes/:lessonId", async (req, res) => {
  const lessonId = parseInt(req.params.lessonId);
  if (isNaN(lessonId)) {
    res.status(400).json({ error: "Invalid lessonId" });
    return;
  }
  const questions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.lessonId, lessonId));
  res.json(questions);
});

router.post("/quizzes/submit", async (req, res) => {
  const parsed = SubmitQuizBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { username, lessonId, answers } = parsed.data;

  const questions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.lessonId, lessonId));

  if (questions.length === 0) {
    res.status(404).json({ error: "Quiz not found" });
    return;
  }

  let score = 0;
  const feedback = questions.map((q, i) => {
    const correct = answers[i] === q.correctIndex;
    if (correct) score++;
    return {
      questionId: q.id,
      correct,
      explanationEn: q.explanationEn,
      explanationUz: q.explanationUz,
      explanationRu: q.explanationRu,
    };
  });

  const total = questions.length;
  const passed = score >= Math.ceil(total * 0.6);
  const xpEarned = passed ? Math.round(20 + (score / total) * 30) : 0;

  if (username) {
    const [existing] = await db
      .select()
      .from(userProgressTable)
      .where(eq(userProgressTable.username, username));
    if (existing) {
      const currentScores = (existing.quizScores as Record<string, number>) ?? {};
      const prevScore = currentScores[lessonId] ?? 0;
      if (score > prevScore) {
        currentScores[lessonId] = score;
        const newXp = existing.totalXp + (passed && prevScore < score ? xpEarned : 0);
        await db
          .update(userProgressTable)
          .set({ quizScores: currentScores, totalXp: newXp })
          .where(eq(userProgressTable.username, username));
      }
    }
  }

  res.json({ score, total, passed, xpEarned, feedback });
});

export default router;
