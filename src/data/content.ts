import {
  Activity,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Flame,
  Gauge,
  Globe2,
  HardHat,
  Layers3,
  LucideIcon,
  MapPinned,
  MonitorDot,
  Network,
  RadioTower,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  UsersRound,
  Waves,
  Zap,
  Droplets
} from 'lucide-react';

export type Localized = { ar: string; en: string };

export type Metric = {
  id: string;
  label: Localized;
  value: number;
  unit?: Localized;
  hint: Localized;
  icon: LucideIcon;
  color: string;
  fraction?: number;
  suffix?: string;
};

export type NetworkProfile = {
  id: string;
  name: Localized;
  short: Localized;
  icon: LucideIcon;
  color: string;
  summary: Localized;
  clientMessage: Localized;
  metrics: Metric[];
  focus: { label: Localized; value: Localized }[];
  workflow: { title: Localized; text: Localized }[];
  images: string[];
};

export const project = {
  title: {
    ar: 'العبور الجديدة في لوحة واحدة واضحة',
    en: 'New Obour Progress in One Clear Platform'
  },
  subtitle: {
    ar: 'استعرض موقف الطرق والشبكات والتسليمات والاعتمادات بسرعة من خلال خرائط ذكية ومؤشرات مختصرة.',
    en: 'Explore roads, utilities, handovers, and approvals through smart maps and concise executive indicators.'
  },
  eyebrow: {
    ar: 'هيئة المجتمعات العمرانية الجديدة × جيوانفورماتكس لنظم المعلومات',
    en: 'New Urban Communities Authority × Geoinformatics for Information Systems'
  },
  client: { ar: 'جهاز تنمية مدينة العبور الجديدة', en: 'New Obour City Development Authority' },
  authority: { ar: 'هيئة المجتمعات العمرانية الجديدة', en: 'New Urban Communities Authority' },
  company: { ar: 'جيوانفورماتكس لنظم المعلومات', en: 'Geoinformatics for Information Systems' },
  period: { ar: 'من 1 / 7 / 2025 إلى 31 / 3 / 2026', en: 'From 1 Jul 2025 to 31 Mar 2026' },
  logo: '/logos/company-logo.avif'
};

export const nav = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'achievements', label: { ar: 'الإنجازات', en: 'Achievements' } },
  { id: 'dashboards', label: { ar: 'لوحات المتابعة', en: 'Dashboards' } },
  { id: 'map', label: { ar: 'الخريطة', en: 'Map' } },
  { id: 'networks', label: { ar: 'الشبكات', en: 'Networks' } },
  { id: 'proposal', label: { ar: 'خطة التنفيذ', en: 'Execution plan' } },
  { id: 'institutional', label: { ar: 'التفصيل المؤسسي', en: 'Institutional detail' } },
  { id: 'gallery', label: { ar: 'الصور', en: 'Gallery' } }
];

export const executiveMetrics: Metric[] = [
  { id: 'roads-total', label: { ar: 'إجمالي أطوال الطرق', en: 'Total road length' }, value: 300, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'إجمالي نطاق الطرق داخل المدينة محل المتابعة.', en: 'Total road network covered by the project.' }, icon: Route, color: '#18a7c4' },
  { id: 'field-work', label: { ar: 'تم العمل عليها ميدانيًا', en: 'Field work completed' }, value: 289.5, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'أطوال تم رفعها وتوثيقها ميدانيًا.', en: 'Road length surveyed and documented in the field.' }, icon: Radar, color: '#0a5a7a', fraction: 1 },
  { id: 'delivered', label: { ar: 'تم تسليمها', en: 'Delivered' }, value: 206.6, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'أطوال تم تسليم مخرجاتها للجهة المالكة.', en: 'Length with submitted deliverables.' }, icon: CheckCircle2, color: '#1a94b8', fraction: 1 },
  { id: 'approved', label: { ar: 'تم اعتمادها من الجهاز', en: 'Authority approved' }, value: 95.5, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'أطوال تمت مراجعتها واعتمادها رسميًا.', en: 'Reviewed and officially approved length.' }, icon: ShieldCheck, color: '#d97757', fraction: 1 },
  { id: 'review', label: { ar: 'تحت المراجعة', en: 'Under review' }, value: 111.1, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'مخرجات قيد الفحص الفني والمراجعة.', en: 'Deliverables currently under technical review.' }, icon: ClipboardCheck, color: '#d4a574', fraction: 1 },
  { id: 'field-percent', label: { ar: 'نسبة العمل الميداني', en: 'Field progress' }, value: 96.5, suffix: '%', hint: { ar: 'نسبة ما تم رفعه مقارنة بإجمالي الطرق.', en: 'Field completion compared to total road length.' }, icon: Gauge, color: '#20bfd8', fraction: 1 },
  { id: 'handover-percent', label: { ar: 'نسبة التسليم', en: 'Delivery progress' }, value: 68.8, suffix: '%', hint: { ar: 'نسبة مخرجات الطرق المسلمة مقارنة بالإجمالي.', en: 'Submitted road deliverables compared to total scope.' }, icon: Target, color: '#0d7a9a', fraction: 1 },
  { id: 'sectors', label: { ar: 'إجمالي القطاعات', en: 'Total sectors' }, value: 23, unit: { ar: 'قطاع', en: 'sectors' }, hint: { ar: 'قطاعات المدينة المدرجة ضمن خطة التنفيذ.', en: 'City sectors included in the execution plan.' }, icon: Layers3, color: '#18a7c4' }
];

export const sectorMetrics: Metric[] = [
  { id: 'surveyed-sectors', label: { ar: 'قطاعات تم رفعها', en: 'Surveyed sectors' }, value: 22, unit: { ar: 'قطاع', en: 'sectors' }, hint: { ar: 'قطاعات تم تنفيذ أعمال الرفع والتوثيق بها.', en: 'Sectors already surveyed and documented.' }, icon: MapPinned, color: '#18a7c4' },
  { id: 'delivered-sectors', label: { ar: 'قطاعات تم تسليمها', en: 'Delivered sectors' }, value: 17, unit: { ar: 'قطاع', en: 'sectors' }, hint: { ar: 'قطاعات تم تسليم مخرجاتها.', en: 'Sectors with submitted deliverables.' }, icon: BadgeCheck, color: '#0a5a7a' },
  { id: 'field-sectors', label: { ar: 'جاري العمل ميدانيًا', en: 'Field work in progress' }, value: 3, unit: { ar: 'قطاع', en: 'sectors' }, hint: { ar: 'فرق العمل مستمرة في استكمال أعمال الرفع.', en: 'Field teams are still completing survey tasks.' }, icon: HardHat, color: '#d97757' },
  { id: 'office-sectors', label: { ar: 'جاري العمل مكتبيًا', en: 'Office processing' }, value: 2, unit: { ar: 'قطاع', en: 'sectors' }, hint: { ar: 'معالجة ورسم ومراجعة مكتبية.', en: 'Office processing, drafting, and quality review.' }, icon: MonitorDot, color: '#d4a574' }
];

export const dashboardCards = [
  { id: 'executive', icon: Sparkles, color: '#d97757', title: { ar: 'لوحة تنفيذية', en: 'Executive dashboard' }, text: { ar: 'ملخص سريع لموقف الإنجاز والتسليم والاعتماد.', en: 'Fast summary of progress, delivery, and approvals.' }, image: '/presentation/presentation_01.webp' },
  { id: 'roads', icon: Route, color: '#18a7c4', title: { ar: 'لوحة الطرق', en: 'Roads dashboard' }, text: { ar: 'متابعة أطوال الطرق حسب حالة التنفيذ والمراجعة.', en: 'Road lengths by execution and review status.' }, image: '/presentation/presentation_18.webp' },
  { id: 'districts', icon: Building2, color: '#0a5a7a', title: { ar: 'لوحة الأحياء والقطاعات', en: 'Districts and sectors' }, text: { ar: 'عرض مبسط للأحياء والقطاعات وموقف كل منها.', en: 'Simplified status of districts and sectors.' }, image: '/presentation/presentation_17.webp' },
  { id: 'networks', icon: Network, color: '#d4a574', title: { ar: 'لوحة الشبكات', en: 'Networks dashboard' }, text: { ar: 'مؤشرات منفصلة لكل شبكة مرافق داخل المدينة.', en: 'Separated indicators for every utility network.' }, image: '/presentation/presentation_19.webp' }
];

export const districts = [
  { id: 'd14', name: { ar: 'الحي الرابع عشر', en: 'District 14' }, status: { ar: 'تم التسليم', en: 'Delivered' }, text: { ar: 'تم العمل على القطاعات 1 و2 و3 ثم استكمال القطاع 4 للوصول إلى مخرجات تسليم واضحة.', en: 'Sectors 1, 2, and 3 were completed, then sector 4 was finalized for handover outputs.' }, image: '/presentation/presentation_13.webp', color: '#0a5a7a' },
  { id: 'd13', name: { ar: 'الحي الثالث عشر', en: 'District 13' }, status: { ar: 'تم التسليم', en: 'Delivered' }, text: { ar: 'تم تنفيذ أعمال الرفع والتوثيق في القطاعات 5 و6 وربطها بالمخرجات الفنية.', en: 'Survey and documentation work covered sectors 5 and 6 and linked them to technical outputs.' }, image: '/presentation/presentation_15.webp', color: '#18a7c4' },
  { id: 'd39', name: { ar: 'الحي التاسع والثلاثون', en: 'District 39' }, status: { ar: 'تم التسليم', en: 'Delivered' }, text: { ar: 'تم توثيق قطاعات 12 و13 و14 و15 ضمن خطة التسليم.', en: 'Sectors 12, 13, 14, and 15 were documented within the delivery plan.' }, image: '/presentation/presentation_17.webp', color: '#1a94b8' },
  { id: 'd15', name: { ar: 'الحي الخامس عشر', en: 'District 15' }, status: { ar: 'جاري العمل', en: 'In progress' }, text: { ar: 'استكمال أعمال ميدانية ومكتبية طبقًا لأولويات التنفيذ.', en: 'Field and office tasks are being completed according to execution priorities.' }, image: '/presentation/presentation_18.webp', color: '#d97757' },
  { id: 'd16', name: { ar: 'الحي السادس عشر', en: 'District 16' }, status: { ar: 'جاري العمل', en: 'In progress' }, text: { ar: 'ضمن نطاق المتابعة لاستكمال أعمال الرفع والتجهيز.', en: 'Tracked as part of the active survey and preparation scope.' }, image: '/presentation/presentation_19.webp', color: '#d4a574' },
  { id: 'd37', name: { ar: 'الحي السابع والثلاثون', en: 'District 37' }, status: { ar: 'لم يتم البدء', en: 'Not started' }, text: { ar: 'مدرج ضمن خطة العمل اللاحقة بعد استكمال الأولويات الحالية.', en: 'Included in the upcoming work plan after current priorities are completed.' }, image: '/presentation/presentation_20.webp', color: '#94a3b8' }
];

const commonWorkflows = {
  field: { title: { ar: 'الرفع الميداني', en: 'Field survey' }, text: { ar: 'تسجيل مواقع العناصر وربطها بالبيانات الوصفية والصور الميدانية.', en: 'Capturing asset locations and linking them to attributes and field photos.' } },
  cad: { title: { ar: 'المراجعة والرسم', en: 'CAD processing' }, text: { ar: 'تنظيف البيانات وتحويلها لمخططات قابلة للمراجعة والتسليم.', en: 'Cleaning data and converting it into reviewable and deliverable drawings.' } },
  gis: { title: { ar: 'النشر المكاني', en: 'GIS publishing' }, text: { ar: 'إتاحة الشبكة داخل خرائط ولوحات تفاعلية للمراجعة واتخاذ القرار.', en: 'Publishing the network into maps and dashboards for review and decision-making.' } }
};

export const networks: NetworkProfile[] = [
  {
    id: 'electricity', name: { ar: 'شبكة الكهرباء', en: 'Electricity Network' }, short: { ar: 'الكهرباء', en: 'Electricity' }, icon: Zap, color: '#d97757',
    summary: { ar: 'تعرض مكونات الكهرباء من كابلات، أعمدة إنارة، أكشاك، كوفريات، وموزعات مع ربطها بالقطاعات والمنفذين.', en: 'Shows electricity assets including cables, lighting poles, kiosks, boxes, and distribution elements linked to sectors and contractors.' },
    clientMessage: { ar: 'لوحة الكهرباء موجهة لإظهار أكثر العناصر كثافة وحركة على الخريطة مع القدرة على مراجعة الأكواد والقطاعات بسرعة.', en: 'The electricity view highlights dense assets on the map and enables fast review of codes and sectors.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 15052, hint: { ar: 'إجمالي عناصر الكهرباء داخل قاعدة البيانات.', en: 'Total electricity assets in the database.' }, icon: Activity, color: '#d97757' },
      { id: 'length', label: { ar: 'أطوال الكابلات', en: 'Cable length' }, value: 834.19, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'إجمالي أطوال كابلات الكهرباء.', en: 'Total electricity cable length.' }, icon: Route, color: '#e89177', fraction: 2 },
      { id: 'points', label: { ar: 'عناصر نقطية', en: 'Point assets' }, value: 7551, hint: { ar: 'أعمدة إنارة وأكشاك وكوفريات.', en: 'Lighting poles, kiosks, and boxes.' }, icon: MapPinned, color: '#d87c59' },
      { id: 'lines', label: { ar: 'عناصر خطية', en: 'Linear assets' }, value: 6284, hint: { ar: 'مسارات كابلات الجهد والتغذية.', en: 'Voltage and feed cable routes.' }, icon: Network, color: '#ca6a47' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'مراجعة الكابلات والأكشاك وأعمدة الإنارة', en: 'Reviewing cables, kiosks, and lighting poles' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق الكهرباء والمتابعة الفنية', en: 'Electricity and technical follow-up teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_20.webp', '/presentation/presentation_26.webp', '/presentation/presentation_13.webp']
  },
  {
    id: 'water', name: { ar: 'شبكة المياه', en: 'Water Network' }, short: { ar: 'المياه', en: 'Water' }, icon: Droplets, color: '#18a7c4',
    summary: { ar: 'تركز على خطوط المياه، المحابس، الغرف، وأقطار المواسير بما يساعد في مراجعة التشغيل والصيانة.', en: 'Focuses on water lines, valves, chambers, and pipe diameters for operation and maintenance review.' },
    clientMessage: { ar: 'لوحة المياه تعرض مؤشرات المحابس والغرف والأطوال بطريقة سهلة للمراجعة الفنية.', en: 'The water view presents valves, chambers, and lengths in a clear technical review format.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 4212, hint: { ar: 'إجمالي عناصر شبكة المياه.', en: 'Total water network assets.' }, icon: Activity, color: '#18a7c4' },
      { id: 'length', label: { ar: 'أطوال الخطوط', en: 'Line length' }, value: 152.32, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'إجمالي أطوال خطوط المياه.', en: 'Total water line length.' }, icon: Route, color: '#20bfd8', fraction: 2 },
      { id: 'valves', label: { ar: 'محابس وغرف', en: 'Valves and chambers' }, value: 1906, hint: { ar: 'عناصر نقطية مهمة للتشغيل.', en: 'Operational point assets.' }, icon: MapPinned, color: '#0d7a9a' },
      { id: 'sectors', label: { ar: 'قطاعات مغطاة', en: 'Covered sectors' }, value: 7, hint: { ar: 'القطاعات التي تظهر بها عناصر المياه.', en: 'Sectors covered by water assets.' }, icon: Layers3, color: '#0a5a7a' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'مراجعة المحابس والأقطار ومناطق التغطية', en: 'Reviewing valves, diameters, and coverage areas' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق المياه والصيانة', en: 'Water and maintenance teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_24.webp', '/presentation/presentation_29.webp', '/presentation/presentation_37.webp']
  },
  {
    id: 'sewer', name: { ar: 'شبكة الصرف', en: 'Sewer Network' }, short: { ar: 'الصرف', en: 'Sewer' }, icon: Waves, color: '#0d7a9a',
    summary: { ar: 'توثق خطوط الصرف، المطابق، الغرف، المناسيب، والأعماق لدعم المراجعة الفنية والتشغيل.', en: 'Documents sewer lines, manholes, chambers, levels, and depths to support technical and operational review.' },
    clientMessage: { ar: 'لوحة الصرف مصممة لإظهار الأعماق والمناسيب وعناصر المطابق والغرف بصورة أوضح.', en: 'The sewer view is designed to highlight depths, levels, manholes, and chambers clearly.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 4097, hint: { ar: 'إجمالي عناصر الصرف.', en: 'Total sewer assets.' }, icon: Activity, color: '#0d7a9a' },
      { id: 'length', label: { ar: 'أطوال الخطوط', en: 'Line length' }, value: 75, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'أطوال خطوط الصرف المرصودة.', en: 'Documented sewer line length.' }, icon: Route, color: '#1a94b8' },
      { id: 'manholes', label: { ar: 'مطابق وغرف', en: 'Manholes/chambers' }, value: 2044, hint: { ar: 'عناصر نقطية مرتبطة بالمناسيب والأعماق.', en: 'Point assets linked to levels and depths.' }, icon: MapPinned, color: '#18a7c4' },
      { id: 'sectors', label: { ar: 'قطاعات مغطاة', en: 'Covered sectors' }, value: 6, hint: { ar: 'قطاعات تظهر بها بيانات الصرف.', en: 'Sectors with sewer data.' }, icon: Layers3, color: '#20bfd8' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'مراجعة المطابق والأعماق ومسارات الخطوط', en: 'Reviewing manholes, depths, and line routes' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق الصرف والمراجعة الفنية', en: 'Sewer and technical review teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_22.webp', '/presentation/presentation_28.webp', '/presentation/presentation_35.webp']
  },
  {
    id: 'irrigation', name: { ar: 'شبكة الري', en: 'Irrigation Network' }, short: { ar: 'الري', en: 'Irrigation' }, icon: Sprout, color: '#1a94b8',
    summary: { ar: 'تعرض خطوط الري والمحابس والغرف وعناصر التحكم لدعم إدارة المسطحات الخضراء وشبكات الري.', en: 'Presents irrigation lines, valves, chambers, and control assets for landscape and irrigation network management.' },
    clientMessage: { ar: 'لوحة الري تركز على مسارات الخطوط وعناصر التحكم وسهولة ربطها بالمناطق الخضراء.', en: 'The irrigation view focuses on line routes and control assets linked to landscape areas.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 1726, hint: { ar: 'إجمالي عناصر شبكة الري.', en: 'Total irrigation assets.' }, icon: Activity, color: '#1a94b8' },
      { id: 'length', label: { ar: 'أطوال الخطوط', en: 'Line length' }, value: 95.21, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'أطوال خطوط الري.', en: 'Total irrigation line length.' }, icon: Route, color: '#20bfd8', fraction: 2 },
      { id: 'valves', label: { ar: 'محابس وغرف', en: 'Valves/chambers' }, value: 586, hint: { ar: 'عناصر تشغيل وتحكم.', en: 'Control and operation assets.' }, icon: MapPinned, color: '#18a7c4' },
      { id: 'sectors', label: { ar: 'قطاعات مغطاة', en: 'Covered sectors' }, value: 9, hint: { ar: 'قطاعات بها عناصر ري موثقة.', en: 'Sectors with documented irrigation assets.' }, icon: Layers3, color: '#0d7a9a' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'متابعة خطوط الري وعناصر التحكم', en: 'Monitoring irrigation lines and controls' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق الري والتشغيل', en: 'Irrigation and operation teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_25.webp', '/presentation/presentation_30.webp', '/presentation/presentation_33.webp']
  },
  {
    id: 'gas', name: { ar: 'شبكة الغاز', en: 'Gas Network' }, short: { ar: 'الغاز', en: 'Gas' }, icon: Flame, color: '#d4a574',
    summary: { ar: 'تعرض خطوط الغاز والتغذية المنزلية والفرعية والرئيسية، مع ربطها بالمناسيب والقطاعات والمنفذين.', en: 'Shows gas lines including domestic feeds, branch lines, and main lines linked to levels, sectors, and contractors.' },
    clientMessage: { ar: 'لوحة الغاز مناسبة لمراجعة المسارات، نوع التغذية، وارتباط الخطوط بالقطاعات.', en: 'The gas view supports reviewing routes, feed type, and sector relationships.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 10888, hint: { ar: 'إجمالي عناصر شبكة الغاز.', en: 'Total gas network assets.' }, icon: Activity, color: '#d4a574' },
      { id: 'length', label: { ar: 'أطوال الخطوط', en: 'Line length' }, value: 236.62, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'إجمالي أطوال خطوط الغاز.', en: 'Total gas line length.' }, icon: Route, color: '#e8c8a0', fraction: 2 },
      { id: 'lines', label: { ar: 'خطوط موثقة', en: 'Documented lines' }, value: 9911, hint: { ar: 'خطوط تغذية رئيسية وفرعية ومنزلية.', en: 'Main, branch, and domestic feed lines.' }, icon: Network, color: '#cc9952' },
      { id: 'sectors', label: { ar: 'قطاعات مغطاة', en: 'Covered sectors' }, value: 10, hint: { ar: 'قطاعات تظهر بها شبكة الغاز.', en: 'Sectors covered by gas network data.' }, icon: Layers3, color: '#a58048' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'تحليل التغذية المنزلية والفرعية والرئيسية', en: 'Analyzing domestic, branch, and main feeds' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق الغاز والسلامة', en: 'Gas and safety teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_16.webp', '/presentation/presentation_31.webp', '/presentation/presentation_36.webp']
  },
  {
    id: 'telecom', name: { ar: 'شبكة الاتصالات', en: 'Telecom Network' }, short: { ar: 'الاتصالات', en: 'Telecom' }, icon: RadioTower, color: '#20bfd8',
    summary: { ar: 'توثق كابلات الاتصالات، البوكسات، الشمبرات، والموزعات داخل نطاق المدينة.', en: 'Documents telecom cables, boxes, chambers, and distribution assets across the city.' },
    clientMessage: { ar: 'لوحة الاتصالات تعرض مكونات الشبكة ذات الطبيعة النقطية والخطية مع التركيز على الأكواد والمناطق.', en: 'The telecom view presents both point and linear network components with emphasis on codes and areas.' },
    metrics: [
      { id: 'features', label: { ar: 'إجمالي العناصر', en: 'Total assets' }, value: 4503, hint: { ar: 'إجمالي عناصر شبكة الاتصالات.', en: 'Total telecom assets.' }, icon: Activity, color: '#20bfd8' },
      { id: 'length', label: { ar: 'أطوال الكابلات', en: 'Cable length' }, value: 80.32, unit: { ar: 'كم', en: 'km' }, hint: { ar: 'إجمالي أطوال كابلات الاتصالات.', en: 'Total telecom cable length.' }, icon: Route, color: '#5dd9f5', fraction: 2 },
      { id: 'points', label: { ar: 'عناصر نقطية', en: 'Point assets' }, value: 1722, hint: { ar: 'بوكسات وكونيكتورات وشمبرات.', en: 'Boxes, connectors, and chambers.' }, icon: MapPinned, color: '#18a7c4' },
      { id: 'lines', label: { ar: 'عناصر خطية', en: 'Linear assets' }, value: 2730, hint: { ar: 'مسارات كابلات الاتصالات.', en: 'Telecom cable routes.' }, icon: Network, color: '#0d7a9a' }
    ],
    focus: [
      { label: { ar: 'أهم الاستخدامات', en: 'Primary use' }, value: { ar: 'متابعة الكابلات والبوكسات والغرف', en: 'Tracking cables, boxes, and chambers' } },
      { label: { ar: 'المستفيد', en: 'Beneficiary' }, value: { ar: 'فرق الاتصالات والتحول الرقمي', en: 'Telecom and digital transformation teams' } }
    ],
    workflow: [commonWorkflows.field, commonWorkflows.cad, commonWorkflows.gis],
    images: ['/presentation/presentation_21.webp', '/presentation/presentation_27.webp', '/presentation/presentation_38.webp']
  }
];

export const methodology = [
  { step: '01', icon: FileText, title: { ar: 'إعداد خطة العمل', en: 'Work plan setup' }, text: { ar: 'تحديد نطاق المدينة، تقسيم الأحياء والقطاعات، وتجهيز خطة رفع وتسليم قابلة للمتابعة.', en: 'Defining city scope, districts, sectors, and a trackable survey and delivery plan.' } },
  { step: '02', icon: Layers3, title: { ar: 'تقسيم القطاعات', en: 'Sector structuring' }, text: { ar: 'تقسيم العمل إلى قطاعات تشغيلية لتسهيل توزيع الفرق ومتابعة موقف كل قطاع.', en: 'Dividing the scope into operational sectors to support team allocation and status tracking.' } },
  { step: '03', icon: Radar, title: { ar: 'الرفع والكشف الميداني', en: 'Field survey and detection' }, text: { ar: 'تنفيذ الرفع باستخدام أدوات التوثيق المكاني وتسجيل عناصر الشبكات ميدانيًا.', en: 'Surveying assets using spatial documentation tools and capturing field network elements.' } },
  { step: '04', icon: Network, title: { ar: 'المعالجة والرسم الفني', en: 'Processing and drafting' }, text: { ar: 'معالجة البيانات، المراجعة، الرسم على AutoCAD، وتجهيز طبقات GIS قابلة للاستخدام.', en: 'Cleaning, reviewing, CAD drafting, and preparing reusable GIS layers.' } },
  { step: '05', icon: MapPinned, title: { ar: 'إنتاج خرائط التسليم', en: 'Handover map production' }, text: { ar: 'إخراج خرائط لكل شبكة ولكل حي بصورة موحدة قابلة للفحص والاعتماد.', en: 'Producing unified maps for each network and district for review and approval.' } },
  { step: '06', icon: MonitorDot, title: { ar: 'التطبيقات ولوحات المتابعة', en: 'Apps and dashboards' }, text: { ar: 'تحويل المخرجات إلى شاشات تفاعلية ولوحات تساعد في اتخاذ القرار.', en: 'Turning outputs into interactive screens and decision-support dashboards.' } }
];

export const gallery = [
  { src: '/presentation/presentation_02.webp', category: 'field', title: { ar: 'توثيق ميداني داخل الحي', en: 'Field documentation inside district' }, text: { ar: 'صور من أعمال الرفع باستخدام الأجهزة الميدانية.', en: 'Field surveying activities using documentation devices.' } },
  { src: '/presentation/presentation_03.webp', category: 'field', title: { ar: 'رفع نقاط المرافق', en: 'Utility point capture' }, text: { ar: 'تسجيل مواقع عناصر الشبكات وربطها بالبيانات.', en: 'Capturing asset locations and linking them with attributes.' } },
  { src: '/presentation/presentation_09.webp', category: 'field', title: { ar: 'المسح الراداري', en: 'Radar survey' }, text: { ar: 'أعمال كشف ومسح ميداني للشبكات.', en: 'Field detection and scanning for utility networks.' } },
  { src: '/presentation/presentation_13.webp', category: 'cad', title: { ar: 'مخطط AutoCAD للحي الرابع عشر', en: 'AutoCAD drawing for District 14' }, text: { ar: 'إعداد مخططات العمل الميداني.', en: 'Preparing technical fieldwork drawings.' } },
  { src: '/presentation/presentation_17.webp', category: 'cad', title: { ar: 'مخطط الحي التاسع والثلاثين', en: 'District 39 drawing' }, text: { ar: 'تمثيل تفصيلي للقطاعات والشبكات.', en: 'Detailed representation of sectors and networks.' } },
  { src: '/presentation/presentation_19.webp', category: 'apps', title: { ar: 'شاشة جميع الشبكات', en: 'All networks screen' }, text: { ar: 'عرض مكاني تفاعلي لشبكات متعددة.', en: 'Interactive spatial view of multiple networks.' } },
  { src: '/presentation/presentation_20.webp', category: 'apps', title: { ar: 'لوحة الكهرباء', en: 'Electricity dashboard' }, text: { ar: 'تخصيص العرض حسب نوع الشبكة.', en: 'Network-specific interactive screen.' } },
  { src: '/presentation/presentation_24.webp', category: 'apps', title: { ar: 'لوحة المياه', en: 'Water dashboard' }, text: { ar: 'تتبع مكونات المياه والقطاعات.', en: 'Tracking water assets and sectors.' } },
  { src: '/presentation/presentation_26.webp', category: 'maps', title: { ar: 'خريطة تسليم الكهرباء - عرض عام', en: 'Electricity handover map - overview' }, text: { ar: 'لوحة شبكة الكهرباء بكامل نطاق الأحياء المعروضة.', en: 'Electricity network handover map for the displayed districts.' } },
  { src: '/presentation/presentation_28.webp', category: 'maps', title: { ar: 'خريطة تسليم الكهرباء - نطاق تفصيلي', en: 'Electricity handover map - detailed scope' }, text: { ar: 'مخرجات تفصيلية لشبكة الكهرباء داخل نطاق محدد.', en: 'Detailed electricity network deliverable for a focused scope.' } },
  { src: '/presentation/presentation_29.webp', category: 'maps', title: { ar: 'خريطة تسليم الاتصالات - عرض عام', en: 'Telecom handover map - overview' }, text: { ar: 'لوحة شبكة الاتصالات بكامل نطاق الأحياء المعروضة.', en: 'Telecom network handover map for the displayed districts.' } },
  { src: '/presentation/presentation_30.webp', category: 'maps', title: { ar: 'خريطة تسليم الاتصالات - نطاق تفصيلي', en: 'Telecom handover map - detailed scope' }, text: { ar: 'مخرجات تفصيلية لشبكة الاتصالات داخل نطاق محدد.', en: 'Detailed telecom network deliverable for a focused scope.' } },
  { src: '/presentation/presentation_32.webp', category: 'maps', title: { ar: 'خريطة تسليم الصرف - عرض عام', en: 'Sewer handover map - overview' }, text: { ar: 'لوحة شبكة الصرف بكامل نطاق الأحياء المعروضة.', en: 'Sewer network handover map for the displayed districts.' } },
  { src: '/presentation/presentation_33.webp', category: 'maps', title: { ar: 'خريطة تسليم الصرف - نطاق تفصيلي', en: 'Sewer handover map - detailed scope' }, text: { ar: 'مخرجات تفصيلية لشبكة الصرف داخل نطاق محدد.', en: 'Detailed sewer network deliverable for a focused scope.' } },
  { src: '/presentation/presentation_35.webp', category: 'maps', title: { ar: 'خريطة تسليم الصرف - نطاق موسع', en: 'Sewer handover map - expanded scope' }, text: { ar: 'لوحة إضافية لشبكة الصرف لتوضيح امتداد الشبكة.', en: 'Additional sewer network map showing network coverage.' } },
  { src: '/presentation/presentation_36.webp', category: 'maps', title: { ar: 'خريطة تسليم المياه - عرض عام', en: 'Water handover map - overview' }, text: { ar: 'لوحة شبكة المياه بكامل نطاق الأحياء المعروضة.', en: 'Water network handover map for the displayed districts.' } },
  { src: '/presentation/presentation_37.webp', category: 'maps', title: { ar: 'خريطة تسليم المياه - نطاق تفصيلي', en: 'Water handover map - detailed scope' }, text: { ar: 'مخرجات تفصيلية لشبكة المياه داخل نطاق محدد.', en: 'Detailed water network deliverable for a focused scope.' } },
  { src: '/presentation/presentation_38.webp', category: 'maps', title: { ar: 'خريطة تسليم المياه - نطاق موسع', en: 'Water handover map - expanded scope' }, text: { ar: 'لوحة إضافية لشبكة المياه لتوضيح امتداد الشبكة.', en: 'Additional water network map showing network coverage.' } },
  { src: '/presentation/presentation_39.webp', category: 'maps', title: { ar: 'خريطة تسليم الري - عرض عام', en: 'Irrigation handover map - overview' }, text: { ar: 'لوحة شبكة الري بكامل نطاق الأحياء المعروضة.', en: 'Irrigation network handover map for the displayed districts.' } },
  { src: '/presentation/presentation_40.webp', category: 'maps', title: { ar: 'خريطة تسليم الري - نطاق تفصيلي', en: 'Irrigation handover map - detailed scope' }, text: { ar: 'مخرجات تفصيلية لشبكة الري داخل نطاق محدد.', en: 'Detailed irrigation network deliverable for a focused scope.' } }
];

const galleryLegacy = [
  { src: '/presentation/presentation_02.webp', category: 'field', title: { ar: 'توثيق ميداني داخل الحي', en: 'Field documentation inside district' }, text: { ar: 'صور من أعمال الرفع باستخدام الأجهزة الميدانية.', en: 'Field surveying activities using documentation devices.' } },
  { src: '/presentation/presentation_03.webp', category: 'field', title: { ar: 'رفع نقاط المرافق', en: 'Utility point capture' }, text: { ar: 'تسجيل مواقع عناصر الشبكات وربطها بالبيانات.', en: 'Capturing asset locations and linking them with attributes.' } },
  { src: '/presentation/presentation_09.webp', category: 'field', title: { ar: 'المسح الراداري', en: 'Radar survey' }, text: { ar: 'أعمال كشف ومسح ميداني للشبكات.', en: 'Field detection and scanning for utility networks.' } },
  { src: '/presentation/presentation_13.webp', category: 'cad', title: { ar: 'مخطط AutoCAD للحي الرابع عشر', en: 'AutoCAD drawing for District 14' }, text: { ar: 'إعداد مخططات العمل الميداني.', en: 'Preparing technical fieldwork drawings.' } },
  { src: '/presentation/presentation_17.webp', category: 'cad', title: { ar: 'مخطط الحي التاسع والثلاثين', en: 'District 39 drawing' }, text: { ar: 'تمثيل تفصيلي للقطاعات والشبكات.', en: 'Detailed representation of sectors and networks.' } },
  { src: '/presentation/presentation_19.webp', category: 'apps', title: { ar: 'شاشة جميع الشبكات', en: 'All networks screen' }, text: { ar: 'عرض مكاني تفاعلي لشبكات متعددة.', en: 'Interactive spatial view of multiple networks.' } },
  { src: '/presentation/presentation_20.webp', category: 'apps', title: { ar: 'لوحة الكهرباء', en: 'Electricity dashboard' }, text: { ar: 'تخصيص العرض حسب نوع الشبكة.', en: 'Network-specific interactive screen.' } },
  { src: '/presentation/presentation_24.webp', category: 'apps', title: { ar: 'لوحة المياه', en: 'Water dashboard' }, text: { ar: 'تتبع مكونات المياه والقطاعات.', en: 'Tracking water assets and sectors.' } },
  { src: '/presentation/presentation_26.webp', category: 'maps', title: { ar: 'خريطة تسليم الكهرباء', en: 'Electricity handover map' }, text: { ar: 'نموذج خرائط تسليم للأحياء.', en: 'Handover map sample for districts.' } },
  { src: '/presentation/presentation_28.webp', category: 'maps', title: { ar: 'خريطة تسليم الصرف', en: 'Sewer handover map' }, text: { ar: 'خرائط مخرجات شبكة الصرف.', en: 'Sewer network map deliverables.' } },
  { src: '/presentation/presentation_29.webp', category: 'maps', title: { ar: 'خريطة تسليم المياه', en: 'Water handover map' }, text: { ar: 'مخرجات خرائط شبكة المياه.', en: 'Water network map outputs.' } },
  { src: '/presentation/presentation_31.webp', category: 'maps', title: { ar: 'خريطة تسليم الغاز', en: 'Gas handover map' }, text: { ar: 'مخرجات خرائط شبكة الغاز.', en: 'Gas network map deliverables.' } },
  { src: '/presentation/presentation_38.webp', category: 'maps', title: { ar: 'مخرجات القطاعات', en: 'Sector outputs' }, text: { ar: 'خرائط قطاعية تفصيلية.', en: 'Detailed sector maps.' } }
];

export const galleryFilters = [
  { id: 'all', label: { ar: 'الكل', en: 'All' } },
  { id: 'field', label: { ar: 'ميداني', en: 'Field' } },
  { id: 'cad', label: { ar: 'AutoCAD', en: 'AutoCAD' } },
  { id: 'apps', label: { ar: 'تطبيقات', en: 'Apps' } },
  { id: 'maps', label: { ar: 'خرائط التسليم', en: 'Handover maps' } }
];
