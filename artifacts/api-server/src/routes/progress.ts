import { Router } from "express";
import { db } from "@workspace/db";
import { userProgressTable, lessonsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { MarkLessonCompleteBody } from "@workspace/api-zod";

const router = Router();

function computeBadges(completedCount: number, totalXp: number, streak: number): string[] {
  const badges: string[] = [];
  if (completedCount >= 1) badges.push("first_lesson");
  if (completedCount >= 3) badges.push("halfway");
  if (completedCount >= 6) badges.push("graduate");
  if (totalXp >= 100) badges.push("xp_100");
  if (totalXp >= 300) badges.push("xp_300");
  if (totalXp >= 500) badges.push("xp_500");
  if (streak >= 3) badges.push("streak_3");
  if (streak >= 7) badges.push("streak_7");
  return badges;
}

router.get("/progress", async (req, res) => {
  const username = req.query.username as string;
  if (!username) {
    res.status(400).json({ error: "username is required" });
    return;
  }

  let [progress] = await db
    .select()
    .from(userProgressTable)
    .where(eq(userProgressTable.username, username));

  if (!progress) {
    // Create new user
    [progress] = await db
      .insert(userProgressTable)
      .values({ username, completedLessons: [], totalXp: 0, currentStreak: 0, badges: [], quizScores: {} })
      .returning();
  }

  res.json({
    username: progress.username,
    completedLessons: (progress.completedLessons as number[]) ?? [],
    totalXp: progress.totalXp,
    currentStreak: progress.currentStreak,
    badges: (progress.badges as string[]) ?? [],
    quizScores: (progress.quizScores as Record<string, number>) ?? {},
  });
});

router.post("/progress/complete", async (req, res) => {
  const parsed = MarkLessonCompleteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { username, lessonId, quizScore } = parsed.data;

  // Get the lesson XP reward
  const [lesson] = await db.select().from(lessonsTable).where(eq(lessonsTable.id, lessonId));
  const xpReward = lesson?.xpReward ?? 50;

  let [progress] = await db
    .select()
    .from(userProgressTable)
    .where(eq(userProgressTable.username, username));

  if (!progress) {
    [progress] = await db
      .insert(userProgressTable)
      .values({ username, completedLessons: [], totalXp: 0, currentStreak: 0, badges: [], quizScores: {} })
      .returning();
  }

  const completed = (progress.completedLessons as number[]) ?? [];
  const alreadyDone = completed.includes(lessonId);
  const newCompleted = alreadyDone ? completed : [...completed, lessonId];

  // Streak logic
  const today = new Date().toISOString().split("T")[0];
  const lastDate = progress.lastActiveDate;
  let streak = progress.currentStreak;
  if (!lastDate || lastDate === today) {
    // same day or first time — no change to streak
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (lastDate === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  const newXp = alreadyDone ? progress.totalXp : progress.totalXp + xpReward;
  const quizScores = (progress.quizScores as Record<string, number>) ?? {};
  if (quizScore != null) {
    const key = String(lessonId);
    if (!quizScores[key] || quizScore > quizScores[key]) {
      quizScores[key] = quizScore;
    }
  }

  const badges = computeBadges(newCompleted.length, newXp, streak);

  const [updated] = await db
    .update(userProgressTable)
    .set({
      completedLessons: newCompleted,
      totalXp: newXp,
      currentStreak: streak,
      lastActiveDate: today,
      badges,
      quizScores,
    })
    .where(eq(userProgressTable.username, username))
    .returning();

  res.json({
    username: updated.username,
    completedLessons: (updated.completedLessons as number[]) ?? [],
    totalXp: updated.totalXp,
    currentStreak: updated.currentStreak,
    badges: (updated.badges as string[]) ?? [],
    quizScores: (updated.quizScores as Record<string, number>) ?? {},
  });
});

export default router;
