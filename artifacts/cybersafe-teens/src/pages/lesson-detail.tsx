import { useState } from "react";
import { useRoute } from "wouter";
import { useGetLesson, useGetQuiz, useSubmitQuiz, useMarkLessonComplete, getGetUserProgressQueryKey } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { Shield, BookOpen, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function LessonDetail() {
  const [, params] = useRoute("/lessons/:id");
  const id = Number(params?.id);
  const { t, language } = useLanguage();
  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { data: lesson, isLoading: isLessonLoading } = useGetLesson(id);
  const { data: quizQuestions } = useGetQuiz(id);
  const submitQuiz = useSubmitQuiz();
  const markComplete = useMarkLessonComplete();

  const [mode, setMode] = useState<'read' | 'quiz' | 'result'>('read');
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizResult, setQuizResult] = useState<any>(null);

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return '';
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || '';
  };

  const handleStartQuiz = () => {
    setMode('quiz');
    setAnswers([]);
    setCurrentQuestionIdx(0);
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (quizQuestions && currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    if (!username || !quizQuestions) return;
    try {
      const result = await submitQuiz.mutateAsync({
        data: {
          lessonId: id,
          username,
          answers: answers
        }
      });
      setQuizResult(result);
      setMode('result');
      
      if (result.passed) {
        await markComplete.mutateAsync({
          data: {
            lessonId: id,
            username,
            quizScore: result.score
          }
        });
        queryClient.invalidateQueries({ queryKey: getGetUserProgressQueryKey({ username }) });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLessonLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!lesson) {
    return <div>{t("empty_state")}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {mode === 'read' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <span className="text-xs font-bold px-2 py-1 bg-muted rounded text-muted-foreground uppercase tracking-wider">
              {t("level")} {lesson.level}
            </span>
            <h1 className="text-3xl md:text-4xl font-black">{getLocalizedField(lesson, 'title')}</h1>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-lg leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: getLocalizedField(lesson, 'content') }} />
            
            {getLocalizedField(lesson, 'realExample') && (
              <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-xl mt-8">
                <h3 className="flex items-center gap-2 text-destructive font-bold text-xl mb-4">
                  <AlertTriangle className="w-6 h-6" />
                  {t("real_example")}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: getLocalizedField(lesson, 'realExample') }} />
              </div>
            )}
            
            {getLocalizedField(lesson, 'actionSteps') && (
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl mt-8">
                <h3 className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
                  <Shield className="w-6 h-6" />
                  {t("what_to_do")}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: getLocalizedField(lesson, 'actionSteps') }} />
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-border">
            <Button size="lg" className="w-full sm:w-auto font-bold" onClick={handleStartQuiz} disabled={!username}>
              {!username ? t("enter_username") : t("take_quiz")} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {mode === 'quiz' && quizQuestions && quizQuestions.length > 0 && (
        <div className="space-y-8 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">
            <span>{t("quiz")}</span>
            <span>{currentQuestionIdx + 1} / {quizQuestions.length}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {getLocalizedField(quizQuestions[currentQuestionIdx], 'question')}
          </h2>

          <div className="space-y-3">
            {quizQuestions[currentQuestionIdx].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  answers[currentQuestionIdx] === idx 
                    ? 'border-primary bg-primary/10 text-primary font-medium' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {option[language]}
              </button>
            ))}
          </div>

          <div className="pt-8 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleNextQuestion} 
              disabled={answers[currentQuestionIdx] === undefined || submitQuiz.isPending}
            >
              {currentQuestionIdx < quizQuestions.length - 1 ? t("next_scenario") : t("submit_quiz")}
            </Button>
          </div>
        </div>
      )}

      {mode === 'result' && quizResult && (
        <div className="text-center space-y-8 py-12 animate-in fade-in slide-in-from-bottom-4">
          <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${quizResult.passed ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'}`}>
            {quizResult.passed ? <CheckCircle2 className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
          </div>
          
          <h2 className="text-3xl font-black">
            {quizResult.passed ? t("quiz_passed") : t("quiz_failed")}
          </h2>
          
          <div className="text-xl font-medium text-muted-foreground">
            {quizResult.score} / {quizResult.total}
          </div>

          {quizResult.passed && (
            <div className="text-secondary font-bold text-xl">
              +{quizResult.xpEarned} {t("xp")}
            </div>
          )}

          <div className="pt-8">
            <Button size="lg" onClick={() => window.history.back()}>
              {t("return_lessons")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
