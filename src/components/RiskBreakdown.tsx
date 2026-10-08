import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { RiskFactor } from '../types/analysis';

interface RiskBreakdownProps {
  factors: RiskFactor[];
}

export const RiskBreakdown: React.FC<RiskBreakdownProps> = ({ factors }) => {
  if (!factors || factors.length === 0) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sky-400" />
          <h4 className="text-base font-bold text-white tracking-tight">
            Signal Weight Breakdown
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Explainable Risk Weights
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        ScamShield uses multi-factor threat modeling rather than a black-box decision. Here is how individual indicators contributed to this message's risk score:
      </p>

      <div className="space-y-3 pt-2">
        {factors.map((factor, idx) => {
          const isHigh = factor.severity === 'HIGH';
          const isMed = factor.severity === 'MEDIUM';

          const barColor = isHigh
            ? 'bg-rose-500'
            : isMed
            ? 'bg-amber-500'
            : 'bg-emerald-500';

          // Percentage width scaled to 40 max points
          const percentage = Math.min(100, Math.max(10, (factor.score / 35) * 100));

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  {factor.title}
                </span>
                <span className="font-mono font-bold text-slate-300">
                  +{factor.score} pts
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
                  className={`h-full rounded-full ${barColor}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
