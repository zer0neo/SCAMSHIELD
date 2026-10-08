import React from 'react';
import { ShieldCheck, Lightbulb, ShieldAlert, Languages, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';

interface FeatureCardsProps {
  currentLanguage: SupportedLanguage;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ currentLanguage }) => {
  const cards = [
    {
      icon: ShieldCheck,
      color: 'sky',
      title: '1. Detect',
      description: 'Identify suspicious messages, malicious short-links and fraudulent UPI collect requests with multi-factor risk scoring.',
      titleKn: '೧. ಪತ್ತೆ ಮಾಡಿ',
      descKn: 'ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶಗಳು, ನಕಲಿ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಮೋಸದ ಯುಪಿಐ ವಿನಂತಿಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ.',
      titleHi: '1. पहचानें',
      descHi: 'संदिग्ध संदेशों, फर्जी लिंक और कपटपूर्ण यूपीआई अनुरोधों को जोखिम स्कोर के साथ तुरंत पहचानें।',
    },
    {
      icon: Lightbulb,
      color: 'amber',
      title: '2. Explain',
      description: 'Understand the underlying fraud signals without technical jargon—urgency tactics, spoofed domains, and credential traps.',
      titleKn: '೨. ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
      descKn: 'ಸಂಕೀರ್ಣ ತಾಂತ್ರಿಕ ಪದಗಳಿಲ್ಲದೆ, ಸಂದೇಶವು ಏಕೆ ಅಪಾಯಕಾರಿ ಎಂಬುದನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
      titleHi: '2. समझें',
      descHi: 'कठिन तकनीकी शब्दों के बिना समझें कि कोई संदेश क्यों खतरनाक और धोखाधड़ी भरा हो सकता है।',
    },
    {
      icon: ShieldAlert,
      color: 'rose',
      title: '3. Protect',
      description: 'Get immediate, unambiguous instructions on what you MUST do and what you MUST NOT do to keep your money safe.',
      titleKn: '೩. ರಕ್ಷಿಸಿಕೊಳ್ಳಿ',
      descKn: 'ನಿಮ್ಮ ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಲು ನೀವು ಏನು ಮಾಡಬೇಕು ಮತ್ತು ಏನು ಮಾಡಬಾರದು ಎಂಬ ಸ್ಪಷ್ಟ ಸಲಹೆ ಪಡೆಯಿರಿ.',
      titleHi: '3. सुरक्षित रहें',
      descHi: 'अपने पैसों की सुरक्षा के लिए आपको क्या करना चाहिए और क्या बिल्कुल नहीं करना चाहिए, स्पष्ट निर्देश पाएं।',
    },
    {
      icon: Languages,
      color: 'indigo',
      title: '4. Vernacular',
      description: 'Receive safety explanations natively in English, Kannada, and Hindi tailored for elderly and first-time digital payment users.',
      titleKn: '೪. ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ',
      descKn: 'ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಮೊದಲ ಬಾರಿಯ ಬಳಕೆದಾರರಿಗಾಗಿ ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿಯಲ್ಲಿ ವಿವರಣೆ.',
      titleHi: '4. अपनी भाषा में',
      descHi: 'वरिष्ठ नागरिकों और नए डिजिटल उपयोगकर्ताओं के लिए अंग्रेज़ी, कन्नड़ और हिन्दी में सरल सुरक्षा मार्गदर्शन।',
    },
  ];

  return (
    <section className="py-12 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const title =
              currentLanguage === 'kn'
                ? card.titleKn
                : currentLanguage === 'hi'
                ? card.titleHi
                : card.title;
            const desc =
              currentLanguage === 'kn'
                ? card.descKn
                : currentLanguage === 'hi'
                ? card.descHi
                : card.description;

            return (
              <div
                key={idx}
                className="relative group p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/60"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:border-sky-500/40 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
