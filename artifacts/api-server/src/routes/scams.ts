import { Router } from "express";
import { db } from "@workspace/db";
import { scamReportsTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { SubmitScamReportBody } from "@workspace/api-zod";

const router = Router();

const SCAM_WARNINGS: Record<string, { en: string; uz: string; ru: string }> = {
  telegram: {
    en: "Telegram scams often impersonate official channels or offer prizes. Never click unknown links.",
    uz: "Telegram firibgarlari ko'pincha rasmiy kanallarni taqlid qiladi yoki mukofotlar taklif etadi. Noma'lum havolalarni hech qachon bosmang.",
    ru: "Мошенники в Telegram часто подражают официальным каналам или предлагают призы. Никогда не нажимайте на неизвестные ссылки.",
  },
  instagram: {
    en: "Instagram phishing often mimics verification requests or influencer giveaways.",
    uz: "Instagram fishing ko'pincha tekshirish so'rovlari yoki influencer sovg'alarini taqlid qiladi.",
    ru: "Фишинг в Instagram часто имитирует запросы верификации или розыгрыши инфлюенсеров.",
  },
  email: {
    en: "Phishing emails often look like they are from official organizations. Check the sender address carefully.",
    uz: "Fishing elektron xatlari ko'pincha rasmiy tashkilotlardan kelgandek ko'rinadi. Yuboruvchi manzilini diqqat bilan tekshiring.",
    ru: "Фишинговые письма часто выглядят как письма от официальных организаций. Внимательно проверяйте адрес отправителя.",
  },
  job: {
    en: "Fake job offers promise high pay for little work. Legitimate employers never ask for upfront payments.",
    uz: "Soxta ish takliflari oz mehnat evaziga yuqori ish haqini va'da qiladi. Qonuniy ish beruvchilar hech qachon avans to'lovini talab qilmaydi.",
    ru: "Фиктивные предложения о работе обещают высокую зарплату за минимальные усилия. Законные работодатели никогда не просят предоплату.",
  },
  other: {
    en: "Be cautious with any unsolicited message asking for personal data or money.",
    uz: "Shaxsiy ma'lumot yoki pul so'ragan istalgan so'ralmagаn xabarga ehtiyot bo'ling.",
    ru: "Будьте осторожны с любыми нежелательными сообщениями, запрашивающими личные данные или деньги.",
  },
};

router.get("/scams", async (req, res) => {
  const category = req.query.category as string | undefined;
  const limit = parseInt((req.query.limit as string) ?? "20") || 20;

  const query = db.select().from(scamReportsTable).orderBy(desc(scamReportsTable.reportedAt)).limit(limit);
  const reports = category
    ? await db.select().from(scamReportsTable).where(eq(scamReportsTable.category, category)).orderBy(desc(scamReportsTable.reportedAt)).limit(limit)
    : await query;

  res.json(reports.map((r) => ({
    ...r,
    reportedAt: r.reportedAt.toISOString(),
  })));
});

router.post("/scams", async (req, res) => {
  const parsed = SubmitScamReportBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const { message, category, platform, reporterName } = parsed.data;

  const warnings = SCAM_WARNINGS[platform.toLowerCase()] ?? SCAM_WARNINGS["other"];
  const [report] = await db
    .insert(scamReportsTable)
    .values({
      message,
      category,
      platform,
      reporterName: reporterName ?? null,
      warningEn: warnings.en,
      warningUz: warnings.uz,
      warningRu: warnings.ru,
    })
    .returning();

  res.status(201).json({
    ...report,
    reportedAt: report.reportedAt.toISOString(),
  });
});

router.get("/scams/stats", async (_req, res) => {
  const stats = await db
    .select({
      category: scamReportsTable.category,
      count: sql<number>`count(*)::int`,
    })
    .from(scamReportsTable)
    .groupBy(scamReportsTable.category)
    .orderBy(desc(sql`count(*)`));
  res.json(stats);
});

export default router;
