import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, User, Info } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface UPISimulatorProps {
  currentLanguage: SupportedLanguage;
  onAnalyzeUpi: (amount: string, vpa: string, note: string, senderName?: string) => void;
  isLoading: boolean;
}

export const UPISimulator: React.FC<UPISimulatorProps> = ({
  currentLanguage,
  onAnalyzeUpi,
  isLoading,
}) => {
  const [amount, setAmount] = useState('4999');
  const [vpa, setVpa] = useState('rahul@xyzbank');
  const [senderName, setSenderName] = useState('Rahul Sharma');
  const [note, setNote] = useState('Approve this request to receive your refund of ₹4,999');

  const t = translations[currentLanguage];

  const handleAnalyze = () => {
    onAnalyzeUpi(amount, vpa, note, senderName);
  };

  const handleResetToPreset = (type: 'lottery' | 'olx' | 'refund') => {
    if (type === 'refund') {
      setAmount('4999');
      setVpa('rahul@xyzbank');
      setSenderName('Rahul Sharma');
      setNote('Approve this request to receive your refund of ₹4,999');
    } else if (type === 'olx') {
      setAmount('15000');
      setVpa('army_officer@icici');
      setSenderName('Major Vikram Singh');
      setNote('Scan QR code & enter PIN to receive advance token for your sofa');
    } else if (type === 'lottery') {
      setAmount('25000');
      setVpa('kbc_rewards@ybl');
      setSenderName('KBC Lucky Draw Desk');
      setNote('Approve collect to claim 25 Lakhs prize processing tax');
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner & Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-amber-300">
              {t.upiSimBadge}
            </span>
            <span className="text-amber-400/80">• Hackathon Demo Tool</span>
          </div>
          <p className="text-amber-200/90 leading-relaxed">
            {t.upiSimNotice}
          </p>
        </div>
      </div>

      {/* Preset selector pills */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-semibold">Load Scam Preset:</span>
        <button
          type="button"
          onClick={() => handleResetToPreset('refund')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-500 transition"
        >
          ₹4,999 Fake Refund
        </button>
        <button
          type="button"
          onClick={() => handleResetToPreset('olx')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-500 transition"
        >
          Fake OLX Buyer "Advance"
        </button>
        <button
          type="button"
          onClick={() => handleResetToPreset('lottery')}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-500 transition"
        >
          Lucky Draw Collect
        </button>
      </div>

      {/* Simulated UPI Request Phone Card */}
      <div className="max-w-md mx-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 relative overflow-hidden">
        {/* Top header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black text-xs">
              UPI
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              COLLECT REQUEST
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
            DEBIT ACTION
          </span>
        </div>

        {/* Amount Section */}
        <div className="text-center py-2 space-y-1">
          <span className="text-xs text-slate-400 font-medium">
            {t.upiAmountLabel}
          </span>
          <div className="text-4xl font-extrabold text-white tracking-tight flex items-center justify-center">
            <span>₹</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-32 bg-transparent text-center font-extrabold text-white focus:outline-none focus:ring-1 focus:ring-sky-500/50 rounded"
              title="Requested Amount"
            />
          </div>
        </div>

        {/* Request details fields */}
        <div className="mt-5 space-y-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-xs">
          <div>
            <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              {t.upiRequestFrom}
            </label>
            <div className="flex items-center gap-2 text-slate-200">
              <User className="w-4 h-4 text-sky-400 shrink-0" />
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="bg-transparent font-medium text-white focus:outline-none w-full"
              />
            </div>
            <input
              type="text"
              value={vpa}
              onChange={(e) => setVpa(e.target.value)}
              className="bg-transparent text-slate-400 font-mono text-[11px] focus:outline-none w-full mt-0.5"
            />
          </div>

          <div className="pt-2 border-t border-slate-800">
            <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
              {t.upiMessageLabel}
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-slate-200 focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* UPI Safety Golden Rule Callout */}
        <div className="mt-4 p-3 rounded-xl bg-sky-950/40 border border-sky-800/40 flex items-start gap-2.5 text-[11px] text-sky-200">
          <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <span>
            <strong>Golden Rule of UPI:</strong> Entering your UPI PIN always DEBITS your account. You NEVER need to enter a PIN to receive money!
          </span>
        </div>

        {/* Analyze Request Button */}
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] shadow-lg shadow-sky-500/25 transition disabled:opacity-50"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>{isLoading ? t.btnAnalyzing : t.btnAnalyzeUpi}</span>
        </button>
      </div>
    </div>
  );
};
