import { useState } from 'react';
import { useAnalysis } from './hooks/useAnalysis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { Analyzer } from './components/Analyzer';
import { AnalysisLoader } from './components/AnalysisLoader';
import { ResultsView } from './components/ResultsView';
import { HowItWorks } from './components/HowItWorks';
import { SafetySection } from './components/SafetySection';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';

export function App() {
  const {
    currentLanguage,
    setCurrentLanguage,
    isLoading,
    analysisResult,
    error,
    performAnalyzeMessage,
    performAnalyzeScreenshot,
    performAnalyzeUpi,
    resetAnalysis,
  } = useAnalysis('en');

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    if (analysisResult) {
      resetAnalysis();
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigate = (section: 'analyzer' | 'how-it-works' | 'safety' | 'home') => {
    if (section === 'home') {
      resetAnalysis();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'analyzer') {
      handleScrollToSection('analyzer-section');
    } else if (section === 'how-it-works') {
      handleScrollToSection('how-it-works-section');
    } else if (section === 'safety') {
      handleScrollToSection('safety-section');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Top Sticky Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onNavigate={handleNavigate}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <AnalysisLoader currentLanguage={currentLanguage} />
          </div>
        ) : analysisResult ? (
          <ResultsView
            result={analysisResult}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onAnalyzeAnother={resetAnalysis}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              currentLanguage={currentLanguage}
              onAnalyzeClick={() => handleScrollToSection('analyzer-section')}
              onHowItWorksClick={() => handleScrollToSection('how-it-works-section')}
            />

            {/* Core Value Feature Cards */}
            <FeatureCards currentLanguage={currentLanguage} />

            {/* Interactive Analyzer */}
            <Analyzer
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              onAnalyzeMessage={performAnalyzeMessage}
              onAnalyzeScreenshot={performAnalyzeScreenshot}
              onAnalyzeUpi={performAnalyzeUpi}
              isLoading={isLoading}
              error={error}
            />

            {/* How It Works Pipeline */}
            <HowItWorks currentLanguage={currentLanguage} />

            {/* Citizen Safety Guidelines */}
            <SafetySection currentLanguage={currentLanguage} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={handleNavigate}
      />

      {/* National Cyber Crime Emergency Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        currentLanguage={currentLanguage}
      />

    </div>
  );
}

export default App;
