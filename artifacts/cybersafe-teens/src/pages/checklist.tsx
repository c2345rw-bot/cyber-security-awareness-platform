import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { CheckCircle2, XCircle, Printer, RefreshCw, ShieldCheck, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  text: { en: string; uz: string; ru: string };
  hint: { en: string; uz: string; ru: string };
  badAnswer: boolean; // which answer (true=YES / false=NO) is the BAD habit
  action: { en: string; uz: string; ru: string }; // action to take if bad habit confirmed
  good_msg: { en: string; uz: string; ru: string }; // message when habit is already good
}

const QUESTIONS: Question[] = [
  {
    id: "pw_reuse",
    text: {
      en: "Do you use the same password for multiple apps or websites?",
      uz: "Bir nechta ilova yoki veb-saytlar uchun bir xil paroldan foydalanasizmi?",
      ru: "Вы используете одинаковый пароль для нескольких приложений или сайтов?",
    },
    hint: {
      en: "Even one breached site exposes all your accounts.",
      uz: "Bitta buzilgan sayt barcha hisoblaringizni xavf ostiga qo'yadi.",
      ru: "Даже один взломанный сайт раскрывает все ваши аккаунты.",
    },
    badAnswer: true,
    action: {
      en: "Create a unique password for every account. Use a passphrase like 'Tashkent#Market2024!' that you can remember.",
      uz: "Har bir hisob uchun alohida parol yarating. 'Toshkent#Bozor2024!' kabi eslab qolishga oson iborani ishlating.",
      ru: "Создайте уникальный пароль для каждого аккаунта. Используйте парольную фразу типа «Ташкент#Рынок2024!».",
    },
    good_msg: {
      en: "Great! Unique passwords are one of the most important security habits.",
      uz: "Ajoyib! Noyob parollar eng muhim xavfsizlik odatlaridan biridir.",
      ru: "Отлично! Уникальные пароли — одна из важнейших привычек безопасности.",
    },
  },
  {
    id: "telegram_links",
    text: {
      en: "Have you ever clicked a link from an unknown person on Telegram?",
      uz: "Telegram'da noma'lum odamdan kelgan havolani hech qachon bosdingizmi?",
      ru: "Вы когда-нибудь нажимали на ссылку от незнакомца в Telegram?",
    },
    hint: {
      en: "Telegram prize links are the #1 scam targeting teens in Central Asia.",
      uz: "Telegram mukofot havolalari Markaziy Osiyodagi o'smirlarni nishon qiladigan eng katta firibgarlikdir.",
      ru: "Ссылки на «призы» в Telegram — мошенничество №1, нацеленное на подростков Центральной Азии.",
    },
    badAnswer: true,
    action: {
      en: "Never click links from strangers on Telegram, even if they look official. Verify through the sender's public profile first.",
      uz: "Hech qachon Telegramda begonalardan kelgan havolalarni bosmang, rasmiy ko'rinsa ham. Avval jo'natuvchining ommaviy profilini tekshiring.",
      ru: "Никогда не нажимайте на ссылки от незнакомцев в Telegram, даже если они выглядят официально. Сначала проверьте публичный профиль отправителя.",
    },
    good_msg: {
      en: "Smart! You already protect yourself from one of the most common regional attacks.",
      uz: "Aqlli! Siz allaqachon mintaqaviy hujumlarning eng keng tarqalganidan o'zingizni himoya qilasiz.",
      ru: "Умно! Вы уже защищаете себя от одной из самых распространённых региональных атак.",
    },
  },
  {
    id: "unofficial_apps",
    text: {
      en: "Do you download apps from outside the official Play Store or App Store?",
      uz: "Rasmiy Play Store yoki App Store'dan tashqarida ilovalarni yuklab olasizmi?",
      ru: "Вы скачиваете приложения за пределами официального Play Store или App Store?",
    },
    hint: {
      en: "Cracked APK files in Telegram channels often contain hidden spyware.",
      uz: "Telegram kanallaridagi buzilgan APK fayllar ko'pincha yashirin josuslik dasturlarini o'z ichiga oladi.",
      ru: "Взломанные APK-файлы в Telegram-каналах часто содержат скрытые шпионские программы.",
    },
    badAnswer: true,
    action: {
      en: "Only install apps from official stores. If an app costs money you can't afford, look for a free alternative instead.",
      uz: "Faqat rasmiy do'konlardan ilovalarni o'rnating. Agar ilova qimmat bo'lsa, bepul muqobilini qidiring.",
      ru: "Устанавливайте приложения только из официальных магазинов. Если приложение платное, ищите бесплатную альтернативу.",
    },
    good_msg: {
      en: "Excellent! Sticking to official stores is one of the best defences against malware.",
      uz: "Ajoyib! Rasmiy do'konlarga amal qilish zararli dasturlardan eng yaxshi himoyalardan biridir.",
      ru: "Отлично! Использование только официальных магазинов — одна из лучших защит от вредоносного ПО.",
    },
  },
  {
    id: "https_check",
    text: {
      en: "Do you check for HTTPS (the lock icon) before entering personal info on a website?",
      uz: "Veb-saytda shaxsiy ma'lumot kiritishdan oldin HTTPS (qulf belgisi)ni tekshirasizmi?",
      ru: "Проверяете ли вы наличие HTTPS (значок замка) перед вводом личных данных на сайте?",
    },
    hint: {
      en: "HTTP sites can intercept anything you type, including passwords.",
      uz: "HTTP saytlar siz yozgan hamma narsani, shu jumladan parollarni ham ushlab qolishi mumkin.",
      ru: "HTTP-сайты могут перехватить всё, что вы вводите, включая пароли.",
    },
    badAnswer: false,
    action: {
      en: "Always look for 'https://' and the lock icon before entering passwords, card numbers, or personal details.",
      uz: "Parol, karta raqami yoki shaxsiy ma'lumotlarni kiritishdan oldin har doim 'https://' va qulf belgisini qidiring.",
      ru: "Всегда ищите 'https://' и значок замка перед вводом паролей, номеров карт или личных данных.",
    },
    good_msg: {
      en: "Well done! Checking for HTTPS is a fundamental safe browsing habit.",
      uz: "Yaxshi ish! HTTPS tekshirish xavfsiz ko'rishning asosiy odatidir.",
      ru: "Молодец! Проверка HTTPS — фундаментальная привычка безопасного браузинга.",
    },
  },
  {
    id: "location_sharing",
    text: {
      en: "Do you share your home address or daily location on Instagram Stories or other social media?",
      uz: "Instagram Stories yoki boshqa ijtimoiy tarmoqlarda uy manzilingizni yoki kunlik joylashuvingizni ulashingizmi?",
      ru: "Публикуете ли вы домашний адрес или ежедневное местоположение в Instagram Stories или других соцсетях?",
    },
    hint: {
      en: "Attackers use location data to build profiles for targeted scams or physical threats.",
      uz: "Hujumchilar maqsadli firibgarlik yoki jismoniy tahdidlar uchun profil yaratishda joylashuv ma'lumotlaridan foydalanadi.",
      ru: "Злоумышленники используют данные о местоположении для построения профилей при целенаправленных мошенничествах.",
    },
    badAnswer: true,
    action: {
      en: "Turn off location sharing in app settings. Avoid posting photos that reveal your school, home, or routine.",
      uz: "Ilova sozlamalarida joylashuvni ulashishni o'chiring. Maktab, uy yoki odatiy marshrut ko'rsatuvchi suratlar joylashtirmang.",
      ru: "Отключите публикацию местоположения в настройках приложения. Не публикуйте фото, раскрывающие вашу школу, дом или распорядок дня.",
    },
    good_msg: {
      en: "Good call. Keeping your location private significantly reduces your risk profile.",
      uz: "To'g'ri qaror. Joylashuvingizni maxfiy saqlash xavf profilingizni sezilarli kamaytiradi.",
      ru: "Правильно. Сохранение конфиденциальности местоположения значительно снижает ваш профиль риска.",
    },
  },
  {
    id: "public_wifi",
    text: {
      en: "Do you log into bank accounts or social media on public Wi-Fi (café, mall, transport)?",
      uz: "Jamoat Wi-Fi tarmog'ida (kafe, savdo markazi, transport) bank yoki ijtimoiy tarmoq hisoblariga kirasizmi?",
      ru: "Входите ли вы в банковские аккаунты или соцсети через публичный Wi-Fi (кафе, торговый центр, транспорт)?",
    },
    hint: {
      en: "Unencrypted public networks allow other users to intercept your traffic.",
      uz: "Shifrlangan bo'lmagan jamoat tarmoqlari boshqa foydalanuvchilarga sizning trafigingizni ushlab olishga imkon beradi.",
      ru: "Незашифрованные публичные сети позволяют другим пользователям перехватывать ваш трафик.",
    },
    badAnswer: true,
    action: {
      en: "Avoid sensitive logins on public Wi-Fi. If unavoidable, use a VPN. Turn off auto-connect to open networks in your phone settings.",
      uz: "Jamoat Wi-Fi tarmog'ida muhim hisoblarga kirishdan qoching. Iloji bo'lmasa, VPN ishlating. Telefon sozlamalarida ochiq tarmoqlarga avtomatik ulanishni o'chiring.",
      ru: "Избегайте входа в важные аккаунты через публичный Wi-Fi. Если необходимо — используйте VPN. Отключите автоподключение к открытым сетям в настройках телефона.",
    },
    good_msg: {
      en: "Smart! Public Wi-Fi is one of the easiest attack vectors for local attackers.",
      uz: "Aqlli! Jamoat Wi-Fi local hujumchilar uchun eng oson hujum kanallaridan biridir.",
      ru: "Умно! Публичный Wi-Fi — один из самых простых векторов атаки для местных злоумышленников.",
    },
  },
];

type Answers = Record<string, boolean | null>;
type Phase = "quiz" | "result";

export default function Checklist() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("quiz");
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  const L = {
    title: { en: "Your Security Checklist", uz: "Xavfsizlik tekshiruvi", ru: "Ваш чеклист безопасности" },
    subtitle: {
      en: "Answer 6 questions about your habits. We'll generate a personalised safety action plan.",
      uz: "Odatlaringiz haqida 6 ta savolga javob bering. Biz shaxsiy xavfsizlik harakat rejasini yaratamiz.",
      ru: "Ответьте на 6 вопросов о своих привычках. Мы создадим персональный план безопасности.",
    },
    yes: { en: "Yes", uz: "Ha", ru: "Да" },
    no: { en: "No", uz: "Yo'q", ru: "Нет" },
    next: { en: "Next", uz: "Keyingisi", ru: "Далее" },
    result_title: { en: "Your Personal Security Plan", uz: "Shaxsiy xavfsizlik rejangiz", ru: "Ваш персональный план безопасности" },
    result_subtitle: {
      en: "Based on your answers — here are the actions that matter most for you.",
      uz: "Javoblaringiz asosida — siz uchun eng muhim bo'lgan harakatlar.",
      ru: "На основе ваших ответов — вот действия, наиболее важные для вас.",
    },
    needs_action: { en: "Action Needed", uz: "Harakat talab qilinadi", ru: "Требует действий" },
    already_good: { en: "Already doing well", uz: "Allaqachon yaxshi", ru: "Уже делаете хорошо" },
    print: { en: "Print Checklist", uz: "Cheklistni chop etish", ru: "Распечатать чеклист" },
    retake: { en: "Retake Assessment", uz: "Qayta baholash", ru: "Пройти снова" },
    q_of: { en: "Question", uz: "Savol", ru: "Вопрос" },
    all_good: { en: "Excellent — you have great security habits! Keep it up.", uz: "Ajoyib — sizda zo'r xavfsizlik odatlari bor! Davom eting.", ru: "Отлично — у вас отличные привычки безопасности! Продолжайте." },
  };

  const t = (key: keyof typeof L) => {
    const v = L[key];
    return (v as any)[language] ?? (v as any).en;
  };

  const tf = (obj: { en: string; uz: string; ru: string }) => obj[language] ?? obj.en;

  const handleAnswer = (val: boolean) => {
    const q = QUESTIONS[currentIdx];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setPhase("result");
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setPhase("quiz");
  };

  if (phase === "quiz") {
    const q = QUESTIONS[currentIdx];
    const pct = Math.round((currentIdx / QUESTIONS.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>{t("q_of")} {currentIdx + 1} / {QUESTIONS.length}</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">{t("q_of")} {currentIdx + 1}</p>
          <h2 className="text-xl md:text-2xl font-bold leading-snug">{tf(q.text)}</h2>
          <p className="text-sm text-muted-foreground italic flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            {tf(q.hint)}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleAnswer(true)}
              className="h-14 rounded-xl border-2 border-border hover:border-green-500/60 hover:bg-green-500/5 font-bold text-lg transition-all"
            >
              {t("yes")}
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="h-14 rounded-xl border-2 border-border hover:border-destructive/60 hover:bg-destructive/5 font-bold text-lg transition-all"
            >
              {t("no")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result phase
  const needs = QUESTIONS.filter(q => answers[q.id] === q.badAnswer);
  const good = QUESTIONS.filter(q => answers[q.id] !== q.badAnswer);

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-8" id="checklist-result">
      <div className="text-center space-y-3">
        <div className="mx-auto w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black">{t("result_title")}</h1>
        <p className="text-muted-foreground">{t("result_subtitle")}</p>
      </div>

      {needs.length === 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
          <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
          <p className="font-bold text-lg text-green-500">{t("all_good")}</p>
        </div>
      )}

      {needs.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            {t("needs_action")} ({needs.length})
          </h2>
          <div className="space-y-3">
            {needs.map(q => (
              <div key={q.id} className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 space-y-2">
                <p className="font-bold text-sm text-destructive uppercase tracking-wide">{t("needs_action")}</p>
                <p className="font-semibold">{tf(q.text)}</p>
                <div className="flex items-start gap-2 pt-1">
                  <ChevronRight className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">{tf(q.action)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {good.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {t("already_good")} ({good.length})
          </h2>
          <div className="space-y-3">
            {good.map(q => (
              <div key={q.id} className="bg-green-500/5 border border-green-500/20 rounded-xl p-5 space-y-2">
                <p className="font-semibold">{tf(q.text)}</p>
                <p className="text-sm text-green-400">{tf(q.good_msg)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 flex-wrap print:hidden">
        <Button size="lg" className="font-bold" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" />
          {t("print")}
        </Button>
        <Button size="lg" variant="outline" className="font-bold" onClick={reset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t("retake")}
        </Button>
      </div>
    </div>
  );
}
