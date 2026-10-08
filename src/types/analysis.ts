export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Classification = 'SAFE' | 'SUSPICIOUS' | 'SCAM';
export type SupportedLanguage = 'en' | 'kn' | 'hi';

export interface RiskFactor {
  type: string;
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
}

export interface DetectedURL {
  url: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
}

export interface SafetyActions {
  do: string[];
  dont: string[];
}

export interface MultilingualExplanation {
  english: string;
  kannada: string;
  hindi: string;
}

export interface AnalysisResult {
  id?: string;
  analyzed_at?: string;
  input_type: 'text' | 'screenshot' | 'upi';
  input_preview?: string;
  risk_score: number;
  risk_level: RiskLevel;
  classification: Classification;
  scam_type: string;
  summary: string;
  reasons: RiskFactor[];
  actions: SafetyActions;
  explanation: MultilingualExplanation;
  detected_urls: DetectedURL[];
  // Optional multilingual fields for localized summaries/actions if available
  localized_summary?: {
    english?: string;
    kannada?: string;
    hindi?: string;
  };
  localized_actions?: {
    kannada?: SafetyActions;
    hindi?: SafetyActions;
  };
}

export interface AnalyzeRequestPayload {
  text?: string;
  message?: string;
  language?: string;
  image_base64?: string;
  file_name?: string;
  upi_id?: string;
  amount?: string;
}
