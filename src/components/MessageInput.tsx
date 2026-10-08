import React, { useState } from 'react';
import { ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';
import { sampleScenarios } from '../data/mockResults';
import { LanguageSelector } from './LanguageSelector';

interface MessageInputProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onAnalyze: (message: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  currentLanguage,
  onLanguageChange,
  onAnalyze,
  isLoading,
}) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const t = translations[currentLanguage];

  const handleAnalyzeClick = () => {
    if (!message.trim()) {
      setError(t.errorEmptyMessage);
      return;
    }
    setError(null);
    onAnalyze(message.trim());
  };

  const handleSelectSample = (sampleText: string, sampleId: string) => {
    setMessage(sampleText);
    setActiveSampleId(sampleId);
    setError(null);
  };

  const handleClear = () => {
    setMessage('');
    setActiveSampleId(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Quick Test Samples Bar for Hackathon Demo */}
      <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            {t.sampleMessagesLabel}
          </span>
          <span className="text-[11px] text-slate-500">1-Click Demo Scenarios</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {sampleScenarios.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSelectSample(sample.text, sample.id)}
              className={`text-left p-2.5 rounded-xl border text-xs transition flex flex-col justify-between gap-1 ${
                activeSampleId === sample.id
                  ? 'bg-sky-500/15 border-sky-500/50 text-sky-200'
                  : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="font-semibold truncate">{sample.title}</div>
              <div className="text-[11px] text-slate-500 line-clamp-1">
                {sample.category.toUpperCase()} • {sample.text.slice(0, 40)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Container */}
      <div className="relative rounded-2xl bg-slate-950/80 border border-slate-800 focus-within:border-sky-500/70 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all p-4 shadow-xl">
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          rows={6}
          placeholder={t.messagePlaceholder}
          aria-label="Message to analyze"
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base leading-relaxed resize-none focus:outline-none"
        />

        {/* Counter and Clear button inside textarea bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-slate-200 font-mono">{message.length}</strong> {t.charCount}
            </span>
            {message && (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-rose-400 transition"
              >
                Clear
              </button>
            )}
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Supports SMS, WhatsApp, Email, UPI texts
          </span>
        </div>
      </div>

      {/* Validation Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls Bar: Language + Analyze CTA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <span className="font-medium">{t.languageSelectLabel}</span>
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="pills"
          />
        </div>

        <button
          type="button"
          onClick={handleAnalyzeClick}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] shadow-lg shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ShieldAlert className="w-5 h-5 text-white" />
          <span>{isLoading ? t.btnAnalyzing : t.btnAnalyzeMessage}</span>
        </button>
      </div>
    </div>
  );
};
