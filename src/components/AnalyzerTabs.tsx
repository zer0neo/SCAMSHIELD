import React from 'react';
import { MessageSquareText, Image as ImageIcon, SendHorizontal } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

export type AnalyzerTabType = 'message' | 'screenshot' | 'upi';

interface AnalyzerTabsProps {
  activeTab: AnalyzerTabType;
  onTabChange: (tab: AnalyzerTabType) => void;
  currentLanguage: SupportedLanguage;
}

export const AnalyzerTabs: React.FC<AnalyzerTabsProps> = ({
  activeTab,
  onTabChange,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  const tabs: { id: AnalyzerTabType; label: string; icon: React.ElementType; badge?: string }[] = [
    {
      id: 'message',
      label: t.tabMessage,
      icon: MessageSquareText,
    },
    {
      id: 'screenshot',
      label: t.tabScreenshot,
      icon: ImageIcon,
      badge: 'OCR',
    },
    {
      id: 'upi',
      label: t.tabUpi,
      icon: SendHorizontal,
      badge: 'Simulator',
    },
  ];

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-full overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
