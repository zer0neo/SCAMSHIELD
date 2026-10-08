import { useState } from 'react';
import { AnalysisResult, SupportedLanguage } from '../types/analysis';
import { analyzeMessage, analyzeScreenshot, analyzeUPIRequest } from '../services/api';

export function useAnalysis(initialLanguage: SupportedLanguage = 'en') {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performAnalyzeMessage = async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeMessage(text, currentLanguage);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze message');
    } finally {
      setIsLoading(false);
    }
  };

  const performAnalyzeScreenshot = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeScreenshot(file, currentLanguage);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to process screenshot');
    } finally {
      setIsLoading(false);
    }
  };

  const performAnalyzeUpi = async (amount: string, vpa: string, note: string, senderName?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeUPIRequest(amount, vpa, note, senderName, currentLanguage);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze UPI request');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return {
    currentLanguage,
    setCurrentLanguage,
    isLoading,
    analysisResult,
    error,
    performAnalyzeMessage,
    performAnalyzeScreenshot,
    performAnalyzeUpi,
    resetAnalysis,
  };
}
