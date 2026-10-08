import React from 'react';
import { PhoneCall, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface EmergencyHelplineProps {
  currentLanguage: SupportedLanguage;
}

export const EmergencyHelpline: React.FC<EmergencyHelplineProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <div className="rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 text-left">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
          <PhoneCall className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h4 className="text-base font-extrabold text-white tracking-tight">
            {t.cyberHelpTitle}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {t.cyberHelpText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
        <a
          href="tel:1930"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 transition"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 1930</span>
        </a>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition"
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
