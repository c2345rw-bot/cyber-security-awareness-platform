import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  Download, ShieldCheck, AlertTriangle, XCircle, CheckCircle2,
  ExternalLink, ChevronDown, ChevronUp, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Clue {
  text: { en: string; uz: string; ru: string };
  danger: boolean;
}

interface Scenario {
  id: string;
  appName: string;
  source: { en: string; uz: string; ru: string };
  platform: string;
  url: string;
  fileSize: string;
  isFake: boolean;
  clues: Clue[];
  verdict: { en: string; uz: string; ru: string };
  explanation: { en: string; uz: string; ru: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: "minecraft_apk",
    appName: "Minecraft PE v1.21",
    source: { en: "Telegram channel: @GamesUzbFree", uz: "Telegram kanal: @GamesUzbFree", ru: "Telegram-канал: @GamesUzbFree" },
    platform: "Telegram",
    url: "t.me/GamesUzbFree/minecraft_cracked_apk",
    fileSize: "87.4 MB",
    isFake: true,
    clues: [
      { text: { en: "Downloaded from a Telegram channel, not the official store", uz: "Rasmiy do'kon emas, Telegram kanalidan yuklab olindi", ru: "Скачано из Telegram-канала, не из официального магазина" }, danger: true },
      { text: { en: "File is labelled 'cracked' — meaning its license protection is removed", uz: "Fayl 'cracked' deb belgilangan — ya'ni litsenziya himoyasi olib tashlangan", ru: "Файл помечен как 'cracked' — защита лицензии снята" }, danger: true },
      { text: { en: "No developer verification — anyone can upload to a Telegram channel", uz: "Ishlab chiqaruvchi tekshiruvi yo'q — har kim Telegram kanaliga yuklashi mumkin", ru: "Нет проверки разработчика — в Telegram-канал может загрузить кто угодно" }, danger: true },
      { text: { en: "Requests permission to access Contacts, SMS, and Microphone", uz: "Kontaktlar, SMS va Mikrofonga kirish ruxsatini so'raydi", ru: "Запрашивает доступ к Контактам, SMS и Микрофону" }, danger: true },
      { text: { en: "No update mechanism — you're stuck with this version forever", uz: "Yangilash mexanizmi yo'q — siz ushbu versiyaga abadiy yopishib qolasiz", ru: "Нет механизма обновлений — вы навсегда застряли с этой версией" }, danger: true },
    ],
    verdict: { en: "DANGEROUS — Likely Malware", uz: "XAVFLI — Ehtimol zararli dastur", ru: "ОПАСНО — Вероятно, вредоносная программа" },
    explanation: {
      en: "Cracked APKs distributed via Telegram channels are the #1 malware delivery method for teens in Central Asia. The file may run Minecraft, but a second process silently collects your passwords, SMS codes, and contacts. In documented cases, stolen credentials were used for SIM-swap fraud within hours.",
      uz: "Telegram kanallari orqali tarqatiladigan buzilgan APKlar Markaziy Osiyodagi o'smirlar uchun zararli dasturlarni yetkazib berishning №1 usuli. Fayl Minecraft-ni ishga tushirishi mumkin, ammo ikkinchi jarayon parollaringizni, SMS kodlaringizni va kontaktlaringizni jimgina to'playdi.",
      ru: "Взломанные APK, распространяемые через Telegram-каналы, — это метод доставки вредоносного ПО №1 для подростков Центральной Азии. Файл может запустить Minecraft, но второй процесс тихо собирает ваши пароли, коды SMS и контакты.",
    },
  },
  {
    id: "minecraft_official",
    appName: "Minecraft",
    source: { en: "Google Play Store — official", uz: "Google Play Store — rasmiy", ru: "Google Play Store — официально" },
    platform: "Google Play",
    url: "play.google.com/store/apps/details?id=com.mojang.minecraftpe",
    fileSize: "Varies by device",
    isFake: false,
    clues: [
      { text: { en: "Verified publisher: Mojang (Microsoft)", uz: "Tasdiqlangan nashriyotchi: Mojang (Microsoft)", ru: "Проверенный издатель: Mojang (Microsoft)" }, danger: false },
      { text: { en: "Review count: 38 million+ ratings (verified by real users)", uz: "Sharhlar soni: 38 million+ baho (haqiqiy foydalanuvchilar tomonidan tasdiqlangan)", ru: "Количество отзывов: 38 млн+ оценок (верифицировано реальными пользователями)" }, danger: false },
      { text: { en: "Permissions limited to Storage only — no access to contacts or SMS", uz: "Ruxsatlar faqat Xotirat bilan cheklangan — kontaktlar yoki SMS-ga kirish yo'q", ru: "Разрешения ограничены только Хранилищем — нет доступа к контактам или SMS" }, danger: false },
      { text: { en: "Automatic security updates via Google Play Protect", uz: "Google Play Protect orqali avtomatik xavfsizlik yangilanishlari", ru: "Автоматические обновления безопасности через Google Play Protect" }, danger: false },
      { text: { en: "Costs $7.49 — but your data, accounts, and devices stay safe", uz: "$7.49 turadi — lekin ma'lumotlaringiz, hisoblaringiz va qurilmalaringiz xavfsiz qoladi", ru: "Стоит $7.49 — но ваши данные, аккаунты и устройства остаются в безопасности" }, danger: false },
    ],
    verdict: { en: "SAFE — Official Source", uz: "XAVFSIZ — Rasmiy manba", ru: "БЕЗОПАСНО — Официальный источник" },
    explanation: {
      en: "Downloading from official stores means Google (or Apple) has scanned the app for malware, verified the publisher's identity, and will automatically push security patches. The $7.49 price tag is exactly what makes free cracked versions tempting — but the real cost of a cracked APK can be your Instagram account, your phone number, or your bank credentials.",
      uz: "Rasmiy do'konlardan yuklab olish Google (yoki Apple) ilovani zararli dasturlar uchun skanerlagan, nashriyotchi shaxsini tasdiqlagan va avtomatik ravishda xavfsizlik yamoqlarini yuboradi.",
      ru: "Скачивание из официальных магазинов означает, что Google (или Apple) проверил приложение на наличие вредоносного ПО, верифицировал личность издателя и будет автоматически выпускать патчи безопасности.",
    },
  },
  {
    id: "vpn_fake",
    appName: "SuperVPN Free — Unlimited",
    source: { en: "Website: supervpn-free-unlimited.ru", uz: "Veb-sayt: supervpn-free-unlimited.ru", ru: "Сайт: supervpn-free-unlimited.ru" },
    platform: "Unknown website",
    url: "supervpn-free-unlimited.ru/download/supervpn.apk",
    fileSize: "12.1 MB",
    isFake: true,
    clues: [
      { text: { en: ".ru domain serving an APK for an Android app — high-risk combination", uz: "Android ilovasi uchun APK taqdim etuvchi .ru domeni — yuqori xavf kombinatsiyasi", ru: ".ru домен, раздающий APK для Android — высокорисковая комбинация" }, danger: true },
      { text: { en: "VPN apps route ALL your internet traffic — a malicious VPN sees everything", uz: "VPN ilovalar BARCHA internet trafikingizni yo'naltiradi — zararli VPN hamma narsani ko'radi", ru: "VPN-приложения маршрутизируют ВЕСЬ ваш интернет-трафик — вредоносный VPN видит всё" }, danger: true },
      { text: { en: "No privacy policy linked anywhere on the download page", uz: "Yuklab olish sahifasida hech qayerda maxfiylik siyosati bog'lanmagan", ru: "На странице загрузки нигде нет ссылки на политику конфиденциальности" }, danger: true },
      { text: { en: "Promoted via Instagram Story ads — not indexed in any app store", uz: "Instagram Story reklamalari orqali targ'ib qilingan — hech qanday ilovalar do'konida indekslanmagan", ru: "Продвигается через рекламу в Instagram Stories — не индексируется ни в одном магазине приложений" }, danger: true },
    ],
    verdict: { en: "DANGEROUS — Privacy Risk", uz: "XAVFLI — Maxfiylik xavfi", ru: "ОПАСНО — Угроза конфиденциальности" },
    explanation: {
      en: "Fake 'free VPN' apps are designed to intercept your traffic, not protect it. Since a VPN sees all your browsing, a malicious one can harvest banking credentials, passwords, and personal messages. These apps are commonly promoted via Instagram Stories in Uzbekistan and Kazakhstan specifically because teens trust social media advertising.",
      uz: "Soxta 'bepul VPN' ilovalar trafikingizni himoya qilish uchun emas, uni ushlab qolish uchun mo'ljallangan. VPN barcha ko'rishingizni ko'rganligi sababli, zararli VPN bank ma'lumotlarini, parollarni va shaxsiy xabarlarni yig'ishi mumkin.",
      ru: "Поддельные приложения «бесплатного VPN» созданы для перехвата вашего трафика, а не для его защиты. Поскольку VPN видит весь ваш браузинг, вредоносный может собирать банковские данные, пароли и личные сообщения.",
    },
  },
];

export default function SafeDownloads() {
  const { language } = useLanguage();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [expandedClues, setExpandedClues] = useState<Record<string, boolean>>({});

  const L = {
    title: { en: "Safe Downloads", uz: "Xavfsiz yuklab olish", ru: "Безопасная загрузка" },
    subtitle: {
      en: "Real examples showing why where you download matters as much as what you download.",
      uz: "Qayerdan yuklab olishingiz nima yuklab olganingiz kabi muhimligini ko'rsatuvchi haqiqiy misollar.",
      ru: "Реальные примеры, показывающие, почему место загрузки так же важно, как и то, что вы скачиваете.",
    },
    reveal_clues: { en: "Analyse this download", uz: "Ushbu yuklab olishni tahlil qilish", ru: "Проанализировать загрузку" },
    hide_clues: { en: "Hide analysis", uz: "Tahlilni yashirish", ru: "Скрыть анализ" },
    danger_clue: { en: "Red flag", uz: "Qizil bayroq", ru: "Тревожный сигнал" },
    safe_clue: { en: "Good sign", uz: "Yaxshi belgi", ru: "Хороший признак" },
    verdict_label: { en: "Verdict", uz: "Xulosa", ru: "Вывод" },
    show_verdict: { en: "Show verdict", uz: "Xulosani ko'rsatish", ru: "Показать вывод" },
    rule_title: { en: "The Golden Rules of Safe Downloads", uz: "Xavfsiz yuklab olishning oltin qoidalari", ru: "Золотые правила безопасной загрузки" },
    rule_1: { en: "Only install apps from official stores (Play Store, App Store). Period.", uz: "Faqat rasmiy do'konlardan ilovalar o'rnating (Play Store, App Store). Boshqa yo'q.", ru: "Устанавливайте приложения только из официальных магазинов (Play Store, App Store). Без исключений." },
    rule_2: { en: "If an app costs money and a 'free cracked' version exists on Telegram, it's malware.", uz: "Agar ilova pullik bo'lsa va Telegramda 'bepul buzilgan' versiyasi mavjud bo'lsa, bu zararli dastur.", ru: "Если приложение платное, а в Telegram есть «бесплатная взломанная» версия — это вредоносное ПО." },
    rule_3: { en: "Check app permissions. A flashlight app should not need your contacts or SMS.", uz: "Ilova ruxsatlarini tekshiring. Fonar ilovasi sizning kontaktlar yoki SMS-ga kirish kerak emas.", ru: "Проверяйте разрешения приложений. Фонарику не нужен доступ к вашим контактам или SMS." },
    rule_4: { en: "VPN apps route all your traffic — only use trusted, paid VPNs with a clear privacy policy.", uz: "VPN ilovalar barcha trafikingizni yo'naltiradi — faqat aniq maxfiylik siyosati bilan ishonchli, pullik VPN-lardan foydalaning.", ru: "VPN-приложения маршрутизируют весь ваш трафик — используйте только надёжные платные VPN с чёткой политикой конфиденциальности." },
    rule_5: { en: "A website URL ending in .ru, .xyz, or .top serving APK files is almost always dangerous.", uz: ".ru, .xyz yoki .top bilan tugaydigan veb-sayt URL APK fayllarni taqdim etsa, bu deyarli har doim xavfli.", ru: "URL-адрес сайта, оканчивающийся на .ru, .xyz или .top, раздающий APK — почти всегда опасен." },
    download_label: { en: "Download source", uz: "Yuklab olish manbai", ru: "Источник загрузки" },
    file_label: { en: "File size", uz: "Fayl hajmi", ru: "Размер файла" },
    next_lesson: { en: "Continue to Lessons", uz: "Darslarga o'tish", ru: "Перейти к урокам" },
  };

  const t = (key: keyof typeof L) => {
    const v = L[key];
    return (v as any)[language] ?? (v as any).en;
  };
  const tf = (obj: { en: string; uz: string; ru: string }) => obj[language] ?? obj.en;

  const toggleClues = (id: string) => {
    setExpandedClues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleVerdict = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const RULES = [
    L.rule_1, L.rule_2, L.rule_3, L.rule_4, L.rule_5,
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
          <Download className="w-9 h-9 text-primary" />
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
      </div>

      {/* Scenario cards */}
      <div className="space-y-6">
        {SCENARIOS.map((s, idx) => (
          <div
            key={s.id}
            className={`border-2 rounded-2xl overflow-hidden transition-colors ${
              s.isFake ? "border-destructive/30" : "border-green-500/30"
            }`}
          >
            {/* Fake "download screen" header */}
            <div className={`p-5 ${s.isFake ? "bg-destructive/5" : "bg-green-500/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 ${s.isFake ? "bg-destructive/20 text-destructive" : "bg-green-500/20 text-green-500"}`}>
                    {s.isFake ? "⚠" : "✓"}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                      Example {idx + 1} — {s.platform}
                    </p>
                    <h3 className="text-xl font-bold">{s.appName}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="font-mono break-all">{s.url}</span>
                      </span>
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{t("download_label")}: <strong className="text-foreground">{tf(s.source)}</strong></span>
                      <span>{t("file_label")}: <strong className="text-foreground">{s.fileSize}</strong></span>
                    </div>
                  </div>
                </div>
                <div className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border ${s.isFake ? "bg-destructive/10 border-destructive/30 text-destructive" : "bg-green-500/10 border-green-500/30 text-green-500"}`}>
                  {s.isFake ? "SUSPICIOUS" : "OFFICIAL"}
                </div>
              </div>
            </div>

            {/* Clues */}
            <div className="px-5 pt-2 pb-1 bg-card">
              <button
                onClick={() => toggleClues(s.id)}
                className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors py-3 w-full text-left"
              >
                {expandedClues[s.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {expandedClues[s.id] ? t("hide_clues") : t("reveal_clues")}
              </button>

              {expandedClues[s.id] && (
                <div className="space-y-2 pb-4 animate-in slide-in-from-top-2">
                  {s.clues.map((clue, ci) => (
                    <div
                      key={ci}
                      className={`flex items-start gap-3 p-3.5 rounded-xl ${clue.danger ? "bg-destructive/5 border border-destructive/15" : "bg-green-500/5 border border-green-500/15"}`}
                    >
                      {clue.danger
                        ? <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        : <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      }
                      <div>
                        <span className={`text-xs font-bold uppercase tracking-wide ${clue.danger ? "text-destructive" : "text-green-500"}`}>
                          {clue.danger ? t("danger_clue") : t("safe_clue")}:{" "}
                        </span>
                        <span className="text-sm text-foreground/90">{tf(clue.text)}</span>
                      </div>
                    </div>
                  ))}

                  {/* Verdict */}
                  {!revealed[s.id] ? (
                    <button
                      onClick={() => toggleVerdict(s.id)}
                      className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t("show_verdict")}
                    </button>
                  ) : (
                    <div className={`mt-2 p-5 rounded-xl border-2 animate-in fade-in ${s.isFake ? "bg-destructive/8 border-destructive/30" : "bg-green-500/8 border-green-500/30"}`}>
                      <div className="flex items-center gap-2 mb-3">
                        {s.isFake
                          ? <AlertTriangle className="w-5 h-5 text-destructive" />
                          : <ShieldCheck className="w-5 h-5 text-green-500" />
                        }
                        <span className={`font-black text-lg ${s.isFake ? "text-destructive" : "text-green-500"}`}>
                          {tf(s.verdict)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{tf(s.explanation)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Golden rules */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-primary" />
          {t("rule_title")}
        </h2>
        <ol className="space-y-3">
          {RULES.map((rule, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-foreground/90 leading-relaxed pt-0.5 text-sm md:text-base">{tf(rule)}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap">
        <Link href="/lessons">
          <Button size="lg" className="font-bold">
            <Smartphone className="w-4 h-4 mr-2" />
            {t("next_lesson")}
          </Button>
        </Link>
        <Link href="/challenge">
          <Button size="lg" variant="outline" className="font-bold">
            Test Your Knowledge
          </Button>
        </Link>
      </div>
    </div>
  );
}
