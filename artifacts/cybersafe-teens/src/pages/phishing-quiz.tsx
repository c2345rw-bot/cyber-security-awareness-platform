import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Answer {
  text: string;
  correct: boolean;
  explanation: string;
}

interface Question {
  id: number;
  scenario: string;
  context?: string;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: "Тебе пишет незнакомец в Telegram: «Привет! Я из администрации, твой аккаунт взломают через 2 часа. Перейди по ссылке и введи код, чтобы спасти его» — что делать?",
    context: "💬 Telegram · от незнакомца",
    answers: [
      {
        text: "Перейти по ссылке и ввести код",
        correct: false,
        explanation: "Это классический фишинг. Ссылка ведёт на поддельную страницу — введя код, ты сам отдашь доступ к своему аккаунту злоумышленнику.",
      },
      {
        text: "Ничего не делать и закрыть переписку",
        correct: false,
        explanation: "Игнорировать — лучше, чем переходить по ссылке, но всё же стоит сообщить в поддержку Telegram об этом аккаунте, чтобы защитить других.",
      },
      {
        text: "Написать в поддержку через официальный бот @SpamBot или раздел «Помощь» в настройках",
        correct: true,
        explanation: "Верно! Telegram никогда не пишет пользователям с предупреждениями через случайные аккаунты. Единственный официальный способ — @SpamBot или раздел «Помощь» в настройках самого приложения. Заблокируй отправителя и нажми «Пожаловаться».",
      },
      {
        text: "Спросить совета у друга",
        correct: false,
        explanation: "Друг, скорее всего, не знает, настоящее ли это предупреждение. Лучше сразу обратиться к официальной поддержке и не терять время.",
      },
    ],
  },
  {
    id: 2,
    scenario: "Тебе пишет «друг» в личке Telegram или Instagram с просьбой срочно скинуть деньги на незнакомый номер карты — он говорит, что попал в беду.",
    context: "💬 Telegram / Instagram · от «знакомого»",
    answers: [
      {
        text: "Перевести деньги — друг в беде",
        correct: false,
        explanation: "Аккаунт твоего друга, скорее всего, взломан. Мошенники используют доверие к знакомым людям — именно поэтому эта схема работает.",
      },
      {
        text: "Позвонить другу по телефону и лично уточнить ситуацию",
        correct: true,
        explanation: "Правильно! Один звонок разрушает всю схему. Если друг не отвечает — напиши другим общим знакомым или его родителям. Никогда не переводи деньги по просьбе, которую не можешь проверить голосом.",
      },
      {
        text: "Написать в ответ и спросить подробности",
        correct: false,
        explanation: "Мошенники готовы к переписке и придумают убедительную историю. Текстовая переписка не доказывает, что это действительно твой друг — нужен голосовой звонок.",
      },
      {
        text: "Заблокировать и забыть",
        correct: false,
        explanation: "Лучше, чем переводить деньги, но стоит также сообщить самому другу (другим способом), что его аккаунт взломан, — пока мошенники не обманули других.",
      },
    ],
  },
  {
    id: 3,
    scenario: "В Telegram или Instagram тебе предлагают лёгкую работу: лайкать видео и получать 500 000 сум в день. Единственное условие — сначала заплатить «страховой взнос» 50 000 сум.",
    context: "📢 Рекламный аккаунт · фейковая вакансия",
    answers: [
      {
        text: "Заплатить — 50 000 это немного, а заработать можно больше",
        correct: false,
        explanation: "Ты не получишь ни работы, ни денег обратно. «Страховой взнос» — стандартный приём авансового мошенничества. После оплаты аккаунт исчезнет.",
      },
      {
        text: "Спросить, можно ли сначала попробовать бесплатно",
        correct: false,
        explanation: "Мошенники скажут «нет» или придумают новое условие. Сам факт того, что легальная работа требует предоплату — уже красный флаг.",
      },
      {
        text: "Это мошенничество — любая работа, требующая предоплату, является аферой",
        correct: true,
        explanation: "Верно! Золотое правило: легальный работодатель никогда не просит оплату заранее. «Лайкать видео за деньги» — не существующая профессия. Заблокируй аккаунт и сообщи о нём.",
      },
      {
        text: "Попросить показать отзывы других сотрудников",
        correct: false,
        explanation: "Отзывы могут быть фейковыми — их легко сфабриковать. Никакие «доказательства» не делают предоплату за работу законной.",
      },
    ],
  },
  {
    id: 4,
    scenario: "Тебе приходит SMS: «Ваш аккаунт Instagram будет удалён через 24 часа. Подтвердите данные здесь: bit.ly/insta-confirm»",
    context: "📱 SMS · сокращённая ссылка",
    answers: [
      {
        text: "Перейти по ссылке и подтвердить данные — аккаунт важен",
        correct: false,
        explanation: "Это фишинговая страница, которая украдёт твой логин и пароль. Instagram никогда не предупреждает об удалении через SMS со сторонними ссылками.",
      },
      {
        text: "Не переходить по ссылке — открыть Instagram напрямую в приложении и проверить уведомления",
        correct: true,
        explanation: "Правильно! Если бы аккаунт действительно был под угрозой, уведомление появилось бы внутри самого приложения или на email, привязанный к аккаунту. Сокращённые ссылки в SMS — главный признак фишинга.",
      },
      {
        text: "Переслать ссылку другу и попросить проверить",
        correct: false,
        explanation: "Ты можешь подвергнуть опасности друга. Лучше проверить официальные каналы Instagram самостоятельно.",
      },
      {
        text: "Ответить на SMS и попросить объяснений",
        correct: false,
        explanation: "Ответ на мошеннический номер подтверждает, что номер активен — это может привести к ещё большему количеству спама и попыток обмана.",
      },
    ],
  },
  {
    id: 5,
    scenario: "Ты скачал взломанную версию популярной игры не из официального магазина. Теперь телефон заметно тормозит, батарея садится быстро, и постоянно появляется реклама.",
    context: "📲 Взломанное приложение · признаки заражения",
    answers: [
      {
        text: "Просто удалить игру — и всё пройдёт",
        correct: false,
        explanation: "Удалить игру необходимо, но недостаточно. Вредоносные программы часто устанавливают дополнительные компоненты, которые остаются после удаления основного приложения.",
      },
      {
        text: "Перезагрузить телефон несколько раз",
        correct: false,
        explanation: "Перезагрузка не удаляет вредоносный код. Проблема не в зависших процессах, а в установленной программе.",
      },
      {
        text: "Удалить игру, запустить антивирусную проверку и сменить пароли от важных аккаунтов",
        correct: true,
        explanation: "Верно! Три обязательных шага: (1) удалить заражённое приложение, (2) проверить устройство антивирусом (Malwarebytes, Kaspersky), (3) сменить пароли от Telegram, Instagram и банковских приложений — они могли быть перехвачены. В будущем скачивай приложения только из Google Play или App Store.",
      },
      {
        text: "Подождать, может само пройдёт",
        correct: false,
        explanation: "Само не пройдёт. Рекламный вирус или шпионское ПО продолжат работу в фоне, пока они не будут явно удалены.",
      },
    ],
  },
];

type Phase = "intro" | "question" | "explanation" | "result";

export default function PhishingQuiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;

  const handleStart = () => setPhase("question");

  const handleSelect = (answerIndex: number) => {
    if (phase === "explanation") return;
    const isCorrect = question.answers[answerIndex].correct;
    setSelectedIndex(answerIndex);
    setScore(prev => prev + (isCorrect ? 1 : 0));
    setAnswers(prev => [...prev, isCorrect]);
    setPhase("explanation");
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setPhase("result");
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
      setPhase("question");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setAnswers([]);
  };

  const resultLabel = () => {
    if (score === 5) return { label: "Эксперт по кибербезопасности", color: "text-green-400", desc: "Отлично! Ты разбираешься в фишинге лучше большинства взрослых. Поделись этим тестом с друзьями." };
    if (score >= 3) return { label: "Хорошая защита", color: "text-primary", desc: "Неплохо! Ты знаешь основные признаки мошенничества, но есть пара моментов, которые стоит повторить." };
    return { label: "Нужно быть осторожнее", color: "text-destructive", desc: "Пройди уроки раздела «Фишинг» — там разбираются именно такие ситуации. Знание спасает аккаунты и деньги." };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
          <ShieldAlert className="w-9 h-9 text-destructive" />
          Проверь себя: фишинг-тест
        </h1>
        <p className="text-muted-foreground text-lg">
          5 реальных ситуаций из Telegram и Instagram. Всё, с чем подростки сталкиваются каждый день.
        </p>
      </div>

      {/* INTRO */}
      {phase === "intro" && (
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6 animate-in fade-in">
          <div className="space-y-4 text-foreground/90">
            <p className="leading-relaxed">
              Мошенники специально выбирают Telegram и Instagram — потому что там доверяют знакомым аккаунтам
              и часто действуют второпях. Этот тест проверит, сможешь ли ты вовремя распознать угрозу.
            </p>
            <div className="grid grid-cols-3 gap-4 py-2">
              {[
                { value: "5", label: "вопросов" },
                { value: "~3", label: "минуты" },
                { value: "100%", label: "реальные случаи" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center bg-muted rounded-xl p-4">
                  <div className="text-2xl font-black text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <Button size="lg" className="w-full h-14 text-lg font-bold" onClick={handleStart}>
            Начать тест
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* QUESTION or EXPLANATION */}
      {(phase === "question" || phase === "explanation") && (
        <div className="space-y-4 animate-in fade-in">
          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Вопрос {currentIndex + 1} из {totalQuestions}</span>
            <span className="font-bold text-foreground">{Math.round(((currentIndex) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Scenario card */}
          <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
            {/* Fake message mockup */}
            <div className="bg-muted/40 border-b border-border px-5 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
              <span className="text-xs text-muted-foreground font-mono">{question.context}</span>
            </div>
            <div className="p-6">
              <p className="text-base md:text-lg font-semibold leading-relaxed">{question.scenario}</p>
            </div>
          </div>

          {/* Answer options */}
          <div className="space-y-3">
            {question.answers.map((answer, i) => {
              let style = "border-border bg-card hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
              if (phase === "explanation") {
                if (answer.correct) {
                  style = "border-green-500 bg-green-500/10 cursor-default";
                } else if (i === selectedIndex) {
                  style = "border-destructive bg-destructive/10 cursor-default";
                } else {
                  style = "border-border bg-card opacity-40 cursor-default";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={phase === "explanation"}
                  className={`w-full text-left border-2 rounded-xl p-4 transition-all duration-200 flex items-start gap-3 ${style}`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-0.5 transition-colors
                    ${phase === "explanation" && answer.correct ? "border-green-500 bg-green-500 text-white" :
                      phase === "explanation" && i === selectedIndex && !answer.correct ? "border-destructive bg-destructive text-white" :
                      "border-muted-foreground text-muted-foreground"}`}>
                    {phase === "explanation" && answer.correct ? <CheckCircle2 className="w-4 h-4" /> :
                     phase === "explanation" && i === selectedIndex && !answer.correct ? <XCircle className="w-4 h-4" /> :
                     String.fromCharCode(1072 + i) /* а б в г */}
                  </span>
                  <span className={`leading-snug text-sm md:text-base ${phase === "explanation" && answer.correct ? "text-green-400 font-semibold" : phase === "explanation" && i === selectedIndex && !answer.correct ? "text-destructive" : "text-foreground"}`}>
                    {answer.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {phase === "explanation" && selectedIndex !== null && (
            <div className={`rounded-2xl p-5 border-2 animate-in slide-in-from-bottom-3 space-y-1 ${question.answers[selectedIndex].correct ? "bg-green-500/8 border-green-500/40" : "bg-destructive/8 border-destructive/40"}`}>
              <div className="flex items-center gap-2 font-bold">
                {question.answers[selectedIndex].correct
                  ? <><CheckCircle2 className="w-5 h-5 text-green-500" /><span className="text-green-400">Правильно!</span></>
                  : <><XCircle className="w-5 h-5 text-destructive" /><span className="text-destructive">Неправильно</span></>
                }
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {question.answers[selectedIndex].explanation}
              </p>
              {!question.answers[selectedIndex].correct && (
                <p className="text-sm text-green-400 font-medium mt-2">
                  Правильный ответ: {question.answers.find(a => a.correct)?.text}
                </p>
              )}
            </div>
          )}

          {/* Next button */}
          {phase === "explanation" && (
            <Button size="lg" className="w-full h-13 font-bold" onClick={handleNext}>
              {currentIndex + 1 >= totalQuestions ? "Посмотреть результат" : "Следующий вопрос"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (() => {
        const result = resultLabel();
        return (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-card border-2 border-border rounded-2xl p-8 text-center space-y-5">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
              <div>
                <div className="text-6xl font-black mb-2">
                  <span className="text-primary">{score}</span>
                  <span className="text-muted-foreground text-3xl">/{totalQuestions}</span>
                </div>
                <p className={`text-xl font-bold ${result.color}`}>{result.label}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-sm mx-auto">{result.desc}</p>
              </div>

              {/* Per-question recap */}
              <div className="flex justify-center gap-2 py-2">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${correct ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-destructive/20 text-destructive border border-destructive/40"}`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" variant="outline" className="flex-1 font-bold" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Пройти заново
              </Button>
              <Link href="/simulator" className="flex-1">
                <Button size="lg" className="w-full font-bold">
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Полный симулятор
                </Button>
              </Link>
            </div>

            {score < 5 && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground/90">
                <p className="font-bold text-primary mb-1">Хочешь узнать больше?</p>
                <p>Пройди урок{" "}
                  <Link href="/lessons" className="text-primary underline underline-offset-2 font-semibold">
                    «Фишинг и социальная инженерия»
                  </Link>{" "}
                  — там разбираются именно такие случаи с примерами и объяснениями.
                </p>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
