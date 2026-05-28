import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import { ShieldAlert, BookOpen, Globe, Shield, MessageSquare, Key, Zap, ClipboardCheck, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DAILY_TIPS: Array<{ en: string; uz: string; ru: string }> = [
  {
    en: "Never share your OTP (one-time code) with anyone — not even \"Telegram Support\".",
    uz: "OTP (bir martalik kod)ni hech kimga yurmang — hatto \"Telegram Qo'llab-quvvatlash\"ga ham.",
    ru: "Никогда не сообщайте OTP (одноразовый код) никому — даже «Поддержке Telegram».",
  },
  {
    en: "Set up 2-factor authentication on Instagram and Telegram today.",
    uz: "Bugun Instagram va Telegramda 2 faktorli autentifikatsiyani yoqing.",
    ru: "Включите двухфакторную аутентификацию в Instagram и Telegram прямо сейчас.",
  },
  {
    en: "If a job offer sounds too good to be true ($500/month for 2 hours of work), it's a scam.",
    uz: "Ish taklifi juda yaxshi ko'rinsa (2 soatlik ish uchun $500/oy), bu firibgarlik.",
    ru: "Если предложение работы звучит слишком хорошо ($500/месяц за 2 часа), это мошенничество.",
  },
  {
    en: "Check a link by hovering over it before clicking — does the domain match who sent it?",
    uz: "Bosishdan oldin havolani tekshiring — domen jo'natuvchiga mos kelyadimi?",
    ru: "Проверьте ссылку, наведя на неё курсор — совпадает ли домен с отправителем?",
  },
  {
    en: "A password like 'ToshkentBozor2024!' is far stronger than 'P@ssw0rd'.",
    uz: "'ToshkentBozor2024!' kabi parol 'P@ssw0rd'dan ancha kuchli.",
    ru: "Пароль «ТашкентРынок2024!» гораздо надёжнее, чем «P@ssw0rd».",
  },
  {
    en: "Cracked APK files in Telegram channels often contain hidden spyware. Use official stores only.",
    uz: "Telegram kanallaridagi buzilgan APK fayllar ko'pincha josuslik dasturlarini o'z ichiga oladi. Faqat rasmiy do'konlarni ishlating.",
    ru: "Взломанные APK в Telegram-каналах часто содержат шпионское ПО. Используйте только официальные магазины.",
  },
  {
    en: "Your phone's location history can reveal your home, school, and daily routine to attackers.",
    uz: "Telefoningizning joylashuv tarixi hujumchilarga uy, maktab va kunlik tartibingizni ko'rsatishi mumkin.",
    ru: "История местоположения вашего телефона может раскрыть злоумышленникам ваш дом, школу и распорядок дня.",
  },
  {
    en: "Public Wi-Fi can expose your passwords. Avoid logging in to accounts on open networks.",
    uz: "Jamoat Wi-Fi parollaringizni ochib qo'yishi mumkin. Ochiq tarmoqlarda hisoblarga kirishdan qoching.",
    ru: "Публичный Wi-Fi может раскрыть ваши пароли. Избегайте входа в аккаунты через открытые сети.",
  },
  {
    en: "Regularly check which apps have access to your camera, microphone, and location.",
    uz: "Qaysi ilovalar kamera, mikrofon va joylashuvga ega ekanligini muntazam tekshiring.",
    ru: "Регулярно проверяйте, какие приложения имеют доступ к камере, микрофону и местоположению.",
  },
  {
    en: "Screenshot scam messages you receive and share them in the Scam Reports section to warn others.",
    uz: "Olgan firibgarlik xabarlarini ekranga olib, boshqalarni ogohlantirish uchun Firibgarlik bo'limida ulashing.",
    ru: "Делайте скриншоты мошеннических сообщений и делитесь ими в разделе «Жалобы», чтобы предупредить других.",
  },
  {
    en: "Instagram will never ask you to verify your account via a DM. Ignore those messages.",
    uz: "Instagram hech qachon DM orqali hisobingizni tasdiqlashni so'ramaydi. Bu xabarlarni e'tiborsiz qoldiring.",
    ru: "Instagram никогда не будет просить вас верифицировать аккаунт через личное сообщение. Игнорируйте такие сообщения.",
  },
  {
    en: "Don't accept friend requests from accounts you don't recognise — they may be phishing profiles.",
    uz: "Tanlamagan hisoblardan do'stlik so'rovlarini qabul qilmang — ular fishing profillari bo'lishi mumkin.",
    ru: "Не принимайте запросы в друзья от незнакомых аккаунтов — они могут быть фишинговыми профилями.",
  },
  {
    en: "If a website URL looks almost right (e.g. 'instagram-support.ru'), it's fake. Check carefully.",
    uz: "Agar veb-sayt URL deyarli to'g'ri ko'rinsa (masalan, 'instagram-support.ru'), bu soxta. Diqqat bilan tekshiring.",
    ru: "Если URL сайта выглядит почти правильно (например, «instagram-support.ru»), он поддельный. Проверяйте внимательно.",
  },
  {
    en: "Enable automatic security updates on your phone — patches fix known attack methods.",
    uz: "Telefonингизда avtomatik xavfsizlik yangilanishlarini yoqing — yamoqlar ma'lum hujum usullarini tuzatadi.",
    ru: "Включите автоматические обновления безопасности на телефоне — патчи исправляют известные методы атак.",
  },
  {
    en: "Never send money as a 'processing fee' to claim a prize. Real prizes don't work that way.",
    uz: "Mukofot olish uchun hech qachon 'xizmat haqi' sifatida pul yurmang. Haqiqiy mukofotlar bunday ishlamaydi.",
    ru: "Никогда не отправляйте деньги в качестве «платы за обработку» для получения приза. Настоящие призы так не работают.",
  },
];

export default function Home() {
  const { language, t } = useLanguage();

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const todaysTip = DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  const tipText = todaysTip[language] ?? todaysTip.en;

  const platformContent = [
    { icon: BookOpen, value: "6", label: t("stat_lessons_available"), color: "text-secondary" },
    { icon: ShieldAlert, value: "6", label: t("stat_simulator_scenarios"), color: "text-destructive" },
    { icon: Globe, value: "3", label: t("stat_languages"), color: "text-primary" },
    { icon: Shield, value: "15", label: t("stat_quiz_questions"), color: "text-green-500" },
  ];

  const quickActions = [
    {
      href: "/challenge",
      icon: Zap,
      title: { en: "Final Challenge", uz: "Yakuniy sinov", ru: "Финальный тест" },
      desc: { en: "Test knowledge across all 6 topics in one 10-question quiz.", uz: "Barcha 6 mavzu bo'yicha 10 savollik testda bilimingizni sinang.", ru: "Проверьте знания по всем 6 темам в тесте из 10 вопросов." },
      color: "border-yellow-500/30 bg-yellow-500/5",
      iconColor: "text-yellow-500",
    },
    {
      href: "/checklist",
      icon: ClipboardCheck,
      title: { en: "Safety Checklist", uz: "Xavfsizlik ro'yxati", ru: "Чеклист безопасности" },
      desc: { en: "Answer 6 questions, get a personalised security action plan.", uz: "6 savolga javob bering va shaxsiy xavfsizlik rejasini oling.", ru: "Ответьте на 6 вопросов и получите персональный план безопасности." },
      color: "border-green-500/30 bg-green-500/5",
      iconColor: "text-green-500",
    },
  ];

  const threats = [
    {
      icon: MessageSquare,
      title: t("threat_telegram_title"),
      desc: t("threat_telegram_desc"),
    },
    {
      icon: ShieldAlert,
      title: t("threat_phishing_title"),
      desc: t("threat_phishing_desc"),
    },
    {
      icon: Key,
      title: t("threat_passwords_title"),
      desc: t("threat_passwords_desc"),
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-6 py-12 md:py-20">
        <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t("home_hero_title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("home_hero_subtitle")}</p>
        <div className="pt-6">
          <Link
            href="/lessons"
            className="inline-flex items-center justify-center rounded-lg text-lg font-bold bg-primary text-primary-foreground h-14 px-8 shadow-lg hover:bg-primary/90 transition-colors"
          >
            {t("start_learning")}
          </Link>
        </div>
      </section>

      {/* Daily Tip */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
        <div className="shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t("daily_tip_label")}</p>
          <p className="text-foreground font-medium leading-relaxed">{tipText}</p>
        </div>
      </section>

      {/* Platform content stats */}
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

      {/* Quick action cards */}
      <section>
        <h3 className="text-xl font-bold mb-4">{t("featured_tools")}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map(({ href, icon: Icon, title, desc, color, iconColor }) => (
            <Link key={href} href={href}>
              <div className={`border-2 ${color} rounded-2xl p-6 space-y-3 cursor-pointer hover:scale-[1.01] transition-transform`}>
                <Icon className={`w-8 h-8 ${iconColor}`} />
                <h4 className="text-lg font-bold">{(title as any)[language] ?? title.en}</h4>
                <p className="text-muted-foreground text-sm">{(desc as any)[language] ?? desc.en}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section>
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
                  <span className="font-medium">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Regional threat cards */}
      <section>
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

      {/* CTA strip */}
      <section className="text-center py-4">
        <Link href="/about">
          <Button variant="outline" className="font-bold">
            {t("about_project_cta")}
          </Button>
        </Link>
      </section>
    </div>
  );
}
