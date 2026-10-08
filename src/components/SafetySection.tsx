import React from 'react';
import { Lock, AlertTriangle, Key, PhoneCall } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';

interface SafetySectionProps {
  currentLanguage: SupportedLanguage;
}

export const SafetySection: React.FC<SafetySectionProps> = ({ currentLanguage }) => {
  const safetyRules = [
    {
      icon: Key,
      title: 'The Golden Rule of UPI',
      rule: 'Entering your 4 or 6-digit UPI PIN ALWAYS transfers money OUT of your bank account. You NEVER need to enter your PIN to receive money, cashbacks, or refunds.',
      ruleKn: 'ಯುಪಿಐ ಪಿನ್ (UPI PIN) ಹಾಕಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ. ಹಣ, ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್ ಅಥವಾ ಮರುಪಾವತಿ ಪಡೆಯಲು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕಬೇಕಾಗಿಲ್ಲ!',
      ruleHi: 'यूपीआई पिन डालने से हमेशा आपके खाते से पैसे कटते हैं। पैसे, कैशबैक या रिफंड प्राप्त करने के लिए कभी भी यूपीआई पिन दर्ज न करें!',
    },
    {
      icon: Lock,
      title: 'KYC & NetBanking Links',
      rule: 'Banks NEVER send SMS links ending in .xyz, .site, .top, or bit.ly. Never enter your password or OTP on any website received via SMS.',
      ruleKn: 'ಬ್ಯಾಂಕ್‌ಗಳು ಎಂದಿಗೂ ಎಸ್‌ಎಂಎಸ್ ಲಿಂಕ್‌ಗಳ ಮೂಲಕ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಕೇಳುವುದಿಲ್ಲ. ಅಪರಿಚಿತ ಲಿಂಕ್‌ಗಳಲ್ಲಿ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ನಮೂದಿಸಬೇಡಿ.',
      ruleHi: 'बैंक कभी भी एसएमएस लिंक के जरिए केवाईसी अपडेट नहीं मांगते। किसी भी अज्ञात लिंक पर अपना पासवर्ड या ओटीपी कभी दर्ज न करें।',
    },
    {
      icon: AlertTriangle,
      title: 'Screen Sharing Apps Trap',
      rule: 'Never install AnyDesk, TeamViewer, RustDesk, or QuickSupport on the instruction of anyone claiming to be a bank or electricity department official.',
      ruleKn: 'ಯಾರೇ ಕರೆ ಮಾಡಿ ಹೇಳಿದರೂ AnyDesk ಅಥವಾ TeamViewer ನಂತಹ ಆ್ಯಪ್‌ಗಳನ್ನು ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.',
      ruleHi: 'बैंक या बिजली विभाग का अधिकारी बताकर कोई कहे तो भी AnyDesk या TeamViewer जैसी ऐप्स कभी डाउनलोड न करें।',
    },
    {
      icon: PhoneCall,
      title: 'Golden Hour Helpline: 1930',
      rule: 'If you suspect an unauthorized transaction has occurred, immediately dial 1930 to freeze the scammer’s account through the Citizen Financial Cyber Fraud Reporting System.',
      ruleKn: 'ಅನಧಿಕೃತ ಹಣ ಕಡಿತಗೊಂಡರೆ, ತಕ್ಷಣ 1930 ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ದೂರು ನೀಡಿ.',
      ruleHi: 'धोखाधड़ी वाला लेनदेन होने पर तुरंत 1930 डायल करें ताकि पैसे ट्रांसफर को रोका जा सके।',
    },
  ];

  return (
    <section id="safety-section" className="py-16 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wide uppercase border border-emerald-500/20">
            Citizen Protection Guidelines
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Universal UPI & Banking Safety Rules
          </h2>
          <p className="text-sm text-slate-400">
            Essential knowledge for every digital payment user in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyRules.map((rule, idx) => {
            const Icon = rule.icon;
            const text =
              currentLanguage === 'kn'
                ? rule.ruleKn
                : currentLanguage === 'hi'
                ? rule.ruleHi
                : rule.rule;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {rule.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
