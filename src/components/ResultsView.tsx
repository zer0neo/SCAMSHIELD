import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Copy,
  Download,
  Check,
} from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';
import { RiskScore } from './RiskScore';
import { RiskBadge } from './RiskBadge';
import { RiskFactorCard } from './RiskFactorCard';
import { RiskBreakdown } from './RiskBreakdown';
import { URLAnalysis } from './URLAnalysis';
import { AIExplanation } from './AIExplanation';
import { SafetyActions } from './SafetyActions';
import { SafetyDisclaimer } from './SafetyDisclaimer';
import { EmergencyHelpline } from './EmergencyHelpline';

interface ResultsViewProps {
  result: AnalysisResult;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onAnalyzeAnother: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  currentLanguage,
  onLanguageChange,
  onAnalyzeAnother,
}) => {
  const [copiedReport, setCopiedReport] = useState(false);
  const t = translations[currentLanguage];

  const isScam = result.classification === 'SCAM';
  const isHighRisk = result.risk_score > 60;

  // Localized summary text
  const localizedSummary =
    currentLanguage === 'kn' && result.localized_summary?.kannada
      ? result.localized_summary.kannada
      : currentLanguage === 'hi' && result.localized_summary?.hindi
      ? result.localized_summary.hindi
      : result.summary;

  const handleCopyReport = () => {
    const reportText = `
[SCAMSHIELD FRAUD SCREENING REPORT]
Status: ${result.classification}
Risk Score: ${result.risk_score}/100 (${result.risk_level} RISK)
Category: ${result.scam_type}
Analyzed At: ${result.analyzed_at || new Date().toLocaleString()}

SUMMARY:
${localizedSummary}

KEY REASONS:
${result.reasons.map((r) => `- ${r.title}: ${r.description} (+${r.score} pts)`).join('\n')}

DO NOT:
${result.actions.dont.map((d) => `[X] ${d}`).join('\n')}

WHAT TO DO:
${result.actions.do.map((d) => `[V] ${d}`).join('\n')}

Report generated via ScamShield: AI-powered Vernacular Scam Protection
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handleDownloadReport = () => {
    const reportContent = JSON.stringify(result, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scamshield-report-${result.id || 'analysis'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-8 py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Top Threat Banner Card */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden ${
          isScam
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border-rose-500/40 shadow-rose-950/40'
            : result.classification === 'SUSPICIOUS'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border-amber-500/40 shadow-amber-950/40'
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/40 shadow-emerald-950/40'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Circular Risk Score Visual */}
          <div className="md:col-span-5 flex justify-center">
            <RiskScore
              score={result.risk_score}
              level={result.risk_level}
              classification={result.classification}
            />
          </div>

          {/* Right: Threat Metadata & Summary */}
          <div className="md:col-span-7 space-y-4 text-left">
            <RiskBadge
              classification={result.classification}
              scamType={result.scam_type}
              currentLanguage={currentLanguage}
            />

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t.resultsSummaryTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {localizedSummary}
              </p>
            </div>

            {/* Input preview snippet */}
            {result.input_preview && (
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-400 line-clamp-2">
                <span className="text-sky-400 font-semibold uppercase mr-1">
                  Input Preview:
                </span>
                "{result.input_preview}"
              </div>
            )}

            {/* Quick Actions Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyReport}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">{t.reportCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-sky-400" />
                    <span>{t.btnCopyReport}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition"
              >
                <Download className="w-4 h-4" />
                <span>{t.btnDownloadReport}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* AI Explanation in Vernacular (English, Kannada, Hindi) */}
      <AIExplanation
        explanation={result.explanation}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />

      {/* Safety Actions: What to DO & What NOT to do */}
      <SafetyActions
        actions={result.actions}
        localizedActions={result.localized_actions}
        currentLanguage={currentLanguage}
        isHighRisk={isHighRisk}
      />

      {/* Why ScamShield Flagged This */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {t.whyFlaggedTitle}
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {result.reasons.length} Signals Detected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.reasons.map((factor, idx) => (
            <RiskFactorCard key={idx} factor={factor} />
          ))}
        </div>
      </div>

      {/* Explainable Risk Weight Breakdown */}
      <RiskBreakdown factors={result.reasons} />

      {/* Detected URLs & Links */}
      {result.detected_urls && result.detected_urls.length > 0 && (
        <URLAnalysis urls={result.detected_urls} />
      )}

      {/* Emergency Helpline Banner (1930) */}
      <EmergencyHelpline currentLanguage={currentLanguage} />

      {/* Action Footer: Analyze Another Message CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onAnalyzeAnother}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/25 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{t.btnAnalyzeAnother}</span>
        </button>
      </div>

      {/* Safety Disclaimer */}
      <SafetyDisclaimer currentLanguage={currentLanguage} />

    </motion.div>
  );
};
