import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, scamReportsTable, quizQuestionsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/stats/platform", async (_req, res) => {
  const [[usersResult], [scamsResult], [lessonsResult], [quizzesResult]] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(userProgressTable),
    db.select({ count: sql<number>`count(*)::int` }).from(scamReportsTable),
    db
      .select({ total: sql<number>`sum(jsonb_array_length(completed_lessons))::int` })
      .from(userProgressTable),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(quizQuestionsTable),
  ]);

  res.json({
    totalUsers: usersResult?.count ?? 0,
    totalLessonsCompleted: lessonsResult?.total ?? 0,
    totalScamsReported: scamsResult?.count ?? 0,
    totalQuizzesTaken: quizzesResult?.count ?? 0,
  });
});

export default router;
