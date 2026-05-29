import { useLanguage } from "@/lib/i18n";
import { Link } from "wouter";
import {
  ShieldAlert, BookOpen, Globe, Shield, MessageSquare,
  Key, Zap, ClipboardCheck, Lightbulb, Download, AlertTriangle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DAILY_TIPS: Array<{ en: string; uz: string; ru: string }> = [
  { en: "Never share your OTP (one-time code) with anyone — not even \"Telegram Support\".", uz: "OTP (bir martalik kod)ni hech kimga yurmang — hatto \"Telegram Qo'llab-quvvatlash\"ga ham.", ru: "Никогда не сообщайте OTP (одноразовый код) никому — даже «Поддержке Telegram»." },
  { en: "Set up 2-factor authentication on Instagram and Telegram today.", uz: "Bugun Instagram va Telegramda 2 faktorli autentifikatsiyani yoqing.", ru: "Включите двухфакторную аутентификацию в Instagram и Telegram прямо сейчас." },
  { en: "If a job offer sounds too good to be true ($500/month for 2 hours of work), it's a scam.", uz: "Ish taklifi juda yaxshi ko'rinsa (2 soatlik ish uchun $500/oy), bu firibgarlik.", ru: "Если предложение работы звучит слишком хорошо ($500/месяц за 2 часа), это мошенничество." },
  { en: "Check a link by hovering over it before clicking — does the domain match who sent it?", uz: "Bosishdan oldin havolani tekshiring — domen jo'natuvchiga mos kelyadimi?", ru: "Проверьте ссылку, наведя на неё курсор — совпадает ли домен с отправителем?" },
  { en: "A password like 'ToshkentBozor2024!' is far stronger than 'P@ssw0rd'.", uz: "'ToshkentBozor2024!' kabi parol 'P@ssw0rd'dan ancha kuchli.", ru: "Пароль «ТашкентРынок2024!» гораздо надёжнее, чем «P@ssw0rd»." },
  { en: "Cracked APK files in Telegram channels often contain hidden spyware. Use official stores only.", uz: "Telegram kanallaridagi buzilgan APK fayllar ko'pincha josuslik dasturlarini o'z ichiga oladi. Faqat rasmiy do'konlarni ishlating.", ru: "Взломанные APK в Telegram-каналах часто содержат шпионское ПО. Используйте только официальные магазины." },
  { en: "Your phone's location history can reveal your home, school, and daily routine to attackers.", uz: "Telefoningizning joylashuv tarixi hujumchilarga uy, maktab va kunlik tartibingizni ko'rsatishi mumkin.", ru: "История местоположения вашего телефона может раскрыть злоумышленникам ваш дом, школу и распорядок дня." },
  { en: "Public Wi-Fi can expose your passwords. Avoid logging in to accounts on open networks.", uz: "Jamoat Wi-Fi parollaringizni ochib qo'yishi mumkin. Ochiq tarmoqlarda hisoblarga kirishdan qoching.", ru: "Публичный Wi-Fi может раскрыть ваши пароли. Избегайте входа в аккаунты через открытые сети." },
  { en: "Regularly check which apps have access to your camera, microphone, and location.", uz: "Qaysi ilovalar kamera, mikrofon va joylashuvga ega ekanligini muntazam tekshiring.", ru: "Регулярно проверяйте, какие приложения имеют доступ к камере, микрофону и местоположению." },
  { en: "Screenshot scam messages you receive and share them in the Scam Reports section to warn others.", uz: "Olgan firibgarlik xabarlarini ekranga olib, boshqalarni ogohlantirish uchun Firibgarlik bo'limida ulashing.", ru: "Делайте скриншоты мошеннических сообщений и делитесь ими в разделе «Жалобы», чтобы предупредить других." },
  { en: "Instagram will never ask you to verify your account via a DM. Ignore those messages.", uz: "Instagram hech qachon DM orqali hisobingizni tasdiqlashni so'ramaydi. Bu xabarlarni e'tiborsiz qoldiring.", ru: "Instagram никогда не будет просить вас верифицировать аккаунт через личное сообщение. Игнорируйте такие сообщения." },
  { en: "Don't accept friend requests from accounts you don't recognise — they may be phishing profiles.", uz: "Tanlamagan hisoblardan do'stlik so'rovlarini qabul qilmang — ular fishing profillari bo'lishi mumkin.", ru: "Не принимайте запросы в друзья от незнакомых аккаунтов — они могут быть фишинговыми профилями." },
  { en: "If a website URL looks almost right (e.g. 'instagram-support.ru'), it's fake. Check carefully.", uz: "Agar veb-sayt URL deyarli to'g'ri ko'rinsa (masalan, 'instagram-support.ru'), bu soxta. Diqqat bilan tekshiring.", ru: "Если URL сайта выглядит почти правильно (например, «instagram-support.ru»), он поддельный. Проверяйте внимательно." },
  { en: "Enable automatic security updates on your phone — patches fix known attack methods.", uz: "Telefonингизda avtomatik xavfsizlik yangilanishlarini yoqing — yamoqlar ma'lum hujum usullarini tuzatadi.", ru: "Включите автоматические обновления безопасности на телефоне — патчи исправляют известные методы атак." },
  { en: "Never send money as a 'processing fee' to claim a prize. Real prizes don't work that way.", uz: "Mukofot olish uchun hech qachon 'xizmat haqi' sifatida pul yurmang. Haqiqiy mukofotlar bunday ishlamaydi.", ru: "Никогда не отправляйте деньги в качестве «платы за обработку» для получения приза. Настоящие призы так не работают." },
];

const MODULES = [
  {
    href: "/simulator",
    icon: AlertTriangle,
    color: "border-red-500/40 hover:border-red-500/70 bg-red-500/5",
    iconBg: "bg-red-500/20 text-red-400",
    badge: "Interactive",
    badgeColor: "bg-red-500/20 text-red-400",
    title: { en: "Spot the Phishing", uz: "Fishingni aniqlash", ru: "Найди фишинг" },
    desc: {
      en: "6 real scam messages from Telegram, Instagram & email. Click Safe or Scam — get instant feedback.",
      uz: "Telegram, Instagram va emaildan 6 ta haqiqiy firibgarlik xabarlari. Xavfsiz yoki Firibgarlik — darhol natija oling.",
      ru: "6 реальных мошеннических сообщений из Telegram, Instagram и email. Нажмите «Безопасно» или «Мошенничество» — получите мгновенный результат.",
    },
    cta: { en: "Start Simulator →", uz: "Simulyatorni boshlash →", ru: "Начать симулятор →" },
  },
  {
    href: "/password",
    icon: Key,
    color: "border-cyan-500/40 hover:border-cyan-500/70 bg-cyan-500/5",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    badge: "Live tool",
    badgeColor: "bg-cyan-500/20 text-cyan-400",
    title: { en: "Password Strength Meter", uz: "Parol kuchini o'lchagich", ru: "Измеритель надёжности пароля" },
    desc: {
      en: "Type any password and see instantly: strength score, estimated crack time, and tips to improve it.",
      uz: "Har qanday parolni kiriting va darhol ko'ring: kuch bali, buzish vaqti va uni yaxshilash uchun maslahatlar.",
      ru: "Введите любой пароль и сразу увидите: оценку надёжности, время взлома и советы по улучшению.",
    },
    cta: { en: "Test a Password →", uz: "Parolni sinash →", ru: "Проверить пароль →" },
  },
  {
    href: "/checklist",
    icon: ClipboardCheck,
    color: "border-green-500/40 hover:border-green-500/70 bg-green-500/5",
    iconBg: "bg-green-500/20 text-green-400",
    badge: "Personalised",
    badgeColor: "bg-green-500/20 text-green-400",
    title: { en: "Social Media Checklist", uz: "Ijtimoiy tarmoq tekshiruvi", ru: "Чеклист по соцсетям" },
    desc: {
      en: "Answer 6 questions about your habits. Get a personalised security action plan you can print.",
      uz: "Odatlaringiz haqida 6 ta savolga javob bering. Chop etishingiz mumkin bo'lgan shaxsiy xavfsizlik rejasini oling.",
      ru: "Ответьте на 6 вопросов о своих привычках. Получите персональный план безопасности для печати.",
    },
    cta: { en: "Take the Checklist →", uz: "Tekshiruvni boshlash →", ru: "Пройти чеклист →" },
  },
  {
    href: "/safe-downloads",
    icon: Download,
    color: "border-orange-500/40 hover:border-orange-500/70 bg-orange-500/5",
    iconBg: "bg-orange-500/20 text-orange-400",
    badge: "Case studies",
    badgeColor: "bg-orange-500/20 text-orange-400",
    title: { en: "Safe Downloads", uz: "Xavfsiz yuklab olish", ru: "Безопасная загрузка" },
    desc: {
      en: "Real before/after: cracked APK from Telegram vs the same app from Play Store. Spot every red flag.",
      uz: "Haqiqiy taqqoslash: Telegramdan buzilgan APK vs Play Store'dan xuddi shu ilova. Har bir xavfli belgini toping.",
      ru: "Реальное сравнение: взломанный APK из Telegram vs тот же App из Play Store. Найдите все тревожные сигналы.",
    },
    cta: { en: "See the Comparison →", uz: "Taqqoslashni ko'rish →", ru: "Посмотреть сравнение →" },
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

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="text-center space-y-6 py-10 md:py-16">
        <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t("home_hero_title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("home_hero_subtitle")}</p>
        <div className="pt-4">
          <Link
            href="/lessons"
            className="inline-flex items-center justify-center rounded-lg text-lg font-bold bg-primary text-primary-foreground h-14 px-8 shadow-lg hover:bg-primary/90 transition-colors"
          >
            {t("start_learning")}
          </Link>
        </div>
      </section>

      {/* Daily Tip */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start">
        <div className="shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t("daily_tip_label")}</p>
          <p className="text-foreground font-medium leading-relaxed">{tipText}</p>
        </div>
      </section>

      {/* 4 Core Modules */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-black">{t("modules_title")}</h2>
          <p className="text-muted-foreground mt-1">{t("modules_subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {MODULES.map(({ href, icon: Icon, color, iconBg, badge, badgeColor, title, desc, cta }) => (
            <Link key={href} href={href}>
              <div className={`border-2 ${color} rounded-2xl p-6 space-y-4 cursor-pointer transition-all hover:scale-[1.01] group h-full flex flex-col`}>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {(title as any)[language] ?? title.en}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {(desc as any)[language] ?? desc.en}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary mt-auto">
                  {(cta as any)[language] ?? cta.en}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Extra tools row */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold">{t("featured_tools")}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/challenge">
            <div className="border-2 border-yellow-500/30 hover:border-yellow-500/60 bg-yellow-500/5 rounded-2xl p-5 flex gap-4 items-center cursor-pointer transition-all group">
              <div className="w-11 h-11 bg-yellow-500/20 text-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold group-hover:text-primary transition-colors">{t("nav_challenge")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">10-question mixed quiz from all 6 topics</p>
              </div>
            </div>
          </Link>
          <Link href="/about">
            <div className="border-2 border-border hover:border-primary/30 bg-card rounded-2xl p-5 flex gap-4 items-center cursor-pointer transition-all group">
              <div className="w-11 h-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold group-hover:text-primary transition-colors">{t("nav_about")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">The problem, the solution, the tech stack</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Platform stats */}
      <section>
        <p className="text-xs text-muted-foreground text-center uppercase tracking-widest font-semibold mb-4">
          {t("stat_section_label")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformContent.map(({ icon: Icon, value, label, color }) => (
            <Card key={label} className="bg-card border-border">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <Icon className={`w-7 h-7 mb-3 ${color}`} />
                <div className="text-3xl font-black">{value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Threat context */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-center">{t("known_threats_title")}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: MessageSquare, title: t("threat_telegram_title"), desc: t("threat_telegram_desc") },
            { icon: ShieldAlert, title: t("threat_phishing_title"), desc: t("threat_phishing_desc") },
            { icon: Key, title: t("threat_passwords_title"), desc: t("threat_passwords_desc") },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 space-y-3">
              <Icon className="w-7 h-7 text-destructive" />
              <h4 className="font-bold">{title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About CTA */}
      <section className="text-center py-2">
        <Link href="/about">
          <Button variant="outline" className="font-bold">
            {t("about_project_cta")}
          </Button>
        </Link>
      </section>
    </div>
  );
}
