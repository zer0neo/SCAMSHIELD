import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface AnalysisLoaderProps {
  currentLanguage: SupportedLanguage;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    t.loadingStep1,
    t.loadingStep2,
    t.loadingStep3,
    t.loadingStep4,
    t.loadingStep5,
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 250);
    const timer2 = setTimeout(() => setCurrentStep(2), 500);
    const timer3 = setTimeout(() => setCurrentStep(3), 800);
    const timer4 = setTimeout(() => setCurrentStep(4), 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="py-12 sm:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Pulsing top scan line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-pulse" />

        {/* Center Scanner Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl border border-sky-500/30 border-t-sky-400 flex items-center justify-center bg-sky-500/10"
            >
              <Shield className="w-8 h-8 text-sky-400" />
            </motion.div>
            <div className="absolute -inset-2 rounded-2xl bg-sky-500/10 blur-lg animate-pulse" />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            {t.loadingTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Running multi-layer vernacular fraud screening engine
          </p>
        </div>

        {/* Step-by-step intelligence checklist */}
        <div className="space-y-3 font-sans">
          {steps.map((stepText, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : isCurrent
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-200 font-medium scale-[1.01]'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                }`}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <span className="flex-1 text-left">{stepText}</span>

                {isCurrent && (
                  <span className="text-[10px] font-mono uppercase text-sky-400 tracking-wider animate-pulse">
                    Scanning
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    Done
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Intelligence badge */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Multilingual Context & Heuristic Evaluation</span>
        </div>

      </div>
    </div>
  );
};
