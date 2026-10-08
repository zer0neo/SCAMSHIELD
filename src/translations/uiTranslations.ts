import { SupportedLanguage } from '../types/analysis';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  badgeProtection: string;
  navAnalyze: string;
  navHowItWorks: string;
  navSafety: string;
  navEmergency: string;
  
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubtitle: string;
  heroHighlight: string;
  heroCtaAnalyze: string;
  heroCtaHow: string;
  
  analyzerTitle: string;
  analyzerSubtitle: string;
  tabMessage: string;
  tabScreenshot: string;
  tabUpi: string;
  
  messagePlaceholder: string;
  charCount: string;
  languageSelectLabel: string;
  btnAnalyzeMessage: string;
  btnAnalyzing: string;
  sampleMessagesLabel: string;
  
  screenshotDropText: string;
  screenshotBrowseText: string;
  screenshotSupported: string;
  screenshotOcrNote: string;
  btnAnalyzeScreenshot: string;
  removeFile: string;
  
  upiSimTitle: string;
  upiSimBadge: string;
  upiSimNotice: string;
  upiAmountLabel: string;
  upiRequestFrom: string;
  upiMessageLabel: string;
  btnAnalyzeUpi: string;
  
  loadingTitle: string;
  loadingStep1: string;
  loadingStep2: string;
  loadingStep3: string;
  loadingStep4: string;
  loadingStep5: string;
  
  resultsHeaderScam: string;
  resultsHeaderSuspicious: string;
  resultsHeaderSafe: string;
  resultsSummaryTitle: string;
  whyFlaggedTitle: string;
  riskBreakdownTitle: string;
  detectedLinksTitle: string;
  doNotOpenLink: string;
  copyLink: string;
  linkCopied: string;
  
  aiExplanationTitle: string;
  protectTitle: string;
  doNotTitle: string;
  disclaimerText: string;
  
  btnAnalyzeAnother: string;
  btnCopyReport: string;
  btnDownloadReport: string;
  reportCopied: string;
  
  errorEmptyMessage: string;
  errorInvalidFile: string;
  errorFileTooLarge: string;
  errorNetwork: string;
  
  cyberHelpTitle: string;
  cyberHelpText: string;
  cyberHelpNumber: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'SCAMSHIELD',
    tagline: 'AI-powered multilingual UPI & scam message protection',
    badgeProtection: 'AI Fraud Screening',
    navAnalyze: 'Analyze',
    navHowItWorks: 'How It Works',
    navSafety: 'Safety Guide',
    navEmergency: 'Helpline 1930',

    heroHeadline1: "Don't get scammed.",
    heroHeadline2: 'Know before you pay.',
    heroSubtitle: 'AI-powered protection against UPI fraud, phishing and fake banking messages.',
    heroHighlight: 'Understand suspicious messages in seconds — in English, Kannada or Hindi.',
    heroCtaAnalyze: 'Analyze a Message',
    heroCtaHow: 'See How It Works',

    analyzerTitle: 'Is this message safe?',
    analyzerSubtitle: 'Paste a suspicious message or upload a screenshot. ScamShield will analyze the warning signals.',
    tabMessage: 'Message',
    tabScreenshot: 'Screenshot',
    tabUpi: 'UPI Request',

    messagePlaceholder: 'Paste the suspicious SMS, WhatsApp message, email or payment notification here (e.g. "Dear SBI User, your KYC has expired. Update immediately at sbi-kyc-update.xyz to avoid account block")...',
    charCount: 'characters',
    languageSelectLabel: 'Analyze in:',
    btnAnalyzeMessage: 'Analyze Message',
    btnAnalyzing: 'Analyzing...',
    sampleMessagesLabel: 'Quick Test Samples:',

    screenshotDropText: 'Drop a screenshot here',
    screenshotBrowseText: 'or click to browse from device',
    screenshotSupported: 'Supported: PNG, JPG, JPEG, WEBP (Max 10 MB)',
    screenshotOcrNote: 'ScamShield will automatically extract the text from your screenshot and detect fraud patterns.',
    btnAnalyzeScreenshot: 'Analyze Screenshot',
    removeFile: 'Remove',

    upiSimTitle: 'Simulated UPI Collect Request',
    upiSimBadge: 'SIMULATED DEMO ONLY',
    upiSimNotice: 'This is an educational simulator for detecting UPI collect fraud. It is not connected to any real bank or NPCI server.',
    upiAmountLabel: 'Requested Amount',
    upiRequestFrom: 'Request from',
    upiMessageLabel: 'Payer Note / Message',
    btnAnalyzeUpi: 'Analyze Request',

    loadingTitle: 'Analyzing your message...',
    loadingStep1: 'Extracting message content & metadata',
    loadingStep2: 'Detecting urgency, fear & social engineering patterns',
    loadingStep3: 'Inspecting URLs, domains & UPI handles',
    loadingStep4: 'Evaluating financial fraud signals & risk score',
    loadingStep5: 'Generating multilingual security explanation',

    resultsHeaderScam: 'SCAM DETECTED',
    resultsHeaderSuspicious: 'SUSPICIOUS MESSAGE',
    resultsHeaderSafe: 'SAFE MESSAGE',
    resultsSummaryTitle: 'Threat Assessment',
    whyFlaggedTitle: 'Why ScamShield Flagged This',
    riskBreakdownTitle: 'Signal Breakdown',
    detectedLinksTitle: 'Detected Links',
    doNotOpenLink: 'Do NOT open this link. High risk phishing domain.',
    copyLink: 'Copy URL',
    linkCopied: 'Copied!',

    aiExplanationTitle: 'Why this may be dangerous',
    protectTitle: 'What You SHOULD Do',
    doNotTitle: 'What You MUST NOT Do',
    disclaimerText: 'ScamShield is an assistive fraud-screening tool. Its assessment is not a guarantee that a message is safe or fraudulent. Always verify financial requests through official channels.',

    btnAnalyzeAnother: 'Analyze Another Message',
    btnCopyReport: 'Copy Incident Summary',
    btnDownloadReport: 'Download Report',
    reportCopied: 'Summary copied to clipboard!',

    errorEmptyMessage: 'Please enter a message to analyze.',
    errorInvalidFile: 'Please upload a valid PNG, JPG, JPEG or WEBP image.',
    errorFileTooLarge: 'Maximum file size is 10 MB.',
    errorNetwork: "ScamShield couldn't reach the analysis service. Using offline analysis engine.",

    cyberHelpTitle: 'Victim of a digital fraud in India?',
    cyberHelpText: 'Call the National Cyber Crime Reporting Helpline immediately to block fraudulent transactions.',
    cyberHelpNumber: 'Dial 1930 (Toll Free) or visit cybercrime.gov.in',
  },

  kn: {
    appName: 'SCAMSHIELD',
    tagline: 'ಎಐ ಆಧಾರಿತ ಬಹುಭಾಷಾ ಯುಪಿಐ ಮತ್ತು ವಂಚನೆ ಸಂದೇಶ ರಕ್ಷಣೆ',
    badgeProtection: 'ಎಐ ವಂಚನೆ ತಡೆ ರಕ್ಷಣೆ',
    navAnalyze: 'ಪರಿಶೀಲಿಸಿ',
    navHowItWorks: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    navSafety: 'ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ',
    navEmergency: 'ಸಹಾಯವಾಣಿ 1930',

    heroHeadline1: 'ವಂಚನೆಗೆ ಒಳಗಾಗಬೇಡಿ.',
    heroHeadline2: 'ಹಣ ಪಾವತಿಸುವ ಮುನ್ನ ತಿಳಿಯಿರಿ.',
    heroSubtitle: 'ಯುಪಿಐ ವಂಚನೆ, ಫಿಶಿಂಗ್ ಮತ್ತು ನಕಲಿ ಬ್ಯಾಂಕಿಂಗ್ ಸಂದೇಶಗಳ ವಿರುದ್ಧ ಎಐ ಆಧಾರಿತ ರಕ್ಷಣೆ.',
    heroHighlight: 'ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶಗಳನ್ನು ಕೆಲವೇ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ — ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ ಅಥವಾ ಹಿಂದಿಯಲ್ಲಿ.',
    heroCtaAnalyze: 'ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ',
    heroCtaHow: 'ವಿವರ ತಿಳಿಯಿರಿ',

    analyzerTitle: 'ಈ ಸಂದೇಶ ಸುರಕ್ಷಿತವೇ?',
    analyzerSubtitle: 'ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ ಅಥವಾ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಸ್ಕ್ಯಾಮ್‌ಶೀಲ್ಡ್ ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.',
    tabMessage: 'ಸಂದೇಶ',
    tabScreenshot: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್',
    tabUpi: 'ಯುಪಿಐ ವಿನಂತಿ',

    messagePlaceholder: 'ಸಂಶಯಾಸ್ಪದ SMS, ವಾಟ್ಸಾಪ್ ಸಂದೇಶ, ಇಮೇಲ್ ಅಥವಾ ಪಾವತಿ ಸೂಚನೆಯನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ (ಉದಾಹರಣೆಗೆ: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ KYC ಅವಧಿ ಮುಗಿದಿದೆ, ತಕ್ಷಣ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ")...',
    charCount: 'ಅಕ್ಷರಗಳು',
    languageSelectLabel: 'ವಿಶ್ಲೇಷಣಾ ಭಾಷೆ:',
    btnAnalyzeMessage: 'ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ',
    btnAnalyzing: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    sampleMessagesLabel: 'ಮಾದರಿ ಸಂದೇಶಗಳು:',

    screenshotDropText: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ',
    screenshotBrowseText: 'ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    screenshotSupported: 'ಬೆಂಬಲಿತ: PNG, JPG, JPEG, WEBP (ಗರಿಷ್ಠ 10 MB)',
    screenshotOcrNote: 'ಸ್ಕ್ಯಾಮ್‌ಶೀಲ್ಡ್ ನಿಮ್ಮ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ನಲ್ಲಿರುವ ಪಠ್ಯವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಓದಿ ವಂಚನೆ ಸಂಕೇತಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ.',
    btnAnalyzeScreenshot: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಪರಿಶೀಲಿಸಿ',
    removeFile: 'ತೆಗೆದುಹಾಕಿ',

    upiSimTitle: 'ಸಿಮ್ಯುಲೇಟೆಡ್ ಯುಪಿಐ ವಿನಂತಿ',
    upiSimBadge: 'ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ',
    upiSimNotice: 'ಇದು ಯುಪಿಐ ವಂಚನೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮಾಡಿದ ಶೈಕ್ಷಣಿಕ ಸಿಮ್ಯುಲೇಟರ್ ಆಗಿದೆ. ಯಾವುದೇ ನೈಜ ಬ್ಯಾಂಕಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ.',
    upiAmountLabel: 'ವಿನಂತಿಸಿದ ಮೊತ್ತ',
    upiRequestFrom: 'ವಿನಂತಿಸಿದವರು',
    upiMessageLabel: 'ಸಂದೇಶ ಟಿಪ್ಪಣಿ',
    btnAnalyzeUpi: 'ವಿನಂತಿ ಪರಿಶೀಲಿಸಿ',

    loadingTitle: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    loadingStep1: 'ಸಂದೇಶದ ಪಠ್ಯವನ್ನು ವಿಂಗಡಿಸಲಾಗುತ್ತಿದೆ',
    loadingStep2: 'ತುರ್ತು ಮತ್ತು ಭಯ ಹುಟ್ಟಿಸುವ ತಂತ್ರಗಳನ್ನು ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ',
    loadingStep3: 'ವೆಬ್‌ಸೈಟ್ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಯುಪಿಐ ಐಡಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ',
    loadingStep4: 'ಹಣಕಾಸು ವಂಚನೆಯ ಅಪಾಯದ ಅಂಕವನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ',
    loadingStep5: 'ಕನ್ನಡದಲ್ಲಿ ಸುರಕ್ಷತಾ ವಿವರಣೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ',

    resultsHeaderScam: 'ಮೋಸದ ಸಂದೇಶ ಪತ್ತೆಯಾಗಿದೆ',
    resultsHeaderSuspicious: 'ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶ',
    resultsHeaderSafe: 'ಸುರಕ್ಷಿತ ಸಂದೇಶ',
    resultsSummaryTitle: 'ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ',
    whyFlaggedTitle: 'ಇದನ್ನು ಏಕೆ ಎಚ್ಚರಿಕೆ ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ?',
    riskBreakdownTitle: 'ಅಪಾಯಕಾರಿ ಸಂಕೇತಗಳು',
    detectedLinksTitle: 'ಪತ್ತೆಯಾದ ಲಿಂಕ್‌ಗಳು',
    doNotOpenLink: 'ಈ ಲಿಂಕ್ ಅನ್ನು ತೆರೆಯಬೇಡಿ! ಇದು ನಕಲಿ ವೆಬ್‌ಸೈಟ್ ಆಗಿರಬಹುದು.',
    copyLink: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopied: 'ನಕಲಿಸಲಾಗಿದೆ!',

    aiExplanationTitle: 'ಇದು ಏಕೆ ಅಪಾಯಕಾರಿಯಾಗಿದೆ?',
    protectTitle: 'ನೀವು ಏನು ಮಾಡಬೇಕು',
    doNotTitle: 'ನೀವು ಏನು ಮಾಡಬಾರದು',
    disclaimerText: 'ಸ್ಕ್ಯಾಮ್‌ಶೀಲ್ಡ್ ಒಂದು ಸಹಾಯಕ ವಂಚನೆ ತಡೆ ಸಾಧನವಾಗಿದೆ. ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಅಥವಾ ಸಂಸ್ಥೆಯ ಮೂಲಕ ಯಾವಾಗಲೂ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',

    btnAnalyzeAnother: 'ಮತ್ತೊಂದು ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ',
    btnCopyReport: 'ವರದಿ ನಕಲಿಸಿ',
    btnDownloadReport: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    reportCopied: 'ವರದಿಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ!',

    errorEmptyMessage: 'ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಲು ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ.',
    errorInvalidFile: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ PNG, JPG ಅಥವಾ WEBP ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    errorFileTooLarge: 'ಗರಿಷ್ಠ ಫೈಲ್ ಗಾತ್ರ 10 MB ಮೀರಬಾರದು.',
    errorNetwork: 'ಸರ್ವರ್ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ. ಆಫ್‌ಲೈನ್ ಎಂಜಿನ್ ಬಳಸಲಾಗುತ್ತಿದೆ.',

    cyberHelpTitle: 'ಭಾರತದಲ್ಲಿ ಡಿಜಿಟಲ್ ಹಣಕಾಸು ವಂಚನೆಗೆ ಒಳಗಾಗಿದ್ದೀರಾ?',
    cyberHelpText: 'ವಂಚನೆಯ ವಹಿವಾಟನ್ನು ತಕ್ಷಣ ತಡೆಯಲು ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.',
    cyberHelpNumber: 'ಕರೆ ಮಾಡಿ: 1930 (ಉಚಿತ ಸಹಾಯವಾಣಿ) ಅಥವಾ cybercrime.gov.in',
  },

  hi: {
    appName: 'SCAMSHIELD',
    tagline: 'एआई-संचालित बहुभाषी यूपीआई और धोखाधड़ी संदेश सुरक्षा',
    badgeProtection: 'एआई फ्रॉड स्क्रीनिंग',
    navAnalyze: 'जांचें',
    navHowItWorks: 'यह कैसे काम करता है',
    navSafety: 'सुरक्षा मार्गदर्शिका',
    navEmergency: 'हेल्पलाइन 1930',

    heroHeadline1: 'धोखे में न आएं।',
    heroHeadline2: 'पैसे भेजने से पहले जानें।',
    heroSubtitle: 'यूपीआई फ्रॉड, फ़िशिंग और फर्जी बैंकिंग संदेशों से एआई-संचालित सुरक्षा।',
    heroHighlight: 'संदिग्ध संदेशों को सेकंडों में समझें — अंग्रेज़ी, कन्नड़ या हिन्दी में।',
    heroCtaAnalyze: 'संदेश की जांच करें',
    heroCtaHow: 'प्रक्रिया देखें',

    analyzerTitle: 'क्या यह संदेश सुरक्षित है?',
    analyzerSubtitle: 'संदिग्ध संदेश पेस्ट करें या स्क्रीनशॉट अपलोड करें। स्कैमशील्ड चेतावनी संकेतों का विश्लेषण करेगा।',
    tabMessage: 'संदेश',
    tabScreenshot: 'स्क्रीनशॉट',
    tabUpi: 'यूपीआई अनुरोध',

    messagePlaceholder: 'संदिग्ध एसएमएस, व्हाट्सएप संदेश, ईमेल या भुगतान सूचना यहाँ पेस्ट करें (जैसे: "प्रिय एसबीआई ग्राहक, आपका केवाईसी समाप्त हो गया है। खाता ब्लॉक होने से बचाने के लिए तुरंत sbi-kyc-update.xyz पर अपडेट करें")...',
    charCount: 'अक्षर',
    languageSelectLabel: 'विश्लेषण भाषा:',
    btnAnalyzeMessage: 'संदेश जांचें',
    btnAnalyzing: 'जांच जारी है...',
    sampleMessagesLabel: 'त्वरित परीक्षण नमूने:',

    screenshotDropText: 'स्क्रीनशॉट यहाँ छोड़ें',
    screenshotBrowseText: 'या डिवाइस से चुनने के लिए क्लिक करें',
    screenshotSupported: 'समर्थित: PNG, JPG, JPEG, WEBP (अधिकतम 10 MB)',
    screenshotOcrNote: 'स्कैमशील्ड स्क्रीनशॉट से स्वचालित रूप से पाठ पढ़ेगा और संदिग्ध संकेतों का विश्लेषण करेगा।',
    btnAnalyzeScreenshot: 'स्क्रीनशॉट जांचें',
    removeFile: 'हटाएं',

    upiSimTitle: 'सिम्युलेटेड यूपीआई कलेक्ट अनुरोध',
    upiSimBadge: 'केवल डेमो के लिए',
    upiSimNotice: 'यह यूपीआई कलेक्ट धोखाधड़ी को समझने के लिए एक शैक्षिक सिम्युलेटर है। यह किसी वास्तविक बैंक से नहीं जुड़ा है।',
    upiAmountLabel: 'मांगी गई राशि',
    upiRequestFrom: 'अनुरोधकर्ता',
    upiMessageLabel: 'संदेश / नोट',
    btnAnalyzeUpi: 'अनुरोध जांचें',

    loadingTitle: 'संदेश की जांच की जा रही है...',
    loadingStep1: 'संदेश सामग्री और विवरण निकाला जा रहा है',
    loadingStep2: 'जल्दबाजी और भय पैदा करने वाले पैटर्न पहचाने जा रहे हैं',
    loadingStep3: 'वेबसाइट लिंक और यूपीआई आईडी की जांच की जा रही है',
    loadingStep4: 'वित्तीय धोखाधड़ी संकेतों और जोखिम स्कोर का मूल्यांकन',
    loadingStep5: 'हिन्दी में सरल सुरक्षा विवरण तैयार किया जा रहा है',

    resultsHeaderScam: 'धोखाधड़ी वाला संदेश पाया गया',
    resultsHeaderSuspicious: 'संदिग्ध संदेश',
    resultsHeaderSafe: 'सुरक्षित संदेश',
    resultsSummaryTitle: 'जोखिम मूल्यांकन',
    whyFlaggedTitle: 'स्कैमशील्ड ने यह चेतावनी क्यों दी?',
    riskBreakdownTitle: 'जोखिम संकेत विवरण',
    detectedLinksTitle: 'पाए गए लिंक',
    doNotOpenLink: 'इस लिंक को बिल्कुल न खोलें। यह खतरनाक फ़िशिंग वेबसाइट हो सकती है।',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'कॉपी हो गया!',

    aiExplanationTitle: 'यह खतरनाक क्यों हो सकता है?',
    protectTitle: 'आपको क्या करना चाहिए',
    doNotTitle: 'आपको क्या नहीं करना चाहिए',
    disclaimerText: 'स्कैमशील्ड एक सहायक धोखाधड़ी जांच उपकरण है। यह गारंटी नहीं देता कि संदेश पूर्णतः सुरक्षित या फर्जी है। हमेशा आधिकारिक स्रोतों से पुष्टि करें।',

    btnAnalyzeAnother: 'अन्य संदेश की जांच करें',
    btnCopyReport: 'रिपोर्ट कॉपी करें',
    btnDownloadReport: 'रिपोर्ट डाउनलोड करें',
    reportCopied: 'रिपोर्ट क्लिपबोर्ड पर कॉपी हो गई!',

    errorEmptyMessage: 'कृपया जांच के लिए कोई संदेश दर्ज करें।',
    errorInvalidFile: 'कृपया वैध PNG, JPG या WEBP छवि अपलोड करें।',
    errorFileTooLarge: 'अधिकतम फ़ाइल आकार 10 MB होना चाहिए।',
    errorNetwork: 'सर्वर से संपर्क नहीं हो सका। ऑफलाइन इंजन का उपयोग किया जा रहा है।',

    cyberHelpTitle: 'क्या आप भारत में डिजिटल धोखाधड़ी के शिकार हुए हैं?',
    cyberHelpText: 'धोखाधड़ी वाले लेनदेन को तुरंत रोकने के लिए राष्ट्रीय साइबर अपराध हेल्पलाइन पर कॉल करें।',
    cyberHelpNumber: 'डायल करें: 1930 (टोल फ्री) या cybercrime.gov.in पर जाएं',
  },
};
