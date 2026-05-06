import { useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  GitBranch,
  Layers3,
  MapPinned,
  MousePointerClick,
  Network,
  Radar,
  RefreshCw,
  ShieldCheck,
  Target,
  UsersRound,
  Zap
} from 'lucide-react';
import { pick, useLanguage } from '../context/LanguageContext';
import type { Localized } from '../data/content';
import SectionTitle from './SectionTitle';

type InstitutionalStep = {
  id: string;
  title: Localized;
  subtitle: Localized;
  details: Localized;
  input: Localized;
  output: Localized;
  value: Localized;
  icon: typeof Database;
  color: string;
};

type AcceptanceGate = {
  title: Localized;
  description: Localized;
  target: Localized;
  icon: typeof ShieldCheck;
  color: string;
};

type DetailedNetworkModel = {
  id: string;
  title: Localized;
  description: Localized;
  assets: Localized[];
  qc: Localized[];
  evidence: Localized[];
  outputs: Localized[];
  color: string;
  icon: typeof Network;
};

const institutionalSteps: InstitutionalStep[] = [
  {
    id: 'receive',
    title: { ar: 'استلام البيانات وتسجيلها', en: 'Data receipt and registration' },
    subtitle: { ar: 'تحويل كل دفعة بيانات إلى سجل قابل للتتبع', en: 'Turning every delivery package into a trackable record' },
    details: {
      ar: 'يتم تسجيل مصدر البيانات، نوع الشبكة، تاريخ الاستلام، صيغة الملفات، المرجع الجغرافي، حالة المرفقات، ونسبة الجاهزية الأولية حتى لا تضيع أي دفعة أو ملاحظة أثناء المشروع.',
      en: 'Each package is registered with its source, network type, delivery date, file format, coordinate system, attachments, and initial readiness status so no package or remark is lost.'
    },
    input: { ar: 'CAD / GIS / جداول / مرفقات', en: 'CAD / GIS / tables / attachments' },
    output: { ar: 'سجل استلام + جاهزية أولية', en: 'Receipt register + initial readiness' },
    value: { ar: 'حوكمة من أول خطوة', en: 'Governance from day one' },
    icon: Database,
    color: '#18a7c4'
  },
  {
    id: 'prepare',
    title: { ar: 'تهيئة البيانات للتقييم', en: 'Data preparation for assessment' },
    subtitle: { ar: 'توحيد الأسماء والطبقات وتجهيز بيئة الفحص', en: 'Standardizing names, layers, and review workspace' },
    details: {
      ar: 'يتم تنظيم الطبقات، توحيد المسارات، مراجعة أسماء الحقول، فصل بيئات الاستلام والفحص والاعتماد، وتجهيز قوالب الفحص ولوحات المتابعة.',
      en: 'Layers are organized, paths are standardized, field names are reviewed, receipt/review/approval workspaces are separated, and review templates are prepared.'
    },
    input: { ar: 'البيانات المستلمة والمرجعيات الفنية', en: 'Received data and technical references' },
    output: { ar: 'حزمة جاهزة للفحص الفني', en: 'Technically review-ready package' },
    value: { ar: 'تقليل أخطاء التشغيل', en: 'Fewer operational errors' },
    icon: Layers3,
    color: '#0d7a9a'
  },
  {
    id: 'qa',
    title: { ar: 'فحص جودة مكاني ووصفى', en: 'Spatial and attribute quality checks' },
    subtitle: { ar: 'دقة، اكتمال، اتساق، تكرار، وفراغات', en: 'Accuracy, completeness, consistency, duplicates, and gaps' },
    details: {
      ar: 'يتم تنفيذ اختبارات QC/QA على الإحداثيات، العلاقات، الأكواد، الحقول المطلوبة، التكرارات، الفجوات، أخطاء الترميز، وتعارض الطبقات.',
      en: 'QC/QA checks cover coordinates, relationships, codes, mandatory fields, duplicates, gaps, coding issues, and layer conflicts.'
    },
    input: { ar: 'طبقات مصنفة وجاهزة للفحص', en: 'Classified review-ready layers' },
    output: { ar: 'ملاحظات فنية ومصفوفة مخاطر', en: 'Technical observations and risk matrix' },
    value: { ar: 'ثقة أعلى في البيانات', en: 'Higher data confidence' },
    icon: ShieldCheck,
    color: '#d97757'
  },
  {
    id: 'network',
    title: { ar: 'تحليل مكاني وشبكي', en: 'Spatial and network analysis' },
    subtitle: { ar: 'ربط الخطوط بالعقد والمكونات والمناطق', en: 'Connecting lines, nodes, assets, and districts' },
    details: {
      ar: 'يتم تحليل العلاقات بين الخطوط والعقد والمكونات، ومراجعة المنطق الشبكي، وفحص التداخلات والتعارضات، وربط النتائج بالأحياء والقطاعات.',
      en: 'Line-node-asset relationships are analyzed, network logic is reviewed, overlaps/conflicts are detected, and results are linked to districts and sectors.'
    },
    input: { ar: 'نتائج الفحص الفني', en: 'Technical review outputs' },
    output: { ar: 'خرائط تحليلية ومؤشرات شبكية', en: 'Analytical maps and network indicators' },
    value: { ar: 'فهم تشغيلي للشبكات', en: 'Operational network understanding' },
    icon: Network,
    color: '#1a94b8'
  },
  {
    id: 'closure',
    title: { ar: 'المعالجة وإغلاق الملاحظات', en: 'Correction and observation closure' },
    subtitle: { ar: 'متابعة الإغلاق حسب الأولوية والجهة والشبكة', en: 'Closure tracking by priority, owner, and network' },
    details: {
      ar: 'يتم تصنيف الملاحظات حسب الخطورة، تحديد الإجراء التصحيحي، متابعة النسخ المحدثة، إعادة الفحص، وتحديث حالة الإغلاق حتى الوصول إلى الاعتماد.',
      en: 'Observations are classified by severity, corrective actions are defined, updated versions are tracked, rechecked, and closure status is updated until approval.'
    },
    input: { ar: 'سجل الملاحظات والنسخ المحدثة', en: 'Observation register and updated packages' },
    output: { ar: 'بيانات محسنة وسجل إغلاقات', en: 'Improved data and closure register' },
    value: { ar: 'مسار اعتماد واضح', en: 'Clear approval path' },
    icon: RefreshCw,
    color: '#d4a574'
  },
  {
    id: 'handover',
    title: { ar: 'الإخراج والتسليم ونقل المعرفة', en: 'Output, handover, and knowledge transfer' },
    subtitle: { ar: 'خرائط، Dashboards، تقارير، وأرشيف نهائي', en: 'Maps, dashboards, reports, and final archive' },
    details: {
      ar: 'يتم إخراج الخرائط، لوحات المؤشرات، التقارير المرحلية والختامية، سجلات الجودة، ملفات التسليم، وتنفيذ جلسات نقل معرفة لضمان استدامة المخرجات.',
      en: 'Maps, dashboards, progress/final reports, quality logs, delivery files, and knowledge transfer sessions are delivered to ensure output sustainability.'
    },
    input: { ar: 'بيانات معتمدة ونتائج تحليل', en: 'Approved data and analysis results' },
    output: { ar: 'مخرجات تشغيلية قابلة للاستخدام', en: 'Usable operational deliverables' },
    value: { ar: 'قيمة قابلة للتشغيل', en: 'Operational value' },
    icon: FileCheck2,
    color: '#20bfd8'
  }
];

const acceptanceGates: AcceptanceGate[] = [
  {
    title: { ar: 'بوابة الاكتمال', en: 'Completeness gate' },
    description: { ar: 'تتحقق من وجود الطبقات والحقول والمرفقات الأساسية وعدم فقد أي عنصر مطلوب.', en: 'Confirms all required layers, fields, and attachments exist with no missing required assets.' },
    target: { ar: 'اكتمال الحزمة', en: 'Package completeness' },
    icon: ClipboardCheck,
    color: '#18a7c4'
  },
  {
    title: { ar: 'بوابة الاتساق', en: 'Consistency gate' },
    description: { ar: 'تفحص اتساق الأكواد والأقطار والأنواع والحالات بين الجداول والخرائط.', en: 'Checks consistency of codes, diameters, types, and statuses across tables and maps.' },
    target: { ar: 'اتساق وصفي', en: 'Attribute consistency' },
    icon: FileText,
    color: '#0d7a9a'
  },
  {
    title: { ar: 'بوابة المنطق الشبكي', en: 'Network logic gate' },
    description: { ar: 'تراجع الاتصال بين الخطوط والعقد والمكونات وتكشف العناصر المنفصلة أو غير المرتبطة.', en: 'Reviews connectivity between lines, nodes, and assets, exposing disconnected or orphan elements.' },
    target: { ar: 'ترابط شبكي', en: 'Network connectivity' },
    icon: GitBranch,
    color: '#1a94b8'
  },
  {
    title: { ar: 'بوابة الاعتماد', en: 'Approval gate' },
    description: { ar: 'تجمع نتائج الفحص والإغلاق في مخرج واضح يصلح للتسليم الرسمي والمتابعة.', en: 'Consolidates review and closure results into a formal handover-ready output.' },
    target: { ar: 'جاهزية التسليم', en: 'Handover readiness' },
    icon: ShieldCheck,
    color: '#d97757'
  }
];

const detailedNetworkModels: DetailedNetworkModel[] = [
  {
    id: 'water',
    title: { ar: 'منظومة المياه', en: 'Water system' },
    description: { ar: 'تركيز على استمرارية الخطوط، المحابس، الغرف، الأقطار، ووضوح الأكواد بين القطاع والحي.', en: 'Focus on line continuity, valves, chambers, diameters, and code clarity across districts and sectors.' },
    assets: [
      { ar: 'غرف ومحابس وخطوط ووصلات', en: 'Chambers, valves, lines, and connections' },
      { ar: 'أقطار وأعماق وأكواد قطاعية', en: 'Diameters, depths, and sector codes' }
    ],
    qc: [
      { ar: 'كشف الخطوط غير المتصلة بالمحابس', en: 'Detect lines not connected to valves' },
      { ar: 'مراجعة اختلاف الأقطار أو نقص الحقول', en: 'Review diameter conflicts or missing fields' }
    ],
    evidence: [
      { ar: 'خريطة توزيع محابس وغرف', en: 'Valve and chamber distribution map' },
      { ar: 'مخطط أقطار المواسير', en: 'Pipe diameter chart' }
    ],
    outputs: [
      { ar: 'Dashboard مياه تفصيلي', en: 'Detailed water dashboard' },
      { ar: 'سجل ملاحظات حسب القطاع', en: 'Sector-based observation log' }
    ],
    color: '#18a7c4',
    icon: Network
  },
  {
    id: 'sewer',
    title: { ar: 'منظومة الصرف', en: 'Sewer system' },
    description: { ar: 'تركيز على العلاقة بين المطابق والخطوط والأعماق والمناسيب واتجاه الشبكة.', en: 'Focus on relationships between manholes, lines, depths, levels, and network direction.' },
    assets: [
      { ar: 'مطابق صرف ومطر وخطوط ومحطات', en: 'Sewer/storm manholes, lines, and stations' },
      { ar: 'أعماق ومناسيب وأقطار', en: 'Depths, levels, and diameters' }
    ],
    qc: [
      { ar: 'كشف الفجوات والتكرار في المطابق', en: 'Detect gaps and duplicate manholes' },
      { ar: 'اختبار الربط بين الخط والمطابق', en: 'Test pipe-to-manhole connectivity' }
    ],
    evidence: [
      { ar: 'خريطة توزيع مطابق الصرف', en: 'Manhole distribution map' },
      { ar: 'مؤشرات الأقطار والأعماق', en: 'Diameter and depth indicators' }
    ],
    outputs: [
      { ar: 'Dashboard صرف تفصيلي', en: 'Detailed sewer dashboard' },
      { ar: 'تقرير جودة حسب الحي', en: 'District-based quality report' }
    ],
    color: '#0d7a9a',
    icon: GitBranch
  },
  {
    id: 'electricity',
    title: { ar: 'منظومة الكهرباء', en: 'Electricity system' },
    description: { ar: 'تركيز على الأكشاك والموزعات والبيلرات والكابلات وعلاقات المصدر والهدف.', en: 'Focus on kiosks, distribution units, pillars, cables, and source-target relationships.' },
    assets: [
      { ar: 'أكشاك وموزعات وبيلرات وكابلات', en: 'Kiosks, distributors, pillars, and cables' },
      { ar: 'مصادر وأهداف ومسارات ربط', en: 'Sources, targets, and connection routes' }
    ],
    qc: [
      { ar: 'فحص علاقة الكابل بالمصدر والهدف', en: 'Check cable source-target relationship' },
      { ar: 'كشف الأكواد المكررة أو العناصر غير المرتبطة', en: 'Detect duplicate codes or disconnected assets' }
    ],
    evidence: [
      { ar: 'خريطة شبكة كهرباء قطاعية', en: 'Sector electricity network map' },
      { ar: 'جداول ربط الكابلات والمكونات', en: 'Cable-to-asset relationship tables' }
    ],
    outputs: [
      { ar: 'Dashboard كهرباء تشغيلي', en: 'Operational electricity dashboard' },
      { ar: 'مخرجات ربط تفصيلية', en: 'Detailed linkage outputs' }
    ],
    color: '#d97757',
    icon: Zap
  },
  {
    id: 'telecom',
    title: { ar: 'منظومة الاتصالات', en: 'Telecom system' },
    description: { ar: 'تركيز على الكابلات والبوكسات والكبائن والسنترالات وعلاقات الربط.', en: 'Focus on cables, boxes, cabinets, centrals, and linkage relationships.' },
    assets: [
      { ar: 'بوكسات وكبائن وكابلات وجوبنت', en: 'Boxes, cabinets, cables, and joints' },
      { ar: 'سنترالات ونقاط ربط', en: 'Centrals and connection points' }
    ],
    qc: [
      { ar: 'مراجعة الربط بين الكابلات والبوكسات', en: 'Review cable-to-box linkage' },
      { ar: 'تحليل اكتمال بيانات الكيانات الطرفية', en: 'Analyze terminal asset data completeness' }
    ],
    evidence: [
      { ar: 'لوحة كيانات وكابلات', en: 'Entities and cables dashboard' },
      { ar: 'جداول أكواد حسب الكابينة', en: 'Code tables by cabinet' }
    ],
    outputs: [
      { ar: 'Dashboard اتصالات قطاعي', en: 'Sector telecom dashboard' },
      { ar: 'سجل فجوات الربط', en: 'Linkage gaps register' }
    ],
    color: '#20bfd8',
    icon: Radar
  }
];

const clientValueCards = [
  {
    title: { ar: 'قراءة تنفيذية أسرع', en: 'Faster executive reading' },
    text: { ar: 'مؤشرات وخرائط مختصرة تعرض حالة المشروع بسرعة ووضوح.', en: 'Concise indicators and maps show project status quickly and clearly.' },
    icon: Gauge
  },
  {
    title: { ar: 'شفافية في المتابعة', en: 'Transparent tracking' },
    text: { ar: 'كل مرحلة لها مدخلات ومخرجات وحالة إغلاق، مما يجعل التقدم قابلًا للقياس وليس مجرد وصف.', en: 'Every stage has inputs, outputs, and closure status, making progress measurable rather than descriptive.' },
    icon: Target
  },
  {
    title: { ar: 'مخرجات قابلة للتشغيل', en: 'Operational outputs' },
    text: { ar: 'خرائط ولوحات وسجلات يمكن الاعتماد عليها بعد التسليم.', en: 'Maps, dashboards, and registers that remain useful after handover.' },
    icon: Archive
  },
  {
    title: { ar: 'نقل معرفة حقيقي', en: 'Real knowledge transfer' },
    text: { ar: 'منهجية واضحة تساعد فرق المتابعة على الاستمرار بثقة.', en: 'A clear methodology helps follow-up teams continue with confidence.' },
    icon: UsersRound
  }
];

export default function InstitutionalDetailsSection() {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(institutionalSteps[0].id);
  const [activeNetwork, setActiveNetwork] = useState(detailedNetworkModels[0].id);
  const selectedStep = institutionalSteps.find((item) => item.id === activeStep) || institutionalSteps[0];
  const selectedNetwork = detailedNetworkModels.find((item) => item.id === activeNetwork) || detailedNetworkModels[0];
  const StepIcon = selectedStep.icon;
  const NetworkIcon = selectedNetwork.icon;

  const flowData = useMemo(
    () => institutionalSteps.map((step, index) => ({ ...step, index: index + 1 })),
    []
  );

  return (
    <section id="institutional" className="section institutional-section">
      <SectionTitle
        eyebrow={{ ar: 'حوكمة وجودة', en: 'Governance and quality' }}
        title={{ ar: 'منظومة واضحة للاستلام والفحص والاعتماد', en: 'A clear system for receipt, review, and approval' }}
        text={{
          ar: 'رحلة البيانات من الاستلام حتى التسليم تظهر في خطوات مختصرة، مع بوابات اعتماد ومخرجات قابلة للمراجعة.',
          en: 'The data journey from receipt to handover is shown in concise steps, with approval gates and reviewable outputs.'
        }}
      />

      <div className="institutional-command">
        <div className="institutional-flow">
          {flowData.map((step) => {
            const Icon = step.icon;
            const active = step.id === activeStep;
            return (
              <motion.button
                key={step.id}
                className={active ? 'active' : ''}
                style={{ '--accent': step.color } as CSSProperties}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <b>{String(step.index).padStart(2, '0')}</b>
                <Icon size={20} />
                <span>{pick(lang, step.title)}</span>
                <small>{pick(lang, step.subtitle)}</small>
                <MousePointerClick size={14} className="flow-click" />
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep.id}
            className="institutional-step-detail"
            style={{ '--accent': selectedStep.color } as CSSProperties}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.28 }}
          >
            <div className="step-head">
              <div className="step-icon"><StepIcon size={30} /></div>
              <div>
                <span>{pick(lang, selectedStep.value)}</span>
                <h3>{pick(lang, selectedStep.title)}</h3>
                <p>{pick(lang, selectedStep.details)}</p>
              </div>
            </div>
            <div className="step-io-grid">
              <article>
                <b>{lang === 'ar' ? 'المدخلات' : 'Inputs'}</b>
                <p>{pick(lang, selectedStep.input)}</p>
              </article>
              <article>
                <b>{lang === 'ar' ? 'المخرجات' : 'Outputs'}</b>
                <p>{pick(lang, selectedStep.output)}</p>
              </article>
              <article>
                <b>{lang === 'ar' ? 'طريقة المتابعة' : 'Tracking method'}</b>
                <p>{lang === 'ar' ? 'كل مرحلة مرتبطة بمؤشرات وخرائط وسجل ملاحظات يسهل الرجوع إليه.' : 'Each stage connects to indicators, maps, and a remark register for quick reference.'}</p>
              </article>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="acceptance-gates">
        {acceptanceGates.map((gate, index) => {
          const Icon = gate.icon;
          return (
            <motion.article
              key={pick(lang, gate.title)}
              style={{ '--accent': gate.color } as CSSProperties}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <div><Icon size={23} /><span>{String(index + 1).padStart(2, '0')}</span></div>
              <h3>{pick(lang, gate.title)}</h3>
              <p>{pick(lang, gate.description)}</p>
              <b>{pick(lang, gate.target)}</b>
            </motion.article>
          );
        })}
      </div>

      <div className="network-model-lab">
        <div className="network-model-tabs">
          {detailedNetworkModels.map((model) => {
            const Icon = model.icon;
            const active = model.id === activeNetwork;
            return (
              <button
                key={model.id}
                className={active ? 'active' : ''}
                style={{ '--accent': model.color } as CSSProperties}
                onClick={() => setActiveNetwork(model.id)}
              >
                <Icon size={18} />
                <span>{pick(lang, model.title)}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNetwork.id}
            className="network-model-detail"
            style={{ '--accent': selectedNetwork.color } as CSSProperties}
            initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? -25 : 25 }}
            transition={{ duration: 0.28 }}
          >
            <div className="model-title">
              <NetworkIcon size={32} />
              <div>
                <span>{lang === 'ar' ? 'قراءة الشبكة' : 'Network reading'}</span>
                <h3>{pick(lang, selectedNetwork.title)}</h3>
                <p>{pick(lang, selectedNetwork.description)}</p>
              </div>
            </div>

            <div className="model-columns">
              <article>
                <b>{lang === 'ar' ? 'الأصول محل الفحص' : 'Assets under review'}</b>
                {selectedNetwork.assets.map((item) => <p key={pick(lang, item)}><CheckCircle2 size={15} />{pick(lang, item)}</p>)}
              </article>
              <article>
                <b>{lang === 'ar' ? 'اختبارات الجودة' : 'Quality checks'}</b>
                {selectedNetwork.qc.map((item) => <p key={pick(lang, item)}><ShieldCheck size={15} />{pick(lang, item)}</p>)}
              </article>
              <article>
                <b>{lang === 'ar' ? 'أدلة المراجعة' : 'Review evidence'}</b>
                {selectedNetwork.evidence.map((item) => <p key={pick(lang, item)}><MapPinned size={15} />{pick(lang, item)}</p>)}
              </article>
              <article>
                <b>{lang === 'ar' ? 'مخرجات التسليم' : 'Handover outputs'}</b>
                {selectedNetwork.outputs.map((item) => <p key={pick(lang, item)}><FileCheck2 size={15} />{pick(lang, item)}</p>)}
              </article>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="client-value-grid">
        {clientValueCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={pick(lang, card.title)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -7 }}
            >
              <Icon size={22} />
              <h3>{pick(lang, card.title)}</h3>
              <p>{pick(lang, card.text)}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
