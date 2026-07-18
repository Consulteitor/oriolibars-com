import { readFile } from 'node:fs/promises';

const locales = ['ca', 'es', 'en'];
const pages = ['', 'contact/'];
const assetVersion = '20260718';
const forbiddenOffers = [
  '1.500€', '2.500€/mes', '10.000€', 'Advisory mensual',
  'Proyectos concretos', 'Primera mirada estratégica', '72 horas'
];
const mixedLanguage = {
  ca: ['years / anys', 'projects / projectes', 'What others missed', 'What it looked like', 'Lo que parecía'],
  es: ['years / anys', 'projects / projectes', 'What others missed', 'What it looked like', 'El que semblava'],
  en: ['years / anys', 'projects / projectes', 'What others missed', 'Lo que parecía', 'El que semblava']
};
const accessibility = {
  ca: ['Anar al contingut', 'Navegació principal', 'aria-label="Idioma"'],
  es: ['Ir al contenido', 'Navegación principal', 'aria-label="Idioma"'],
  en: ['Skip to content', 'Primary navigation', 'aria-label="Language"']
};
const structuralTokens = [
  ['<!doctype html>', 1], ['<html ', 1], ['<head>', 1],
  ['<body>', 1], ['<main ', 1], ['<footer ', 1], ['</html>', 1]
];

let failures = 0;
const fail = message => { console.error(`FAIL: ${message}`); failures += 1; };
const occurrences = (text, token) => text.split(token).length - 1;

for (const locale of locales) {
  const homePath = `${locale}/index.html`;
  const home = await readFile(homePath, 'utf8');

  for (const page of pages) {
    const path = `${locale}/${page}index.html`;
    const html = await readFile(path, 'utf8');

    for (const [token, expected] of structuralTokens) {
      const actual = occurrences(html, token);
      if (actual !== expected) fail(`${path}: ${token} apareix ${actual} vegades; s'esperava ${expected}`);
    }
    if (occurrences(html.toLowerCase(), '<!doctype') !== 1) fail(`${path}: document HTML concatenat`);
    if (!html.includes(`<html lang="${locale}"`)) fail(`${path}: lang incorrecte`);
    if (!html.includes(`rel="canonical" href="https://oriolibars.com/${locale}/${page}"`)) fail(`${path}: canonical absent`);
    for (const alternate of [...locales, 'x-default']) {
      if (!html.includes(`hreflang="${alternate}"`)) fail(`${path}: hreflang ${alternate} absent`);
    }
    if (!html.includes('<meta name="description"')) fail(`${path}: descripció absent`);
    if (!html.includes('<meta property="og:title"')) fail(`${path}: Open Graph absent`);
    if (html.includes('class="case"') || html.includes('class="cases"')) fail(`${path}: referència a les cards antigues`);
    if (html.includes('#work') || html.includes('#proof')) fail(`${path}: enllaç o àncora antiga #work/#proof`);
    for (const text of mixedLanguage[locale]) {
      if (html.includes(text)) fail(`${path}: barreja lingüística: ${text}`);
    }
    for (const text of accessibility[locale]) {
      if (!html.includes(text)) fail(`${path}: text d'accessibilitat absent: ${text}`);
    }
    for (const asset of ['site.css', 'site.js']) {
      if (!html.includes(`/assets/${asset}?v=${assetVersion}`)) fail(`${path}: versió incoherent de ${asset}`);
    }
  }

  for (const anchor of ['moments', 'approach', 'about']) {
    if (!home.includes(`id="${anchor}"`)) fail(`${homePath}: falta l'àncora #${anchor}`);
    if (!home.includes(`href="/${locale}/#${anchor}"`)) fail(`${homePath}: la navegació no enllaça #${anchor}`);
  }
  const decisionCount = occurrences(home, 'class="decision"');
  if (decisionCount !== 3) fail(`${homePath}: s'esperaven 3 decisions breus i n'hi ha ${decisionCount}`);
  const conversionCount = (home.match(/Conversió|Conversión|Conversion/g) || []).length;
  if (conversionCount > 1) fail(`${homePath}: massa centralitat de conversió (${conversionCount} mencions)`);
  if (!home.includes('class="section approach"')) fail(`${homePath}: falta la secció com treballo`);
  if (!home.includes('class="section not-fit"')) fail(`${homePath}: falta la secció de no-encaix`);
}

const source = await readFile('scripts/build-site.mjs', 'utf8');
for (const term of forbiddenOffers) {
  if (source.includes(term)) fail(`oferta antiga encara present: ${term}`);
}
if (!source.includes("{ flag:'w' }")) fail('el build no explicita el mode de sobreescriptura');

const css = await readFile('assets/site.css', 'utf8');
for (const selector of ['.cases', '.case{', '.case:hover', '.case h3', '.case dl', '.case dt', '.case dd']) {
  if (css.includes(selector)) fail(`CSS obsolet encara present: ${selector}`);
}

const sitemap = await readFile('sitemap.xml', 'utf8');
for (const locale of locales) for (const page of pages) {
  if (!sitemap.includes(`https://oriolibars.com/${locale}/${page}`)) fail(`sitemap: falta ${locale}/${page}`);
}

if (failures) process.exit(1);
console.log('OK: estructura HTML única, build idempotent, 6 pàgines, accessibilitat, idiomes, àncores, 3 decisions breus, CRO limitat, CSS net, SEO i sitemap.');
