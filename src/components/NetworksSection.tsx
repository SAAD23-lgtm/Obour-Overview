import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, BarChart, Bar, XAxis, Cell } from 'recharts';
import { networks } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import { formatSmart } from '../lib/format';
import MetricCard from './MetricCard';
import SectionTitle from './SectionTitle';

export default function NetworksSection() {
  const [activeId, setActiveId] = useState(networks[0].id);
  const active = networks.find((network) => network.id === activeId) || networks[0];
  const { lang } = useLanguage();

  const radarData = useMemo(() => active.metrics.map((metric) => ({
    metric: pick(lang, metric.label),
    value: metric.value,
    color: metric.color
  })), [active, lang]);

  return (
    <section id="networks" className="section networks-section">
      <SectionTitle
        eyebrow={{ ar: 'تفاصيل الشبكات', en: 'Utility network details' }}
        title={{ ar: 'تفاصيل كل شبكة بدون تشتيت', en: 'Focused details for every network' }}
        text={{ ar: 'اختر الشبكة المطلوبة لتظهر المؤشرات والخرائط والمخرجات المرتبطة بها مباشرة.', en: 'Select any network to instantly view its indicators, maps, and related outputs.' }}
      />

      <div className="network-tabs">
        {networks.map((network) => {
          const Icon = network.icon;
          return (
            <button key={network.id} onClick={() => setActiveId(network.id)} className={activeId === network.id ? 'active' : ''} style={{ '--accent': network.color } as React.CSSProperties}>
              <Icon size={18} />
              <span>{pick(lang, network.short)}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active.id} className="network-dashboard" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} style={{ '--accent': active.color } as React.CSSProperties}>
          <div className="network-hero-card">
            <div>
              <span>{lang === 'ar' ? 'عرض الشبكة' : 'Network view'}</span>
              <h3>{pick(lang, active.name)}</h3>
              <p>{pick(lang, active.summary)}</p>
              <blockquote>{pick(lang, active.clientMessage)}</blockquote>
            </div>
            <div className="network-image-stack">
              {active.images.map((img, index) => <img key={img} src={img} alt={pick(lang, active.name)} style={{ '--i': index } as React.CSSProperties} />)}
            </div>
          </div>

          <div className="network-details-grid">
            <div className="metrics-grid compact">
              {active.metrics.map((metric) => <MetricCard key={metric.id} metric={metric} dense />)}
            </div>
            <div className="network-chart-panel">
              <h4>{lang === 'ar' ? 'تحليل مؤشرات الشبكة' : 'Network indicator analysis'}</h4>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={radarData}>
                  <XAxis dataKey="metric" tick={{ fill: '#aebad0', fontSize: 10 }} interval={0} height={68} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 12, color: '#fff' }} formatter={(v: unknown) => formatSmart(Number(v || 0), lang)} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {radarData.map((entry) => <Cell key={entry.metric} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="network-chart-panel radar-panel">
              <h4>{lang === 'ar' ? 'بروفايل الشبكة' : 'Network profile'}</h4>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <Radar dataKey="value" stroke={active.color} fill={active.color} fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="network-workflow">
            {active.focus.map((item) => <article key={pick(lang, item.label)}><span>{pick(lang, item.label)}</span><strong>{pick(lang, item.value)}</strong></article>)}
            {active.workflow.map((item) => <article key={pick(lang, item.title)}><span>{pick(lang, item.title)}</span><p>{pick(lang, item.text)}</p></article>)}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
