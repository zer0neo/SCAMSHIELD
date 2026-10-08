import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Copy,
  Download,
  Check,
  Volume2,
  VolumeX,
  AlertOctagon,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = translations[currentLanguage];

  const isScam = result.classification === 'SCAM';
  const isSuspicious = result.classification === 'SUSPICIOUS';
  const isSafe = result.classification === 'SAFE';
  const isHighRisk = result.classification === 'SCAM' || result.risk_score >= 70;

  // Localized summary text
  const localizedSummary =
    currentLanguage === 'kn' && result.localized_summary?.kannada
      ? result.localized_summary.kannada
      : currentLanguage === 'hi' && result.localized_summary?.hindi
      ? result.localized_summary.hindi
      : result.summary;

  // Scroll to top and trigger celebratory micro-interaction for safe results
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isSafe) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch {
        // Safe fallback
      }
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result.id, isSafe]);

  // Voice Assistant (TTS) for elderly and vernacular accessibility
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let speechText = '';
    if (currentLanguage === 'kn') {
      speechText = `${isScam ? 'ಎಚ್ಚರಿಕೆ. ಇದು ಮೋಸದ ಸಂದೇಶ.' : isSuspicious ? 'ಗಮನಿಸಿ. ಇದು ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶ.' : 'ಸುರಕ್ಷಿತ.'} ${localizedSummary}. ${result.actions.dont[0] || ''}`;
    } else if (currentLanguage === 'hi') {
      speechText = `${isScam ? 'सावधान. यह धोखाधड़ी वाला संदेश है.' : isSuspicious ? 'ध्यान दें. यह संदिग्ध संदेश है.' : 'सुरक्षित.'} ${localizedSummary}. ${result.actions.dont[0] || ''}`;
    } else {
      speechText = `${isScam ? 'Warning. Scam detected.' : isSuspicious ? 'Caution. Suspicious message.' : 'Safe message.'} ${localizedSummary}. ${result.actions.dont[0] || ''}`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = currentLanguage === 'kn' ? 'kn-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

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
      {/* Elderly-Friendly Immediate Direct Verdict Banner */}
      <div
        className={`p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl transition-all ${
          isScam
            ? 'bg-rose-600 text-white shadow-rose-950/60 ring-2 ring-rose-400'
            : isSuspicious
            ? 'bg-amber-500 text-slate-950 shadow-amber-950/40 ring-2 ring-amber-300'
            : 'bg-emerald-600 text-white shadow-emerald-950/40 ring-2 ring-emerald-400'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2 rounded-xl bg-black/15 shrink-0">
            {isScam && <AlertOctagon className="w-8 h-8 text-white animate-pulse" />}
            {isSuspicious && <AlertTriangle className="w-8 h-8 text-slate-950" />}
            {isSafe && <ShieldCheck className="w-8 h-8 text-white" />}
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-wide uppercase">
              {isScam
                ? currentLanguage === 'kn'
                  ? 'ಅಪಾಯ: ಇದು ಮೋಸದ ಸಂದೇಶ! ಹಣ ಕಳುಹಿಸಬೇಡಿ!'
                  : currentLanguage === 'hi'
                  ? 'ख़तरा: यह धोखाधड़ी वाला संदेश है! पैसे न भेजें!'
                  : 'CRITICAL WARNING: FRAUD DETECTED! DO NOT PAY!'
                : isSuspicious
                ? currentLanguage === 'kn'
                  ? 'ಎಚ್ಚರಿಕೆ: ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶ! ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ!'
                  : currentLanguage === 'hi'
                  ? 'सावधानी: यह संदिग्ध संदेश है! पुष्टि करें!'
                  : 'CAUTION: SUSPICIOUS SIGNALS DETECTED!'
                : currentLanguage === 'kn'
                ? 'ಸುರಕ್ಷಿತ: ಯಾವುದೇ ತಕ್ಷಣದ ಅಪಾಯ ಕಂಡುಬಂದಿಲ್ಲ.'
                : currentLanguage === 'hi'
                ? 'सुरक्षित: कोई तात्कालिक खतरा नहीं मिला।'
                : 'VERIFIED: NO IMMEDIATE RISK DETECTED.'}
            </div>
            <div
              className={`text-xs font-semibold mt-0.5 ${
                isSuspicious ? 'text-slate-900' : 'text-white/90'
              }`}
            >
              {isScam
                ? currentLanguage === 'kn'
                  ? 'ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಹಾಕಬೇಡಿ.'
                  : currentLanguage === 'hi'
                  ? 'किसी भी लिंक पर क्लिक न करें और न ही यूपीआई पिन डालें।'
                  : 'Do not click links, share OTP, or enter your UPI PIN under any circumstance.'
                : isSuspicious
                ? currentLanguage === 'kn'
                  ? 'ಹಣ ಪಾವತಿಸುವ ಮುನ್ನ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಮೂಲದಿಂದ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
                  : currentLanguage === 'hi'
                  ? 'भुगतान करने से पहले अपने आधिकारिक बैंक से पुष्टि करें।'
                  : 'Verify independently before approving payments or downloading unknown apps.'
                : currentLanguage === 'kn'
                ? 'ಇದು ಸಾಮಾನ್ಯ ಬ್ಯಾಂಕ್ ವಹಿವಾಟಿನ ಸಂದೇಶದಂತೆ ಕಾಣುತ್ತದೆ.'
                : currentLanguage === 'hi'
                ? 'यह सामान्य बैंकिंग सूचना प्रतीत होती है।'
                : 'This matches standard informational banking communication.'}
            </div>
          </div>
        </div>

        {/* Voice Readout Button for Elderly & Non-English Users */}
        <button
          type="button"
          onClick={toggleSpeech}
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-md active:scale-95 ${
            isSuspicious
              ? 'bg-slate-950 text-white hover:bg-slate-900'
              : 'bg-white text-slate-900 hover:bg-slate-100'
          }`}
          title="Voice safety readout"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>{currentLanguage === 'kn' ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' : currentLanguage === 'hi' ? 'आवाज रोकें' : 'Stop Audio'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-sky-500" />
              <span>{currentLanguage === 'kn' ? '🔊 ವಿವರಣೆ ಕೇಳಿ' : currentLanguage === 'hi' ? '🔊 ऑडियो सुनें' : '🔊 Listen to Advice'}</span>
            </>
          )}
        </button>
      </div>

      {/* Top Threat Banner Card */}
      <div
        className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden ${
          isScam
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border-rose-500/40 shadow-rose-950/40'
            : isSuspicious
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

      {/* 2. Why ScamShield Flagged This (Reasons) */}
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

      {/* 3. Explainable Risk Weight Breakdown */}
      <RiskBreakdown factors={result.reasons} />

      {/* 4. Detected URLs & Suspicious Links */}
      {result.detected_urls && result.detected_urls.length > 0 && (
        <URLAnalysis urls={result.detected_urls} />
      )}

      {/* 5. What You MUST NOT Do & Protect Yourself */}
      <SafetyActions
        actions={result.actions}
        localizedActions={result.localized_actions}
        currentLanguage={currentLanguage}
        isHighRisk={isHighRisk}
      />

      {/* 6. AI Explanation in Vernacular (English, Kannada, Hindi) */}
      <AIExplanation
        explanation={result.explanation}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />

      {/* 7. Emergency Helpline Banner (1930) */}
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
