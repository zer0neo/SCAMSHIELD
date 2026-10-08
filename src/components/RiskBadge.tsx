import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Classification, SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface RiskBadgeProps {
  classification: Classification;
  scamType?: string;
  currentLanguage: SupportedLanguage;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  classification,
  scamType,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  if (classification === 'SCAM') {
    return (
      <div className="flex flex-col items-center sm:items-start gap-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-300 font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-rose-950/40">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{t.resultsHeaderScam}</span>
        </div>
        {scamType && (
          <span className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
            Category: <span className="text-rose-400 font-bold">{scamType}</span>
          </span>
        )}
      </div>
    );
  }

  if (classification === 'SUSPICIOUS') {
    return (
      <div className="flex flex-col items-center sm:items-start gap-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-300 font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-amber-950/40">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{t.resultsHeaderSuspicious}</span>
        </div>
        {scamType && (
          <span className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
            Category: <span className="text-amber-400 font-bold">{scamType}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center sm:items-start gap-1">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-lg shadow-emerald-950/40">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>{t.resultsHeaderSafe}</span>
      </div>
      {scamType && (
        <span className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
          Type: <span className="text-emerald-400 font-bold">{scamType}</span>
        </span>
      )}
    </div>
  );
};
