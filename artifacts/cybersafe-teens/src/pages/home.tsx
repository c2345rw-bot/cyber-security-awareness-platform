import { useGetPlatformStats } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ShieldAlert, ShieldCheck, Users, BookOpen, AlertTriangle, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useGetPlatformStats();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-6 py-12 md:py-24">
        <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
          {t("home_hero_title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("home_hero_subtitle")}
        </p>
        <div className="pt-8">
          <Link 
            href="/lessons" 
            className="inline-flex items-center justify-center rounded-lg text-lg font-bold bg-primary text-primary-foreground h-14 px-8 shadow-lg hover:bg-primary/90 transition-colors"
            data-testid="btn-start-learning"
          >
            {t("start_learning")}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading || !stats ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="bg-card/50">
              <CardContent className="p-6">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-black">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{t("stats_users")}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className="w-8 h-8 text-secondary mb-4" />
                <div className="text-3xl font-black">{stats.totalLessonsCompleted}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{t("stats_lessons")}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <AlertTriangle className="w-8 h-8 text-destructive mb-4" />
                <div className="text-3xl font-black">{stats.totalScamsReported}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{t("stats_scams")}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                <div className="text-3xl font-black">{stats.totalQuizzesTaken}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{t("stats_quizzes")}</div>
              </CardContent>
            </Card>
          </>
        )}
      </section>
      
      {/* Risk Overview */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-8 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-destructive mb-4" />
            <h3 className="text-2xl font-bold mb-4">Real Threats. Real Defense.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Cyber attacks aren't just for corporations. Teenagers in Central Asia are targeted daily by Telegram scams, fake job offers, and cracked apps containing malware. CyberSafe Teens teaches you how to recognize and avoid these specific threats using real-world examples.
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-primary">What You'll Learn</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">1</div>
                <span className="font-medium text-foreground">Spotting Phishing & Scams</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">2</div>
                <span className="font-medium text-foreground">Creating Uncrackable Passwords</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">3</div>
                <span className="font-medium text-foreground">Securing Social Media Accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">4</div>
                <span className="font-medium text-foreground">Safe Downloading Practices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
