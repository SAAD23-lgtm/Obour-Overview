import { useCounter } from '../hooks/useCounter';
import { useLanguage, pick } from '../context/LanguageContext';
import { formatNumber } from '../lib/format';
import type { Localized } from '../data/content';

export default function AnimatedNumber({ value, fraction = 0, unit, suffix }: { value: number; fraction?: number; unit?: Localized; suffix?: string }) {
  const { lang } = useLanguage();
  const current = useCounter(value);

  return (
    <strong>
      {formatNumber(current, lang, fraction)}{suffix ? suffix : ''}
      {unit && <small>{pick(lang, unit)}</small>}
    </strong>
  );
}
