import React from 'react';
import { SupportedLanguage } from '../types/analysis';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  variant?: 'navbar' | 'compact' | 'pills';
}

const languages: { code: SupportedLanguage; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = 'navbar',
}) => {
  if (variant === 'pills') {
    return (
      <div className="inline-flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-inner" role="group" aria-label="Select language">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-1 ring-sky-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              aria-pressed={isActive}
            >
              <span>{lang.nativeName}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 rounded-xl hover:border-slate-700 transition">
      <Globe className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
        aria-label="Language selector"
        className="bg-transparent text-xs md:text-sm text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
            {lang.nativeName} ({lang.label})
          </option>
        ))}
      </select>
    </div>
  );
};
