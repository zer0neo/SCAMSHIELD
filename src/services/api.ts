import { AnalysisResult, SupportedLanguage, RiskFactor, DetectedURL } from '../types/analysis';
import {
  mockScamResult,
  mockSuspiciousResult,
  mockSafeResult,
  mockUpiCollectScamResult,
} from '../data/mockResults';

// When VITE_API_URL is configured (e.g. 'http://localhost:8000' or production URL), use it.
// In local dev without explicit URL, relative '' will route through Vite's '/api' proxy.
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Mock mode is disabled by default in real application; only active when explicitly 'true'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// Helper to simulate network delay when mock mode is explicitly requested
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Human-readable mapping for backend scam categories
 */
const SCAM_CATEGORY_DISPLAY_MAP: Record<string, string> = {
  OTP_PHISHING: 'OTP & Credential Phishing',
  KYC_PHISHING: 'Bank KYC Phishing',
  BANK_IMPERSONATION: 'Bank & Financial Impersonation',
  UPI_PAYMENT_SCAM: 'UPI Payment & Collect Fraud',
  LOTTERY_SCAM: 'Lottery & Prize Scam',
  INVESTMENT_SCAM: 'Fake Investment & Trading Scheme',
  JOB_SCAM: 'Fake Job & Recruitment Offer',
  DELIVERY_SCAM: 'Parcel & Delivery Redirection Trap',
  GOVERNMENT_IMPERSONATION: 'Government Agency Impersonation',
  PHISHING: 'Malicious Link & Phishing Trap',
  GENERAL_SCAM: 'Suspicious Communication',
};

/**
 * Heuristic fallback only used when mock mode is explicitly enabled
 */
function getMatchingMockResult(input: string): AnalysisResult {
  const lower = input.toLowerCase();
  
  // KYC Phishing / Bank Impersonation / Urgency
  if (
    lower.includes('kyc') ||
    lower.includes('block') ||
    lower.includes('suspended') ||
    lower.includes('lottery') ||
    lower.includes('expire') ||
    lower.includes('sbi') ||
    lower.includes('.xyz') ||
    lower.includes('pan') ||
    lower.includes('aadhaar') ||
    lower.includes('केवाईसी') ||
    lower.includes('ब्लॉक') ||
    lower.includes('लॉटरी') ||
    lower.includes('इनाम') ||
    lower.includes('पैन') ||
    lower.includes('ಆಧಾರ್') ||
    lower.includes('ಕೆವೈಸಿ') ||
    lower.includes('ಬ್ಲಾಕ್') ||
    lower.includes('ಲಾಟರಿ') ||
    lower.includes('ಖಾತೆ')
  ) {
    return {
      ...mockScamResult,
      id: `scan-${Date.now()}`,
      analyzed_at: new Date().toISOString(),
      input_preview: input.slice(0, 150),
    };
  }

  // UPI Collect / Reverse Debit Fraud
  if (
    lower.includes('collect') ||
    lower.includes('refund') ||
    lower.includes('approve') ||
    lower.includes('upi') ||
    lower.includes('vpa') ||
    lower.includes('cashback') ||
    lower.includes('कलेक्ट') ||
    lower.includes('रिफंड') ||
    lower.includes('यूपीआई') ||
    lower.includes('ಕಲೆಕ್ಟ್') ||
    lower.includes('ಮರುಪಾವತಿ') ||
    lower.includes('ಯುಪಿಐ')
  ) {
    return {
      ...mockUpiCollectScamResult,
      id: `scan-${Date.now()}`,
      analyzed_at: new Date().toISOString(),
      input_preview: input.slice(0, 150),
    };
  }

  // Suspicious Shortened URLs & Logistics Pretexts
  if (
    lower.includes('courier') ||
    lower.includes('delivery') ||
    lower.includes('package') ||
    lower.includes('fee') ||
    lower.includes('track') ||
    lower.includes('bit.ly') ||
    lower.includes('पार्सल') ||
    lower.includes('कूरियर') ||
    lower.includes('डिलीवरी') ||
    lower.includes('ಪಾರ್ಸೆಲ್') ||
    lower.includes('ಕೊರಿಯರ್')
  ) {
    return {
      ...mockSuspiciousResult,
      id: `scan-${Date.now()}`,
      analyzed_at: new Date().toISOString(),
      input_preview: input.slice(0, 150),
    };
  }

  // Genuine Informational Bank Debit/Credit
  if (
    lower.includes('debited') ||
    lower.includes('credited') ||
    lower.includes('available bal') ||
    lower.includes('a/c xx') ||
    lower.includes('डेबिट') ||
    lower.includes('क्रेडिट') ||
    lower.includes('ಡೆಬಿಟ್')
  ) {
    return {
      ...mockSafeResult,
      id: `scan-${Date.now()}`,
      analyzed_at: new Date().toISOString(),
      input_preview: input.slice(0, 150),
    };
  }

  return {
    ...mockScamResult,
    id: `scan-${Date.now()}`,
    analyzed_at: new Date().toISOString(),
    input_preview: input.slice(0, 150),
  };
}

/**
 * Normalizes the real backend response into the frontend AnalysisResult shape.
 * Preserves backend as the single source of truth for:
 * - verdict (classification: SAFE -> LOW, SUSPICIOUS -> MEDIUM, SCAM -> HIGH)
 * - risk_score (actual score returned by backend)
 * - category (mapped safely; neutral for SAFE verdicts, never scam/fraud)
 * - score_breakdown (preserved without inventing risk factors)
 * - explanation (sanitized for SAFE verdicts to prevent contradictory warnings)
 * - recommended_action (actions)
 * - extracted_text (input_preview)
 */
export function normalizeBackendResponse(raw: any, fallbackInput: string): AnalysisResult {
  // 1. Classification & Verdict: Backend verdict is the strict source of truth
  // Never compute classification from risk_score thresholds in the frontend.
  const rawVerdict = String(raw?.verdict || raw?.classification || '').trim().toUpperCase();
  const classification: 'SAFE' | 'SUSPICIOUS' | 'SCAM' =
    rawVerdict === 'SCAM'
      ? 'SCAM'
      : rawVerdict === 'SUSPICIOUS'
      ? 'SUSPICIOUS'
      : 'SAFE';

  // 2. Risk score & derived risk level: Strict 1:1 mapping from backend verdict
  // SAFE -> LOW, SUSPICIOUS -> MEDIUM, SCAM -> HIGH
  const risk_score = typeof raw?.risk_score === 'number'
    ? Math.min(100, Math.max(0, Math.round(raw.risk_score)))
    : 0;

  const risk_level: 'LOW' | 'MEDIUM' | 'HIGH' =
    classification === 'SCAM'
      ? 'HIGH'
      : classification === 'SUSPICIOUS'
      ? 'MEDIUM'
      : 'LOW';

  // 3. Input preview & extracted text
  const previewText = String(raw?.extracted_text || raw?.message || fallbackInput || '').trim();
  const input_preview = previewText.length > 200 ? previewText.slice(0, 200) + '...' : previewText;

  // 4. Category / Scam Type safely mapped
  // Never use generic scam or fraud fallback values when backend says SAFE.
  const categoryKey = String(raw?.category || raw?.scam_type || '').trim();
  const isTransaction =
    /upi|payment|transaction|transferred|transfer|paid|credited|debited|₹|rs\.?|inr|account|vpa/i.test(previewText) ||
    /transaction|payment|upi/i.test(categoryKey);

  let scam_type = '';
  if (classification === 'SAFE') {
    // Legitimate or general transaction messages get a neutral label
    if (isTransaction) {
      scam_type = 'General Transaction';
    } else if (categoryKey && !categoryKey.includes('SCAM') && !categoryKey.includes('PHISHING')) {
      scam_type = categoryKey.replace(/_/g, ' ');
    } else {
      scam_type = 'General Message';
    }
  } else {
    scam_type =
      SCAM_CATEGORY_DISPLAY_MAP[categoryKey] ||
      categoryKey.replace(/_/g, ' ') ||
      (classification === 'SCAM' ? 'Suspicious Fraudulent Communication' : 'Suspicious Communication');
  }

  // 5. Reasons / Signal weight breakdown
  // Backend score_breakdown is the source of truth. Preserve actual backend values.
  let reasons: RiskFactor[] = [];
  if (raw?.score_breakdown && typeof raw.score_breakdown === 'object' && Object.keys(raw.score_breakdown).length > 0) {
    reasons = Object.entries(raw.score_breakdown).map(([title, points]) => {
      const scoreNum = typeof points === 'number' ? points : Number(points) || 0;
      const severity: 'LOW' | 'MEDIUM' | 'HIGH' =
        classification === 'SAFE'
          ? 'LOW'
          : scoreNum >= 25
          ? 'HIGH'
          : scoreNum >= 15
          ? 'MEDIUM'
          : 'LOW';
      return {
        type: title.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
        title,
        description:
          classification === 'SAFE'
            ? `Factor evaluated: ${title} (+${scoreNum} pts).`
            : `Backend detector identified "${title}", adding +${scoreNum} risk points.`,
        severity,
        score: scoreNum,
      };
    });
  } else if (classification !== 'SAFE' && Array.isArray(raw?.reasons) && raw.reasons.length > 0) {
    reasons = raw.reasons;
  } else if (classification !== 'SAFE' && Array.isArray(raw?.red_flags) && raw.red_flags.length > 0) {
    const defaultPoints = raw.red_flags.length > 0
      ? Math.max(5, Math.round(risk_score / raw.red_flags.length))
      : 10;
    reasons = raw.red_flags.map((flag: string) => ({
      type: flag.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      title: flag,
      description: `Indicator flagged by threat model: ${flag}.`,
      severity: classification === 'SCAM' ? 'HIGH' : 'MEDIUM',
      score: defaultPoints,
    }));
  } else if (classification === 'SAFE') {
    // If verdict is SAFE and score_breakdown is empty, reasons must be empty (do not invent suspicious red flags)
    reasons = [];
  } else {
    reasons = [
      {
        type: 'general_risk',
        title: 'Suspicious Communication Patterns',
        description: 'Heuristic evaluation identified patterns that deviate from verified organizational communication.',
        severity: classification === 'SCAM' ? 'HIGH' : 'MEDIUM',
        score: risk_score,
      },
    ];
  }

  // 6. Recommended Actions from backend recommended_action
  const rawAction = typeof raw?.recommended_action === 'string' ? raw.recommended_action.trim() : '';
  let doActions: string[] = [];
  let dontActions: string[] = [];

  if (raw?.actions && Array.isArray(raw.actions.do) && Array.isArray(raw.actions.dont)) {
    doActions = raw.actions.do;
    dontActions = raw.actions.dont;
  } else if (classification === 'SAFE') {
    doActions = [
      rawAction || 'Standard communication verified. No immediate action required.',
      'Always verify unsolicited banking requests through official banking apps.',
    ];
    dontActions = [
      'Never share your net banking passwords, UPI PIN, MPIN, or OTP with anyone.',
    ];
  } else {
    dontActions = [
      rawAction || 'Do not click external links, make payments, or interact with this sender.',
      'Do not share any OTP (One-Time Password) or net-banking credentials.',
      'Never enter your UPI PIN to receive money, cashbacks, or refunds.',
    ];
    doActions = [
      'Contact your bank or merchant directly through their official app or verified helpline.',
      'Report financial cyber fraud immediately to the National Cyber Crime Helpline at 1930.',
    ];
  }

  // 7. Explanation: Ensure MultilingualExplanation has appropriate content
  const rawExplanation = typeof raw?.explanation === 'string' ? raw.explanation.trim() : '';
  const isContradictorySuspiciousWording =
    /suspicious|fraudulent|threat|trap|deceptive|phishing/i.test(rawExplanation);

  let englishExp = '';
  let kannadaExp = '';
  let hindiExp = '';

  if (classification === 'SAFE') {
    if (rawExplanation && !isContradictorySuspiciousWording) {
      englishExp = rawExplanation;
      kannadaExp = 'ಬ್ಯಾಕೆಂಡ್‌ನಿಂದ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದ್ದು, ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ದೃಢಪಡಿಸಲಾಗಿದೆ.';
      hindiExp = 'संदेश का विश्लेषण किया गया है और यह सुरक्षित पाया गया है।';
    } else {
      englishExp = isTransaction
        ? 'This message was analyzed and verified as a legitimate transaction notification. No threat or fraudulent indicators were detected.'
        : 'This message was analyzed and verified as safe. No malicious links, credential harvesting, or fraudulent patterns were detected.';
      kannadaExp = isTransaction
        ? 'ಈ ಸಂದೇಶವು ಅಧಿಕೃತ ವಹಿವಾಟು ಸೂಚನೆಯಾಗಿದ್ದು ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ದೃಢಪಡಿಸಲಾಗಿದೆ. ಯಾವುದೇ ಮೋಸದ ಸೂಚನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'
        : 'ಈ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದ್ದು ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ದೃಢಪಡಿಸಲಾಗಿದೆ. ಯಾವುದೇ ಮೋಸದ ಸೂಚನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.';
      hindiExp = isTransaction
        ? 'यह संदेश एक वैध लेन-देन की सूचना है और सुरक्षित पाया गया है। इसमें धोखाधड़ी का कोई संकेत नहीं मिला है।'
        : 'यह संदेश सुरक्षित पाया गया है। इसमें किसी भी प्रकार की धोखाधड़ी या संदिग्ध गतिविधि के संकेत नहीं मिले हैं।';
    }
  } else {
    englishExp = rawExplanation || 'Threat screening completed by the backend detector.';
    kannadaExp = 'ಬ್ಯಾಕೆಂಡ್‌ನಿಂದ ಬೆದರಿಕೆ ತಪಾಸಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ.';
    hindiExp = 'संदेश का विश्लेषण बैकएंड डिटेक्टर द्वारा पूरा कर लिया गया है।';
  }

  const explanation = (raw?.explanation && typeof raw.explanation === 'object')
    ? {
        english: raw.explanation.english || englishExp,
        kannada: raw.explanation.kannada || kannadaExp,
        hindi: raw.explanation.hindi || hindiExp,
      }
    : {
        english: englishExp,
        kannada: kannadaExp,
        hindi: hindiExp,
      };

  // 8. Summary: Clear, human-readable summary
  let summary = '';
  if (classification === 'SAFE') {
    if (raw?.summary && !/suspicious|fraudulent|threat/i.test(raw.summary)) {
      summary = raw.summary;
    } else {
      summary = isTransaction
        ? 'Verified: Legitimate transaction notification with no threat indicators detected.'
        : 'Verified: Standard communication with no threat indicators detected.';
    }
  } else {
    summary = raw?.summary || rawExplanation || (
      classification === 'SCAM'
        ? `Critical warning: ${scam_type} detected with a threat risk score of ${risk_score}/100.`
        : `Caution: Suspicious patterns detected with a threat risk score of ${risk_score}/100.`
    );
  }

  // 9. Localized summary for vernacular display
  const localized_summary = raw?.localized_summary || (
    classification === 'SAFE'
      ? {
          english: summary,
          kannada: isTransaction
            ? 'ದೃಢೀಕರಿಸಲಾಗಿದೆ: ಯಾವುದೇ ಬೆದರಿಕೆ ಸೂಚನೆಗಳಿಲ್ಲದ ಸಾಮಾನ್ಯ ವಹಿವಾಟು ಸಂದೇಶ.'
            : 'ದೃಢೀಕರಿಸಲಾಗಿದೆ: ಯಾವುದೇ ಬೆದರಿಕೆ ಸೂಚನೆಗಳಿಲ್ಲದ ಸಾಮಾನ್ಯ ಸಂದೇಶ.',
          hindi: isTransaction
            ? 'सत्यापित: कोई संदिग्ध संकेत नहीं मिले, यह एक वैध लेन-देन संदेश है।'
            : 'सत्यापित: कोई संदिग्ध संकेत नहीं मिले, यह एक सामान्य संदेश है।',
        }
      : undefined
  );

  // 10. Detected URLs: Extract from real text content without inventing fake domains
  const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
  const rawMatches = previewText.match(urlRegex) || [];
  const detected_urls: DetectedURL[] = Array.from(new Set(rawMatches)).map((url) => ({
    url,
    risk: classification === 'SCAM' ? 'HIGH' : classification === 'SUSPICIOUS' ? 'MEDIUM' : 'LOW',
    reason: classification === 'SCAM'
      ? 'Suspicious external link detected in fraudulent context.'
      : classification === 'SUSPICIOUS'
      ? 'External link detected in suspicious message.'
      : 'Standard external link in verified message.',
  }));

  // 11. Input type normalization
  let input_type: 'text' | 'screenshot' | 'upi' = 'text';
  if (raw?.input_type === 'upi_simulation' || raw?.input_type === 'upi') {
    input_type = 'upi';
  } else if (raw?.input_type === 'screenshot') {
    input_type = 'screenshot';
  }

  return {
    id: raw?.id || `scan-${Date.now()}`,
    analyzed_at: raw?.analyzed_at || new Date().toISOString(),
    input_type,
    input_preview,
    risk_score,
    risk_level,
    classification,
    scam_type,
    summary,
    reasons,
    actions: {
      do: doActions,
      dont: dontActions,
    },
    explanation,
    detected_urls,
    localized_summary,
    localized_actions: raw?.localized_actions,
  };
}

/**
 * Analyzes a text message via FastAPI /api/analyze
 */
export async function analyzeMessage(
  text: string,
  language: SupportedLanguage = 'en'
): Promise<AnalysisResult> {
  if (USE_MOCK_API) {
    await delay(1200);
    return getMatchingMockResult(text);
  }

  const endpoint = `${API_BASE_URL}/api/analyze`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
      language: language || 'auto',
    }),
  });

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson?.detail) {
        errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
      }
    } catch {
      // Non-JSON response
    }
    throw new Error(`Analysis failed: ${errorDetail}`);
  }

  const data = await response.json();
  const result = normalizeBackendResponse(data, text);
  result.input_type = 'text';
  return result;
}

/**
 * Analyzes a screenshot via OCR & Fraud screening /api/analyze-image
 */
export async function analyzeScreenshot(
  file: File,
  language: SupportedLanguage = 'en'
): Promise<AnalysisResult> {
  if (USE_MOCK_API) {
    await delay(1800);
    const mock = { ...mockScamResult };
    mock.id = `ocr-${Date.now()}`;
    mock.input_type = 'screenshot';
    mock.input_preview = `[Extracted from screenshot "${file.name}"]: "URGENT: Complete KYC verification immediately."`;
    return mock;
  }

  const formData = new FormData();
  formData.append('file', file);

  // Send language as Query parameter to match FastAPI route: language: str = Query("auto")
  const langParam = encodeURIComponent(language || 'auto');
  const endpoint = `${API_BASE_URL}/api/analyze-image?language=${langParam}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson?.detail) {
        errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
      }
    } catch {
      // Non-JSON response
    }
    throw new Error(`Screenshot analysis failed: ${errorDetail}`);
  }

  const data = await response.json();
  const result = normalizeBackendResponse(data, file.name);
  result.input_type = 'screenshot';
  return result;
}

/**
 * Analyzes a simulated UPI Collect request via FastAPI /api/analyze-upi
 */
export async function analyzeUPIRequest(
  amount: string,
  vpa: string,
  note: string,
  senderName: string = 'Unknown Sender',
  _language: SupportedLanguage = 'en'
): Promise<AnalysisResult> {
  const combinedMessage = note
    ? `${note} (VPA: ${vpa})`
    : `Payment request from ${vpa}`;

  if (USE_MOCK_API) {
    await delay(1200);
    const mock = { ...mockUpiCollectScamResult };
    mock.id = `upi-${Date.now()}`;
    mock.input_preview = `UPI Collect: ₹${amount} from ${senderName} (${vpa})`;
    return mock;
  }

  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const endpoint = `${API_BASE_URL}/api/analyze-upi`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender_name: senderName || 'Unknown Sender',
      amount: numericAmount,
      message: combinedMessage,
      request_type: 'collect',
    }),
  });

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson?.detail) {
        errorDetail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
      }
    } catch {
      // Non-JSON response
    }
    throw new Error(`UPI analysis failed: ${errorDetail}`);
  }

  const data = await response.json();
  const result = normalizeBackendResponse(data, combinedMessage);
  result.input_type = 'upi';
  return result;
}
