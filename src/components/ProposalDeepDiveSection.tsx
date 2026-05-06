import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Layers3,
  MousePointerClick,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import {
  deliverables,
  networkScopes,
  proposalHighlights,
  proposalTabs,
  qualityControls,
  riskControls,
  teamCapabilities,
  workflowStages,
  type ProposalTabId
} from '../data/proposalDetails';
import { pick, useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

const tabMotion = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(8px)' },
  transition: { duration: 0.28 }
};

function PanelNote({ children }: { children: ReactNode }) {
  return <div className="proposal-panel-note"><Sparkles size={17} />{children}</div>;
}

export default function ProposalDeepDiveSection() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProposalTabId>('scope');
  const [activeNetworkId, setActiveNetworkId] = useState(networkScopes[0].id);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeNetwork = useMemo(() => networkScopes.find((item) => item.id === activeNetworkId) || networkScopes[0], [activeNetworkId]);
  const activeStage = workflowStages[activeStageIndex] || workflowStages[0];
  const ActiveNetworkIcon = activeNetwork.icon;

  return (
    <section id="proposal" className="section proposal-deep-section">
      <SectionTitle
        eyebrow={{ ar: 'خطة التنفيذ', en: 'Execution plan' }}
        title={{ ar: 'نطاق العمل والجودة والمخرجات في عرض واحد', en: 'Scope, quality, and outputs in one view' }}
        text={{
          ar: 'عرض مختصر يوضح نطاق كل شبكة، مراحل التنفيذ، ضوابط الجودة، المخرجات، والمخاطر بطريقة سهلة للمراجعة.',
          en: 'A concise view of network scope, delivery stages, quality controls, outputs, and risks for easy review.'
        }}
      />

      <div className="proposal-highlights">
        {proposalHighlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={pick(lang, item.title)}
              className="proposal-highlight-card"
              style={{ '--accent': item.color } as CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: lang === 'ar' ? -2 : 2 }}
            >
              <div className="proposal-highlight-icon"><Icon size={24} /></div>
              <b>{pick(lang, item.value || item.title)}</b>
              <h3>{pick(lang, item.title)}</h3>
              <p>{pick(lang, item.text)}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="proposal-command-center">
        <div className="proposal-tabs" role="tablist" aria-label="Project detail tabs">
          {proposalTabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                className={active ? 'active' : ''}
                style={{ '--accent': tab.color } as CSSProperties}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={active}
              >
                <Icon size={18} />
                <span>{pick(lang, tab.title)}</span>
                <small>{pick(lang, tab.subtitle)}</small>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'scope' && (
            <motion.div key="scope" className="proposal-panel scope-panel" {...tabMotion}>
              <div className="network-scope-rail">
                {networkScopes.map((network) => {
                  const Icon = network.icon;
                  const active = network.id === activeNetwork.id;
                  return (
                    <button
                      key={network.id}
                      className={active ? 'active' : ''}
                      style={{ '--accent': network.color } as CSSProperties}
                      onClick={() => setActiveNetworkId(network.id)}
                    >
                      <Icon size={18} />
                      <span>{pick(lang, network.name)}</span>
                      <MousePointerClick size={14} />
                    </button>
                  );
                })}
              </div>

              <div className="network-scope-detail" style={{ '--accent': activeNetwork.color } as CSSProperties}>
                <div className="scope-title-card">
                  <div>
                    <span>{lang === 'ar' ? 'نطاق الشبكة' : 'Network scope'}</span>
                    <h3>{pick(lang, activeNetwork.name)}</h3>
                    <p>{pick(lang, activeNetwork.message)}</p>
                  </div>
                  <ActiveNetworkIcon size={42} />
                </div>

                <div className="scope-lanes">
                  <article>
                    <b>{lang === 'ar' ? 'العناصر محل الفحص' : 'Assets under review'}</b>
                    {activeNetwork.elements.map((item) => <p key={pick(lang, item)}><CheckCircle2 size={15} />{pick(lang, item)}</p>)}
                  </article>
                  <article>
                    <b>{lang === 'ar' ? 'أمثلة أعمال التحقق' : 'Sample verification checks'}</b>
                    {activeNetwork.checks.map((item) => <p key={pick(lang, item)}><ClipboardCheck size={15} />{pick(lang, item)}</p>)}
                  </article>
                  <article>
                    <b>{lang === 'ar' ? 'المخرجات المرتبطة' : 'Related outputs'}</b>
                    {activeNetwork.outputs.map((item) => <p key={pick(lang, item)}><FileText size={15} />{pick(lang, item)}</p>)}
                  </article>
                </div>

                <div className="scope-flow-visual">
                  <span>{lang === 'ar' ? 'بيانات خام' : 'Raw data'}</span>
                  <ArrowLeftRight size={18} />
                  <span>{lang === 'ar' ? 'فحص مكاني ووصفى' : 'Spatial and attribute QC'}</span>
                  <ArrowLeftRight size={18} />
                  <span>{lang === 'ar' ? 'مؤشرات وتسليم' : 'Indicators and handover'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'workflow' && (
            <motion.div key="workflow" className="proposal-panel workflow-panel" {...tabMotion}>
              <PanelNote>
                <p>{lang === 'ar' ? 'اختر المرحلة لمعرفة المدخلات والأنشطة والمخرجات المتوقعة.' : 'Select a stage to view expected inputs, actions, and outputs.'}</p>
              </PanelNote>
              <div className="workflow-timeline">
                {workflowStages.map((stage, index) => {
                  const Icon = stage.icon;
                  const active = index === activeStageIndex;
                  return (
                    <button
                      key={stage.step}
                      className={active ? 'active' : ''}
                      style={{ '--accent': stage.color } as CSSProperties}
                      onClick={() => setActiveStageIndex(index)}
                    >
                      <b>{stage.step}</b>
                      <Icon size={18} />
                      <span>{pick(lang, stage.title)}</span>
                    </button>
                  );
                })}
              </div>
              <motion.div key={activeStage.step} className="stage-detail-card" style={{ '--accent': activeStage.color } as CSSProperties} initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="stage-detail-head">
                  <span>{lang === 'ar' ? 'مرحلة تنفيذ' : 'Delivery stage'}</span>
                  <h3>{activeStage.step}. {pick(lang, activeStage.title)}</h3>
                </div>
                <div className="stage-detail-grid">
                  <article><b>{lang === 'ar' ? 'المدخلات' : 'Inputs'}</b><p>{pick(lang, activeStage.input)}</p></article>
                  <article><b>{lang === 'ar' ? 'أبرز الأنشطة' : 'Key actions'}</b><p>{pick(lang, activeStage.action)}</p></article>
                  <article><b>{lang === 'ar' ? 'المخرجات' : 'Outputs'}</b><p>{pick(lang, activeStage.output)}</p></article>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'quality' && (
            <motion.div key="quality" className="proposal-panel quality-panel" {...tabMotion}>
              <div className="proposal-grid-cards quality-cards">
                {qualityControls.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article key={pick(lang, item.title)} style={{ '--accent': item.color } as CSSProperties} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -6 }}>
                      <div><Icon size={22} /><b>{pick(lang, item.value || item.title)}</b></div>
                      <h3>{pick(lang, item.title)}</h3>
                      <p>{pick(lang, item.text)}</p>
                      <motion.i initial={{ width: 0 }} whileInView={{ width: `${76 + index * 3}%` }} transition={{ duration: 0.7, delay: index * 0.05 }} />
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'deliverables' && (
            <motion.div key="deliverables" className="proposal-panel deliverables-panel" {...tabMotion}>
              <div className="deliverables-stack">
                {deliverables.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={pick(lang, item.title)}
                      className="deliverable-card"
                      style={{ '--accent': item.color, '--i': index } as CSSProperties}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.025, y: -6 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Icon size={22} />
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <h3>{pick(lang, item.title)}</h3>
                      <p>{pick(lang, item.text)}</p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'risk' && (
            <motion.div key="risk" className="proposal-panel risk-panel" {...tabMotion}>
              <PanelNote>
                <p>{lang === 'ar' ? 'كل تحدي يقابله إجراء واضح للسيطرة وتقليل أثره على التسليم.' : 'Every challenge is paired with a clear control action to protect delivery.'}</p>
              </PanelNote>
              <div className="risk-board">
                {riskControls.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.article key={pick(lang, item.title)} style={{ '--accent': item.color } as CSSProperties} whileHover={{ x: lang === 'ar' ? -8 : 8 }}>
                      <div className="risk-icon"><Icon size={21} /></div>
                      <div>
                        <span>{pick(lang, item.value || item.title)}</span>
                        <h3>{pick(lang, item.title)}</h3>
                        <p>{pick(lang, item.text)}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div key="team" className="proposal-panel team-panel" {...tabMotion}>
              <div className="team-capability-grid">
                {teamCapabilities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article key={pick(lang, item.title)} style={{ '--accent': item.color } as CSSProperties} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8 }}>
                      <Icon size={24} />
                      <h3>{pick(lang, item.title)}</h3>
                      <p>{pick(lang, item.text)}</p>
                    </motion.article>
                  );
                })}
              </div>
              <div className="tools-marquee" aria-label="GIS tools">
                {['ArcGIS Pro', 'ArcGIS Enterprise', 'ArcGIS Dashboards', 'QGIS', 'FME', 'ModelBuilder', 'ArcPy', 'Geodatabase', 'Utility Network'].map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
