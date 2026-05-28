import { useState } from "react";
import { useGetSimulatorScenarios, useSubmitSimulatorAnswer } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/hooks/use-auth";
import { Shield, AlertTriangle, MessageCircle, Mail, HelpCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Simulator() {
  const { t, language } = useLanguage();
  const { username } = useAuth();
  
  const { data: scenarios, isLoading } = useGetSimulatorScenarios();
  const submitAnswer = useSubmitSimulatorAnswer();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<any>(null);

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return '';
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || '';
  };

  const handleAnswer = async (isScam: boolean) => {
    if (!username || !scenarios || !scenarios[currentIndex]) return;
    try {
      const res = await submitAnswer.mutateAsync({
        data: {
          scenarioId: scenarios[currentIndex].id,
          username,
          answeredScam: isScam
        }
      });
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  const nextScenario = () => {
    setResult(null);
    setCurrentIndex((prev) => (scenarios && prev < scenarios.length - 1 ? prev + 1 : 0));
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!scenarios || scenarios.length === 0) {
    return <div>{t("empty_state")}</div>;
  }

  const scenario = scenarios[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("simulator_title")}</h1>
        <p className="text-muted-foreground mt-2">{t("is_this_safe")}</p>
      </div>

      {!username && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg font-medium">
          {t("enter_username")}
        </div>
      )}

      {/* Message Preview UI */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
        {/* Fake Header based on platform */}
        <div className="bg-muted p-4 border-b border-border flex items-center gap-3">
          {scenario.platform.toLowerCase().includes('telegram') && <MessageCircle className="w-5 h-5 text-blue-500" />}
          {scenario.platform.toLowerCase().includes('email') && <Mail className="w-5 h-5 text-red-500" />}
          {scenario.platform.toLowerCase().includes('instagram') && <div className="w-5 h-5 rounded bg-gradient-to-tr from-yellow-400 to-purple-500" />}
          <div className="font-bold">{scenario.senderName || 'Unknown Sender'}</div>
        </div>
        
        {/* Fake Message Body */}
        <div className="p-6 md:p-8 min-h-48 flex items-center justify-center bg-background">
          <div className="bg-card border border-border p-4 rounded-xl max-w-sm w-full shadow-sm">
            <p className="whitespace-pre-wrap">{getLocalizedField(scenario, 'message')}</p>
          </div>
        </div>

        {/* Action Buttons (hidden if answered) */}
        {!result && (
          <div className="p-6 bg-card border-t border-border grid grid-cols-2 gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 font-bold border-green-500/50 hover:bg-green-500/10 text-green-600 dark:text-green-500"
              onClick={() => handleAnswer(false)}
              disabled={!username || submitAnswer.isPending}
            >
              <Shield className="mr-2 w-5 h-5" />
              {t("btn_safe")}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 font-bold border-destructive/50 hover:bg-destructive/10 text-destructive"
              onClick={() => handleAnswer(true)}
              disabled={!username || submitAnswer.isPending}
            >
              <AlertTriangle className="mr-2 w-5 h-5" />
              {t("btn_scam")}
            </Button>
          </div>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 space-y-6">
          <div className={`p-6 rounded-2xl border-2 ${result.correct ? 'bg-green-500/10 border-green-500/50' : 'bg-destructive/10 border-destructive/50'}`}>
            <div className="flex items-center gap-3 mb-4">
              {result.correct ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-destructive" />
              )}
              <h3 className={`text-2xl font-bold ${result.correct ? 'text-green-600 dark:text-green-500' : 'text-destructive'}`}>
                {result.correct ? t("correct") : t("incorrect")}
              </h3>
            </div>
            
            <div className="space-y-4 text-foreground">
              <p className="text-lg">{getLocalizedField(result, 'explanation')}</p>
              
              {result.isScam && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="font-bold mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    {t("warning_signs")}
                  </div>
                  <p className="text-muted-foreground">{getLocalizedField(result, 'warningSigns')}</p>
                </div>
              )}
            </div>
          </div>

          <Button size="lg" className="w-full h-14 font-bold" onClick={nextScenario}>
            <RefreshCw className="mr-2 w-5 h-5" />
            {t("next_scenario")}
          </Button>
        </div>
      )}
    </div>
  );
}
