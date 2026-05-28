import { useState, useEffect } from "react";
import { useCheckPassword } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { KeyRound, Clock, ShieldCheck, AlertTriangle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Password() {
  const { t, language } = useLanguage();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const checkPassword = useCheckPassword();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (password.length > 0) {
        try {
          const res = await checkPassword.mutateAsync({ data: { password } });
          setResult(res);
        } catch (e) {
          console.error(e);
        }
      } else {
        setResult(null);
      }
    }, 300); // Debounce
    return () => clearTimeout(timer);
  }, [password]);

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return '';
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || '';
  };

  const getScoreColor = (score: number) => {
    switch(score) {
      case 0: return 'bg-destructive';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-primary';
      case 4: return 'bg-green-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <KeyRound className="w-8 h-8 text-primary" />
          {t("password_title")}
        </h1>
        <p className="text-muted-foreground mt-2">{t("home_hero_subtitle")}</p>
      </div>

      <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm">
        <div className="relative mb-8">
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder={t("password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-16 text-xl pl-6 pr-14 font-mono bg-background border-2 focus-visible:ring-primary"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>

        {result ? (
          <div className="space-y-8 animate-in fade-in">
            {/* Strength Meter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-bold">
                <span className="uppercase tracking-wider text-muted-foreground text-sm">Strength</span>
                <span className={result.score >= 3 ? 'text-green-500' : 'text-orange-500'}>{result.label}</span>
              </div>
              <div className="flex gap-2 h-3">
                {[0,1,2,3].map((i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-colors duration-500 ${i < result.score ? getScoreColor(result.score) : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Crack Time */}
            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl">
              <Clock className="w-8 h-8 text-muted-foreground shrink-0" />
              <div>
                <div className="text-sm text-muted-foreground font-medium">{t("crack_time")}</div>
                <div className="text-xl font-bold text-foreground">{getLocalizedField(result, 'timeToCrack')}</div>
              </div>
            </div>

            {/* Tips & Checks */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4">{t("password_tips")}</h4>
                <ul className="space-y-2">
                  {getLocalizedField(result, 'tips')?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                  {(!getLocalizedField(result, 'tips') || getLocalizedField(result, 'tips').length === 0) && (
                    <li className="text-green-500 font-medium text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Looks good!
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-background border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Length (8+)</span>
                  {result.length >= 8 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">✕</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uppercase</span>
                  {result.hasUppercase ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">✕</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lowercase</span>
                  {result.hasLowercase ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">✕</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Numbers</span>
                  {result.hasNumbers ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">✕</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Symbols</span>
                  {result.hasSymbols ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <span className="text-muted-foreground">✕</span>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground flex flex-col items-center">
            <ShieldCheck className="w-16 h-16 opacity-20 mb-4" />
            <p>Start typing a password to see its strength.</p>
            <p className="text-sm mt-2 opacity-70">We never store or log the passwords you test.</p>
          </div>
        )}
      </div>
    </div>
  );
}
