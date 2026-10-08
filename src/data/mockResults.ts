import { AnalysisResult } from '../types/analysis';

export interface SampleScenario {
  id: string;
  title: string;
  category: 'scam' | 'suspicious' | 'safe';
  text: string;
  result: AnalysisResult;
}

export const mockScamResult: AnalysisResult = {
  id: 'scan-kyc-94',
  analyzed_at: new Date().toISOString(),
  input_type: 'text',
  risk_score: 94,
  risk_level: 'HIGH',
  classification: 'SCAM',
  scam_type: 'KYC Phishing & Bank Impersonation',
  summary: 'This message is a high-risk phishing scam impersonating State Bank of India with an urgent threat to freeze your account.',
  reasons: [
    {
      type: 'urgency',
      title: 'Urgency & Fear Tactics',
      description: 'The sender pressures you to act within 24 hours to prevent account suspension, a classic psychological coercion tactic.',
      severity: 'HIGH',
      score: 25,
    },
    {
      type: 'suspicious_url',
      title: 'Deceptive Phishing Domain',
      description: 'The link "sbi-kyc-update.xyz" uses an unofficial .xyz extension and is not owned or operated by State Bank of India (sbi.co.in).',
      severity: 'HIGH',
      score: 30,
    },
    {
      type: 'bank_impersonation',
      title: 'Financial Institution Impersonation',
      description: 'The message claims to be from your bank, but banks never request KYC updates or credentials via random SMS links.',
      severity: 'HIGH',
      score: 20,
    },
    {
      type: 'credential_theft',
      title: 'Credential Harvesting Intent',
      description: 'The destination link attempts to collect your net banking login credentials, PAN card details, and SMS OTP.',
      severity: 'HIGH',
      score: 19,
    },
  ],
  actions: {
    do: [
      'Immediately ignore or delete this message.',
      'If in doubt, contact SBI customer care directly at 1800-1234 or through the official YONO SBI app.',
      'Forward the spam SMS to 1909 (TRAI DND complaint) or report on cybercrime.gov.in.',
    ],
    dont: [
      'Do NOT click or open the link "sbi-kyc-update.xyz".',
      'Do NOT enter your net banking username, password, or debit card PIN.',
      'Do NOT share any OTP (One-Time Password) with anyone calling on behalf of the bank.',
      'Do NOT install any remote-access app (e.g. AnyDesk, TeamViewer) if prompted.',
    ],
  },
  explanation: {
    english: 'This message uses artificial urgency to induce panic by falsely claiming your bank account will be blocked. It directs you to a fake phishing website (sbi-kyc-update.xyz) designed to steal your confidential banking credentials, passwords, and OTPs. Legitimate banks never send external SMS links asking for KYC verification.',
    kannada: 'ಈ ಸಂದೇಶವು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗುತ್ತದೆ ಎಂದು ಸುಳ್ಳು ಹೆದರಿಸಿ ಆತಂಕ ಸೃಷ್ಟಿಸುತ್ತದೆ. ನಿಮ್ಮ ಗೌಪ್ಯ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಒಟಿಪಿ (OTP) ಕದಿಯಲು ನಕಲಿ ಲಿಂಕ್ (sbi-kyc-update.xyz) ಅನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ. ಯಾವುದೇ ನಿಜವಾದ ಬ್ಯಾಂಕ್ ಎಸ್‌ಎಂಎಸ್ ಮೂಲಕ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ಇಂತಹ ಲಿಂಕ್‌ಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ.',
    hindi: 'यह संदेश आपके बैंक खाते को ब्लॉक करने की झूठी धमकी देकर भय पैदा करता है। इसमें दिया गया लिंक (sbi-kyc-update.xyz) एक फर्जी फ़िशिंग वेबसाइट है, जिसका उद्देश्य आपके नेट बैंकिंग पासवर्ड और ओटीपी की चोरी करना है। असली बैंक कभी भी एसएमएस लिंक के जरिए केवाईसी अपडेट करने के लिए नहीं कहते।',
  },
  detected_urls: [
    {
      url: 'https://sbi-kyc-update.xyz/verify',
      risk: 'HIGH',
      reason: 'Unregistered third-party domain spoofing State Bank of India brand name.',
    },
  ],
  localized_summary: {
    english: 'High-risk bank KYC phishing scam attempting credential theft.',
    kannada: 'ಬ್ಯಾಂಕ್ ಕೆವೈಸಿ ಹೆಸರಿನಲ್ಲಿ ನಿಮ್ಮ ಗೌಪ್ಯ ಮಾಹಿತಿ ಕದಿಯುವ ತೀವ್ರ ಅಪಾಯಕಾರಿ ಮೋಸದ ಸಂದೇಶ.',
    hindi: 'बैंक केवाईसी के नाम पर आपकी गोपनीय जानकारी चुराने वाला अत्यधिक जोखिम भरा फर्जी संदेश।',
  },
  localized_actions: {
    kannada: {
      do: [
        'ಈ ಸಂದೇಶವನ್ನು ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ ಅಥವಾ ಅಳಿಸಿಹಾಕಿ.',
        'ಯಾವುದೇ ಸಂದೇಹವಿದ್ದರೆ, ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ಅಧಿಕೃತ ಮೊಬೈಲ್ ಆಪ್ ಮೂಲಕವೇ ಸಂಪರ್ಕಿಸಿ.',
        'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಸಹಾಯವಾಣಿ 1930 ಗೆ ಮಾಹಿತಿ ನೀಡಿ.',
      ],
      dont: [
        'ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಆ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.',
        'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆ, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಯುಪಿಐ ಪಿನ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
        'ಯಾರೊಂದಿಗೂ ಒಟಿಪಿ (OTP) ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
        'ಅಪರಿಚಿತರು ಹೇಳಿದ ಯಾವುದೇ ಮೊಬೈಲ್ ಆ್ಯಪ್ (AnyDesk ಇತ್ಯಾದಿ) ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ.',
      ],
    },
    hindi: {
      do: [
        'इस संदेश को तुरंत नजरअंदाज करें या हटा दें।',
        'संदेह होने पर केवल बैंक की आधिकारिक शाखा या आधिकारिक ऐप से ही संपर्क करें।',
        'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर शिकायत दर्ज करें।',
      ],
      dont: [
        'संदेश में दिए गए किसी भी लिंक पर बिल्कुल क्लिक न करें।',
        'अपना नेट बैंकिंग पासवर्ड या यूपीआई पिन कभी साझा न करें।',
        'किसी के साथ भी अपना बैंक ओटीपी साझा न करें।',
        'फोन पर किसी के कहने पर AnyDesk या TeamViewer जैसी ऐप्स इंस्टॉल न करें।',
      ],
    },
  },
};

export const mockUpiCollectScamResult: AnalysisResult = {
  id: 'scan-upi-91',
  analyzed_at: new Date().toISOString(),
  input_type: 'upi',
  input_preview: 'UPI Collect Request of ₹4,999 from rahul@xyzbank with note: "Approve to receive your lottery cashback refund"',
  risk_score: 91,
  risk_level: 'HIGH',
  classification: 'SCAM',
  scam_type: 'Fake UPI Collect / Refund Fraud',
  summary: 'Deceptive collect request attempting to debit ₹4,999 from your bank account by disguising it as an incoming refund/reward.',
  reasons: [
    {
      type: 'upi_reverse_collect',
      title: 'UPI Collect Misdirection',
      description: 'The scammer sent a "Collect/Pay" request instead of sending money. In UPI, entering your PIN always DEBITS your account.',
      severity: 'HIGH',
      score: 35,
    },
    {
      type: 'fake_refund_promise',
      title: 'Fraudulent Refund / Cashback Claim',
      description: 'The note falsely promises you will "receive" ₹4,999 upon approval, which is mathematically and technically impossible on UPI.',
      severity: 'HIGH',
      score: 30,
    },
    {
      type: 'unverified_vpa',
      title: 'Unverified Merchant VPA',
      description: 'The virtual payment address (rahul@xyzbank) belongs to an individual personal wallet, not an official merchant or bank refund desk.',
      severity: 'HIGH',
      score: 26,
    },
  ],
  actions: {
    do: [
      'Decline and block this collect request immediately inside your UPI app.',
      'Remember the golden rule of UPI: You NEVER need to enter your UPI PIN to receive money.',
      'Report the VPA inside Google Pay / PhonePe / Paytm as fraud.',
    ],
    dont: [
      'Do NOT click "Pay" or "Approve".',
      'Do NOT enter your 4-digit or 6-digit UPI PIN.',
      'Do NOT call back any phone number provided in the payment remarks.',
    ],
  },
  explanation: {
    english: 'This is a classic UPI collect request fraud. The sender claims that approving the request will deposit a refund of ₹4,999 into your account. However, on UPI, entering your PIN will instantly DEDUCT ₹4,999 from your account. You NEVER need to enter your UPI PIN or accept a collect request to receive funds.',
    kannada: 'ಇದು ಅತ್ಯಂತ ಸಾಮಾನ್ಯವಾದ ಯುಪಿಐ ಕಲೆಕ್ಟ್ ವಂಚನೆಯಾಗಿದೆ. ವಿನಂತಿಯನ್ನು ಒಪ್ಪಿಕೊಂಡರೆ ನಿಮಗೆ ₹4,999 ಮರುಪಾವತಿ ಸಿಗುತ್ತದೆ ಎಂದು ಸುಳ್ಳು ಹೇಳಲಾಗಿದೆ. ಆದರೆ ನೆನಪಿಡಿ: ಯುಪಿಐನಲ್ಲಿ ಹಣ ಪಡೆಯಲು ನೀವು ಎಂದಿಗೂ ಯುಪಿಐ ಪಿನ್ (UPI PIN) ಹಾಕಬೇಕಾಗಿಲ್ಲ. ಪಿನ್ ನಮೂದಿಸಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ₹4,999 ಕಡಿತಗೊಳ್ಳುತ್ತದೆ!',
    hindi: 'यह एक खतरनाक यूपीआई कलेक्ट फ्रॉड है। दावा किया जा रहा है कि इस अनुरोध को स्वीकार करने से आपके खाते में ₹4,999 वापस आएंगे। पर सच्चाई यह है कि यूपीआई में पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन दर्ज नहीं करना पड़ता। पिन डालते ही आपके खाते से ₹4,999 कट जाएंगे!',
  },
  detected_urls: [],
  localized_summary: {
    english: 'Deceptive collect request attempting unauthorized bank debit under the guise of a refund.',
    kannada: 'ಮರುಪಾವತಿ ನೆಪದಲ್ಲಿ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತಗೊಳಿಸಲು ಕಳುಹಿಸಲಾದ ಮೋಸದ ಯುಪಿಐ ವಿನಂತಿ.',
    hindi: 'रिफंड के बहाने आपके बैंक खाते से पैसे काटने के लिए भेजा गया फर्जी यूपीआई कलेक्ट अनुरोध।',
  },
  localized_actions: {
    kannada: {
      do: [
        'ಈ ಯುಪಿಐ ವಿನಂತಿಯನ್ನು ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ (Decline) ಮತ್ತು ಬ್ಲಾಕ್ ಮಾಡಿ.',
        'ಸುವರ್ಣ ನಿಯಮ: ಯುಪಿಐನಲ್ಲಿ ಹಣ ಪಡೆಯಲು ಎಂದಿಗೂ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಬೇಕಾಗಿಲ್ಲ.',
        'ಯುಪಿಐ ಆ್ಯಪ್‌ನಲ್ಲಿ ಈ ಖಾತೆಯನ್ನು ವಂಚನೆ (Report Fraud) ಎಂದು ವರದಿ ಮಾಡಿ.',
      ],
      dont: [
        '"Pay" ಅಥವಾ "Approve" ಬಟನ್ ಒತ್ತಬೇಡಿ.',
        'ನಿಮ್ಮ 4 ಅಥವಾ 6 ಅಂಕಿಯ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸಬೇಡಿ.',
        'ವಿನಂತಿಯಲ್ಲಿರುವ ಯಾವುದೇ ಸಂಖ್ಯೆಗೆ ಮರಳಿ ಕರೆ ಮಾಡಬೇಡಿ.',
      ],
    },
    hindi: {
      do: [
        'इस यूपीआई अनुरोध को तुरंत अस्वीकार (Decline) करें और ब्लॉक करें।',
        'गोल्डन नियम: यूपीआई में पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन डालने की जरूरत नहीं होती।',
        'अपने यूपीआई ऐप में इस उपयोगकर्ता को धोखाधड़ी के रूप में रिपोर्ट करें।',
      ],
      dont: [
        '"Pay" या "Approve" पर बिल्कुल क्लिक न करें।',
        'अपना 4 या 6 अंकों का यूपीआई पिन कभी न डालें।',
        'नोट में दिए गए किसी भी फोन नंबर पर कॉल न करें।',
      ],
    },
  },
};

export const mockSuspiciousResult: AnalysisResult = {
  id: 'scan-courier-52',
  analyzed_at: new Date().toISOString(),
  input_type: 'text',
  risk_score: 52,
  risk_level: 'MEDIUM',
  classification: 'SUSPICIOUS',
  scam_type: 'Unverified Delivery Notification',
  summary: 'This delivery alert contains an unknown short-link and an unexpected address update fee request.',
  reasons: [
    {
      type: 'shortened_url',
      title: 'Obfuscated Short URL',
      description: 'The link uses a generic URL shortening service (bit.ly/pkg-track) that hides the true destination server.',
      severity: 'MEDIUM',
      score: 22,
    },
    {
      type: 'unverified_fee',
      title: 'Small Processing Fee Prompt',
      description: 'The message mentions an unpaid ₹5 delivery fee, a common pretext used by scammers to capture credit card numbers.',
      severity: 'MEDIUM',
      score: 18,
    },
    {
      type: 'vague_sender',
      title: 'Generic Logistics Header',
      description: 'The sender does not state the official courier company name (e.g. India Post, BlueDart, Delhivery).',
      severity: 'LOW',
      score: 12,
    },
  ],
  actions: {
    do: [
      'Check your recent e-commerce orders (Amazon, Flipkart) directly within their official apps.',
      'Check India Post or official courier tracking directly on their verified website.',
      'If you did not order any package, safely disregard this message.',
    ],
    dont: [
      'Do not click the shortened bit.ly link.',
      'Do not pay any ₹5 or ₹10 redelivery fee via unknown payment gateways.',
      'Do not enter debit or credit card CVVs on unverified pages.',
    ],
  },
  explanation: {
    english: 'This message shows characteristics of parcel redelivery scams. Fraudsters ask for a tiny payment of ₹5 to ₹25 to "reschedule" a delivery, using a shortened link to direct you to a fake payment gateway that secretly records your debit card details and CVV.',
    kannada: 'ಈ ಸಂದೇಶವು ಪಾರ್ಸೆಲ್ ವಿತರಣಾ ವಂಚನೆಯ ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿದೆ. ವಿಳಾಸ ಸರಿಪಡಿಸಲು ಕೇವಲ ₹5 ಪಾವತಿಸಿ ಎಂದು ಹೇಳಿ, ನಿಮ್ಮ ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ ಮತ್ತು CVV ಕದಿಯಲು ನಕಲಿ ಲಿಂಕ್ ಕಳುಹಿಸುವ ಸಾಧ್ಯತೆ ಇದೆ.',
    hindi: 'इस संदेश में पार्सल डिलीवरी घोटाले के संकेत हैं। डिलीवरी दोबारा शेड्यूल करने के लिए ₹5 जैसी छोटी राशि मांगने के बहाने फर्जी पेमेंट गेटवे पर आपके कार्ड का विवरण और सीवीवी चुराया जा सकता है।',
  },
  detected_urls: [
    {
      url: 'https://bit.ly/pkg-track-ind72',
      risk: 'MEDIUM',
      reason: 'Shortened link that masks the true destination host.',
    },
  ],
  localized_summary: {
    english: 'Suspicious courier delivery fee notification with masked short-link.',
    kannada: 'ಅಪರಿಚಿತ ಲಿಂಕ್ ಮತ್ತು ಸಣ್ಣ ಶುಲ್ಕ ಕೇಳುವ ಸಂಶಯಾಸ್ಪದ ಕೊರಿಯರ್ ಸಂದೇಶ.',
    hindi: 'अज्ञात लिंक और छोटे शुल्क की मांग करने वाला संदिग्ध कूरियर संदेश।',
  },
  localized_actions: {
    kannada: {
      do: [
        'ನಿಮ್ಮ ಅಮೆಜಾನ್ ಅಥವಾ ಫ್ಲಿಪ್‌ಕಾರ್ಟ್ ಆಪ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಸ್ಥಿತಿಯನ್ನು ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
        'ಅಧಿಕೃತ ಕೊರಿಯರ್ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕವೇ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
        'ನೀವು ಯಾವುದೇ ಪಾರ್ಸೆಲ್ ಬುಕ್ ಮಾಡದಿದ್ದರೆ, ಈ ಸಂದೇಶವನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ.',
      ],
      dont: [
        'ಸಂಕ್ಷಿಪ್ತ bit.ly ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.',
        'ಅಪರಿಚಿತ ಪಾವತಿ ಗೇಟ್‌ವೇಗಳಲ್ಲಿ ₹5 ಅಥವಾ ₹10 ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ.',
        'ಅಪರಿಚಿತ ವೆಬ್‌ಸೈಟ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ಡೆಬಿಟ್ ಕಾರ್ಡ್ CVV ನಮೂದಿಸಬೇಡಿ.',
      ],
    },
    hindi: {
      do: [
        'अपने अमेज़न या फ्लिपकार्ट ऐप में सीधे ऑर्डर की स्थिति जांचें।',
        'आधिकारिक कूरियर वेबसाइट से ट्रैकिंग विवरण सत्यापित करें।',
        'यदि आपने कोई पार्सल ऑर्डर नहीं किया है, तो इस संदेश को सुरक्षित रूप से अनदेखा करें।',
      ],
      dont: [
        'संक्षिप्त bit.ly लिंक पर बिल्कुल क्लिक न करें।',
        'अज्ञात गेटवे के माध्यम से ₹5 या ₹10 का पुनः वितरण शुल्क न दें।',
        'अपुष्ट पृष्ठों पर डेबिट या क्रेडिट कार्ड का सीवीवी दर्ज न करें।',
      ],
    },
  },
};

export const mockSafeResult: AnalysisResult = {
  id: 'scan-safe-12',
  analyzed_at: new Date().toISOString(),
  input_type: 'text',
  risk_score: 12,
  risk_level: 'LOW',
  classification: 'SAFE',
  scam_type: 'Standard Banking Transaction Alert',
  summary: 'This appears to be a legitimate automated debit notification from your bank with standard safety disclosures.',
  reasons: [
    {
      type: 'no_threats',
      title: 'No Coercion or Threats',
      description: 'The message contains standard informational transaction details without threatening account suspension or penalties.',
      severity: 'LOW',
      score: 4,
    },
    {
      type: 'official_sender_format',
      title: 'Standard Informational Template',
      description: 'The format matches standard RBI-mandated transactional SMS guidelines with reference numbers and balances.',
      severity: 'LOW',
      score: 4,
    },
    {
      type: 'no_suspicious_links',
      title: 'No Suspicious External Links',
      description: 'No suspicious shortened or third-party links were detected in the message.',
      severity: 'LOW',
      score: 4,
    },
  ],
  actions: {
    do: [
      'Compare this transaction with your official bank passbook or mobile app statement if needed.',
      'Keep your bank notifications enabled for real-time security alerts.',
    ],
    dont: [
      'Never forward banking SMS containing balance or reference numbers to unknown people.',
      'Never share bank OTPs with anyone claiming to reverse this debit.',
    ],
  },
  explanation: {
    english: 'This message appears to be a standard informational transaction alert sent after a payment. It does not ask you to click external links, provide credentials, or transfer money. Always monitor your monthly statement to ensure you recognize all charges.',
    kannada: 'ಈ ಸಂದೇಶವು ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ವಹಿವಾಟಿನ ಸಾಮಾನ್ಯ ಮಾಹಿತಿಯಾಗಿದೆ. ಇದರಲ್ಲಿ ಯಾವುದೇ ಸಂಶಯಾಸ್ಪದ ಲಿಂಕ್ ಅಥವಾ ಗೌಪ್ಯ ಮಾಹಿತಿ ಕೇಳಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಆಪ್‌ನಲ್ಲಿ ಖಾತೆ ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ.',
    hindi: 'यह संदेश बैंक से प्राप्त सामान्य लेनदेन सूचना प्रतीत होता है। इसमें कोई संदिग्ध लिंक या गोपनीय जानकारी नहीं मांगी गई है। अपने बैंक ऐप में स्टेटमेंट की पुष्टि कर सकते हैं।',
  },
  detected_urls: [],
  localized_summary: {
    english: 'Standard informative transaction alert. No malicious patterns detected.',
    kannada: 'ಸಾಮಾನ್ಯ ಬ್ಯಾಂಕ್ ವಹಿವಾಟು ಮಾಹಿತಿ. ಯಾವುದೇ ಅಪಾಯಕಾರಿ ಅಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    hindi: 'सामान्य बैंक लेनदेन सूचना। कोई संदिग्ध पैटर्न नहीं मिला।',
  },
  localized_actions: {
    kannada: {
      do: [
        'ಅಗತ್ಯವಿದ್ದರೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಥವಾ ಮೊಬೈಲ್ ಆಪ್‌ನಲ್ಲಿ ಈ ವಹಿವಾಟನ್ನು ಪರಿಶೀಲಿಸಿ.',
        'ನೈಜ ಸಮಯದ ಭದ್ರತಾ ಎಚ್ಚರಿಕೆಗಳಿಗಾಗಿ ಬ್ಯಾಂಕ್ ಸೂಚನೆಗಳನ್ನು ಸಕ್ರಿಯವಾಗಿರಿಸಿ.',
      ],
      dont: [
        'ಬ್ಯಾಂಕ್ ಬ್ಯಾಲೆನ್ಸ್ ಅಥವಾ ವಿವರಗಳನ್ನು ಒಳಗೊಂಡ ಎಸ್‌ಎಂಎಸ್ ಅನ್ನು ಅಪರಿಚಿತರಿಗೆ ಕಳುಹಿಸಬೇಡಿ.',
        'ಈ ಕಡಿತವನ್ನು ರದ್ದುಗೊಳಿಸುತ್ತೇವೆ ಎಂದು ಕರೆ ಮಾಡುವ ಯಾರೊಂದಿಗೂ ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
      ],
    },
    hindi: {
      do: [
        'यदि आवश्यक हो तो अपने आधिकारिक बैंक ऐप स्टेटमेंट में इस लेनदेन की पुष्टि करें।',
        'रीयल-टाइम सुरक्षा सूचनाओं के लिए अपनी बैंक अलर्ट सेवा चालू रखें।',
      ],
      dont: [
        'बैलेंस या संदर्भ संख्या वाले बैंकिंग एसएमएस को अज्ञात लोगों को फॉरवर्ड न करें।',
        'लेनदेन वापस करने का दावा करने वाले किसी भी व्यक्ति के साथ बैंक ओटीपी साझा न करें।',
      ],
    },
  },
};

export const sampleScenarios: SampleScenario[] = [
  {
    id: 'sample-sbi-kyc',
    title: '⚠️ Fake SBI KYC SMS',
    category: 'scam',
    text: 'Dear SBI User, your KYC has expired and your NetBanking will be suspended within 24 hours. Verify your PAN and Aadhaar immediately at: https://sbi-kyc-update.xyz/verify to keep services active.',
    result: mockScamResult,
  },
  {
    id: 'sample-upi-refund',
    title: '💸 UPI ₹4,999 Refund Trick',
    category: 'scam',
    text: 'Simulated UPI Collect Request: Rahul Sharma (rahul@xyzbank) requested ₹4,999 with note: "Approve this collect request to claim your festive lottery refund of ₹4,999."',
    result: mockUpiCollectScamResult,
  },
  {
    id: 'sample-courier-fee',
    title: '📦 Courier Address ₹5 Fee',
    category: 'suspicious',
    text: 'Your package delivery IND-9831 failed due to incorrect house number. Pay ₹5 address fee and reschedule delivery within 12 hrs: https://bit.ly/pkg-track-ind72',
    result: mockSuspiciousResult,
  },
  {
    id: 'sample-safe-bank',
    title: '✅ Genuine Bank Debit Alert',
    category: 'safe',
    text: 'Rs. 450.00 debited from A/C XX4921 on 08-Oct-26 via UPI to ZOMATO (UPI Ref: 4291840291). Available Bal: Rs. 14,230.50. If not done by you, SMS BLOCK to 567676.',
    result: mockSafeResult,
  },
];
