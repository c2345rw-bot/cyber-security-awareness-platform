import { useGetLessons } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { Shield, BookOpen, Clock, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Lessons() {
  const { t, language } = useLanguage();
  const { data: lessons, isLoading } = useGetLessons();

  const getLocalizedField = (obj: any, field: string) => {
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key];
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("lessons_title")}</h1>
        <p className="text-muted-foreground mt-2">{t("home_hero_subtitle")}</p>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="bg-card">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : lessons?.length ? (
          lessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <Card className="bg-card hover:bg-accent/5 transition-colors cursor-pointer border-border group">
                <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold px-2 py-1 bg-muted rounded text-muted-foreground uppercase tracking-wider">
                        {t("level")} {lesson.level}
                      </span>
                      <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {getLocalizedField(lesson, 'title')}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {getLocalizedField(lesson, 'description')}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-secondary">
                        <Zap className="w-4 h-4" />
                        {lesson.xpReward} {t("xp")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {lesson.estimatedMinutes} {t("mins")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {t("empty_state")}
          </div>
        )}
      </div>
    </div>
  );
}
