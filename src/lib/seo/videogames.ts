import generated from '../data/releases.generated.json';

type Release = {
  appid: number;
  name: string | null;
  shortDescription: string | null;
  headerImage: string | null;
  developers: string[];
  publishers: string[];
  releaseDate: string | null;
  platforms: { windows?: boolean; mac?: boolean; linux?: boolean };
  storeUrl: string;
};

type Generated = { releases: Release[] };

const MONTHS: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
};

function toIsoDate(human: string | null): string | undefined {
  if (!human) return undefined;
  const m = human.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!m) return undefined;
  const mon = MONTHS[m[1].toLowerCase()];
  if (!mon) return undefined;
  return `${m[3]}-${mon}-${m[2].padStart(2, '0')}`;
}

function platformsToOs(p: Release['platforms']): string[] {
  const os: string[] = [];
  if (p?.windows) os.push('Windows');
  if (p?.mac) os.push('macOS');
  if (p?.linux) os.push('Linux');
  return os;
}

function buildOne(r: Release) {
  const developer = r.developers.length ? r.developers : r.publishers;
  const datePublished = toIsoDate(r.releaseDate);
  const operatingSystem = platformsToOs(r.platforms);

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: r.name ?? `Steam app ${r.appid}`,
    url: r.storeUrl,
    ...(r.headerImage ? { image: r.headerImage } : {}),
    ...(r.shortDescription ? { description: r.shortDescription } : {}),
    gamePlatform: ['PC'],
    ...(operatingSystem.length ? { operatingSystem } : {}),
    publisher: r.publishers.map((name) => ({ '@type': 'Organization', name })),
    developer: developer.map((name) => ({ '@type': 'Organization', name })),
    ...(datePublished ? { datePublished } : {})
  };
}

export const videoGameSchemas = (generated as Generated).releases.map(buildOne);
