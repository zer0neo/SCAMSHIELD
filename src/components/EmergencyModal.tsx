import React from 'react';
import { X, PhoneCall, ExternalLink, AlertTriangle } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: SupportedLanguage;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-8 shadow-2xl shadow-rose-950/60 text-left space-y-5">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 id="emergency-modal-title" className="text-xl font-black text-white tracking-tight">
              Emergency Cyber Crime Helplines
            </h3>
            <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
              Immediate Financial Incident Response
            </span>
          </div>
        </div>

        {/* Urgent Alert Banner */}
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-200">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            <strong>Golden Hour Window:</strong> Reporting an unauthorized transaction within 2 to 4 hours drastically increases the chance of law enforcement freezing the scammer's beneficiary account.
          </span>
        </div>

        {/* Steps to Take Right Now */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
              1
            </span>
            <div>
              <strong>Call 1930 immediately</strong> to report to the National Cyber Crime Reporting Portal (MHA Govt of India).
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
              2
            </span>
            <div>
              <strong>Block your card / UPI PIN</strong> in your bank app or by calling your bank's 24/7 toll-free fraud helpline.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
              3
            </span>
            <div>
              <strong>File formal complaint</strong> with transaction UTR/reference number on <span className="text-sky-400 underline">cybercrime.gov.in</span>.
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href="tel:1930"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1930 Now</span>
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
