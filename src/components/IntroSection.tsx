import { motion } from 'framer-motion';
import { FileText, Map, MousePointerClick } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

const items = [
  {
    icon: FileText,
    ar: { title: 'ملخص واضح للقرار', text: 'موقف الإنجاز والتسليم والاعتماد يظهر في أرقام مختصرة وسهلة القراءة.' },
    en: { title: 'Clear decision summary', text: 'Progress, handover, and approvals are presented in concise, easy-to-read indicators.' }
  },
  {
    icon: Map,
    ar: { title: 'خريطة ذكية', text: 'الطرق والقطاعات وشبكات المرافق في خريطة واحدة قابلة للبحث والتصفية.' },
    en: { title: 'Smart map', text: 'Roads, sectors, and utility networks are available in one searchable, filterable map.' }
  },
  {
    icon: MousePointerClick,
    ar: { title: 'تجربة بسيطة وجذابة', text: 'البيانات الفنية تتحول إلى لوحات وصور ومخرجات واضحة دون تعقيد.' },
    en: { title: 'Simple, engaging experience', text: 'Technical data becomes clear dashboards, images, and outputs without unnecessary complexity.' }
  }
];

export default function IntroSection() {
  const { lang } = useLanguage();

  return (
    <section id="intro" className="section intro-section">
      <SectionTitle
        eyebrow={{ ar: 'عن المشروع', en: 'Project overview' }}
        title={{ ar: 'صورة كاملة للمشروع في دقائق', en: 'A complete project picture in minutes' }}
        text={{ ar: 'كل ما يحتاجه متخذ القرار في واجهة واحدة: إنجازات، خرائط، شبكات، ومخرجات تسليم واضحة.', en: 'Everything decision makers need in one interface: progress, maps, networks, and clear handover outputs.' }}
      />
      <div className="intro-grid">
        {items.map((item, index) => {
          const Icon = item.icon;
          const content = lang === 'ar' ? item.ar : item.en;
          return (
            <motion.article key={content.title} className="intro-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Icon size={28} />
              <span>0{index + 1}</span>
              <h3>{content.title}</h3>
              <p>{content.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
