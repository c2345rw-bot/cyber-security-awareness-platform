import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, scamReportsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

/**
 * GET /api/stats/platform
 *
 * Returns only real, database-backed statistics.
 * - totalUsers: count of distinct usernames who have tracked progress
 * - totalLessonsCompleted: sum of lessons completed across all real users
 * - totalScamsReported: count of community scam submissions
 * - totalQuizzesTaken: number of individual quiz completions across all real users
 *
 * All values start at 0. No numbers are seeded or inflated.
 */
router.get("/stats/platform", async (_req, res) => {
  const [[usersResult], [scamsResult], [lessonsResult], [quizzesResult]] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(userProgressTable),
    db.select({ count: sql<number>`count(*)::int` }).from(scamReportsTable),
    db
      .select({ total: sql<number>`coalesce(sum(jsonb_array_length(completed_lessons)), 0)::int` })
      .from(userProgressTable),
    db
      .select({
        total: sql<number>`coalesce(
          (SELECT sum((SELECT count(*) FROM jsonb_each(up.quiz_scores)))::int FROM user_progress up),
          0
        )::int`,
      })
      .from(userProgressTable),
  ]);

  res.json({
    totalUsers: usersResult?.count ?? 0,
    totalLessonsCompleted: lessonsResult?.total ?? 0,
    totalScamsReported: scamsResult?.count ?? 0,
    totalQuizzesTaken: quizzesResult?.total ?? 0,
  });
});

export default router;
