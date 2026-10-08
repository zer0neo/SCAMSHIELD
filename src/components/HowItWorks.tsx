import React from 'react';
import { MessageSquareWarning, Cpu, Gauge, Globe2, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';

interface HowItWorksProps {
  currentLanguage: SupportedLanguage;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLanguage }) => {
  const steps = [
    {
      step: '01',
      title: 'Suspicious Input',
      desc: 'Paste a message, upload a screenshot, or simulate a collect request.',
      titleKn: '೦೧. ಸಂಶಯಾಸ್ಪದ ಸಂದೇಶ',
      descKn: 'ಸಂದೇಶ ಅಂಟಿಸಿ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಹಾಕಿ ಅಥವಾ ಯುಪಿಐ ವಿನಂತಿ ನಮೂದಿಸಿ.',
      titleHi: '01. संदिग्ध इनपुट',
      descHi: 'संदेश पेस्ट करें, स्क्रीनशॉट अपलोड करें या यूपीआई अनुरोध दर्ज करें।',
      icon: MessageSquareWarning,
    },
    {
      step: '02',
      title: 'Multi-layer Screening',
      desc: 'ScamShield parses urgency, fake domains, and banking impersonation triggers.',
      titleKn: '೦೨. ಬಹುಪದರದ ಪರಿಶೀಲನೆ',
      descKn: 'ತುರ್ತು, ನಕಲಿ ಡೊಮೇನ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ವಂಚನೆಯ ಸಂಕೇತಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
      titleHi: '02. बहुस्तरीय स्क्रीनिंग',
      descHi: 'जल्दबाजी, फर्जी डोमेन और बैंक नकल के संकेतों की विस्तृत जांच।',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Explainable Score',
      desc: 'Generates a transparent 0-100 risk score with detailed factor weights.',
      titleKn: '೦೩. ಪಾರದರ್ಶಕ ಅಂಕ',
      descKn: '೦ ರಿಂದ ೧೦೦ ವರೆಗಿನ ಅಪಾಯದ ಅಂಕ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಅಂಶದ ತೂಕ ತಿಳಿಯುತ್ತದೆ.',
      titleHi: '03. स्पष्ट स्कोर',
      descHi: 'प्रत्येक कारक के वजन के साथ 0-100 का पारदर्शी जोखिम स्कोर।',
      icon: Gauge,
    },
    {
      step: '04',
      title: 'Vernacular Guidance',
      desc: 'Actionable Do and Don’t advice in English, Kannada, and Hindi.',
      titleKn: '೦೪. ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಸಲಹೆ',
      descKn: 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿಯಲ್ಲಿ ನೀವು ಏನು ಮಾಡಬೇಕು/ಮಾಡಬಾರದು ಎಂಬ ಮಾರ್ಗದರ್ಶನ.',
      titleHi: '04. सरल भाषा में सलाह',
      descHi: 'अंग्रेज़ी, कन्नड़ और हिन्दी में क्या करें और क्या न करें की स्पष्ट सलाह।',
      icon: Globe2,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 bg-[#0B1120]/60 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold tracking-wide uppercase border border-sky-500/20">
            Explainable Pipeline
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            How ScamShield Protects You
          </h2>
          <p className="text-sm text-slate-400">
            A transparent 4-step intelligence flow designed specifically for Indian digital payment users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const title =
              currentLanguage === 'kn'
                ? item.titleKn
                : currentLanguage === 'hi'
                ? item.titleHi
                : item.title;
            const desc =
              currentLanguage === 'kn'
                ? item.descKn
                : currentLanguage === 'hi'
                ? item.descHi
                : item.desc;

            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-extrabold text-sky-400/80">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 group-hover:scale-110 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center text-[11px] text-sky-400/80 font-semibold gap-1">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3 h-3 ml-auto text-slate-600 group-hover:text-sky-400 transition" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
