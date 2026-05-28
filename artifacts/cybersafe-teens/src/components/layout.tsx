import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Shield, BookOpen, AlertTriangle, KeyRound, Trophy,
  LayoutDashboard, Globe, Zap, ClipboardCheck, Info, Menu, X, MessageSquare
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const PRIMARY_NAV = [
  { href: "/", icon: Shield, label: "nav_home" },
  { href: "/lessons", icon: BookOpen, label: "nav_lessons" },
  { href: "/simulator", icon: AlertTriangle, label: "nav_simulator" },
  { href: "/password", icon: KeyRound, label: "nav_password" },
  { href: "/scams", icon: MessageSquare, label: "nav_scams" },
  { href: "/leaderboard", icon: Trophy, label: "nav_leaderboard" },
  { href: "/dashboard", icon: LayoutDashboard, label: "nav_dashboard" },
];

const TOOLS_NAV = [
  { href: "/challenge", icon: Zap, label: "nav_challenge" },
  { href: "/checklist", icon: ClipboardCheck, label: "nav_checklist" },
  { href: "/about", icon: Info, label: "nav_about" },
];

const MOBILE_NAV = [
  { href: "/", icon: Shield, label: "nav_home" },
  { href: "/lessons", icon: BookOpen, label: "nav_lessons" },
  { href: "/simulator", icon: AlertTriangle, label: "nav_simulator" },
  { href: "/dashboard", icon: LayoutDashboard, label: "nav_dashboard" },
  { href: "/challenge", icon: Zap, label: "nav_challenge" },
];

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  const { t } = useLanguage();
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {t(label)}
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row dark">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Shield className="w-6 h-6" />
          <span className="text-base">{t("app_title")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted p-0.5 rounded-lg">
            {(["en", "uz", "ru"] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${language === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-0 w-64 bg-card border-l border-border h-full p-4 space-y-1 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {[...PRIMARY_NAV, ...TOOLS_NAV].map(item => (
              <div key={item.href} onClick={() => setMobileMenuOpen(false)}>
                <NavItem {...item} active={isActive(item.href)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-card border-r border-border h-screen sticky top-0 overflow-y-auto">
        <div className="p-5 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5 font-bold text-lg text-primary mb-6">
            <Shield className="w-7 h-7" />
            <span>CyberSafe</span>
          </div>

          {/* Language switcher */}
          <div className="flex bg-muted p-1 rounded-lg mb-6">
            {(["en", "uz", "ru"] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-1 text-xs font-bold rounded transition-colors ${language === lang ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Main nav */}
          <nav className="space-y-0.5 flex-1">
            {PRIMARY_NAV.map(item => (
              <NavItem key={item.href} {...item} active={isActive(item.href)} />
            ))}

            <div className="pt-4 pb-1">
              <p className="px-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-1">
                {t("tools_section")}
              </p>
            </div>

            {TOOLS_NAV.map(item => (
              <NavItem key={item.href} {...item} active={isActive(item.href)} />
            ))}
          </nav>

          {/* Language label */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground px-4">
              <Globe className="w-3.5 h-3.5" />
              <span>EN / O'zbekcha / Русский</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-x-hidden">
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav — 5 key items */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-2 z-50">
          {MOBILE_NAV.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center p-2 min-w-[52px] transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[9px] font-medium">{t(label)}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
