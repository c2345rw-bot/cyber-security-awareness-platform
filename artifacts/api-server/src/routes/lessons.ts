import { Router } from "express";
import { db } from "@workspace/db";
import { lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/lessons", async (req, res) => {
  const lessons = await db
    .select({
      id: lessonsTable.id,
      slug: lessonsTable.slug,
      level: lessonsTable.level,
      titleEn: lessonsTable.titleEn,
      titleUz: lessonsTable.titleUz,
      titleRu: lessonsTable.titleRu,
      descriptionEn: lessonsTable.descriptionEn,
      descriptionUz: lessonsTable.descriptionUz,
      descriptionRu: lessonsTable.descriptionRu,
      xpReward: lessonsTable.xpReward,
      estimatedMinutes: lessonsTable.estimatedMinutes,
      icon: lessonsTable.icon,
    })
    .from(lessonsTable)
    .orderBy(lessonsTable.level, lessonsTable.id);
  res.json(lessons);
});

router.get("/lessons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid lesson id" });
    return;
  }
  const [lesson] = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.id, id));
  if (!lesson) {
    res.status(404).json({ error: "Lesson not found" });
    return;
  }
  res.json(lesson);
});

export default router;
