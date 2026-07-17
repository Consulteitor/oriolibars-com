import { readFile } from 'node:fs/promises';

const locales = ['ca', 'es', 'en'];
const pages = ['', 'contact/'];
const forbidden = ['1.500€', '2.500€/mes', '10.000€', 'Advisory mensual', 'Proyectos concretos', 'Primera mirada estratégica', '72 horas'];
let failures = 0;
const fail = message => { console.error(`FAIL: ${message}`); failures += 1; };

for (const locale of locales) {
  for (const page of pages) {
    const path = `${locale}/${page}index.html`;
    const html = await readFile(path, 'utf8');
    if (!html.includes(`<html lang="${locale}"`)) fail(`${path}: lang incorrecte`);
    if (!html.includes(`rel="canonical" href="https://oriolibars.com/${locale}/${page}"`)) fail(`${path}: canonical absent`);
    for (const alternate of [...locales, 'x-default']) {
      if (!html.includes(`hreflang="${alternate}"`)) fail(`${path}: hreflang ${alternate} absent`);
    }
    if (!html.includes('<meta name="description"')) fail(`${path}: descripció absent`);
  }
}

const source = await readFile('scripts/build-site.mjs', 'utf8');
for (const term of forbidden) if (source.includes(term)) fail(`oferta antiga encara present: ${term}`);
const sitemap = await readFile('sitemap.xml', 'utf8');
for (const locale of locales) for (const page of pages) {
  if (!sitemap.includes(`https://oriolibars.com/${locale}/${page}`)) fail(`sitemap: falta ${locale}/${page}`);
}
if (failures) process.exit(1);
console.log('OK: 6 pàgines, canonicals, hreflang, metadades, sitemap i ofertes revisats.');
