import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Shield, BookOpen, AlertTriangle, KeyRound, Trophy, LayoutDashboard, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", icon: Shield, label: "nav_home" },
    { href: "/lessons", icon: BookOpen, label: "nav_lessons" },
    { href: "/simulator", icon: AlertTriangle, label: "nav_simulator" },
    { href: "/password", icon: KeyRound, label: "nav_password" },
    { href: "/scams", icon: Shield, label: "nav_scams" },
    { href: "/leaderboard", icon: Trophy, label: "nav_leaderboard" },
    { href: "/dashboard", icon: LayoutDashboard, label: "nav_dashboard" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row dark">
      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Shield className="w-6 h-6" />
          <span>{t("app_title")}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded text-xs font-bold ${language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>EN</button>
          <button onClick={() => setLanguage('uz')} className={`px-2 py-1 rounded text-xs font-bold ${language === 'uz' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>UZ</button>
          <button onClick={() => setLanguage('ru')} className={`px-2 py-1 rounded text-xs font-bold ${language === 'ru' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>RU</button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r border-border h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3 font-bold text-xl text-primary mb-8">
            <Shield className="w-8 h-8" />
            <span>CyberSafe</span>
          </div>

          <div className="flex bg-muted p-1 rounded-lg mb-8">
            <button onClick={() => setLanguage('en')} className={`flex-1 py-1 text-sm font-bold rounded ${language === 'en' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}>EN</button>
            <button onClick={() => setLanguage('uz')} className={`flex-1 py-1 text-sm font-bold rounded ${language === 'uz' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}>UZ</button>
            <button onClick={() => setLanguage('ru')} className={`flex-1 py-1 text-sm font-bold rounded ${language === 'ru' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground'}`}>RU</button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  data-testid={`nav-${item.href.replace('/', '') || 'home'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-x-hidden">
        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around p-2 z-50 overflow-x-auto">
          {navItems.map((item) => {
             const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
             return (
               <Link
                 key={item.href}
                 href={item.href}
                 className={`flex flex-col items-center p-2 min-w-16 ${active ? "text-primary" : "text-muted-foreground"}`}
               >
                 <item.icon className="w-5 h-5 mb-1" />
                 <span className="text-[10px] whitespace-nowrap">{t(item.label)}</span>
               </Link>
             )
          })}
        </div>
        
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
