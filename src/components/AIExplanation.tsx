import React from 'react';
import { Sparkles, Languages } from 'lucide-react';
import { MultilingualExplanation, SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface AIExplanationProps {
  explanation: MultilingualExplanation;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const AIExplanation: React.FC<AIExplanationProps> = ({
  explanation,
  currentLanguage,
  onLanguageChange,
}) => {
  const t = translations[currentLanguage];

  // Pick current text based on selected language
  const activeText =
    currentLanguage === 'kn'
      ? explanation.kannada
      : currentLanguage === 'hi'
      ? explanation.hindi
      : explanation.english;

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950 border border-sky-500/30 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with instant vernacular toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {t.aiExplanationTitle}
            </h3>
            <span className="text-xs text-slate-400">
              Clear vernacular breakdown for all family members
            </span>
          </div>
        </div>

        {/* Vernacular Language Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-center">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentLanguage === 'en'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('kn')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentLanguage === 'kn'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ಕನ್ನಡ
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentLanguage === 'hi'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Vernacular Text Body */}
      <div className="prose prose-invert max-w-none">
        <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
          {activeText}
        </p>
      </div>

      <div className="pt-2 flex items-center gap-2 text-xs text-sky-400 font-medium">
        <Languages className="w-3.5 h-3.5" />
        <span>Instantly switchable between English, Kannada and Hindi without reloading</span>
      </div>
    </div>
  );
};
