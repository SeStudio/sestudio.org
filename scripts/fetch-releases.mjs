#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const configPath = resolve(repoRoot, 'src/lib/data/releases.config.ts');
const outputPath = resolve(repoRoot, 'src/lib/data/releases.generated.json');

async function readAppids() {
  const source = await readFile(configPath, 'utf8');
  const ids = [];
  const re = /appid\s*:\s*(\d+)/g;
  let m;
  while ((m = re.exec(source)) !== null) ids.push(Number(m[1]));
  if (!ids.length) throw new Error(`no appids in ${configPath}`);
  return ids;
}

async function fetchAppDetails(appid) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=us&l=en`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`appid ${appid}: HTTP ${res.status}`);
  const payload = await res.json();
  const entry = payload?.[String(appid)];
  if (!entry?.success || !entry.data) throw new Error(`appid ${appid}: no data`);
  const d = entry.data;
  return {
    appid,
    name: d.name ?? null,
    shortDescription: d.short_description ?? null,
    headerImage: d.header_image ?? null,
    capsuleImage: d.capsule_image ?? null,
    website: d.website ?? null,
    developers: Array.isArray(d.developers) ? d.developers : [],
    publishers: Array.isArray(d.publishers) ? d.publishers : [],
    releaseDate: d.release_date?.date ?? null,
    comingSoon: Boolean(d.release_date?.coming_soon),
    platforms: d.platforms ?? { windows: true, mac: false, linux: false },
    storeUrl: `https://store.steampowered.com/app/${appid}/`
  };
}

const ids = await readAppids();
console.log(`refreshing ${ids.length} appid(s): ${ids.join(', ')}`);

const entries = [];
for (const id of ids) {
  process.stdout.write(`  ${id} ... `);
  const entry = await fetchAppDetails(id);
  entries.push(entry);
  console.log(entry.name);
}

await writeFile(
  outputPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), releases: entries }, null, 2) + '\n',
  'utf8'
);
console.log(`wrote ${outputPath}`);
