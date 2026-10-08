import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Classification, RiskLevel } from '../types/analysis';

interface RiskScoreProps {
  score: number;
  level: RiskLevel;
  classification: Classification;
}

export const RiskScore: React.FC<RiskScoreProps> = ({
  score,
  level,
  classification,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = Math.ceil(score / (duration / 25));
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color themes
  const isScam = classification === 'SCAM' || score > 60;
  const isSuspicious = !isScam && (classification === 'SUSPICIOUS' || score > 30);
  const isSafe = !isScam && !isSuspicious;

  const strokeColor = isScam
    ? '#EF4444' // red
    : isSuspicious
    ? '#F59E0B' // amber
    : '#10B981'; // green

  const ringGlowClass = isScam
    ? 'shadow-glow-danger'
    : isSuspicious
    ? 'shadow-glow-warning'
    : 'shadow-glow-safe';

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* Circular SVG Ring */}
      <div className={`relative flex items-center justify-center w-44 h-44 rounded-full ${ringGlowClass} transition-shadow duration-500`}>
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated Value Ring */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text inside ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-baseline">
            <span
              className="text-4xl sm:text-5xl font-black tracking-tight"
              style={{ color: strokeColor }}
            >
              {displayScore}
            </span>
            <span className="text-sm font-bold text-slate-500 ml-1">/ 100</span>
          </div>

          <div className="mt-1 flex items-center gap-1">
            {isScam && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
            {isSuspicious && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
            {isSafe && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
            <span
              className="text-xs font-extrabold uppercase tracking-widest"
              style={{ color: strokeColor }}
            >
              {level ? `${level} RISK` : isScam ? 'HIGH RISK' : isSuspicious ? 'MODERATE RISK' : 'LOW RISK'}
            </span>
          </div>
        </div>
      </div>

      {/* Numerical benchmark scale */}
      <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
        <span className={score <= 30 ? 'text-emerald-400 font-bold' : ''}>0-30 Safe</span>
        <span>•</span>
        <span className={score > 30 && score <= 60 ? 'text-amber-400 font-bold' : ''}>31-60 Suspicious</span>
        <span>•</span>
        <span className={score > 60 ? 'text-rose-400 font-bold' : ''}>61-100 Scam</span>
      </div>
    </div>
  );
};
