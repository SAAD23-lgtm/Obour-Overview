import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { nav, project } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.header className="site-header" initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55 }}>
      <a href="#home" className="brand">
        <img src={project.logo} alt="Geoinformatics logo" />
        <div>
          <strong>{pick(lang, project.company)}</strong>
          <span>{pick(lang, project.client)}</span>
        </div>
      </a>
      <nav>
        {nav.map((item) => <a key={item.id} href={`#${item.id}`}>{pick(lang, item.label)}</a>)}
      </nav>
      <div className="language-switch" aria-label="Language switcher">
        <Languages size={15} />
        <button className={lang === 'ar' ? 'active' : ''} onClick={() => setLang('ar')}>AR</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>
    </motion.header>
  );
}
