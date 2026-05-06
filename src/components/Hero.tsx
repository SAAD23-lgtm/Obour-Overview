import { motion } from 'framer-motion';
import { ArrowDown, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { executiveMetrics, project } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import MetricCard from './MetricCard';

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-orb orb-a" />
      <div className="hero-bg-orb orb-b" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="eyebrow"><Sparkles size={16} />{pick(lang, project.eyebrow)}</span>
        <h1>{pick(lang, project.title)}</h1>
        <p>{pick(lang, project.subtitle)}</p>
        <div className="hero-actions">
          <a href="#achievements" className="primary-action"><ShieldCheck size={18} />{lang === 'ar' ? 'عرض الإنجازات' : 'View achievements'}</a>
          <a href="#map" className="secondary-action"><MapPinned size={18} />{lang === 'ar' ? 'فتح الخريطة' : 'Open map'}</a>
        </div>
        <div className="project-meta-strip">
          <span>{pick(lang, project.period)}</span>
          <span>{pick(lang, project.authority)}</span>
        </div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.15 }}>
        <img className="main-visual" src="/presentation/presentation_19.webp" alt="New Obour GIS dashboard" />
        <img className="floating-shot shot-a" src="/presentation/presentation_26.webp" alt="Handover map" />
        <img className="floating-shot shot-b" src="/presentation/presentation_09.webp" alt="GPR field survey" />
      </motion.div>
      <div className="hero-metrics">
        {executiveMetrics.slice(0, 4).map((metric) => <MetricCard key={metric.id} metric={metric} dense />)}
      </div>
      <a className="scroll-indicator" href="#intro"><ArrowDown size={18} /></a>
    </section>
  );
}
