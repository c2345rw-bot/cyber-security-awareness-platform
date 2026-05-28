import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ShieldAlert, ShieldCheck, BookOpen, Globe, Shield, MessageSquare, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { t } = useLanguage();

  const platformContent = [
    { icon: BookOpen, value: "6", label: t("stat_lessons_available"), color: "text-secondary" },
    { icon: ShieldAlert, value: "6", label: t("stat_simulator_scenarios"), color: "text-destructive" },
    { icon: Globe, value: "3", label: t("stat_languages"), color: "text-primary" },
    { icon: ShieldCheck, value: "15", label: t("stat_quiz_questions"), color: "text-green-500" },
  ];

  const threats = [
    { icon: MessageSquare, title: t("threat_telegram_title"), desc: t("threat_telegram_desc") },
    { icon: ShieldAlert, title: t("threat_phishing_title"), desc: t("threat_phishing_desc") },
    { icon: Key, title: t("threat_passwords_title"), desc: t("threat_passwords_desc") },
  ];

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

      {/* Platform content stats — always accurate, never engagement-inflated */}
      <section>
        <p className="text-xs text-muted-foreground text-center uppercase tracking-widest font-semibold mb-4">
          {t("stat_section_label")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformContent.map(({ icon: Icon, value, label, color }) => (
            <Card key={label} className="bg-card border-border">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Icon className={`w-8 h-8 mb-4 ${color}`} />
                <div className="text-3xl font-black">{value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-8 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-destructive mb-4" />
            <h3 className="text-2xl font-bold mb-4">{t("real_threats_title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("real_threats_desc")}</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-primary">{t("what_youll_learn")}</h3>
            <ul className="space-y-4">
              {["learn_item_1", "learn_item_2", "learn_item_3", "learn_item_4"].map((key, i) => (
                <li key={key} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="font-medium text-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Threat awareness cards */}
      <section className="py-4">
        <h3 className="text-2xl font-bold mb-6 text-center">{t("known_threats_title")}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {threats.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <Icon className="w-8 h-8 text-destructive" />
              <h4 className="font-bold text-lg">{title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
