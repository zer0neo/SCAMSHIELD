import React, { useState } from 'react';
import { Shield, Sparkles, Menu, X, PhoneCall } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onNavigate: (section: 'analyzer' | 'how-it-works' | 'safety' | 'home') => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigate,
  onEmergencyClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLanguage];

  const handleNavClick = (section: 'analyzer' | 'how-it-works' | 'safety' | 'home') => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070B14]/85 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
            aria-label="ScamShield Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-sky-400 opacity-20 blur group-hover:opacity-40 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  SCAM<span className="text-sky-400">SHIELD</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t.badgeProtection}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block leading-none mt-0.5">
                Vernacular UPI & Scam Protection
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('analyzer')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
            >
              {t.navAnalyze}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
            >
              {t.navHowItWorks}
            </button>
            <button
              onClick={() => handleNavClick('safety')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
            >
              {t.navSafety}
            </button>

            {/* Helpline quick dial button */}
            <button
              onClick={onEmergencyClick}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/25 hover:bg-rose-500/20 transition"
              title="National Cyber Crime Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.navEmergency}</span>
            </button>
          </nav>

          {/* Right Area: Language Selector & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              variant="navbar"
            />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleNavClick('analyzer')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-sky-400 transition"
            >
              {t.navAnalyze}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-sky-400 transition"
            >
              {t.navHowItWorks}
            </button>
            <button
              onClick={() => handleNavClick('safety')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-sky-400 transition"
            >
              {t.navSafety}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>{t.languageSelectLabel}</span>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                variant="pills"
              />
            </div>

            <button
              onClick={() => {
                onEmergencyClick();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30"
            >
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>National Cyber Helpline (1930)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
