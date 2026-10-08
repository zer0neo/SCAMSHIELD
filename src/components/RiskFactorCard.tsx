import React from 'react';
import { Clock, Link2, Landmark, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { RiskFactor } from '../types/analysis';

interface RiskFactorCardProps {
  factor: RiskFactor;
}

export const RiskFactorCard: React.FC<RiskFactorCardProps> = ({ factor }) => {
  // Choose relevant icon
  const getFactorIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('urgency') || t.includes('time')) return Clock;
    if (t.includes('url') || t.includes('link') || t.includes('domain')) return Link2;
    if (t.includes('bank') || t.includes('impersonat') || t.includes('sbi')) return Landmark;
    if (t.includes('credential') || t.includes('otp') || t.includes('pin') || t.includes('password')) return KeyRound;
    if (t.includes('no_threat') || t.includes('safe')) return CheckCircle2;
    return ShieldAlert;
  };

  const Icon = getFactorIcon(factor.type);

  const isHigh = factor.severity === 'HIGH';
  const isMed = factor.severity === 'MEDIUM';

  const badgeColor = isHigh
    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
    : isMed
    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition shadow-md">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isHigh
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                : isMed
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {factor.title}
            </h4>
            <span
              className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColor}`}
            >
              {factor.severity} SEVERITY
            </span>
          </div>
        </div>

        {factor.score > 0 && (
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0 ${
              isHigh
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/25'
                : isMed
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            +{factor.score} risk
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-12">
        {factor.description}
      </p>
    </div>
  );
};
