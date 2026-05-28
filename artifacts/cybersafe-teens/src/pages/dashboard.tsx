import { useState } from "react";
import { useGetUserProgress, useGetLessons } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Zap, Flame, Award, BookOpen, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { username, setUsername, logout } = useAuth();
  const [inputName, setInputName] = useState("");

  const { data: progress, isLoading: progressLoading } = useGetUserProgress(
    { username: username || '' }, 
    { query: { enabled: !!username } }
  );
  
  const { data: lessons } = useGetLessons();

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return '';
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || '';
  };

  if (!username) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-card border border-border rounded-2xl shadow-sm space-y-6 text-center">
        <LayoutDashboard className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">{t("enter_username")}</h2>
        <form 
          onSubmit={(e) => { e.preventDefault(); if (inputName) setUsername(inputName); }}
          className="space-y-4"
        >
          <Input 
            placeholder={t("username")} 
            value={inputName} 
            onChange={(e) => setInputName(e.target.value)} 
            className="h-12 text-lg text-center"
          />
          <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold" disabled={!inputName}>
            {t("save")}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            {t("progress_title")}
          </h1>
          <p className="text-muted-foreground mt-2 font-mono">@{username}</p>
        </div>
        <Button variant="ghost" onClick={logout} className="text-muted-foreground">
          <LogOut className="w-4 h-4 mr-2" />
          {t("logout")}
        </Button>
      </div>

      {progressLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : progress ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Zap className="w-8 h-8 text-secondary mb-2" />
              <div className="text-3xl font-black text-foreground">{progress.totalXp}</div>
              <div className="text-sm font-bold text-secondary uppercase mt-1">{t("total_xp")}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Flame className="w-8 h-8 text-orange-500 mb-2" />
              <div className="text-3xl font-black text-foreground">{progress.currentStreak}</div>
              <div className="text-sm font-bold text-orange-500 uppercase mt-1">{t("streak")}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Award className="w-8 h-8 text-primary mb-2" />
              <div className="text-3xl font-black text-foreground">{progress.badges.length}</div>
              <div className="text-sm font-bold text-primary uppercase mt-1">{t("badges")}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-8 h-8 text-green-500 mb-2" />
              <div className="text-3xl font-black text-foreground">{progress.completedLessons.length}</div>
              <div className="text-sm font-bold text-green-500 uppercase mt-1">{t("completed_lessons")}</div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("completed_lessons")}</h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {lessons && progress?.completedLessons.length ? (
              lessons.filter(l => progress.completedLessons.includes(l.id)).map(lesson => (
                <div key={lesson.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{getLocalizedField(lesson, 'title')}</span>
                  </div>
                  {progress.quizScores[lesson.id] !== undefined && (
                    <span className="text-sm font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                      Score: {progress.quizScores[lesson.id]}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="mb-4">No lessons completed yet.</p>
                <Link href="/lessons">
                  <Button variant="outline">{t("start_learning")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">{t("badges")}</h3>
          <div className="bg-card border border-border rounded-2xl p-6">
            {progress?.badges && progress.badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {progress.badges.map(badge => (
                  <div key={badge} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-sm flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    {badge}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Award className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Complete lessons and quizzes to earn badges!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
