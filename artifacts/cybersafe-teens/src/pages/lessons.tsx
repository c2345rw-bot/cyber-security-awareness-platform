import { useGetLessons, useGetUserProgress } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { BookOpen, Clock, Zap, CheckCircle2, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const TOTAL_LESSONS = 6;

export default function Lessons() {
  const { t, language } = useLanguage();
  const { username } = useAuth();
  const { data: lessons, isLoading } = useGetLessons();
  const { data: progress } = useGetUserProgress(
    { username: username || "" },
    { query: { enabled: !!username } }
  );

  const completedIds: number[] = progress?.completedLessons ?? [];
  const completedCount = completedIds.length;
  const progressPct = Math.round((completedCount / TOTAL_LESSONS) * 100);

  const getLocalizedField = (obj: any, field: string) => {
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key];
  };

  const levels = [1, 2, 3];
  const levelNames: Record<number, { en: string; uz: string; ru: string }> = {
    1: { en: "Level 1 — Foundations", uz: "1-daraja — Asoslar", ru: "Уровень 1 — Основы" },
    2: { en: "Level 2 — Common Attacks", uz: "2-daraja — Keng tarqalgan hujumlar", ru: "Уровень 2 — Распространённые атаки" },
    3: { en: "Level 3 — Advanced Defence", uz: "3-daraja — Ilg'or himoya", ru: "Уровень 3 — Продвинутая защита" },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("lessons_title")}</h1>
          <p className="text-muted-foreground mt-2">{t("home_hero_subtitle")}</p>
        </div>
        {username && (
          <div className="bg-card border border-border rounded-xl p-4 min-w-[180px]">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{t("lessons_progress_label")}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-black text-primary">{completedCount}</span>
              <span className="text-muted-foreground font-medium">/ {TOTAL_LESSONS}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{progressPct}% {t("completed_label")}</p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : lessons?.length ? (
        <div className="space-y-10">
          {levels.map(level => {
            const levelLessons = lessons.filter(l => l.level === level);
            if (!levelLessons.length) return null;
            const levelComplete = levelLessons.filter(l => completedIds.includes(l.id)).length;
            const levelName = levelNames[level][language] ?? levelNames[level].en;
            return (
              <div key={level} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">{levelName}</h2>
                  {username && (
                    <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {levelComplete}/{levelLessons.length} {t("completed_label")}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {levelLessons.map((lesson) => {
                    const isCompleted = completedIds.includes(lesson.id);
                    return (
                      <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                        <Card className={`transition-all cursor-pointer group ${isCompleted ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10' : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'}`}>
                          <CardContent className="p-5 flex gap-5 items-center">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                              {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">
                                  {getLocalizedField(lesson, "title")}
                                </h3>
                                {isCompleted && (
                                  <span className="shrink-0 text-xs font-bold text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                                    ✓ Done
                                  </span>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
                                {getLocalizedField(lesson, "description")}
                              </p>
                              <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1 text-secondary">
                                  <Zap className="w-3.5 h-3.5" />
                                  {lesson.xpReward} {t("xp")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {lesson.estimatedMinutes} {t("mins")}
                                </span>
                                {progress?.quizScores?.[lesson.id] !== undefined && (
                                  <span className="text-green-500 font-bold">
                                    Quiz: {progress.quizScores[lesson.id]}/3
                                  </span>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Lock className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>{t("empty_state")}</p>
        </div>
      )}
    </div>
  );
}
