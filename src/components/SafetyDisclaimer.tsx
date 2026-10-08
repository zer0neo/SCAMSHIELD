import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface SafetyDisclaimerProps {
  currentLanguage: SupportedLanguage;
}

export const SafetyDisclaimer: React.FC<SafetyDisclaimerProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <div className="py-4 px-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
      <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
      <span>{t.disclaimerText}</span>
    </div>
  );
};
