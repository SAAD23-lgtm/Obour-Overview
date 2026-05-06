import {
  Activity,
  AlertTriangle,
  Archive,
  BadgeCheck,
  BarChart3,
  Building2,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileText,
  GitBranch,
  HardHat,
  Layers3,
  LucideIcon,
  MapPinned,
  Network,
  PlugZap,
  RadioTower,
  RefreshCw,
  Route,
  ScanLine,
  ShieldCheck,
  Target,
  UsersRound,
  Waves,
  Zap,
  Droplets,
  Flame,
  Sprout
} from 'lucide-react';
import type { Localized } from './content';

export type ProposalTabId = 'scope' | 'workflow' | 'quality' | 'deliverables' | 'risk' | 'team';

export type ProposalTab = {
  id: ProposalTabId;
  title: Localized;
  subtitle: Localized;
  icon: LucideIcon;
  color: string;
};

export type DeepCard = {
  title: Localized;
  text: Localized;
  icon: LucideIcon;
  color: string;
  value?: Localized;
};

export type NetworkScope = {
  id: string;
  name: Localized;
  color: string;
  icon: LucideIcon;
  elements: Localized[];
  checks: Localized[];
  outputs: Localized[];
  message: Localized;
};

export type WorkflowStage = {
  step: string;
  title: Localized;
  input: Localized;
  action: Localized;
  output: Localized;
  icon: LucideIcon;
  color: string;
};

export const proposalTabs: ProposalTab[] = [
  {
    id: 'scope',
    title: { ar: 'نطاق الشبكات', en: 'Network scope' },
    subtitle: { ar: 'تفصيل العناصر وأعمال الفحص لكل شبكة', en: 'Assets and checks for every utility network' },
    icon: Network,
    color: '#38bdf8'
  },
  {
    id: 'workflow',
    title: { ar: 'سير العمل', en: 'Operating workflow' },
    subtitle: { ar: 'من الاستلام حتى الإخراج والتسليم', en: 'From data receipt to delivery and handover' },
    icon: GitBranch,
    color: '#22c55e'
  },
  {
    id: 'quality',
    title: { ar: 'ضمان الجودة', en: 'Quality assurance' },
    subtitle: { ar: 'اختبارات مكانية ووصفية ومنطقية', en: 'Spatial, attribute, and logical checks' },
    icon: ShieldCheck,
    color: '#facc15'
  },
  {
    id: 'deliverables',
    title: { ar: 'المخرجات', en: 'Deliverables' },
    subtitle: { ar: 'تقارير، خرائط، سجلات، ولوحات تفاعلية', en: 'Reports, maps, registers, and dashboards' },
    icon: FileCheck2,
    color: '#a855f7'
  },
  {
    id: 'risk',
    title: { ar: 'المخاطر والمتابعة', en: 'Risks and controls' },
    subtitle: { ar: 'آليات التصعيد والإغلاق والتحكم', en: 'Escalation, closure, and control mechanisms' },
    icon: AlertTriangle,
    color: '#fb923c'
  },
  {
    id: 'team',
    title: { ar: 'الفريق والأدوات', en: 'Team and tools' },
    subtitle: { ar: 'أدوار تشغيلية وقدرات GIS متقدمة', en: 'Delivery roles and advanced GIS capabilities' },
    icon: UsersRound,
    color: '#06b6d4'
  }
];

export const proposalHighlights: DeepCard[] = [
  {
    title: { ar: 'دورة تشغيل قابلة للقياس', en: 'Measurable operating cycle' },
    text: { ar: 'كل دفعة بيانات تمر بمراحل واضحة: استلام، تهيئة، فحص، معالجة، إخراج، ثم اعتماد وتسليم.', en: 'Every data package follows a clear cycle: receipt, preparation, review, correction, output, approval, and handover.' },
    icon: Activity,
    color: '#38bdf8',
    value: { ar: '8 مراحل', en: '8 stages' }
  },
  {
    title: { ar: 'تحويل البيانات إلى قرار', en: 'Turning data into decisions' },
    text: { ar: 'الأرقام والخرائط والملاحظات تظهر معًا لتسهيل قراءة الموقف واتخاذ القرار.', en: 'Indicators, maps, and remarks are connected to make status review and decisions easier.' },
    icon: Target,
    color: '#22c55e',
    value: { ar: 'قرار أسرع', en: 'Faster decisions' }
  },
  {
    title: { ar: 'حوكمة وجودة', en: 'Governance and quality' },
    text: { ar: 'ضوابط واضحة لجودة البيانات، متابعة الملاحظات، وإغلاق القضايا الفنية.', en: 'Clear controls for data quality, remark tracking, and technical issue closure.' },
    icon: ShieldCheck,
    color: '#facc15',
    value: { ar: 'QA/QC', en: 'QA/QC' }
  }
];

export const networkScopes: NetworkScope[] = [
  {
    id: 'water',
    name: { ar: 'شبكات المياه', en: 'Water networks' },
    color: '#38bdf8',
    icon: Droplets,
    elements: [
      { ar: 'غرف ومحابس وخطوط مياه ومحابس حريق ووصلات منزلية', en: 'Rooms, valves, water lines, fire hydrants, and house connections' },
      { ar: 'أقطار، أعماق، أكواد، قطاعات، وبيانات وصفية مرتبطة بالموقع', en: 'Diameters, depths, codes, sectors, and spatially linked attributes' }
    ],
    checks: [
      { ar: 'التحقق من استمرارية الخطوط واتصالها بالعناصر', en: 'Validate line continuity and connection to assets' },
      { ar: 'مراجعة اتساق الأقطار والأكواد واكتمال خصائص الغرف والمحابس', en: 'Review diameter consistency, coding, and completeness of room/valve attributes' },
      { ar: 'اكتشاف التكرار أو العناصر غير المرتبطة أو الفراغات في البيانات', en: 'Detect duplicates, disconnected assets, and missing data' }
    ],
    outputs: [
      { ar: 'لوحات متابعة محابس وغرف المياه', en: 'Water valves and chambers dashboards' },
      { ar: 'خرائط قطاعية وسجل ملاحظات تفصيلي', en: 'Sector maps and detailed observation register' }
    ],
    message: { ar: 'المياه تحتاج قراءة هندسية دقيقة تربط بين الخطوط والغرف والمحابس حتى تكون البيانات قابلة للتشغيل والتحليل.', en: 'Water data requires an engineering view connecting pipes, chambers, and valves so the dataset becomes operational and analyzable.' }
  },
  {
    id: 'sewer',
    name: { ar: 'شبكات الصرف', en: 'Sewer networks' },
    color: '#a855f7',
    icon: Waves,
    elements: [
      { ar: 'مطابق صرف، مطابق مطر، خطوط، غرف، ومحطات داعمة', en: 'Sewer manholes, storm drains, lines, rooms, and supporting stations' },
      { ar: 'أعماق، مناسيب، أقطار، وأنواع مطابق مرتبطة بالخطوط', en: 'Depths, levels, diameters, and manhole types linked to lines' }
    ],
    checks: [
      { ar: 'فحص العلاقة بين المطابق والخطوط واتجاهات الشبكة', en: 'Check relationship between manholes, pipes, and network direction' },
      { ar: 'مراجعة الأعماق والرموز والربط القطاعي', en: 'Review depths, codes, and sector linkage' },
      { ar: 'كشف التعارضات والفجوات والأقطار غير المنطقية', en: 'Detect conflicts, gaps, and illogical diameters' }
    ],
    outputs: [
      { ar: 'مؤشرات لأقطار الشبكة وتوزيع المطابق', en: 'Indicators for pipe diameters and manhole distribution' },
      { ar: 'خرائط وتقرير حالة حسب القطاع', en: 'Maps and status reports by sector' }
    ],
    message: { ar: 'شبكة الصرف من أكثر الشبكات احتياجًا لمنطق مكاني وشبكي دقيق بسبب ارتباط الخطوط بالمطابق والأعماق.', en: 'Sewer networks need strict spatial and network logic because pipes, manholes, and depths are strongly connected.' }
  },
  {
    id: 'electricity',
    name: { ar: 'شبكات الكهرباء', en: 'Electricity networks' },
    color: '#facc15',
    icon: Zap,
    elements: [
      { ar: 'أكشاك، موزعات، بيلرات، كابلات، مصادر وأهداف', en: 'Kiosks, distribution units, pillars, cables, sources, and targets' },
      { ar: 'علاقات مصدر/هدف ومسارات ربط وأكواد تشغيلية', en: 'Source/target relationships, connection routes, and operational codes' }
    ],
    checks: [
      { ar: 'فحص علاقات المصدر والهدف للكابلات', en: 'Validate cable source-target relationships' },
      { ar: 'مطابقة الأكشاك والموزعات والبيلرات مع مسارات الربط', en: 'Match kiosks, distributors, and pillars with connection routes' },
      { ar: 'مراجعة الأكواد والتكرار وعناصر الشبكة غير المكتملة', en: 'Review codes, duplicates, and incomplete network elements' }
    ],
    outputs: [
      { ar: 'لوحات كهرباء تشغيلية وجداول ربط تفصيلية', en: 'Operational electricity dashboards and detailed linkage tables' },
      { ar: 'خرائط تسليم للكابلات والمكونات الكهربائية', en: 'Handover maps for cables and electricity components' }
    ],
    message: { ar: 'الكهرباء تحتاج عرضًا يوضح العلاقات وليس المواقع فقط؛ لأن قوة البيانات في تتبع المصدر والهدف ومسار الكابل.', en: 'Electricity needs a relationship-based view, not just locations, because the value is in tracing sources, targets, and cable routes.' }
  },
  {
    id: 'telecom',
    name: { ar: 'شبكات الاتصالات', en: 'Telecom networks' },
    color: '#06b6d4',
    icon: RadioTower,
    elements: [
      { ar: 'بوكسات، كبائن، كابلات، جوبنت/كونكتورز، وسنترال', en: 'Boxes, cabinets, cables, joints/connectors, and central nodes' },
      { ar: 'أعداد البوكسات، نوع الكابل، الربط بالكبائن والقطاعات', en: 'Box counts, cable types, cabinet links, and sector references' }
    ],
    checks: [
      { ar: 'فحص التكامل بين العناصر الطرفية والرئيسية', en: 'Validate integration between terminal and main assets' },
      { ar: 'مراجعة اتساق بيانات الكابلات والكيانات', en: 'Review consistency of cable and entity data' },
      { ar: 'اكتشاف الفجوات أو التكرار أو مشاكل الربط والترميز', en: 'Detect gaps, duplicates, linkage issues, and coding problems' }
    ],
    outputs: [
      { ar: 'واجهات تحليلية قطاعية وجداول مفصلة للأكواد والأعداد', en: 'Sector analytics and detailed code/count tables' },
      { ar: 'خرائط ومؤشرات للكيانات والكابلات', en: 'Maps and indicators for entities and cables' }
    ],
    message: { ar: 'الاتصالات تحتاج دمجًا بين الجدول والخريطة حتى تظهر علاقة الكبائن والكابلات والبوكسات بوضوح.', en: 'Telecom requires a strong table-map link to clarify the relation between cabinets, cables, and boxes.' }
  },
  {
    id: 'gas',
    name: { ar: 'شبكات الغاز', en: 'Gas networks' },
    color: '#fb923c',
    icon: Flame,
    elements: [
      { ar: 'محابس، خطوط، غرف، منشآت، ومحطات', en: 'Valves, lines, chambers, facilities, and stations' },
      { ar: 'درجات الخط، الأكواد، أطوال المواسير، وتوزيع الغرف', en: 'Line grades, codes, pipe lengths, and chamber distribution' }
    ],
    checks: [
      { ar: 'اختبار المنطق الشبكي ودرجات الخط', en: 'Test network logic and line grades' },
      { ar: 'مراجعة التوزيع بين المحابس والغرف والمواسير', en: 'Review distribution between valves, chambers, and pipes' },
      { ar: 'تحديد العناصر الحرجة ومراجعة اكتمال خصائصها', en: 'Identify critical assets and review attribute completeness' }
    ],
    outputs: [
      { ar: 'لوحات متخصصة للغاز ومؤشرات رقمية للمنظومة', en: 'Specialized gas dashboards and numeric system indicators' },
      { ar: 'خرائط تفصيلية لمسارات الغاز والعناصر المرتبطة', en: 'Detailed maps for gas routes and related assets' }
    ],
    message: { ar: 'شبكة الغاز تحتاج وضوحًا عاليًا في عرض المسارات والعناصر بسبب حساسية المرفق وأهمية تتبع العلاقات.', en: 'Gas networks need a highly clear presentation of routes and assets because of the sensitivity of the utility and the importance of traceability.' }
  },
  {
    id: 'support',
    name: { ar: 'الطرق والبيانات المرجعية', en: 'Roads and reference data' },
    color: '#8ec5ff',
    icon: Route,
    elements: [
      { ar: 'قطاعات، أحياء، حدود، أكواد مرجعية، طبقات داعمة، ومحاور طرق', en: 'Sectors, districts, boundaries, reference codes, support layers, and road corridors' },
      { ar: 'ربط مكاني يسهّل الفلترة والتحليل القطاعي والتسليم', en: 'Spatial reference supporting filters, sector analysis, and handover' }
    ],
    checks: [
      { ar: 'فحص اكتمال البيانات المرجعية وحدود القطاعات', en: 'Check reference data and sector boundary completeness' },
      { ar: 'مراجعة الربط بين الأحياء والطرق والشبكات', en: 'Review linkage between districts, roads, and networks' },
      { ar: 'توحيد الأكواد والمسميات لضمان قراءة مؤسسية واحدة', en: 'Standardize codes and names for one institutional reading' }
    ],
    outputs: [
      { ar: 'بيئة مرجعية موحدة للمتابعة المؤسسية', en: 'Unified reference environment for institutional monitoring' },
      { ar: 'خرائط قطاعات وموقف تنفيذ وتسليم', en: 'Sector maps with execution and delivery status' }
    ],
    message: { ar: 'البيانات المرجعية هي الأساس الذي يجعل كل الشبكات قابلة للفهم والتصفية والتحليل على مستوى الحي والقطاع.', en: 'Reference data is the foundation that makes all networks understandable, filterable, and analyzable by district and sector.' }
  }
];

export const workflowStages: WorkflowStage[] = [
  {
    step: '01',
    title: { ar: 'الاستلام', en: 'Receipt' },
    input: { ar: 'حزم بيانات، طبقات GIS/CAD، مرفقات، وبيانات وصفية', en: 'Data packages, GIS/CAD layers, attachments, and metadata' },
    action: { ar: 'تسجيل الدفعة، توثيق الجهة والتاريخ ونوع الشبكة، والتحقق من اكتمال الحزمة', en: 'Register package, document source/date/network type, and check completeness' },
    output: { ar: 'سجل استلام منظم وقائمة جاهزية أولية', en: 'Receipt register and initial readiness checklist' },
    icon: Archive,
    color: '#38bdf8'
  },
  {
    step: '02',
    title: { ar: 'التهيئة', en: 'Preparation' },
    input: { ar: 'البيانات المستلمة والمرجعيات الفنية', en: 'Received data and technical references' },
    action: { ar: 'توحيد الأسماء، تجهيز بيئة العمل، تصنيف الطبقات، وتجهيزها للفحص', en: 'Normalize names, prepare workspace, classify layers, and make them review-ready' },
    output: { ar: 'حزمة بيانات جاهزة للمراجعة الفنية', en: 'A technical-review-ready dataset' },
    icon: Database,
    color: '#22c55e'
  },
  {
    step: '03',
    title: { ar: 'الفحص الأولي', en: 'Initial review' },
    input: { ar: 'حزمة الفحص الأولية', en: 'Initial review package' },
    action: { ar: 'فحص المرجع الجيومكاني، بنية الحقول، التكرار، الفراغات، وسلامة الطبقات', en: 'Check coordinate reference, fields, duplicates, blanks, and layer integrity' },
    output: { ar: 'قائمة ملاحظات أولية ومصفوفة مخاطر', en: 'Initial observation list and risk matrix' },
    icon: ScanLine,
    color: '#facc15'
  },
  {
    step: '04',
    title: { ar: 'الفحص الفني المتقدم', en: 'Advanced technical QC' },
    input: { ar: 'البيانات المصنفة والملاحظات الأولية', en: 'Classified data and initial observations' },
    action: { ar: 'اختبارات QC/QA، التحليل المكاني، كشف التعارضات، وفحص العلاقات الشبكية', en: 'QA/QC tests, spatial analysis, conflict detection, and network relationship checks' },
    output: { ar: 'تقرير فني تفصيلي حسب الجهة والشبكة', en: 'Detailed technical report by entity and network' },
    icon: ClipboardCheck,
    color: '#a855f7'
  },
  {
    step: '05',
    title: { ar: 'المعالجة والمتابعة', en: 'Correction and tracking' },
    input: { ar: 'الملاحظات الفنية والبيانات المحدثة', en: 'Technical observations and updated data' },
    action: { ar: 'إغلاق الملاحظات، إعادة الفحص، وتحديث حالة كل ملاحظة حتى الاعتماد', en: 'Close observations, re-check data, and update every issue status until approval' },
    output: { ar: 'نسخ بيانات محسنة وسجل إغلاقات محدث', en: 'Improved datasets and updated closure register' },
    icon: RefreshCw,
    color: '#fb923c'
  },
  {
    step: '06',
    title: { ar: 'الإخراج والتسليم', en: 'Outputs and handover' },
    input: { ar: 'النسخ المحسنة ونتائج الفحص', en: 'Improved data and review results' },
    action: { ar: 'إنتاج الخرائط، Dashboards، الجداول التحليلية، والتقارير المرحلية والختامية', en: 'Produce maps, dashboards, analytical tables, and phase/final reports' },
    output: { ar: 'مخرجات تنفيذية قابلة للاستخدام من قبل الجهة', en: 'Decision-ready outputs for the client' },
    icon: BarChart3,
    color: '#06b6d4'
  }
];

export const qualityControls: DeepCard[] = [
  { title: { ar: 'الدقة المكانية', en: 'Spatial accuracy' }, text: { ar: 'مراجعة مواضع العناصر، المرجع الجيومكاني، والتطابق بين الطبقات والواقع الميداني.', en: 'Review asset positions, coordinate reference, and alignment between layers and field reality.' }, icon: MapPinned, color: '#38bdf8', value: { ar: 'موقع', en: 'Location' } },
  { title: { ar: 'الاكتمال', en: 'Completeness' }, text: { ar: 'قياس الحقول الناقصة والعناصر غير المكتملة وإظهارها كقضايا قابلة للإغلاق.', en: 'Measure missing fields and incomplete assets as trackable closure issues.' }, icon: CheckCircle2, color: '#22c55e', value: { ar: 'حقول', en: 'Fields' } },
  { title: { ar: 'الاتساق الوصفي', en: 'Attribute consistency' }, text: { ar: 'مراجعة الأكواد، المسميات، الأقطار، الأعماق، الأنواع، وحالات التنفيذ.', en: 'Review codes, names, diameters, depths, types, and execution statuses.' }, icon: FileText, color: '#facc15', value: { ar: 'Attributes', en: 'Attributes' } },
  { title: { ar: 'المنطق الشبكي', en: 'Network logic' }, text: { ar: 'اختبار الاتصال بين الخطوط والعقد والمكونات، وفحص علاقات المصدر والهدف.', en: 'Test connectivity between lines, nodes, components, and source-target relationships.' }, icon: GitBranch, color: '#a855f7', value: { ar: 'Topology', en: 'Topology' } },
  { title: { ar: 'عدم التكرار', en: 'No duplication' }, text: { ar: 'اكتشاف العناصر المتكررة أو الأكواد المكررة التي تؤثر على دقة العد والمؤشرات.', en: 'Detect duplicated features or codes that affect counts and indicators.' }, icon: Layers3, color: '#fb923c', value: { ar: 'Unique', en: 'Unique' } },
  { title: { ar: 'قابلية الاعتماد', en: 'Readiness for use' }, text: { ar: 'تحويل البيانات من ملفات متفرقة إلى مخرجات قابلة للعرض والتحليل والتسليم.', en: 'Turn fragmented files into reliable outputs ready for display, analysis, and handover.' }, icon: BadgeCheck, color: '#06b6d4', value: { ar: 'Ready', en: 'Ready' } }
];

export const deliverables: DeepCard[] = [
  { title: { ar: 'خطة تنفيذ تفصيلية', en: 'Detailed execution plan' }, text: { ar: 'آلية التواصل، خطة الاستلام والفحص، ومصفوفة المسؤوليات.', en: 'Communication process, receipt/review plan, and responsibility matrix.' }, icon: FileText, color: '#38bdf8' },
  { title: { ar: 'خطة ضمان الجودة', en: 'QA/QC plan' }, text: { ar: 'معايير القبول، أدوات الفحص، وقوائم التحقق لكل نوع شبكة.', en: 'Acceptance criteria, review tools, and checklists for every network type.' }, icon: ShieldCheck, color: '#22c55e' },
  { title: { ar: 'سجلات استلام البيانات', en: 'Data receipt logs' }, text: { ar: 'توثيق كل دفعة بيانات وصيغتها ومرجعها الجيومكاني ونسبة جاهزيتها.', en: 'Record every data batch, format, coordinate reference, and readiness status.' }, icon: Archive, color: '#facc15' },
  { title: { ar: 'تقارير فحص الجودة', en: 'Quality inspection reports' }, text: { ar: 'توضح مستويات الدقة والاكتمال والاتساق والمنطق الشبكي ونسب الإغلاق.', en: 'Show accuracy, completeness, consistency, network logic, and closure rates.' }, icon: ClipboardCheck, color: '#a855f7' },
  { title: { ar: 'خرائط موضوعية وتحليلية', en: 'Thematic and analytical maps' }, text: { ar: 'خرائط تغطية، توزيع، تعارضات، ومناطق تحتاج مراجعة.', en: 'Coverage, distribution, conflict, and review-priority maps.' }, icon: MapPinned, color: '#fb923c' },
  { title: { ar: 'لوحات مؤشرات تفاعلية', en: 'Interactive dashboards' }, text: { ar: 'أصول، أكواد، كميات، توزيعات مكانية، وملاحظات حرجة في واجهة واحدة.', en: 'Assets, codes, quantities, spatial distributions, and critical remarks in one interface.' }, icon: BarChart3, color: '#06b6d4' }
];

export const riskControls: DeepCard[] = [
  { title: { ar: 'تأخر الاستلام', en: 'Delayed data receipt' }, text: { ar: 'تطبيق سجل استلام وتصعيد دوري يوضح الجهة، نوع البيانات، وتأثير التأخير على خطة التنفيذ.', en: 'Use receipt logs and regular escalation showing source, data type, and schedule impact.' }, icon: AlertTriangle, color: '#fb923c', value: { ar: 'تصعيد', en: 'Escalation' } },
  { title: { ar: 'اختلاف النماذج', en: 'Different data models' }, text: { ar: 'توحيد الحقول والمسميات والرموز داخل قالب مؤسسي قابل للمراجعة والمقارنة.', en: 'Normalize fields, names, and codes into a comparable institutional template.' }, icon: Database, color: '#38bdf8', value: { ar: 'توحيد', en: 'Standardization' } },
  { title: { ar: 'نقص الحقول المرجعية', en: 'Missing reference fields' }, text: { ar: 'تمييز الحقول الحرجة وتحديد أثرها على الفلترة والربط والتحليل.', en: 'Flag critical fields and show their effect on filtering, linkage, and analysis.' }, icon: FileText, color: '#facc15', value: { ar: 'حرج', en: 'Critical' } },
  { title: { ar: 'تعارضات مكانية', en: 'Spatial conflicts' }, text: { ar: 'إنتاج خرائط تعارض وملاحظات مكانية تساعد على إعادة الفحص والمعالجة السريعة.', en: 'Produce conflict maps and spatial remarks to support rapid correction.' }, icon: MapPinned, color: '#a855f7', value: { ar: 'خريطة', en: 'Map' } },
  { title: { ar: 'تعدد الجهات', en: 'Multiple stakeholders' }, text: { ar: 'استخدام لوحة متابعة موحدة بدل التقارير المنفصلة لضمان قراءة واحدة للمشروع.', en: 'Use one monitoring view instead of separate reports to ensure a unified project reading.' }, icon: UsersRound, color: '#22c55e', value: { ar: 'موحد', en: 'Unified' } },
  { title: { ar: 'تأخر اعتماد المخرجات', en: 'Delayed approvals' }, text: { ar: 'عرض المخرجات حسب حالة الإغلاق والمراجعة والاعتماد لتسهيل القرار.', en: 'Display outputs by closure, review, and approval status to support decisions.' }, icon: BadgeCheck, color: '#06b6d4', value: { ar: 'اعتماد', en: 'Approval' } }
];

export const teamCapabilities: DeepCard[] = [
  { title: { ar: 'مدير مشروع', en: 'Project manager' }, text: { ar: 'قيادة الخطة، إدارة المخاطر، التواصل مع الجهة، واعتماد المخرجات.', en: 'Leads the plan, manages risk, coordinates with the client, and approves outputs.' }, icon: UsersRound, color: '#38bdf8' },
  { title: { ar: 'مسؤول تحليل جيومكاني', en: 'Senior GIS analyst' }, text: { ar: 'تحليل مكاني متقدم، مراجعة فنية، وإعداد تقارير ولوحات متابعة.', en: 'Advanced spatial analysis, technical review, reports, and dashboards.' }, icon: MapPinned, color: '#22c55e' },
  { title: { ar: 'مسؤولو شبكات متخصصة', en: 'Utility network specialists' }, text: { ar: 'مراجعة كهرباء ومياه وصرف واتصالات وغاز وطرق حسب طبيعة كل شبكة.', en: 'Review electricity, water, sewer, telecom, gas, and roads according to each network nature.' }, icon: Network, color: '#facc15' },
  { title: { ar: 'أخصائي لوحات وتقارير', en: 'Dashboard and reporting specialist' }, text: { ar: 'تصميم مؤشرات ولوحات تفاعلية تربط الخريطة بالأرقام والملاحظات.', en: 'Design indicators and dashboards connecting maps with numbers and observations.' }, icon: BarChart3, color: '#a855f7' },
  { title: { ar: 'ArcGIS Pro / Enterprise', en: 'ArcGIS Pro / Enterprise' }, text: { ar: 'إدارة الطبقات، التحليل، إعداد الخرائط، ونشر المخرجات.', en: 'Layer management, analysis, map production, and output publishing.' }, icon: Cable, color: '#06b6d4' },
  { title: { ar: 'FME / ArcPy / ModelBuilder', en: 'FME / ArcPy / ModelBuilder' }, text: { ar: 'أتمتة الفحص والمعالجة وتقليل الأخطاء اليدوية.', en: 'Automate review, processing, and reduce manual errors.' }, icon: PlugZap, color: '#fb923c' }
];
