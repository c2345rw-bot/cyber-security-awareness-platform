import { useGetLeaderboard } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { Trophy, Flame, Award, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted border-b border-border text-sm font-bold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">{t("rank")}</div>
          <div className="col-span-6 md:col-span-5">User</div>
          <div className="col-span-4 md:col-span-2 text-right">{t("total_xp")}</div>
          <div className="hidden md:block col-span-2 text-center">{t("streak")}</div>
          <div className="hidden md:block col-span-2 text-center">{t("completed_lessons")}</div>
        </div>

        <div className="divide-y divide-border">
          {isLoading ? (
             Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-8 w-full" />
              </div>
             ))
          ) : entries?.length ? (
            entries.map((entry) => (
              <div key={entry.username} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  {entry.rank === 1 ? <span className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">1</span> :
                   entry.rank === 2 ? <span className="w-8 h-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-bold">2</span> :
                   entry.rank === 3 ? <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">3</span> :
                   <span className="font-bold text-muted-foreground">{entry.rank}</span>}
                </div>
                <div className="col-span-6 md:col-span-5 font-bold text-foreground truncate">
                  @{entry.username}
                  {entry.badges.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {entry.badges.slice(0,3).map(b => (
                         <span key={b} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded" title={b}>{b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-4 md:col-span-2 text-right font-black text-secondary flex justify-end items-center gap-1">
                  {entry.totalXp} <Zap className="w-3 h-3" />
                </div>
                <div className="hidden md:flex col-span-2 justify-center items-center gap-1 font-medium text-orange-500">
                  {entry.currentStreak > 0 ? <><Flame className="w-4 h-4" /> {entry.currentStreak}</> : '-'}
                </div>
                <div className="hidden md:flex col-span-2 justify-center items-center gap-1 font-medium text-muted-foreground">
                  <Award className="w-4 h-4" /> {entry.completedLessons}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {t("empty_state")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
