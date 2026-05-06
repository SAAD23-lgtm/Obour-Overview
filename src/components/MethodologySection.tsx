import { motion } from 'framer-motion';
import { methodology } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

export default function MethodologySection() {
  const { lang } = useLanguage();

  return (
    <section className="section methodology-section">
      <SectionTitle
        eyebrow={{ ar: 'منهجية العمل', en: 'Methodology' }}
        title={{ ar: 'رحلة واضحة من الرفع إلى التسليم', en: 'A clear journey from survey to handover' }}
        text={{ ar: 'خطوات منظمة تضمن دقة البيانات، جودة المخرجات، وسهولة متابعة كل مرحلة حتى الاعتماد.', en: 'A structured workflow that supports data accuracy, output quality, and clear tracking through approval.' }}
      />
      <div className="timeline">
        {methodology.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article key={item.step} className="timeline-item" initial={{ opacity: 0, x: lang === 'ar' ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <b>{item.step}</b>
              <div className="timeline-icon"><Icon size={22} /></div>
              <h3>{pick(lang, item.title)}</h3>
              <p>{pick(lang, item.text)}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
