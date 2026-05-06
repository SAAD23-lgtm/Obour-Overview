# New Obour City Utilities Networks Interactive Website

Client-ready bilingual website for the New Obour City utility networks project.

## Languages
- Arabic is the default language.
- English is available from the language switcher in the top bar.

## Tech stack
- React
- TypeScript
- Vite
- Framer Motion
- Recharts
- Leaflet / React Leaflet
- Lucide Icons

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Main folders
- `src/components`: UI sections and reusable components.
- `src/context`: language context and bilingual helpers.
- `src/data`: bilingual project content, metrics, networks, gallery, and methodology.
- `src/hooks`: animation and counter helpers.
- `src/lib`: formatting utilities.
- `public/presentation`: presentation images used across the website.
- `public/data`: lightweight GeoJSON samples used by the interactive map.
- `dist`: production build output.

## Notes
The website is focused only on New Obour City. It includes client-facing website sections, embedded dashboards, interactive map filters, network-specific views, and bilingual content.
