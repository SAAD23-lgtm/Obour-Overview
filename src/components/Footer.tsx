import { project } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <img src={project.logo} alt="Geoinformatics" />
      <div>
        <strong>{pick(lang, project.title)}</strong>
        <p>{pick(lang, project.company)} - {pick(lang, project.client)}</p>
      </div>
      <span>{lang === 'ar' ? 'نسخة نهائية جاهزة للعرض والتسليم' : 'Final client-ready presentation version'}</span>
    </footer>
  );
}
