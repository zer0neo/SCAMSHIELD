import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';
import { AnalyzerTabs, AnalyzerTabType } from './AnalyzerTabs';
import { MessageInput } from './MessageInput';
import { ScreenshotUpload } from './ScreenshotUpload';
import { UPISimulator } from './UPISimulator';

interface AnalyzerProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onAnalyzeMessage: (text: string) => void;
  onAnalyzeScreenshot: (file: File) => void;
  onAnalyzeUpi: (amount: string, vpa: string, note: string, senderName?: string) => void;
  isLoading: boolean;
  error?: string | null;
}

export const Analyzer: React.FC<AnalyzerProps> = ({
  currentLanguage,
  onLanguageChange,
  onAnalyzeMessage,
  onAnalyzeScreenshot,
  onAnalyzeUpi,
  isLoading,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<AnalyzerTabType>('message');
  const t = translations[currentLanguage];

  return (
    <section id="analyzer-section" className="py-12 sm:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.analyzerTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            {t.analyzerSubtitle}
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800/90 p-5 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {error && (
            <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Tabs */}
          <AnalyzerTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentLanguage={currentLanguage}
          />

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'message' && (
              <MessageInput
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                onAnalyze={onAnalyzeMessage}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'screenshot' && (
              <ScreenshotUpload
                currentLanguage={currentLanguage}
                onAnalyzeScreenshot={onAnalyzeScreenshot}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'upi' && (
              <UPISimulator
                currentLanguage={currentLanguage}
                onAnalyzeUpi={onAnalyzeUpi}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
