import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, ChevronDown } from 'lucide-react';
import { networks as contentNetworks } from '../data/content';
import { pick, useLanguage } from '../context/LanguageContext';
import SectionTitle from './SectionTitle';

type AnyFeature = Feature<Geometry, Record<string, unknown>>;

type LayerMeta = {
  id: string;
  name: string;
  assetName: string;
  file: string;
  geometryKind: 'point' | 'line' | 'polygon';
  featureCount: number;
  totalLengthKm: number;
  typeField?: string;
  topTypes?: { name: string; count: number }[];
  topSectors?: { name: string; count: number }[];
};

type NetworkMeta = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  layers: LayerMeta[];
};

type AppData = {
  networks: NetworkMeta[];
  roads: NetworkMeta;
  global?: {
    totalFeatures?: number;
    totalLengthKm?: number;
    totalRoadKm?: number;
    totalSectors?: number;
  };
};

type LoadedLayer = {
  meta: LayerMeta;
  network: NetworkMeta;
  data: FeatureCollection;
};

type ExplorerFilters = {
  networkId: string;
  layerId: string;
  query: string;
  sector: string;
};

type SelectOption = {
  value: string;
  label: string;
  meta?: string;
};

const networkColors: Record<string, string> = {
  roads: '#8ec5ff',
  electricity: '#facc15',
  water: '#38bdf8',
  sewer: '#a855f7',
  irrigation: '#22c55e',
  gas: '#fb923c',
  telecom: '#06b6d4'
};

const layerNamesEn: Record<string, string> = {
  roads_lines: 'Roads',
  sectors_polygons: 'City sectors',
  admin_boundaries: 'Administrative boundaries',
  electricity_assets: 'Electricity assets',
  electricity_lines: 'Electricity lines',
  electricity_facilities: 'Electricity facilities',
  water_fire_hydrants: 'Fire hydrants',
  water_assets: 'Water assets',
  water_rooms: 'Water rooms',
  water_house_connections: 'House connections',
  water_lines: 'Water lines',
  sewer_manholes: 'Sewer manholes',
  storm_drains: 'Storm drains',
  sewer_rooms: 'Sewer rooms',
  sewer_lines: 'Sewer lines',
  irrigation_valves: 'Irrigation valves',
  irrigation_lines: 'Irrigation lines',
  irrigation_rooms: 'Irrigation rooms',
  gas_assets: 'Gas assets',
  gas_facilities: 'Gas facilities',
  gas_lines: 'Gas lines',
  telecom_assets: 'Telecom assets',
  telecom_facilities: 'Telecom facilities',
  telecom_lines: 'Telecom lines'
};

const searchFields = ['ID', 'GlobalID', 'sectors', 'اسم_القطاع', 'اسم_الحي', 'Implementing', '__typeValue'];

function BoundsController({ layersKey, layers }: { layersKey: string; layers: LoadedLayer[] }) {
  const map = useMap();
  useEffect(() => {
    const featureCollections = layers.filter((layer) => layer.data.features.length);
    if (!featureCollections.length) return;

    const group = L.featureGroup();
    featureCollections.forEach((layer) => L.geoJSON(layer.data as never).eachLayer((item) => group.addLayer(item)));
    const bounds = group.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [26, 26], maxZoom: 15 });
  }, [layersKey, layers, map]);
  return null;
}

function formatNumber(value: number, fraction = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: fraction, minimumFractionDigits: fraction }).format(value);
}

function cleanValue(value: unknown) {
  return value === null || value === undefined || value === '' ? '' : String(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
}

function layerLabel(layer: LayerMeta, lang: 'ar' | 'en') {
  return lang === 'ar' ? layer.name || layer.assetName || layer.id : layerNamesEn[layer.id] || layer.assetName || layer.id;
}

function networkLabel(network: NetworkMeta, lang: 'ar' | 'en') {
  if (network.id === 'roads') return lang === 'ar' ? network.shortName : 'Roads and sectors';
  const contentNetwork = contentNetworks.find((item) => item.id === network.id);
  return contentNetwork ? pick(lang, contentNetwork.name) : network.name;
}

function networkShortLabel(network: NetworkMeta, lang: 'ar' | 'en') {
  if (network.id === 'roads') return lang === 'ar' ? network.shortName : 'Roads';
  const contentNetwork = contentNetworks.find((item) => item.id === network.id);
  return contentNetwork ? pick(lang, contentNetwork.short) : network.shortName;
}

function featureTitle(feature: AnyFeature, layer: LayerMeta, lang: 'ar' | 'en') {
  const p = feature.properties || {};
  const code = cleanValue(p.ID) || cleanValue(p.GlobalID) || cleanValue(p.OBJECTID) || cleanValue(p.Room_Id) || cleanValue(p.Station_Id);
  const type = cleanValue(p.__typeValue) || cleanValue(layer.typeField ? p[layer.typeField] : undefined);
  const title = code || type || layerLabel(layer, lang);
  return lang === 'ar' ? title : title;
}

function popupHtml(feature: AnyFeature, layer: LayerMeta, network: NetworkMeta, lang: 'ar' | 'en') {
  const p = feature.properties || {};
  const preferred = [
    'ID',
    'GlobalID',
    '__typeValue',
    layer.typeField || '',
    'sectors',
    'اسم_القطاع',
    'اسم_الحي',
    'Implementing',
    'Depth',
    'diameter',
    '__length_m',
    '__area_m2'
  ];
  const seen = new Set<string>();
  const entries = preferred
    .filter(Boolean)
    .filter((key) => {
      if (seen.has(key)) return false;
      seen.add(key);
      return cleanValue(p[key]) !== '';
    })
    .slice(0, 8);
  const rows = entries.map((key) => `<div><span>${escapeHtml(key)}</span><b>${escapeHtml(cleanValue(p[key]))}</b></div>`).join('');
  return `<div class="map-popup" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
    <span>${lang === 'ar' ? 'تفاصيل العنصر' : 'Feature details'}</span>
    <h3>${escapeHtml(featureTitle(feature, layer, lang))}</h3>
    <em>${escapeHtml(networkLabel(network, lang))} / ${escapeHtml(layerLabel(layer, lang))}</em>
    ${rows}
  </div>`;
}

function getSector(feature: AnyFeature) {
  const p = feature.properties || {};
  return cleanValue(p.sectors) || cleanValue(p['اسم_القطاع']) || cleanValue(p['اسم_الحي']) || cleanValue(p['المرحلة']);
}

function featureMatches(feature: AnyFeature, filters: ExplorerFilters) {
  const p = feature.properties || {};
  if (filters.sector !== 'all' && getSector(feature) !== filters.sector) return false;
  const query = filters.query.trim().toLowerCase();
  if (!query) return true;
  return searchFields.some((field) => cleanValue(p[field]).toLowerCase().includes(query));
}

function getLayerStyle(layer: LayerMeta, network: NetworkMeta, isActive: boolean): L.PathOptions {
  const color = networkColors[network.id] || network.color || '#38bdf8';
  if (layer.geometryKind === 'polygon') {
    return { color, weight: isActive ? 2.4 : 1.3, opacity: 0.85, fillColor: color, fillOpacity: network.id === 'roads' ? 0.08 : 0.14 };
  }
  return { color, weight: isActive ? 3.1 : 2.1, opacity: isActive ? 0.95 : 0.72 };
}

function buildFeatureCollection(layer: LoadedLayer, filters: ExplorerFilters): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: layer.data.features.filter((feature) => featureMatches(feature as AnyFeature, filters))
  };
}

function ExplorerSelect({
  id,
  value,
  options,
  onChange,
  lang,
  emptyLabel
}: {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  lang: 'ar' | 'en';
  emptyLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value) || options[0];

  return (
    <div className={`explorer-select ${open ? 'open' : ''}`} id={id}>
      <button
        type="button"
        className="explorer-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.label || emptyLabel}</span>
        {selected?.meta && <small>{selected.meta}</small>}
        <ChevronDown size={17} />
      </button>
      {open && (
        <div className="explorer-select-menu" role="listbox" aria-label={emptyLabel}>
          {options.map((option) => {
            const active = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                className={active ? 'active' : ''}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {option.meta && <small>{option.meta}</small>}
                {active && <Check size={15} />}
              </button>
            );
          })}
          {!options.length && <p>{lang === 'ar' ? 'لا توجد خيارات متاحة' : 'No options available'}</p>}
        </div>
      )}
    </div>
  );
}

export default function InteractiveMapSection() {
  const { lang } = useLanguage();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [loadedLayers, setLoadedLayers] = useState<Record<string, LoadedLayer>>({});
  const [filters, setFilters] = useState<ExplorerFilters>({ networkId: 'all', layerId: 'all', query: '', sector: 'all' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/app-data.json')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load map metadata');
        return response.json();
      })
      .then((data: AppData) => setAppData(data))
      .catch((err: Error) => setError(err.message));
  }, []);

  const catalog = useMemo<NetworkMeta[]>(() => {
    if (!appData) return [];
    return [appData.roads, ...appData.networks];
  }, [appData]);

  const activeNetwork = useMemo(() => catalog.find((network) => network.id === filters.networkId), [catalog, filters.networkId]);

  const availableLayers = useMemo(() => {
    if (!appData) return [];
    if (filters.networkId === 'all') return appData.roads.layers;
    return activeNetwork?.layers || [];
  }, [activeNetwork, appData, filters.networkId]);

  const selectedLayerMetas = useMemo(() => {
    if (filters.layerId === 'all') return availableLayers;
    return availableLayers.filter((layer) => layer.id === filters.layerId);
  }, [availableLayers, filters.layerId]);

  useEffect(() => {
    let cancelled = false;
    const missingLayers = selectedLayerMetas.filter((layer) => !loadedLayers[layer.id]);
    if (!missingLayers.length || !catalog.length) return undefined;

    setLoading(true);
    Promise.all(
      missingLayers.map(async (layer) => {
        const network = catalog.find((item) => item.layers.some((candidate) => candidate.id === layer.id));
        const response = await fetch(`/${layer.file}`);
        if (!response.ok) throw new Error(`Unable to load ${layer.id}`);
        const data = await response.json() as FeatureCollection;
        return { meta: layer, network: network || activeNetwork || catalog[0], data };
      })
    )
      .then((layers) => {
        if (cancelled) return;
        setLoadedLayers((current) => {
          const next = { ...current };
          layers.forEach((layer) => { next[layer.meta.id] = layer; });
          return next;
        });
        setError(null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [activeNetwork, catalog, loadedLayers, selectedLayerMetas]);

  const visibleLayers = useMemo(() => selectedLayerMetas
    .map((layer) => loadedLayers[layer.id])
    .filter((layer): layer is LoadedLayer => Boolean(layer))
    .map((layer) => ({ ...layer, data: buildFeatureCollection(layer, filters) }))
    .filter((layer) => layer.data.features.length), [filters, loadedLayers, selectedLayerMetas]);

  const sectors = useMemo(() => {
    const values = new Set<string>();
    selectedLayerMetas.forEach((layer) => {
      layer.topSectors?.forEach((sector) => values.add(sector.name.trim()));
      loadedLayers[layer.id]?.data.features.forEach((feature) => {
        const sector = getSector(feature as AnyFeature).trim();
        if (sector) values.add(sector);
      });
    });
    return [...values].sort((a, b) => a.localeCompare(b, 'ar'));
  }, [loadedLayers, selectedLayerMetas]);

  const stats = useMemo(() => {
    const features = visibleLayers.flatMap((layer) => layer.data.features as AnyFeature[]);
    const lengthKm = features.reduce((sum, feature) => sum + (Number(feature.properties?.__length_m) || 0), 0) / 1000;
    const types = new Map<string, number>();
    features.forEach((feature) => {
      const type = cleanValue(feature.properties?.__typeValue) || (lang === 'ar' ? 'غير مصنف' : 'Unclassified');
      types.set(type, (types.get(type) || 0) + 1);
    });
    const topType = [...types.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      visibleCount: features.length,
      lengthKm,
      layerCount: visibleLayers.length,
      topType: topType ? `${topType[0]} (${formatNumber(topType[1])})` : lang === 'ar' ? 'لا توجد بيانات' : 'No data'
    };
  }, [lang, visibleLayers]);

  const activeColor = activeNetwork ? networkColors[activeNetwork.id] || activeNetwork.color : '#38bdf8';
  const boundsKey = `${filters.networkId}-${filters.layerId}-${filters.query}-${filters.sector}-${stats.visibleCount}`;
  const layerOptions = useMemo<SelectOption[]>(() => [
    { value: 'all', label: lang === 'ar' ? 'كل الطبقات المتاحة' : 'All available layers', meta: formatNumber(availableLayers.length) },
    ...availableLayers.map((layer) => ({
      value: layer.id,
      label: layerLabel(layer, lang),
      meta: formatNumber(layer.featureCount)
    }))
  ], [availableLayers, lang]);
  const sectorOptions = useMemo<SelectOption[]>(() => [
    { value: 'all', label: lang === 'ar' ? 'كل القطاعات' : 'All sectors', meta: formatNumber(sectors.length) },
    ...sectors.map((sector) => ({ value: sector, label: sector }))
  ], [lang, sectors]);

  function setNetwork(networkId: string) {
    setFilters({ networkId, layerId: 'all', query: '', sector: 'all' });
  }

  return (
    <section id="map" className="section map-section">
      <SectionTitle
        eyebrow={{ ar: 'خريطة تفاعلية', en: 'Interactive map' }}
        title={{ ar: 'استكشف شبكات ومرافق العبور الجديدة', en: 'Explore New Obour utility networks' }}
        text={{ ar: 'خريطة واحدة تجمع الطبقات، البحث، الفلاتر، والإحصائيات الفورية لقراءة أسرع للموقف.', en: 'One map with layers, search, filters, and instant statistics for faster status review.' }}
      />

      <div className="map-layout smart-map-layout">
        <aside className="map-sidebar smart-map-sidebar">
          <div className="map-filter-card active-summary" style={{ '--accent': activeColor } as CSSProperties}>
            <span>{lang === 'ar' ? 'Smart Explorer' : 'Smart Explorer'}</span>
            <strong>{activeNetwork ? networkLabel(activeNetwork, lang) : lang === 'ar' ? 'عرض عام' : 'Overview'}</strong>
            <p>{lang === 'ar' ? `العناصر الظاهرة: ${formatNumber(stats.visibleCount)}` : `Visible assets: ${formatNumber(stats.visibleCount)}`}</p>
          </div>

          <div className="explorer-block">
            <label>{lang === 'ar' ? 'الشبكة' : 'Network'}</label>
            <div className="network-chip-grid">
              <button className={filters.networkId === 'all' ? 'active' : ''} onClick={() => setNetwork('all')}>
                <i style={{ background: '#8ec5ff' }} />{lang === 'ar' ? 'الكل' : 'Overview'}
              </button>
              {catalog.map((network) => (
                <button key={network.id} className={filters.networkId === network.id ? 'active' : ''} onClick={() => setNetwork(network.id)} style={{ '--accent': networkColors[network.id] || network.color } as CSSProperties}>
                  <i style={{ background: networkColors[network.id] || network.color }} />{networkShortLabel(network, lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="explorer-block">
            <label>{lang === 'ar' ? 'الطبقة' : 'Layer'}</label>
            <ExplorerSelect
              id="layer-select"
              lang={lang}
              value={filters.layerId}
              options={layerOptions}
              emptyLabel={lang === 'ar' ? 'اختيار الطبقة' : 'Select layer'}
              onChange={(layerId) => setFilters((current) => ({ ...current, layerId, sector: 'all' }))}
            />
          </div>

          <div className="explorer-block">
            <label htmlFor="map-search">{lang === 'ar' ? 'بحث ذكي' : 'Smart search'}</label>
            <input
              id="map-search"
              value={filters.query}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
              placeholder={lang === 'ar' ? 'كود، قطاع، منفذ، نوع...' : 'Code, sector, contractor, type...'}
            />
          </div>

          <div className="explorer-block">
            <label>{lang === 'ar' ? 'القطاع' : 'Sector'}</label>
            <ExplorerSelect
              id="sector-select"
              lang={lang}
              value={filters.sector}
              options={sectorOptions}
              emptyLabel={lang === 'ar' ? 'اختيار القطاع' : 'Select sector'}
              onChange={(sector) => setFilters((current) => ({ ...current, sector }))}
            />
          </div>

          <div className="explorer-stats">
            <article>
              <span>{lang === 'ar' ? 'العناصر' : 'Assets'}</span>
              <strong>{formatNumber(stats.visibleCount)}</strong>
            </article>
            <article>
              <span>{lang === 'ar' ? 'الأطوال' : 'Length'}</span>
              <strong>{formatNumber(stats.lengthKm, 1)} <small>{lang === 'ar' ? 'كم' : 'km'}</small></strong>
            </article>
            <article className="wide">
              <span>{lang === 'ar' ? 'الأكثر تكرارًا' : 'Most frequent'}</span>
              <strong>{stats.topType}</strong>
            </article>
          </div>
        </aside>

        <div className="map-shell">
          <MapContainer center={[30.27, 31.55]} zoom={13} scrollWheelZoom className="leaflet-map">
            <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {visibleLayers.map((layer) => (
              <GeoJSON
                key={`${layer.meta.id}-${lang}-${filters.query}-${filters.sector}-${layer.data.features.length}`}
                data={layer.data}
                pointToLayer={(feature, latlng) => L.circleMarker(latlng, {
                  radius: filters.networkId === 'all' ? 4 : 5.8,
                  fillColor: networkColors[layer.network.id] || layer.network.color,
                  color: '#020617',
                  weight: 1,
                  fillOpacity: 0.9
                })}
                style={() => getLayerStyle(layer.meta, layer.network, filters.networkId !== 'all')}
                onEachFeature={(feature, mapLayer) => {
                  mapLayer.bindPopup(popupHtml(feature as AnyFeature, layer.meta, layer.network, lang));
                  mapLayer.on({
                    mouseover: () => (mapLayer as L.Path).setStyle?.({ weight: 5, opacity: 1, fillOpacity: 0.22 }),
                    mouseout: () => (mapLayer as L.Path).setStyle?.(getLayerStyle(layer.meta, layer.network, filters.networkId !== 'all'))
                  });
                }}
              />
            ))}
            <BoundsController layersKey={boundsKey} layers={visibleLayers} />
          </MapContainer>

          <div className="map-floating-note">
            <strong>{loading ? (lang === 'ar' ? 'جاري تحميل الطبقات...' : 'Loading layers...') : lang === 'ar' ? 'خريطة المشروع الكاملة' : 'Full project map'}</strong>
            <span>{error || (lang === 'ar' ? 'اضغط على أي عنصر لعرض بياناته' : 'Click any asset to view details')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
