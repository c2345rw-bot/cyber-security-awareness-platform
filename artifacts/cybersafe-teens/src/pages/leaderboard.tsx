import { useGetLeaderboard } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { Trophy, Flame, Award, Zap, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const { t } = useLanguage();
  const { data: entries, isLoading } = useGetLeaderboard();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">{t("leaderboard_title")}</h1>
        <p className="text-muted-foreground">{t("leaderboard_subtitle")}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted border-b border-border text-sm font-bold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">{t("rank")}</div>
          <div className="col-span-6 md:col-span-5">{t("user_label")}</div>
          <div className="col-span-4 md:col-span-2 text-right">{t("total_xp")}</div>
          <div className="hidden md:block col-span-2 text-center">{t("streak")}</div>
          <div className="hidden md:block col-span-2 text-center">{t("completed_lessons")}</div>
        </div>

        <div className="divide-y divide-border">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : entries?.length ? (
            entries.map((entry) => (
              <div key={entry.username} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {entry.rank === 1 ? (
                    <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">1</span>
                  ) : entry.rank === 2 ? (
                    <span className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center font-bold">2</span>
                  ) : entry.rank === 3 ? (
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">3</span>
                  ) : (
                    <span className="font-bold text-muted-foreground">{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-6 md:col-span-5 font-bold text-foreground truncate">
                  @{entry.username}
                  {entry.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {entry.badges.slice(0, 3).map(b => (
                        <span key={b} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded" title={b}>{b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-4 md:col-span-2 text-right font-black text-secondary flex justify-end items-center gap-1">
                  {entry.totalXp} <Zap className="w-3 h-3" />
                </div>
                <div className="hidden md:flex col-span-2 justify-center items-center gap-1 font-medium text-orange-500">
                  {entry.currentStreak > 0 ? <><Flame className="w-4 h-4" /> {entry.currentStreak}</> : <span className="text-muted-foreground">—</span>}
                </div>
                <div className="hidden md:flex col-span-2 justify-center items-center gap-1 font-medium text-muted-foreground">
                  <Award className="w-4 h-4" /> {entry.completedLessons}
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4 px-8">
              <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto" />
              <p className="text-lg font-semibold text-foreground">{t("leaderboard_empty_title")}</p>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{t("leaderboard_empty_desc")}</p>
              <Link href="/lessons">
                <Button className="mt-2 font-bold" size="lg">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t("start_learning")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {entries && entries.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">{t("leaderboard_real_data_note")}</p>
      )}
    </div>
  );
}
