import type { Lang } from '../context/LanguageContext';

export function formatNumber(value: number, lang: Lang, fraction = 0) {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    maximumFractionDigits: fraction,
    minimumFractionDigits: fraction
  }).format(value);
}

export function formatSmart(value: number, lang: Lang) {
  const fraction = Math.abs(value) < 10 && value % 1 !== 0 ? 2 : value % 1 !== 0 ? 1 : 0;
  return formatNumber(value, lang, fraction);
}

export function percent(value: number, lang: Lang) {
  return `${formatNumber(value, lang, 1)}%`;
}
