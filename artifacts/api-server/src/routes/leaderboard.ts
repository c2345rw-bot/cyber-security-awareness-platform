import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/leaderboard", async (req, res) => {
  const limit = parseInt((req.query.limit as string) ?? "10") || 10;

  const users = await db
    .select()
    .from(userProgressTable)
    .orderBy(desc(userProgressTable.totalXp))
    .limit(limit);

  const entries = users.map((u, i) => ({
    rank: i + 1,
    username: u.username,
    totalXp: u.totalXp,
    completedLessons: ((u.completedLessons as number[]) ?? []).length,
    badges: (u.badges as string[]) ?? [],
    currentStreak: u.currentStreak,
  }));

  res.json(entries);
});

export default router;
