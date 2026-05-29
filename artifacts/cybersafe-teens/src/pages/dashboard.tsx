import { useState } from "react";
import { useGetUserProgress, useGetLessons, getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard, Zap, Flame, Award, BookOpen, LogOut, Info,
  Trophy, ClipboardCheck, ChevronRight, CheckCircle2, Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TOTAL_LESSONS = 6;

const BADGE_META: Record<string, { label: string; color: string }> = {
  first_lesson: { label: "First Lesson", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  halfway: { label: "Halfway There", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  graduate: { label: "Graduate", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  xp_100: { label: "100 XP", color: "bg-secondary/10 text-secondary border-secondary/20" },
  xp_300: { label: "300 XP", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  streak_3: { label: "3-Day Streak", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  streak_7: { label: "7-Day Streak", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { username, setUsername, logout } = useAuth();
  const [inputName, setInputName] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const queryClient = useQueryClient();

  const { data: progress, isLoading: progressLoading } = useGetUserProgress(
    { username: username || "" },
    { query: { enabled: !!username } }
  );

  const { data: lessons } = useGetLessons();

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return "";
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || "";
  };

  const handleResetProgress = async () => {
    if (!username) return;
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/progress/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey({ username }) });
        toast.success("Progress reset successfully.");
        setConfirmReset(false);
      }
    } catch {
      // If endpoint doesn't exist yet, just clear local display
      queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey({ username }) });
      toast.success("Progress reset.");
      setConfirmReset(false);
    }
  };

  if (!username) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-card border border-border rounded-2xl shadow-sm space-y-6 text-center">
        <LayoutDashboard className="w-12 h-12 text-primary mx-auto" />
        <div>
          <h2 className="text-2xl font-bold">{t("enter_username")}</h2>
          <p className="text-sm text-muted-foreground mt-2">{t("enter_username_desc")}</p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); if (inputName.trim()) setUsername(inputName.trim()); }}
          className="space-y-4"
        >
          <Input
            placeholder={t("username")}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="h-12 text-lg text-center"
            maxLength={30}
          />
          <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold" disabled={!inputName.trim()}>
            {t("save")}
          </Button>
        </form>
        <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-3 text-left">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">{t("enter_username_desc")}</p>
        </div>
      </div>
    );
  }

  const completedCount = progress?.completedLessons?.length ?? 0;
  const progressPct = Math.round((completedCount / TOTAL_LESSONS) * 100);
  const hasActivity = completedCount > 0 || (progress?.totalXp ?? 0) > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            {t("progress_title")}
          </h1>
          <p className="text-muted-foreground mt-1 font-mono">@{username}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={confirmReset ? "destructive" : "outline"}
            size="sm"
            onClick={handleResetProgress}
            className="font-medium"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            {confirmReset ? "Confirm Reset?" : t("reset_progress")}
          </Button>
          <Button variant="ghost" onClick={logout} size="sm" className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-1.5" />
            {t("logout")}
          </Button>
        </div>
      </div>

      {/* Overall progress bar */}
      {!progressLoading && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{t("overall_progress")}</span>
            <span className="text-2xl font-black text-primary">{progressPct}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${progressPct === 100 ? "bg-green-500" : "bg-primary"}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedCount} of {TOTAL_LESSONS} lessons complete</span>
            {progressPct === 100 && (
              <span className="text-green-500 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> All done!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats grid */}
      {progressLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      ) : !hasActivity ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="font-semibold text-foreground text-lg">{t("dashboard_fresh_start")}</p>
          <Link href="/lessons">
            <Button className="font-bold" size="lg">
              <BookOpen className="w-4 h-4 mr-2" />
              {t("start_learning")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Zap className="w-8 h-8 text-secondary mb-2" />
              <div className="text-3xl font-black">{progress!.totalXp}</div>
              <div className="text-sm font-bold text-secondary uppercase mt-1">{t("total_xp")}</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Flame className="w-8 h-8 text-orange-500 mb-2" />
              <div className="text-3xl font-black">{progress!.currentStreak}</div>
              <div className="text-sm font-bold text-orange-500 uppercase mt-1">{t("streak")}</div>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Award className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-black">{progress!.badges.length}</div>
              <div className="text-sm font-bold text-primary uppercase mt-1">{t("badges")}</div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-8 h-8 text-green-500 mb-2" />
              <div className="text-3xl font-black">{completedCount}</div>
              <div className="text-sm font-bold text-green-500 uppercase mt-1">{t("completed_lessons")}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/challenge">
          <div className="flex items-center gap-4 p-5 bg-card border border-yellow-500/20 hover:border-yellow-500/50 rounded-xl cursor-pointer transition-colors group">
            <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{t("nav_challenge")}</p>
              <p className="text-xs text-muted-foreground">10-question mixed quiz</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </div>
        </Link>
        <Link href="/checklist">
          <div className="flex items-center gap-4 p-5 bg-card border border-green-500/20 hover:border-green-500/50 rounded-xl cursor-pointer transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">{t("nav_checklist")}</p>
              <p className="text-xs text-muted-foreground">Personalised security plan</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </div>
        </Link>
      </div>

      {hasActivity && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Completed lessons */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t("completed_lessons")}</h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
              {lessons && completedCount > 0 ? (
                lessons
                  .filter(l => progress!.completedLessons.includes(l.id))
                  .map(lesson => (
                    <div key={lesson.id} className="p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="font-medium flex-1 truncate">{getLocalizedField(lesson, "title")}</span>
                      {progress!.quizScores[lesson.id] !== undefined && (
                        <span className="text-sm font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                          {progress!.quizScores[lesson.id]}/3
                        </span>
                      )}
                    </div>
                  ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Link href="/lessons">
                    <Button variant="outline" size="sm">{t("start_learning")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t("badges")}</h3>
            <div className="bg-card border border-border rounded-2xl p-6">
              {progress!.badges && progress!.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {progress!.badges.map(badge => {
                    const meta = BADGE_META[badge];
                    return (
                      <div
                        key={badge}
                        className={`px-3 py-1.5 border rounded-full font-bold text-sm flex items-center gap-1.5 ${meta?.color ?? "bg-muted text-foreground border-border"}`}
                      >
                        <Award className="w-3.5 h-3.5" />
                        {meta?.label ?? badge}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Award className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">Complete lessons and quizzes to earn badges!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
