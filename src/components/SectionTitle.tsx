import { motion } from 'framer-motion';
import { pick, useLanguage } from '../context/LanguageContext';
import type { Localized } from '../data/content';

type SectionTitleProps = {
  eyebrow: Localized;
  title: Localized;
  text?: Localized;
  center?: boolean;
};

export default function SectionTitle({ eyebrow, title, text, center = false }: SectionTitleProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      className={`section-title ${center ? 'center' : ''}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
    >
      <span>{pick(lang, eyebrow)}</span>
      <h2>{pick(lang, title)}</h2>
      {text && <p>{pick(lang, text)}</p>}
    </motion.div>
  );
}
