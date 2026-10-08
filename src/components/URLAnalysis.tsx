import React, { useState } from 'react';
import { Link2, ShieldAlert, Copy, Check, AlertOctagon } from 'lucide-react';
import { DetectedURL } from '../types/analysis';

interface URLAnalysisProps {
  urls: DetectedURL[];
}

export const URLAnalysis: React.FC<URLAnalysisProps> = ({ urls }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!urls || urls.length === 0) return null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-rose-400" />
          <h4 className="text-base font-bold text-white tracking-tight">
            Detected Links ({urls.length})
          </h4>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/15 px-2.5 py-1 rounded-md border border-rose-500/30 flex items-center gap-1.5">
          <AlertOctagon className="w-3.5 h-3.5" />
          Click Disabled for Safety
        </span>
      </div>

      <div className="space-y-3">
        {urls.map((item, idx) => {
          const isHigh = item.risk === 'HIGH';
          const isCopied = copiedUrl === item.url;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                {/* Non-clickable URL text to protect user */}
                <span className="font-mono text-xs sm:text-sm text-rose-300 break-all select-all font-semibold">
                  {item.url}
                </span>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      isHigh
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {item.risk} RISK LINK
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.url)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:text-white hover:bg-slate-700 transition"
                    title="Copy URL safely"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{item.reason}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-rose-300/80 leading-normal flex items-center gap-1.5 font-medium">
        ⚠️ Safety warning: Never open this link in your mobile or computer browser. Fraudulent pages look identical to real bank portals.
      </p>
    </div>
  );
};
