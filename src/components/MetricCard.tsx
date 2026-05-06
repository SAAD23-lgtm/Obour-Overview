import { motion } from 'framer-motion';
import { pick, useLanguage } from '../context/LanguageContext';
import type { Metric } from '../data/content';
import AnimatedNumber from './AnimatedNumber';

export default function MetricCard({ metric, dense = false }: { metric: Metric; dense?: boolean }) {
  const { lang } = useLanguage();
  const Icon = metric.icon;

  return (
    <motion.article
      className={`metric-card ${dense ? 'dense' : ''}`}
      style={{ '--accent': metric.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.35 }}
    >
      <div className="metric-icon"><Icon size={22} /></div>
      <span>{pick(lang, metric.label)}</span>
      <AnimatedNumber value={metric.value} unit={metric.unit} suffix={metric.suffix} fraction={metric.fraction || 0} />
      <p>{pick(lang, metric.hint)}</p>
    </motion.article>
  );
}
