import { useLanguage } from "@/lib/i18n";
import {
  Shield, Code2, Database, Globe, BookOpen, Zap, Users, Lock,
  AlertTriangle, CheckCircle2, Server, Layers, GitBranch,
  Lightbulb, Target, TrendingUp, Award, Printer, ChevronRight,
  Brain, Wrench, Eye, Heart
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

/* ─── static data ─────────────────────────────────────── */

const STATS = [
  { value: "6", label: "Structured Lessons", sub: "Levels 1–3" },
  { value: "3", label: "Languages", sub: "EN / UZ / RU" },
  { value: "15+", label: "API Endpoints", sub: "OpenAPI-spec'd" },
  { value: "6", label: "Simulator Scenarios", sub: "Real regional scams" },
  { value: "10", label: "Tech stack items", sub: "Across front & back end" },
  { value: "100%", label: "Real Data", sub: "No seeded / fake metrics" },
];

const TECH_STACK = [
  { name: "React 18 + TypeScript", icon: Code2, why: "Type safety across 15+ components eliminates whole classes of runtime bugs.", color: "text-cyan-400" },
  { name: "Vite", icon: Zap, why: "Sub-second HMR keeps the development cycle tight during rapid iteration.", color: "text-yellow-400" },
  { name: "Tailwind CSS + shadcn/ui", icon: Layers, why: "Utility-first styling lets one developer move at design-team speed.", color: "text-teal-400" },
  { name: "Express 5", icon: Server, why: "Async-by-default router with native error propagation — cleaner than Express 4.", color: "text-green-400" },
  { name: "PostgreSQL + Drizzle ORM", icon: Database, why: "Type-safe SQL queries; schema changes surface immediately as TS errors.", color: "text-blue-400" },
  { name: "OpenAPI + Orval codegen", icon: GitBranch, why: "Define the contract once; generate React Query hooks and Zod validators automatically.", color: "text-orange-400" },
  { name: "React Query", icon: Zap, why: "Server-state management with caching, background refetching, and optimistic updates.", color: "text-red-400" },
  { name: "Zod", icon: CheckCircle2, why: "Runtime validation on both client (forms) and server (request bodies) from one schema source.", color: "text-purple-400" },
  { name: "pnpm workspaces", icon: Layers, why: "Monorepo splits concerns into six packages; a change in the API spec auto-breaks dependants.", color: "text-yellow-500" },
  { name: "Node.js 24", icon: Server, why: "Latest LTS — native fetch, built-in test runner, improved performance over Node 18/20.", color: "text-green-500" },
];

const CHALLENGES = [
  {
    icon: Globe,
    color: "text-secondary",
    challenge: "Supporting three languages without a separate translation service",
    solution: "Each database row stores EN/UZ/RU content in separate columns. The frontend reads the right column at render time — zero network round-trips for language switching, no third-party i18n dependency, and translations are content, not code.",
    learned: "Storing internationalisation in the data layer rather than the application layer simplifies both the backend and the client significantly.",
  },
  {
    icon: GitBranch,
    color: "text-primary",
    challenge: "Keeping the frontend and backend in sync without breaking changes",
    solution: "All 15+ API endpoints are specified in a single OpenAPI YAML file first. Orval generates typed React Query hooks and Zod validators from that spec. If a backend route changes shape, the frontend fails to compile before it ever runs.",
    learned: "Contract-first development (spec → codegen → implementation) is far more reliable than writing client code against a live server. TypeScript errors are much cheaper than runtime 404s.",
  },
  {
    icon: Users,
    color: "text-green-500",
    challenge: "Enabling progress tracking without forcing user registration",
    solution: "Users choose a username stored in localStorage. The backend auto-creates a progress record on the first GET request to /api/progress/:username. No passwords, no email verification, no friction — which is critical for a teen audience where account fatigue is a real barrier.",
    learned: "Reducing onboarding friction is a product decision as much as a technical one. The right architecture can remove a barrier entirely rather than just lowering it.",
  },
  {
    icon: Lock,
    color: "text-destructive",
    challenge: "Running password analysis securely without logging sensitive data",
    solution: "The strength checker sends passwords to the Express backend over the local API, where analysis runs in memory. The endpoint is explicitly forbidden from logging request bodies. Crack-time estimates use a locally-implemented zxcvbn-style scoring model.",
    learned: "Security tools are held to a higher standard than regular features. Thinking through data lifecycle — what is received, what is stored, what is logged — should happen before writing a single line of handler code.",
  },
  {
    icon: Database,
    color: "text-orange-400",
    challenge: "Keeping leaderboard and quiz data honest in a no-auth environment",
    solution: "All stats shown to users — XP totals, leaderboard positions, quiz scores — are read directly from the database with no inflation. Empty states are labelled clearly ('No learners yet') rather than being hidden behind placeholder data.",
    learned: "Faking metrics is a trap that makes demos look better but teaches nothing. A project that shows honest empty states demonstrates more integrity than one with seeded fake data.",
  },
  {
    icon: Layers,
    color: "text-purple-400",
    challenge: "Structuring a project that has both frontend and backend concerns cleanly",
    solution: "A pnpm monorepo splits the code into six packages: api-server, cybersafe-teens (frontend), db (Drizzle schema + migrations), api-spec (OpenAPI YAML), api-client-react (generated hooks), and api-zod (generated validators). Each package has a single clear responsibility.",
    learned: "A monorepo forces you to think about package boundaries before you write the code, which leads to cleaner separation of concerns than a single repository typically achieves.",
  },
];

const FEATURES = [
  { icon: BookOpen, label: "6 structured lessons across 3 levels", sub: "Phishing → Passwords → Malware → Social Engineering → Safe Browsing → Privacy" },
  { icon: AlertTriangle, label: "Interactive Phishing Simulator", sub: "6 real scenarios: Telegram prize scam, Instagram verification, fake job, scholarship email, crypto investment, safe control" },
  { icon: Lock, label: "Live Password Strength Checker", sub: "Server-side analysis with crack-time estimates and actionable tips in all 3 languages" },
  { icon: CheckCircle2, label: "Personalised Safety Checklist", sub: "6-question habit assessment generates a printable action plan with colour-coded priorities" },
  { icon: Shield, label: "Safe Downloads Module", sub: "Before/after case studies: cracked APK from Telegram vs. official Play Store — every red flag explained" },
  { icon: Zap, label: "Final Knowledge Challenge", sub: "10-question cross-topic quiz with XP rewards and a ranked result (Beginner → Cyber Expert)" },
  { icon: Users, label: "Community Scam Reports", sub: "Submit and browse real scam messages by category — collective protection through shared data" },
  { icon: Award, label: "XP Leaderboard + Badges", sub: "Gamified progress visible across the community; badges unlock at lesson milestones and streaks" },
];

const SKILLS = [
  { category: "Frontend", items: ["React 18 (hooks, context, custom hooks)", "TypeScript (strict mode, generics, utility types)", "Tailwind CSS + shadcn/ui component library", "React Query (server state, caching, mutations)", "Wouter (client-side routing)", "Responsive + mobile-first layout design"] },
  { category: "Backend", items: ["Express 5 (async route handlers, middleware)", "RESTful API design (status codes, error shapes)", "Request validation with Zod", "Structured logging (pino)", "PostgreSQL query design", "Drizzle ORM (schema, migrations, type-safe queries)"] },
  { category: "Engineering Practice", items: ["Contract-first development (OpenAPI spec → codegen)", "Monorepo management with pnpm workspaces", "TypeScript project references", "Environment variable management", "Git version control", "API documentation writing"] },
  { category: "Product Thinking", items: ["User research (Central Asian teen threat landscape)", "Internationalisation (EN/UZ/RU) as a first-class concern", "Reducing onboarding friction for target audience", "Honest data presentation (no fake metrics)", "Accessibility-aware component choices"] },
];

const FUTURE = [
  { icon: Brain, text: "AI-powered scam detection: submit a message, get a probability score and explanation of why it looks suspicious." },
  { icon: TrendingUp, text: "Detailed analytics dashboard: track which lesson topics have the lowest quiz pass rates to identify knowledge gaps in the community." },
  { icon: Globe, text: "Offline-first PWA: many users in the region have inconsistent connectivity; a service worker cache would allow lessons to load without internet." },
  { icon: Heart, text: "Teacher mode: a read-only class view where educators can see aggregate progress across a student cohort without seeing individual data." },
  { icon: Eye, text: "Accessibility audit: ensure full screen-reader support and keyboard navigability for users with visual impairments." },
  { icon: Wrench, text: "Automated testing: add Vitest unit tests for the API route handlers and Playwright end-to-end tests for critical user flows." },
];

/* ─── component ───────────────────────────────────────── */

export default function About() {
  const { language } = useLanguage();

  const L = {
    title: { en: "CyberSafe Teens — Portfolio", uz: "CyberSafe Teens — Portfolio", ru: "CyberSafe Teens — Портфолио" },
    tagline: {
      en: "A full-stack, trilingual cybersecurity education platform built for teenagers in Central Asia.",
      uz: "Markaziy Osiyodagi o'smirlar uchun qurilgan to'liq stekli, uch tilli kiber xavfsizlik ta'lim platformasi.",
      ru: "Полнофункциональная трёхъязычная образовательная платформа по кибербезопасности для подростков Центральной Азии.",
    },
    motivation_title: { en: "Why I Built This", uz: "Nima uchun buni qurdim", ru: "Зачем я это создал" },
    motivation: {
      en: "Cybersecurity education in Uzbekistan and Russian-speaking Central Asia is almost entirely absent — yet this is one of the most digitally active regions in the world. Teenagers here use Telegram and Instagram daily, download apps from unofficial channels, and are regularly targeted by scams designed specifically for this cultural and linguistic context: prize notifications in Uzbek, fake job offers in Russian, cracked APKs of games spread through Telegram channels.\n\nI wanted to build something that addressed this gap directly — not a generic English-language course translated by machine, but a platform that uses real regional examples, speaks to users in their own language, and is designed around the actual digital habits of a 15–22-year-old in Tashkent or Bishkek.\n\nI also wanted to challenge myself technically: this is not a tutorial project. It uses a proper client-server architecture, a contract-first API, a relational database, and a monorepo structure — the same patterns used in professional software teams.",
      uz: "O'zbekiston va rus tilida so'zlashuvchi Markaziy Osiyoda kiberjaqoliqni ta'lim deyarli mavjud emas — ammo bu dunydagi eng faol raqamli mintaqalardan biri. Bu yerdagi o'smirlar har kuni Telegram va Instagramdan foydalanib, norasmiy kanallardan ilovalar yuklab olib, aynan ushbu madaniy va lingvistik kontekst uchun mo'ljallangan firibgarliklarga duch kelishadi.\n\nMen bu bo'shliqni to'g'ridan-to'g'ri hal qiladigan narsa qurmoqchi edim — mashina tomonidan tarjima qilingan umumiy inglizcha kurs emas, balki haqiqiy mintaqaviy misollardan foydalanadigan, foydalanuvchilarga o'z tillarida murojaat qiladigan platforma.\n\nMen o'zimni texnik jihatdan ham sinab ko'rmoqchi edim: bu tutorial loyiha emas.",
      ru: "Образование в области кибербезопасности в Узбекистане и русскоязычной Центральной Азии практически отсутствует — но это один из самых цифрово активных регионов мира. Подростки здесь ежедневно используют Telegram и Instagram, скачивают приложения из неофициальных источников и регулярно становятся жертвами мошенников.\n\nЯ хотел создать что-то, что непосредственно решает эту проблему — не обобщённый курс на английском, переведённый машиной, а платформу, использующую реальные региональные примеры, обращающуюся к пользователям на их родном языке.\n\nЯ также хотел бросить себе технический вызов: это не учебный проект. Он использует правильную клиент-серверную архитектуру, API на основе контракта, реляционную базу данных и монорепозиторий.",
    },
    problem_title: { en: "The Problem", uz: "Muammo", ru: "Проблема" },
    problem: {
      en: "Regional scammers have adapted precisely to the gap in local cybersecurity education. The most common attacks targeting teens in Uzbekistan and Kazakhstan are not generic email phishing, but:\n\n• Telegram prize notifications — a bot claims you have won a competition and asks for your phone number or a 'processing fee'\n• Instagram verification phishing — a DM claims your account needs 'official verification' and links to a fake login page\n• Fake job offers — promising $500–800/month for two hours of remote work, targeting young people seeking income\n• Cracked APKs — popular paid games (Minecraft, GTA) distributed free through Telegram channels, bundled with spyware that harvests SMS codes and contacts\n\nMost global cybersecurity resources are in English, reference US/EU threat models, and assume banking infrastructure that most teens in the region do not use. The threat landscape here is specific, and the response needs to be too.",
      uz: "Mintaqaviy firibgarlar mahalliy kiberjaqoliqni ta'limdagi bo'shliqqa aynan moslashgan. O'zbekiston va Qozog'istondagi o'smirlarni nishon qiladigan eng keng tarqalgan hujumlar:\n\n• Telegram mukofot xabarlari — bot telefon raqamingizni yoki 'ishlov berish to'lovi'ni so'raydi\n• Instagram tasdiqlash fishinggi — DM hisobingiz 'rasmiy tasdiqlash'ga muhtojligini da'vo qiladi\n• Soxta ish takliflari — yoshlarga $500-800/oy va'da qilinadi\n• Buzilgan APKlar — Telegram kanallar orqali tarqatiladigan mashhur o'yinlar",
      ru: "Региональные мошенники точно адаптировались к пробелу в местном образовании по кибербезопасности. Наиболее распространённые атаки:\n\n• Уведомления о призах в Telegram — бот утверждает, что вы выиграли приз и просит номер телефона\n• Фишинг верификации Instagram — сообщение требует 'официальной верификации' со ссылкой на поддельную страницу\n• Фейковые вакансии — обещают $500–800/месяц за два часа удалённой работы\n• Взломанные APK — популярные игры через Telegram-каналы со встроенным шпионским ПО",
    },
    challenges_title: { en: "Technical Challenges & Solutions", uz: "Texnik muammolar va yechimlar", ru: "Технические задачи и решения" },
    features_title: { en: "What the Platform Does", uz: "Platforma nima qiladi", ru: "Возможности платформы" },
    tech_title: { en: "Technology Stack & Rationale", uz: "Texnologiya stegi va sababi", ru: "Технологический стек и обоснование" },
    skills_title: { en: "Skills Demonstrated", uz: "Ko'rsatilgan ko'nikmalar", ru: "Продемонстрированные навыки" },
    future_title: { en: "What I Would Build Next", uz: "Keyingi quradigan narsa", ru: "Что я буду строить дальше" },
    future_sub: {
      en: "If I had more time, here is how I would extend the platform. These are not vague wishes — each has a concrete implementation path I have thought through.",
      uz: "Agar ko'proq vaqtim bo'lsa, platformani qanday kengaytirardim. Bu noaniq istaklarimlar emas — har birining men o'ylab ko'rgan aniq amalga oshirish yo'li bor.",
      ru: "Если бы у меня было больше времени, вот как я бы расширил платформу. Это не абстрактные пожелания — у каждого есть конкретный путь реализации, который я продумал.",
    },
    reflection_title: { en: "What I Learned", uz: "Nima o'rgandim", ru: "Чему я научился" },
    reflection: {
      en: "The biggest technical lesson was how much contract-first development changes the quality of a codebase. Defining every endpoint in an OpenAPI spec before writing a single route handler forced me to think about the API as a product — its inputs, outputs, error cases, and the experience of the developer consuming it. The generated TypeScript types then became a live contract that the compiler enforced throughout the build.\n\nThe biggest product lesson was that reducing friction is a design decision that affects every layer of the stack. Choosing to not require account registration meant rethinking how to identify users (localStorage username), how to persist progress (backend auto-create on first fetch), and how to still produce a meaningful leaderboard (XP earned through real activity). Every layer had to adapt.\n\nFinally, working with three languages from day one taught me that internationalisation is not something you bolt on at the end. The database schema, the API response shape, the component props, and the copy — everything has to be designed with language in mind from the first commit.",
      uz: "Eng katta texnik saboq shunda ediki, shartnoma-birinchi ishlab chiqish kod bazasi sifatini qanchalik o'zgartirishi. Har bir endpointni OpenAPI spetsida belgilash meni APIni mahsulot sifatida o'ylashga majbur qildi.\n\nEng katta mahsulot saboqi — bu ishqalanishni kamaytirish stek har bir qatlamiga ta'sir qiluvchi dizayn qarori. Hisob ro'yxatini talab qilmaslikni tanlash qayta o'ylashni talab qildi.\n\nNihoyat, birinchi kundan boshlab uch tilda ishlash internatsionalizatsiya oxirida qo'shilmaydigan narsaligini o'rgattdi.",
      ru: "Самым важным техническим уроком стало то, насколько разработка на основе контракта меняет качество кодовой базы. Определение каждой конечной точки в спецификации OpenAPI до написания обработчика маршрута заставило меня думать об API как о продукте.\n\nСамым важным продуктовым уроком стало то, что снижение трений — это дизайнерское решение, влияющее на каждый уровень стека.\n\nНаконец, работа с тремя языками с первого дня научила меня, что интернационализация — это не то, что добавляется в конце.",
    },
    print_btn: { en: "Print / Save as PDF", uz: "Chop etish / PDF sifatida saqlash", ru: "Распечатать / Сохранить PDF" },
    start: { en: "Explore the Platform", uz: "Platformani ko'rish", ru: "Исследовать платформу" },
    challenge_cta: { en: "Take the Final Quiz", uz: "Yakuniy testni topshirish", ru: "Пройти финальный тест" },
  };

  const t = (key: keyof typeof L) => {
    const val = L[key];
    return (val as any)[language] ?? (val as any).en;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-20 pb-20 print:space-y-10 print:pb-0 print:text-black print:bg-white">

      {/* ── Hero ── */}
      <section className="text-center space-y-6 py-10 print:py-4">
        <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center print:hidden">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black print:text-3xl">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto print:text-gray-600">{t("tagline")}</p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pt-4">
          {STATS.map(({ value, label, sub }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-3 text-center print:border-gray-300">
              <div className="text-2xl font-black text-primary print:text-black">{value}</div>
              <div className="text-xs font-bold mt-0.5 leading-tight">{label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 print:text-gray-500">{sub}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap print:hidden">
          <Link href="/lessons">
            <Button size="lg" className="font-bold">
              <BookOpen className="w-4 h-4 mr-2" />
              {t("start")}
            </Button>
          </Link>
          <Link href="/challenge">
            <Button size="lg" variant="outline" className="font-bold">
              <Zap className="w-4 h-4 mr-2" />
              {t("challenge_cta")}
            </Button>
          </Link>
          <Button
            size="lg"
            variant="ghost"
            className="font-bold print:hidden"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            {t("print_btn")}
          </Button>
        </div>
      </section>

      {/* ── Why I Built This ── */}
      <section className="space-y-5">
        <SectionHeader icon={Heart} color="text-red-400" title={t("motivation_title")} />
        <div className="bg-card border border-border rounded-2xl p-7 space-y-4 print:border-gray-300">
          {(t("motivation") as string).split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed print:text-gray-800">{para}</p>
          ))}
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="space-y-5">
        <SectionHeader icon={AlertTriangle} color="text-destructive" title={t("problem_title")} />
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-7 space-y-4 print:border-red-300 print:bg-red-50">
          {(t("problem") as string).split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed print:text-gray-800 whitespace-pre-line">{para}</p>
          ))}
        </div>
      </section>

      {/* ── What the Platform Does ── */}
      <section className="space-y-5">
        <SectionHeader icon={CheckCircle2} color="text-green-500" title={t("features_title")} />
        <div className="grid sm:grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex gap-4 p-5 bg-card border border-border rounded-xl print:border-gray-300">
              <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5 print:text-black" />
              <div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 print:text-gray-600">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technical Challenges ── */}
      <section className="space-y-5">
        <SectionHeader icon={Wrench} color="text-orange-400" title={t("challenges_title")} />
        <div className="space-y-4">
          {CHALLENGES.map(({ icon: Icon, color, challenge, solution, learned }) => (
            <div key={challenge} className="bg-card border border-border rounded-2xl overflow-hidden print:border-gray-300">
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color} print:text-black`} />
                  <h3 className="font-bold text-base leading-snug">{challenge}</h3>
                </div>
                <div className="pl-8 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider print:text-black">Solution</span>
                    <p className="text-sm text-foreground/90 mt-1 leading-relaxed print:text-gray-800">{solution}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 print:border-gray-200 print:bg-gray-50">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider print:text-black">
                      What I learned
                    </span>
                    <p className="text-sm text-foreground/80 mt-1 leading-relaxed print:text-gray-700">{learned}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="space-y-5">
        <SectionHeader icon={Code2} color="text-cyan-400" title={t("tech_title")} />
        <div className="space-y-3">
          {TECH_STACK.map(({ name, icon: Icon, why, color }) => (
            <div key={name} className="flex gap-4 items-start p-4 bg-card border border-border rounded-xl print:border-gray-300">
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color} print:text-black`} />
              <div>
                <span className="font-bold text-sm">{name}</span>
                <span className="text-muted-foreground text-sm print:text-gray-600"> — {why}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="space-y-5">
        <SectionHeader icon={Target} color="text-secondary" title={t("skills_title")} />
        <div className="grid sm:grid-cols-2 gap-4">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="bg-card border border-border rounded-2xl p-5 space-y-3 print:border-gray-300">
              <h3 className="font-bold text-sm text-primary uppercase tracking-wider print:text-black">{category}</h3>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/90 print:text-gray-800">
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 print:text-black" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── What I Would Build Next ── */}
      <section className="space-y-5">
        <SectionHeader icon={TrendingUp} color="text-green-400" title={t("future_title")} />
        <p className="text-muted-foreground print:text-gray-600">{t("future_sub")}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {FUTURE.map(({ icon: Icon, text }) => (
            <div key={text} className="flex gap-3 p-4 bg-card border border-border rounded-xl print:border-gray-300">
              <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5 print:text-black" />
              <p className="text-sm text-foreground/90 leading-relaxed print:text-gray-800">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What I Learned ── */}
      <section className="space-y-5">
        <SectionHeader icon={Lightbulb} color="text-yellow-400" title={t("reflection_title")} />
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-7 space-y-4 print:border-gray-300 print:bg-gray-50">
          {(t("reflection") as string).split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed print:text-gray-800">{para}</p>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="text-center py-4 border-t border-border space-y-4 print:hidden">
        <p className="text-muted-foreground text-sm">Built with React · TypeScript · Express · PostgreSQL · OpenAPI</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/lessons">
            <Button variant="outline" className="font-bold">
              <BookOpen className="w-4 h-4 mr-2" />
              {t("start")}
            </Button>
          </Link>
          <Button variant="ghost" className="font-bold" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            {t("print_btn")}
          </Button>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ icon: Icon, color, title }: { icon: any; color: string; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-1 border-b border-border print:border-gray-300">
      <Icon className={`w-6 h-6 ${color} print:text-black`} />
      <h2 className="text-2xl font-bold print:text-xl">{title}</h2>
    </div>
  );
}
