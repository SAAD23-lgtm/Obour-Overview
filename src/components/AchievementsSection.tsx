import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Layers3, MapPinned, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, AreaChart, Area } from 'recharts';
import { dashboardCards, districts, executiveMetrics, sectorMetrics } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import { formatSmart } from '../lib/format';
import MetricCard from './MetricCard';
import SectionTitle from './SectionTitle';

type District = (typeof districts)[number];

const districtDetails: Record<string, {
  sectors: { ar: string; en: string };
  outputs: { ar: string[]; en: string[] };
  next: { ar: string; en: string };
}> = {
  d14: {
    sectors: { ar: 'القطاعات 1، 2، 3، و4', en: 'Sectors 1, 2, 3, and 4' },
    outputs: {
      ar: ['خرائط تسليم واضحة', 'توثيق قطاعات الحي', 'ربط المخرجات بموقف التنفيذ'],
      en: ['Clear handover maps', 'District sector documentation', 'Outputs linked to delivery status']
    },
    next: { ar: 'جاهز للعرض والمراجعة ضمن مخرجات التسليم.', en: 'Ready for review as part of the handover package.' }
  },
  d13: {
    sectors: { ar: 'القطاعات 5 و6', en: 'Sectors 5 and 6' },
    outputs: {
      ar: ['رفع وتوثيق ميداني', 'مخرجات فنية مرتبطة بالقطاعات', 'صور ومخططات داعمة'],
      en: ['Field survey and documentation', 'Technical outputs linked to sectors', 'Supporting images and drawings']
    },
    next: { ar: 'مخرجات منظمة وسهلة الفحص الفني.', en: 'Organized outputs ready for technical review.' }
  },
  d39: {
    sectors: { ar: 'القطاعات 12، 13، 14، و15', en: 'Sectors 12, 13, 14, and 15' },
    outputs: {
      ar: ['توثيق نطاق واسع', 'مخططات تفصيلية', 'موقف تسليم واضح'],
      en: ['Wide-scope documentation', 'Detailed drawings', 'Clear delivery status']
    },
    next: { ar: 'مناسب للعرض التنفيذي ومتابعة التسليم.', en: 'Suitable for executive review and delivery tracking.' }
  },
  d15: {
    sectors: { ar: 'نطاق عمل جار', en: 'Active work scope' },
    outputs: {
      ar: ['استكمال أعمال ميدانية', 'معالجة مكتبية مستمرة', 'تحديث موقف التنفيذ'],
      en: ['Ongoing field work', 'Continuous office processing', 'Updated execution status']
    },
    next: { ar: 'يتم تحديث الموقف حسب أولويات التنفيذ.', en: 'Status is updated according to execution priorities.' }
  },
  d16: {
    sectors: { ar: 'نطاق متابعة وتجهيز', en: 'Tracking and preparation scope' },
    outputs: {
      ar: ['متابعة الرفع', 'تجهيز البيانات', 'مراجعة أولية للمخرجات'],
      en: ['Survey tracking', 'Data preparation', 'Initial output review']
    },
    next: { ar: 'ضمن نطاق الاستكمال والمتابعة.', en: 'Part of the active completion and tracking scope.' }
  },
  d37: {
    sectors: { ar: 'مدرج في الخطة اللاحقة', en: 'Included in the upcoming plan' },
    outputs: {
      ar: ['تحديد نطاق العمل', 'جدولة الأولويات', 'تجهيز المرحلة القادمة'],
      en: ['Scope definition', 'Priority scheduling', 'Next-stage preparation']
    },
    next: { ar: 'جاهز للدخول في الخطة بعد استكمال الأولويات الحالية.', en: 'Ready to enter the plan after current priorities are completed.' }
  }
};

export default function AchievementsSection() {
  const { lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const chartData = executiveMetrics.slice(0, 5).map((metric) => ({ name: pick(lang, metric.label), value: metric.value, color: metric.color }));
  const sectorData = sectorMetrics.map((metric) => ({ name: pick(lang, metric.label), value: metric.value, color: metric.color }));
  const selectedDetails = useMemo(() => selectedDistrict ? districtDetails[selectedDistrict.id] : null, [selectedDistrict]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedDistrict(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="achievements" className="section achievements-section">
      <SectionTitle
        eyebrow={{ ar: 'الإنجازات والأرقام', en: 'Achievements and numbers' }}
        title={{ ar: 'أرقام مختصرة توضح موقف المشروع', en: 'Concise indicators for project status' }}
        text={{ ar: 'نطاق العمل، الرفع الميداني، التسليم، والاعتماد في مؤشرات مباشرة مناسبة للعرض التنفيذي.', en: 'Scope, field progress, handover, and approvals in direct indicators built for executive review.' }}
      />

      <div className="metrics-grid wide">
        {executiveMetrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
      </div>

      <div id="dashboards" className="dashboard-slab">
        <div className="dashboard-panel large-panel">
          <div className="panel-heading">
            <span>{lang === 'ar' ? 'لوحة مختصرة' : 'Compact dashboard'}</span>
            <h3>{lang === 'ar' ? 'الطرق والتسليم والاعتماد' : 'Roads, delivery, and approvals'}</h3>
          </div>
          <div className="chart-row">
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fill: '#aebad0', fontSize: 10 }} interval={0} height={70} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 12, color: '#fff' }} formatter={(v: unknown) => formatSmart(Number(v || 0), lang)} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {chartData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="donut-card">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={sectorData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                    {sectorData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 12, color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mini-legend">
                {sectorData.map((item) => <span key={item.name}><i style={{ background: item.color }} />{item.name}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel cards-panel">
          <div className="panel-heading">
            <span>{lang === 'ar' ? 'لوحات متابعة' : 'Dashboards'}</span>
            <h3>{lang === 'ar' ? 'قراءة سريعة للموقف' : 'Fast status reading'}</h3>
          </div>
          <div className="dashboard-card-list">
            {dashboardCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article key={card.id} className="mini-dashboard-card" style={{ '--accent': card.color } as React.CSSProperties} whileHover={{ x: lang === 'ar' ? -8 : 8 }} transition={{ duration: 0.2 }}>
                  <img src={card.image} alt={pick(lang, card.title)} />
                  <div><Icon size={18} /><strong>{pick(lang, card.title)}</strong><p>{pick(lang, card.text)}</p></div>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="districts-section">
        <SectionTitle
          eyebrow={{ ar: 'الأحياء والقطاعات', en: 'Districts and sectors' }}
          title={{ ar: 'موقف كل حي في لمحة', en: 'Every district status at a glance' }}
          text={{ ar: 'بطاقات مختصرة توضح حالة الأحياء والقطاعات والصور المرتبطة بها.', en: 'Compact cards show district and sector status with related visuals.' }}
        />
        <div className="district-grid">
          {districts.map((district) => (
            <motion.article
              key={district.id}
              className="district-card"
              role="button"
              tabIndex={0}
              aria-label={`${lang === 'ar' ? 'فتح تفاصيل' : 'Open details'} ${pick(lang, district.name)}`}
              style={{ '--accent': district.color } as React.CSSProperties}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedDistrict(district)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedDistrict(district);
                }
              }}
            >
              <img src={district.image} alt={pick(lang, district.name)} />
              <div>
                <span>{pick(lang, district.status)}</span>
                <h3>{pick(lang, district.name)}</h3>
                <p>{pick(lang, district.text)}</p>
                <small>{lang === 'ar' ? 'اضغط لعرض التفاصيل' : 'Click for details'}</small>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDistrict && selectedDetails && (
          <motion.div
            className="district-modal-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDistrict(null)}
          >
            <motion.div
              className="district-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="district-modal-title"
              style={{ '--accent': selectedDistrict.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="district-modal-close" onClick={() => setSelectedDistrict(null)} aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}>
                <X size={19} />
              </button>
              <div className="district-modal-media">
                <img src={selectedDistrict.image} alt={pick(lang, selectedDistrict.name)} />
              </div>
              <div className="district-modal-content">
                <span className="district-modal-status">{pick(lang, selectedDistrict.status)}</span>
                <h3 id="district-modal-title">{pick(lang, selectedDistrict.name)}</h3>
                <p>{pick(lang, selectedDistrict.text)}</p>

                <div className="district-modal-meta">
                  <article>
                    <Layers3 size={18} />
                    <div>
                      <b>{lang === 'ar' ? 'نطاق القطاعات' : 'Sector scope'}</b>
                      <span>{pick(lang, selectedDetails.sectors)}</span>
                    </div>
                  </article>
                  <article>
                    <MapPinned size={18} />
                    <div>
                      <b>{lang === 'ar' ? 'الخطوة القادمة' : 'Next step'}</b>
                      <span>{pick(lang, selectedDetails.next)}</span>
                    </div>
                  </article>
                </div>

                <div className="district-modal-list">
                  <b>{lang === 'ar' ? 'أبرز المخرجات' : 'Key outputs'}</b>
                  {selectedDetails.outputs[lang].map((item) => (
                    <span key={item}><CheckCircle2 size={15} />{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
