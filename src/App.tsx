import Header from './components/Header';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import AchievementsSection from './components/AchievementsSection';
import InteractiveMapSection from './components/InteractiveMapSection';
import NetworksSection from './components/NetworksSection';
import MethodologySection from './components/MethodologySection';
import ProposalDeepDiveSection from './components/ProposalDeepDiveSection';
import InstitutionalDetailsSection from './components/InstitutionalDetailsSection';
import GallerySection from './components/GallerySection';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { lang, dir } = useLanguage();

  return (
    <div className={`site-shell lang-${lang}`} dir={dir}>
      <Header />
      <main>
        <Hero />
        <IntroSection />
        <AchievementsSection />
        <InteractiveMapSection />
        <NetworksSection />
        <MethodologySection />
        <ProposalDeepDiveSection />
        <InstitutionalDetailsSection />
        <GallerySection />
      </main>
    </div>
  );
}
