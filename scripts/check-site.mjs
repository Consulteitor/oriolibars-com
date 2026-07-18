import { readFile } from 'node:fs/promises';

const locales = ['ca', 'es', 'en'];
const pages = ['', 'contact/'];
const forbidden = ['1.500€', '2.500€/mes', '10.000€', 'Advisory mensual', 'Proyectos concretos', 'Primera mirada estratégica', '72 horas'];
const mixedLanguage = {
  ca: ['years / anys', 'projects / projectes', 'What others missed', 'Lo que parecía'],
  es: ['years / anys', 'projects / projectes', 'What it looked like', 'El que semblava'],
  en: ['years / anys', 'projects / projectes', 'Lo que parecía', 'El que semblava']
};
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
    for (const term of mixedLanguage[locale]) {
      if (html.includes(term)) fail(`${path}: barreja lingüística: ${term}`);
    }
    if (!page) {
      const decisionCount = (html.match(/class="decision"/g) || []).length;
      if (decisionCount !== 3) fail(`${path}: s'esperaven 3 decisions breus i n'hi ha ${decisionCount}`);
      if (html.includes('class="case"')) fail(`${path}: encara hi ha cards de casos`);
      const conversionCount = (html.match(/Conversió|Conversión|Conversion/g) || []).length;
      if (conversionCount > 1) fail(`${path}: massa centralitat de conversió (${conversionCount} mencions)`);
    }
  }
}

const source = await readFile('scripts/build-site.mjs', 'utf8');
for (const term of forbidden) if (source.includes(term)) fail(`oferta antiga encara present: ${term}`);
const sitemap = await readFile('sitemap.xml', 'utf8');
for (const locale of locales) for (const page of pages) {
  if (!sitemap.includes(`https://oriolibars.com/${locale}/${page}`)) fail(`sitemap: falta ${locale}/${page}`);
}
if (failures) process.exit(1);
console.log('OK: 6 pàgines, idiomes, 3 decisions breus, CRO limitat, canonicals, hreflang, metadades i sitemap.');
