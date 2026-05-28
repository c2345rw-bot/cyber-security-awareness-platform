import { useLanguage } from "@/lib/i18n";
import {
  Shield, Code2, Database, Globe, BookOpen, Zap, Users, Lock,
  AlertTriangle, CheckCircle2, ExternalLink, Server, Layers, GitBranch
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TECH_STACK = [
  { name: "React 18", icon: Code2, desc: "Component-based UI", color: "text-cyan-400" },
  { name: "TypeScript", icon: Code2, desc: "Type-safe throughout", color: "text-blue-400" },
  { name: "Vite", icon: Zap, desc: "Fast dev server & build", color: "text-yellow-400" },
  { name: "Tailwind CSS", icon: Layers, desc: "Utility-first styling", color: "text-teal-400" },
  { name: "Express 5", icon: Server, desc: "RESTful API backend", color: "text-green-400" },
  { name: "PostgreSQL", icon: Database, desc: "Relational database", color: "text-blue-500" },
  { name: "Drizzle ORM", icon: Database, desc: "Type-safe SQL queries", color: "text-green-500" },
  { name: "React Query", icon: Zap, desc: "Server state management", color: "text-red-400" },
  { name: "Zod", icon: CheckCircle2, desc: "Schema validation", color: "text-purple-400" },
  { name: "OpenAPI / Orval", icon: GitBranch, desc: "Contract-first codegen", color: "text-orange-400" },
  { name: "pnpm workspaces", icon: Layers, desc: "Monorepo structure", color: "text-yellow-500" },
  { name: "shadcn/ui", icon: Code2, desc: "Accessible UI components", color: "text-primary" },
];

const ARCHITECTURE = [
  {
    title: "Contract-First API",
    icon: GitBranch,
    color: "text-primary",
    desc: "All 15 API endpoints are defined in an OpenAPI YAML spec first. Orval then auto-generates fully-typed React Query hooks and Zod validators — eliminating entire categories of runtime bugs.",
  },
  {
    title: "Trilingual Database",
    icon: Globe,
    color: "text-secondary",
    desc: "Every lesson, quiz question, and scam example stores EN/UZ/RU content in separate columns. The frontend picks the right column at render time — no translation layer needed.",
  },
  {
    title: "Friction-Free Progress",
    icon: Users,
    color: "text-green-500",
    desc: "No accounts or passwords required. Users pick a username stored in localStorage. The backend auto-creates a progress record on first fetch. This removes the #1 barrier for teen adoption.",
  },
  {
    title: "Real Data Integrity",
    icon: CheckCircle2,
    color: "text-orange-500",
    desc: "No numbers are seeded or inflated. Stats, leaderboards, and dashboards show only what real users have actually done. Empty states are clearly labelled, not hidden behind fake metrics.",
  },
  {
    title: "Server-Side Analysis",
    icon: Lock,
    color: "text-destructive",
    desc: "Password strength analysis runs entirely on the Express backend. The API never logs or stores tested passwords. This keeps the logic centralized and auditable.",
  },
  {
    title: "Monorepo with Shared Types",
    icon: Layers,
    color: "text-purple-400",
    desc: "pnpm workspaces split the project into api-server, cybersafe-teens (frontend), db, api-spec, api-client-react, and api-zod packages. Breaking changes in one package surface as TypeScript errors in all dependents.",
  },
];

const FEATURES = [
  { icon: BookOpen, label: "6 structured lessons", sub: "Phishing, Passwords, Malware, Social Engineering, Safe Browsing, Privacy" },
  { icon: AlertTriangle, label: "Phishing Simulator", sub: "6 realistic scam scenarios — Telegram, Instagram, fake job, scholarship" },
  { icon: Lock, label: "Password Strength Checker", sub: "Live analysis with crack-time estimates in 3 languages" },
  { icon: Shield, label: "Community Scam Reports", sub: "Submit and browse real scam messages by category" },
  { icon: Zap, label: "Final Knowledge Challenge", sub: "10-question mixed quiz pulling from all 6 topics" },
  { icon: CheckCircle2, label: "Personalised Safety Checklist", sub: "Habit assessment generates a printable action plan" },
  { icon: Globe, label: "Full EN / UZ / RU support", sub: "Every UI element, lesson, quiz, and tip translated" },
  { icon: Users, label: "XP Leaderboard & Badges", sub: "Gamified progress visible to all learners" },
];

export default function About() {
  const { language } = useLanguage();

  const L = {
    title: { en: "About This Project", uz: "Loyiha haqida", ru: "О проекте" },
    subtitle: {
      en: "Why a cybersecurity platform for teenagers in Central Asia — and how it was built.",
      uz: "Nima uchun Markaziy Osiyodagi o'smirlar uchun kiberjaqoliqni himoyalash platformasi yaratildi — va u qanday qurildi.",
      ru: "Почему была создана платформа кибербезопасности для подростков Центральной Азии — и как она построена.",
    },
    problem_title: { en: "The Problem", uz: "Muammo", ru: "Проблема" },
    problem_body: {
      en: `Teenagers in Uzbekistan and Russian-speaking Central Asia are among the most digitally active age groups in the region — yet cybersecurity education that speaks to their specific context is almost entirely absent.

Regional scammers have adapted precisely to this gap. The most common attacks targeting teens here are not generic email phishing, but Telegram prize notifications in Uzbek or Russian, Instagram fake-verification DMs, fake job offers promising $500–$800/month for two hours of work, and cracked APKs of popular apps distributed via Telegram channels that bundle spyware.

Most global cybersecurity resources are in English, reference US/EU threat models, and assume banking and credit cards — not the Telegram-dominated, mobile-first digital life of a 15–22-year-old in Tashkent or Bishkek.`,
      uz: `O'zbekiston va rus tilida so'zlashuvchi Markaziy Osiyodagi o'smirlar mintaqaning eng faol raqamli yosh guruhlari orasida — ammo ularning o'ziga xos kontekstiga mos kiber xavfsizlik ta'limi deyarli mavjud emas.

Mintaqaviy firibgarlar aynan shu bo'shliqqa moslashgan. Bu yerda o'smirlarni nishon qiladigan eng keng tarqalgan hujumlar oddiy elektron pochta fishinggi emas, balki o'zbek yoki rus tilida Telegram orqali yuborilgan sovg'a xabarlari, Instagram soxta tasdiqlash xabarlari, oyiga $500–800 va'da qiluvchi soxta ish takliflari va Telegram kanallar orqali tarqatiladigan josuslik dasturlari o'z ichiga olgan buzilgan APK fayllar.

Ko'pgina global kiber xavfsizlik resurslari ingliz tilida bo'lib, AQSh/Yevropa tahdid modellariga asoslanadi va bank hamda kredit kartalarini nazarda tutadi — Toshkent yoki Bishkekdagi 15–22 yoshli yoshlarning Telegram asosidagi, mobil birinchi raqamli hayotini emas.`,
      ru: `Подростки Узбекистана и русскоязычной Центральной Азии входят в число наиболее цифрово активных возрастных групп региона — однако образование в области кибербезопасности, адресованное их конкретному контексту, практически отсутствует.

Региональные мошенники точно адаптировались к этому пробелу. Наиболее распространённые атаки на подростков здесь — это не общий email-фишинг, а уведомления о призах в Telegram на узбекском или русском языке, фейковые сообщения с «верификацией» в Instagram, предложения фальшивой работы с обещанием $500–800/месяц за два часа труда и взломанные APK популярных приложений через Telegram-каналы, содержащие шпионские программы.

Большинство глобальных ресурсов по кибербезопасности написаны на английском, ориентированы на угрозы США/ЕС и предполагают использование банковских карт — а не Telegram-ориентированную, мобильную цифровую жизнь 15–22-летнего из Ташкента или Бишкека.`,
    },
    solution_title: { en: "The Solution", uz: "Yechim", ru: "Решение" },
    solution_body: {
      en: "CyberSafe Teens delivers cybersecurity education specifically for this population: fully trilingual (EN/UZ/RU), built around real regional threat examples, designed for low-friction access by teenagers, and architected for honest data reporting.",
      uz: "CyberSafe Teens aynan ushbu auditoriya uchun kiber xavfsizlik ta'limini taqdim etadi: to'liq uch tilli (EN/UZ/RU), haqiqiy mintaqaviy tahdid misollariga asoslangan, o'smirlar uchun qulay kirish bilan ishlab chiqilgan va halol ma'lumot hisobotlash uchun arxitektura qilingan.",
      ru: "CyberSafe Teens предоставляет образование по кибербезопасности именно для этой аудитории: полностью трёхъязычное (EN/UZ/RU), построенное вокруг реальных региональных примеров угроз, разработанное для удобного доступа подростков и архитектурно ориентированное на честную отчётность данных.",
    },
    features_title: { en: "Platform Features", uz: "Platforma xususiyatlari", ru: "Возможности платформы" },
    tech_title: { en: "Technology Stack", uz: "Texnologiya stegi", ru: "Технологический стек" },
    arch_title: { en: "Key Architecture Decisions", uz: "Asosiy arxitektura qarorlari", ru: "Ключевые архитектурные решения" },
    cta_lessons: { en: "Start Learning", uz: "O'rganishni boshlash", ru: "Начать обучение" },
    cta_challenge: { en: "Take the Final Challenge", uz: "Yakuniy sinovni topshirish", ru: "Пройти финальный тест" },
  };

  const t = (key: keyof typeof L) => L[key][language] ?? L[key].en;

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-16">
      {/* Hero */}
      <section className="text-center space-y-6 py-10">
        <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/lessons">
            <Button size="lg" className="font-bold">
              <BookOpen className="w-4 h-4 mr-2" />
              {t("cta_lessons")}
            </Button>
          </Link>
          <Link href="/challenge">
            <Button size="lg" variant="outline" className="font-bold">
              <Zap className="w-4 h-4 mr-2" />
              {t("cta_challenge")}
            </Button>
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-7 h-7 text-destructive" />
          <h2 className="text-3xl font-bold">{t("problem_title")}</h2>
        </div>
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 space-y-4">
          {(t("problem_body") as string).split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed">{para}</p>
          ))}
        </div>
      </section>

      {/* The Solution */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
          <h2 className="text-3xl font-bold">{t("solution_title")}</h2>
        </div>
        <p className="text-lg text-foreground/90 leading-relaxed bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
          {t("solution_body")}
        </p>
      </section>

      {/* Platform Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("features_title")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex gap-4 p-5 bg-card border border-border rounded-xl">
              <Icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("tech_title")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {TECH_STACK.map(({ name, icon: Icon, desc, color }) => (
            <Card key={name} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <Icon className={`w-7 h-7 ${color}`} />
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Architecture Decisions */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">{t("arch_title")}</h2>
        <div className="space-y-4">
          {ARCHITECTURE.map(({ title, icon: Icon, color, desc }) => (
            <div key={title} className="flex gap-5 p-6 bg-card border border-border rounded-xl">
              <div className={`shrink-0 mt-0.5 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built with link */}
      <section className="text-center py-4 border-t border-border">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
          Built on <ExternalLink className="w-4 h-4" /> Replit · Open to contributions
        </p>
      </section>
    </div>
  );
}
