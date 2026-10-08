import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { SafetyActions as SafetyActionsType, SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface SafetyActionsProps {
  actions: SafetyActionsType;
  localizedActions?: {
    kannada?: SafetyActionsType;
    hindi?: SafetyActionsType;
  };
  currentLanguage: SupportedLanguage;
  isHighRisk: boolean;
}

export const SafetyActions: React.FC<SafetyActionsProps> = ({
  actions,
  localizedActions,
  currentLanguage,
  isHighRisk,
}) => {
  const t = translations[currentLanguage];

  // Resolve localized actions if provided
  let activeActions = actions;
  if (currentLanguage === 'kn' && localizedActions?.kannada) {
    activeActions = localizedActions.kannada;
  } else if (currentLanguage === 'hi' && localizedActions?.hindi) {
    activeActions = localizedActions.hindi;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* What You MUST NOT DO (Placed first or prominently for High-Risk Scams!) */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isHighRisk
            ? 'bg-rose-950/25 border-rose-500/40 shadow-xl shadow-rose-950/30'
            : 'bg-slate-900/80 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-4">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{t.doNotTitle}</span>
              {isHighRisk && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">
                  Critical
                </span>
              )}
            </h4>
            <span className="text-xs text-rose-300/80">
              Immediate precautions to avoid losing money
            </span>
          </div>
        </div>

        <ul className="space-y-3">
          {activeActions.dont.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-slate-200"
            >
              <div className="mt-0.5 p-0.5 rounded-full bg-rose-500/20 text-rose-400 shrink-0">
                <XCircle className="w-4 h-4" />
              </div>
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What You SHOULD DO */}
      <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 shadow-xl shadow-emerald-950/20">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white tracking-tight">
              {t.protectTitle}
            </h4>
            <span className="text-xs text-emerald-300/80">
              Official verification steps
            </span>
          </div>
        </div>

        <ul className="space-y-3">
          {activeActions.do.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs sm:text-sm text-slate-200"
            >
              <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="leading-relaxed font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
