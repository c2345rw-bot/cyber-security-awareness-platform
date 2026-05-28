import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import {
  Zap, CheckCircle2, XCircle, Trophy, RefreshCw, BookOpen,
  ChevronRight, Star, Shield, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { toast } from "sonner";

interface QuizQuestion {
  id: number;
  lessonId: number;
  questionEn: string;
  questionUz: string;
  questionRu: string;
  options: Array<{ en: string; uz: string; ru: string }>;
  correctIndex: number;
  explanationEn: string;
  explanationUz: string;
  explanationRu: string;
}

type Phase = "intro" | "question" | "feedback" | "result";

const RANK_THRESHOLDS = [
  { min: 10, label: { en: "Cyber Expert", uz: "Kiber Ekspert", ru: "Киберэксперт" }, color: "text-yellow-400", icon: Trophy },
  { min: 8, label: { en: "Advanced Defender", uz: "Ilg'or Himoyachi", ru: "Продвинутый защитник" }, color: "text-primary", icon: Shield },
  { min: 6, label: { en: "Skilled Learner", uz: "Malakali O'quvchi", ru: "Умелый ученик" }, color: "text-green-500", icon: Star },
  { min: 0, label: { en: "Beginner", uz: "Boshlang'ich", ru: "Начинающий" }, color: "text-muted-foreground", icon: BookOpen },
];

export default function Challenge() {
  const { language } = useLanguage();
  const { username } = useAuth();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const L = {
    title: { en: "Final Knowledge Challenge", uz: "Yakuniy Bilim Sinovi", ru: "Финальный тест знаний" },
    subtitle: {
      en: "10 questions drawn from all 6 topics. Prove what you've learned.",
      uz: "Barcha 6 ta mavzudan 10 ta savol. O'rgangan narsangizni isbotlang.",
      ru: "10 вопросов из всех 6 тем. Докажите, чему вы научились.",
    },
    start: { en: "Start Challenge", uz: "Sinovni Boshlash", ru: "Начать тест" },
    question_of: { en: "Question", uz: "Savol", ru: "Вопрос" },
    correct: { en: "Correct!", uz: "To'g'ri!", ru: "Правильно!" },
    wrong: { en: "Incorrect", uz: "Noto'g'ri", ru: "Неверно" },
    next: { en: "Next Question", uz: "Keyingi savol", ru: "Следующий вопрос" },
    finish: { en: "See Results", uz: "Natijalarni ko'rish", ru: "Посмотреть результаты" },
    results_title: { en: "Challenge Complete!", uz: "Sinov Tugadi!", ru: "Тест завершён!" },
    your_score: { en: "Your Score", uz: "Sizning natijangiz", ru: "Ваш результат" },
    retry: { en: "Try Again", uz: "Qayta urinish", ru: "Попробовать снова" },
    go_lessons: { en: "Review Lessons", uz: "Darslarga qaytish", ru: "Пройти уроки" },
    explanation: { en: "Explanation", uz: "Izoh", ru: "Объяснение" },
    loading: { en: "Loading questions…", uz: "Savollar yuklanmoqda…", ru: "Загрузка вопросов…" },
    error: { en: "Failed to load questions. Please try again.", uz: "Savollarni yuklashda xatolik.", ru: "Не удалось загрузить вопросы." },
    no_username: {
      en: "Set a username in your Dashboard to save your score to the leaderboard.",
      uz: "Natijangizni reytingga saqlash uchun Dashboard-da foydalanuvchi nomini kiriting.",
      ru: "Установите имя пользователя в панели управления, чтобы сохранить результат.",
    },
    rank_label: { en: "Your Rank", uz: "Sizning darajangiz", ru: "Ваш уровень" },
  };

  const t = (key: keyof typeof L) => {
    const v = L[key];
    return (v as any)[language] ?? (v as any).en;
  };

  const getField = (obj: any, base: string) => {
    const key = `${base}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] ?? obj[`${base}En`] ?? "";
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${base}/api/quiz/challenge`);
      if (!res.ok) throw new Error("fetch failed");
      const data: QuizQuestion[] = await res.json();
      setQuestions(data);
      setScore(0);
      setCurrentIdx(0);
      setSelected(null);
      setPhase("question");
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (idx: number) => {
    if (phase !== "question") return;
    setSelected(idx);
    if (idx === questions[currentIdx].correctIndex) {
      setScore(s => s + 1);
    }
    setPhase("feedback");
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setPhase("question");
    } else {
      setPhase("result");
    }
  };

  const getRank = (sc: number) => {
    return RANK_THRESHOLDS.find(r => sc >= r.min) ?? RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
  };

  const pct = questions.length > 0 ? Math.round((currentIdx / questions.length) * 100) : 0;

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black">{t("title")}</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { value: "10", label: { en: "Questions", uz: "Savollar", ru: "Вопросов" } },
            { value: "6", label: { en: "Topics covered", uz: "Mavzular", ru: "Темы" } },
            { value: "~5", label: { en: "Minutes", uz: "Daqiqalar", ru: "Минут" } },
          ].map(({ value, label }) => (
            <div key={value} className="bg-card border border-border rounded-xl p-4">
              <div className="text-3xl font-black text-primary">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{(label as any)[language] ?? label.en}</div>
            </div>
          ))}
        </div>

        {!username && (
          <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4 text-sm">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{t("no_username")}</p>
          </div>
        )}

        <Button size="lg" className="w-full h-14 font-bold text-lg" onClick={fetchQuestions} disabled={loading}>
          {loading ? t("loading") : <>{t("start")} <ChevronRight className="ml-2 w-5 h-5" /></>}
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  if (phase === "result") {
    const rank = getRank(score);
    const RankIcon = rank.icon;
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-8 text-center">
        <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${score >= 6 ? 'bg-yellow-500/20' : 'bg-muted'}`}>
          <RankIcon className={`w-12 h-12 ${rank.color}`} />
        </div>
        <div>
          <h2 className="text-3xl font-black">{t("results_title")}</h2>
          <p className={`text-2xl font-bold mt-2 ${rank.color}`}>
            {(rank.label as any)[language] ?? rank.label.en}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{t("your_score")}</p>
          <div className="text-6xl font-black text-primary">{score}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-primary' : 'bg-orange-500'}`}
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round((score / questions.length) * 100)}% correct
          </p>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button size="lg" className="font-bold" onClick={() => { setPhase("intro"); setQuestions([]); }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("retry")}
          </Button>
          <Link href="/lessons">
            <Button size="lg" variant="outline" className="font-bold">
              <BookOpen className="w-4 h-4 mr-2" />
              {t("go_lessons")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];
  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>{t("question_of")} {currentIdx + 1} / {questions.length}</span>
          <span>{score} {(phase === "feedback" && selected === question.correctIndex) ? "✓" : ""} correct so far</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 leading-snug">
          {getField(question, "question")}
        </h2>

        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            let cls = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
            if (phase === "feedback") {
              if (idx === question.correctIndex) cls += "border-green-500 bg-green-500/10 text-green-400";
              else if (idx === selected && idx !== question.correctIndex) cls += "border-destructive bg-destructive/10 text-destructive";
              else cls += "border-border bg-card text-muted-foreground opacity-60";
            } else {
              cls += "border-border bg-card hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={phase === "feedback"}>
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {(opt as any)[language] ?? opt.en}
                  {phase === "feedback" && idx === question.correctIndex && <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />}
                  {phase === "feedback" && idx === selected && idx !== question.correctIndex && <XCircle className="w-4 h-4 ml-auto text-destructive" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback & Next */}
      {phase === "feedback" && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <div className={`p-5 rounded-xl border-2 ${selected === question.correctIndex ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
            <div className="flex items-center gap-2 font-bold mb-2">
              {selected === question.correctIndex
                ? <><CheckCircle2 className="w-5 h-5 text-green-500" /><span className="text-green-500">{t("correct")}</span></>
                : <><XCircle className="w-5 h-5 text-destructive" /><span className="text-destructive">{t("wrong")}</span></>
              }
            </div>
            <p className="text-sm text-foreground/80">{getField(question, "explanation")}</p>
          </div>
          <Button size="lg" className="w-full font-bold" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? t("next") : t("finish")}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
