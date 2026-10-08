import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface HeroProps {
  currentLanguage: SupportedLanguage;
  onAnalyzeClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  onAnalyzeClick,
  onHowItWorksClick,
}) => {
  const t = translations[currentLanguage];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800/60 bg-cyber-grid">
      {/* Ambient background glow blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-10 w-[400px] h-[300px] bg-rose-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Mission badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">
                Hackatopia 2026 • Problem FT-01 Vernacular Shield
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                {t.heroHeadline1}{' '}
                <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
                  {t.heroHeadline2}
                </span>
              </h1>
            </div>

            {/* Subtitles */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Vernacular Callout Card */}
            <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-800/40 border border-slate-700/60 backdrop-blur-md">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-slate-200">
                {t.heroHighlight}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onAnalyzeClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/35 active:scale-[0.99] transition-all"
              >
                <ShieldAlert className="w-5 h-5 text-white" />
                <span>{t.heroCtaAnalyze}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onHowItWorksClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition"
              >
                <span>{t.heroCtaHow}</span>
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UPI Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Zero Technical Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400 shrink-0">100%</span>
                <span>Safe Preview</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual: Floating Security Simulation Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Card 1: Simulated Incoming Threat Message */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-md bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md relative z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Incoming SMS • AX-SBIINB
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Suspicious
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/90">
                "Dear Customer, your SBI NetBanking is expired today. Update your PAN card immediately to avoid account block: <span className="text-amber-400 underline font-semibold">https://sbi-kyc-update.xyz</span>"
              </p>
            </motion.div>

            {/* Card 2: AI Screening Result Overlay (overlapping and subtly floating) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="w-full max-w-md -mt-6 sm:-mt-8 ml-4 sm:ml-8 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-rose-950/40 border border-rose-500/40 rounded-2xl p-5 shadow-2xl shadow-rose-950/50 backdrop-blur-xl relative z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      ScamShield Engine
                    </div>
                    <div className="text-base font-extrabold text-white">
                      SCAM DETECTED
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-rose-400 leading-none">
                    94<span className="text-xs text-rose-300/70 font-normal">/100</span>
                  </div>
                  <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                    High Risk
                  </span>
                </div>
              </div>

              {/* Signals checklist */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Fake Banking Phishing URL
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-400">+30 risk</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Account Block Coercion
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-400">+25 risk</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Bank Official Impersonation
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-400">+20 risk</span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">
                  Explanation in: <strong className="text-sky-300">English • ಕನ್ನಡ • हिन्दी</strong>
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Actionable Guide
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
