import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gallery, galleryFilters } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

export default function GallerySection() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(gallery[0]);
  const visible = filter === 'all' ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="section gallery-section">
      <SectionTitle
        eyebrow={{ ar: 'صور ومخرجات', en: 'Images and outputs' }}
        title={{ ar: 'نماذج واضحة من الأعمال والمخرجات', en: 'Clear samples of work and deliverables' }}
        text={{ ar: 'صور ميدانية، مخططات، شاشات متابعة، وخرائط تسليم جاهزة للعرض والمراجعة.', en: 'Field photos, drawings, dashboards, and handover maps ready for review.' }}
      />
      <div className="gallery-filters">
        {galleryFilters.map((item) => <button key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => setFilter(item.id)}>{pick(lang, item.label)}</button>)}
      </div>
      <div className="gallery-layout">
        <AnimatePresence mode="wait">
          <motion.div key={selected.src} className="selected-gallery-card" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
            <img src={selected.src} alt={pick(lang, selected.title)} />
            <div>
              <span>{lang === 'ar' ? 'المخرج المختار' : 'Selected output'}</span>
              <h3>{pick(lang, selected.title)}</h3>
              <p>{pick(lang, selected.text)}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="gallery-grid">
          {visible.map((item) => (
            <button key={item.src} onClick={() => setSelected(item)} className={selected.src === item.src ? 'active' : ''}>
              <img src={item.src} alt={pick(lang, item.title)} />
              <span>{pick(lang, item.title)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
