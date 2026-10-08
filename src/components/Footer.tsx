import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface FooterProps {
  currentLanguage: SupportedLanguage;
  onNavigate: (section: 'analyzer' | 'how-it-works' | 'safety' | 'home') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onNavigate }) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-[#05080F] border-t border-slate-850 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-1.5">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                SCAM<span className="text-sky-400">SHIELD</span>
              </span>
            </div>
            <p className="text-slate-400 font-normal">
              {t.tagline}
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex items-center gap-6 text-slate-300 font-medium">
            <button
              onClick={() => onNavigate('analyzer')}
              className="hover:text-white transition"
            >
              {t.navAnalyze}
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="hover:text-white transition"
            >
              {t.navHowItWorks}
            </button>
            <button
              onClick={() => onNavigate('safety')}
              className="hover:text-white transition"
            >
              {t.navSafety}
            </button>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 transition"
            >
              Cyber Helpline 1930
            </a>
          </div>

          {/* Hackathon attribution */}
          <div className="text-center md:text-right text-slate-400 space-y-1">
            <div className="inline-flex items-center gap-1.5 font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Built for Hackatopia 2026</span>
            </div>
            <div>Problem FT-01 • Vernacular Scam & UPI Fraud Shield</div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-slate-400 text-[11px] flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 ScamShield. Empowering safe digital payments across India.</span>
          <span className="hidden sm:inline">•</span>
          <span>Supports English • ಕನ್ನಡ • हिन्दी</span>
        </div>
      </div>
    </footer>
  );
};
