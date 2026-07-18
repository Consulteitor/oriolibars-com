import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://oriolibars.com';
const langs = ['ca', 'es', 'en'];
const ui = {
  ca: { skip:'Anar al contingut', primary:'Navegació principal', language:'Idioma' },
  es: { skip:'Ir al contenido', primary:'Navegación principal', language:'Idioma' },
  en: { skip:'Skip to content', primary:'Primary navigation', language:'Language' }
};

const copy = {
  ca: {
    nav:{ moments:'Quan té sentit', work:'Com treballo', proof:'Experiència', contact:'Parlem' },
    title:'Oriol Ibars — Criteri independent per a decisions digitals importants',
    description:'Ajudo CEOs i equips directius a prendre millors decisions sobre productes i negocis digitals quan equivocar-se és car.',
    eyebrow:'Assessor independent · Producte i negoci digital',
    hero:'Entro abans que una decisió digital cara es converteixi en <em>mesos de feina equivocada.</em>',
    sub:'Criteri independent per a CEOs i equips directius que han de decidir què mereix més diners, més equip —i què cal aturar.',
    signal:'25 anys · Opinió independent · Criteri no delegat',
    tensionTitle:'El problema no sempre és executar. A vegades és <em>continuar.</em>',
    tension:'Un equip pot estar ocupat, complir el roadmap i continuar resolent el problema equivocat. No omplo el roadmap. Ajudo a decidir si mereix existir.',
    momentsTitle:'Quan té sentit que entri',
    moments:[
      'Abans de comprometre una inversió digital important.',
      'Quan l’equip executa però l’impacte no apareix.',
      'Quan Product, Growth i direcció expliquen problemes diferents.',
      'Quan el roadmap és ple però no està clar què mou el negoci.',
      'Quan el CEO sospita que s’està resolent el problema equivocat.',
      'Abans d’un redisseny, una migració o una nova plataforma.',
      'Quan cal decidir què aturar, replantejar o prioritzar.',
      'Abans o després d’una inversió o due diligence.'
    ],
    approachTitle:'Arribo. Em formo una opinió. <em>Marxo.</em>',
    approach:'Parlo amb qui té alguna cosa a dir, miro les dades que importen i confronto les decisions. No munto un equip al voltant del problema ni converteixo la decisió en sis mesos de consultoria.',
    approachClose:'Quan és clar què mantenir, què aturar i què decidir, marxo. El teu equip ja sap executar.',
    offersTitle:'Dues formes de treballar',
    intervention:{
      name:'Intervenció estratègica',
      desc:'Una mirada independent davant d’una decisió digital important. Entro, aconsegueixo el context necessari i poso a prova el problema, la inversió i les prioritats actives.',
      price:'Les intervencions solen situar-se entre 20.000 i 30.000 €, segons la decisió i el context.'
    },
    advisory:{
      name:'Advisory privat',
      desc:'Una relació semestral per a decisions recurrents. No és suport il·limitat, una bossa d’hores, execució ni un CPO fraccional. Treballes directament amb mi.',
      price:'Les relacions d’advisory són semestrals i comencen en 36.000 €.'
    },
    decisionsTitle:'Algunes decisions en què he intervingut',
    labels:['El que semblava','El que estava passant','La decisió','El resultat'],
    decisions:[
      ['Retenció','El negoci creixia; no semblava urgent tocar res.','El creixement ocultava una relació feble amb el client i un futur problema de churn.','Construir una app orientada a fidelització abans que la urgència fos evident.','La retenció va entrar al centre de la decisió de producte.'],
      ['Roadmap','Faltava velocitat per executar totes les iniciatives.','El problema no era la capacitat: massa activitat competia sense una lectura comuna del negoci.','Retallar el roadmap i alinear Product, Growth i direcció sobre una sola prioritat.','Menys iniciatives. Més claredat sobre què havia de moure el negoci.'],
      ['Ecommerce','Calia portar més trànsit per vendre més.','La demanda ja hi era; el recorregut de compra estava deixant diners sobre la taula.','Arreglar la decisió de compra abans d’augmentar adquisició.','Conversió +196%; les vendes online van passar del 30% al 65%.']
    ],
    aboutTitle:'Criteri que no es delega',
    bio:'Soc Oriol Ibars. Fa 25 anys que treballo al punt on es creuen l’ambició del negoci, les decisions de producte i el comportament real dels clients. No venc hores. Tampoc reunions. Si treballem junts, treballes directament amb mi.',
    stats:[['25','anys decidint amb números davant'],['250+','projectes'],['180+','productes digitals']],
    notFitTitle:'No sempre soc la persona adequada.',
    notFit:'No soc jo si necessites execució, més mans, una agència o algú que es quedi indefinidament. Tampoc si només busques validar una decisió que ja està presa o un informe que la faci políticament presentable.',
    fitClose:'Entro quan encara hi ha alguna cosa important per decidir.',
    ctaTitle:'Quina decisió tens sobre la taula?',
    ctaBody:'Una primera conversa serveix per entendre què hi ha en joc, el cost d’equivocar-se i si té sentit que hi entri.',
    cta:'Parlem de la decisió',
    contact:{ title:'Explica’m què tens <em>sobre la taula.</em>', body:'No cal preparar cap deck. Explica’m la decisió, què hi ha en joc i per què ara. Si no soc la persona adequada, t’ho diré.', calendar:'Reservar una conversa', email:'Escriure per correu' },
    footer:'Criteri independent per a decisions digitals importants.'
  },
  es: {
    nav:{ moments:'Cuándo tiene sentido', work:'Cómo trabajo', proof:'Experiencia', contact:'Hablemos' },
    title:'Oriol Ibars — Criterio independiente para decisiones digitales importantes',
    description:'Ayudo a CEOs y equipos directivos a tomar mejores decisiones sobre productos y negocios digitales cuando equivocarse es caro.',
    eyebrow:'Asesor independiente · Producto y negocio digital',
    hero:'Entro antes de que una decisión digital cara se convierta en <em>meses de trabajo equivocado.</em>',
    sub:'Criterio independiente para CEOs y equipos directivos que deben decidir qué merece más dinero, más equipo —y qué hay que parar.',
    signal:'25 años · Opinión independiente · Criterio no delegado',
    tensionTitle:'El problema no siempre es ejecutar. A veces es <em>seguir.</em>',
    tension:'Un equipo puede estar ocupado, cumplir el roadmap y seguir resolviendo el problema equivocado. No lleno el roadmap. Ayudo a decidir si merece existir.',
    momentsTitle:'Cuándo tiene sentido que entre',
    moments:[
      'Antes de comprometer una inversión digital importante.',
      'Cuando el equipo ejecuta pero el impacto no aparece.',
      'Cuando Producto, Growth y dirección explican problemas diferentes.',
      'Cuando el roadmap está lleno pero no está claro qué mueve el negocio.',
      'Cuando el CEO sospecha que se está resolviendo el problema equivocado.',
      'Antes de un rediseño, una migración o una nueva plataforma.',
      'Cuando hay que decidir qué parar, replantear o priorizar.',
      'Antes o después de una inversión o due diligence.'
    ],
    approachTitle:'Llego. Formo una opinión. <em>Me voy.</em>',
    approach:'Hablo con quien tenga algo que decir, miro los datos que importan y confronto las decisiones. No monto un equipo alrededor del problema ni convierto la decisión en seis meses de consultoría.',
    approachClose:'Cuando está claro qué mantener, qué parar y qué decidir, me voy. Tu equipo ya sabe ejecutar.',
    offersTitle:'Dos formas de trabajar',
    intervention:{
      name:'Intervención estratégica',
      desc:'Una mirada independiente ante una decisión digital importante. Entro, consigo el contexto necesario y pongo a prueba el problema, la inversión y las prioridades activas.',
      price:'Las intervenciones suelen situarse entre 20.000 y 30.000 €, según la decisión y el contexto.'
    },
    advisory:{
      name:'Advisory privado',
      desc:'Una relación semestral para decisiones recurrentes. No es soporte ilimitado, una bolsa de horas, ejecución ni un CPO fraccional. Trabajas directamente conmigo.',
      price:'Las relaciones de advisory son semestrales y empiezan en 36.000 €.'
    },
    decisionsTitle:'Algunas decisiones en las que he intervenido',
    labels:['Lo que parecía','Lo que estaba pasando','La decisión','El resultado'],
    decisions:[
      ['Retención','El negocio crecía; no parecía urgente tocar nada.','El crecimiento ocultaba una relación débil con el cliente y un futuro problema de churn.','Construir una app orientada a fidelización antes de que la urgencia fuera evidente.','La retención entró en el centro de la decisión de producto.'],
      ['Roadmap','Faltaba velocidad para ejecutar todas las iniciativas.','El problema no era la capacidad: demasiada actividad competía sin una lectura común del negocio.','Recortar el roadmap y alinear Producto, Growth y dirección sobre una sola prioridad.','Menos iniciativas. Más claridad sobre qué debía mover el negocio.'],
      ['Ecommerce','Había que traer más tráfico para vender más.','La demanda ya estaba; el recorrido de compra estaba dejando dinero sobre la mesa.','Arreglar la decisión de compra antes de aumentar adquisición.','Conversión +196%; las ventas online pasaron del 30% al 65%.']
    ],
    aboutTitle:'Criterio que no se delega',
    bio:'Soy Oriol Ibars. Llevo 25 años trabajando en el punto donde se cruzan la ambición del negocio, las decisiones de producto y el comportamiento real de los clientes. No vendo horas. Tampoco reuniones. Si trabajamos juntos, trabajas directamente conmigo.',
    stats:[['25','años decidiendo con números delante'],['250+','proyectos'],['180+','productos digitales']],
    notFitTitle:'No siempre soy la persona adecuada.',
    notFit:'No soy yo si necesitas ejecución, más manos, una agencia o alguien que se quede indefinidamente. Tampoco si solo buscas validar una decisión ya tomada o un informe que la haga políticamente presentable.',
    fitClose:'Entro cuando todavía hay algo importante que decidir.',
    ctaTitle:'¿Qué decisión tienes sobre la mesa?',
    ctaBody:'Una primera conversación sirve para entender qué está en juego, el coste de equivocarse y si tiene sentido que entre.',
    cta:'Hablemos de la decisión',
    contact:{ title:'Cuéntame qué tienes <em>sobre la mesa.</em>', body:'No hace falta preparar ningún deck. Cuéntame la decisión, qué está en juego y por qué ahora. Si no soy la persona adecuada, te lo diré.', calendar:'Reservar una conversación', email:'Escribir por email' },
    footer:'Criterio independiente para decisiones digitales importantes.'
  },
  en: {
    nav:{ moments:'When to bring me in', work:'How I work', proof:'Experience', contact:'Let’s talk' },
    title:'Oriol Ibars — Independent judgement for important digital decisions',
    description:'I help CEOs and leadership teams make better product and digital business decisions when getting it wrong is expensive.',
    eyebrow:'Independent advisor · Product and digital business',
    hero:'I step in before an expensive digital decision becomes <em>months of work in the wrong direction.</em>',
    sub:'Independent judgement for CEOs and leadership teams deciding what deserves more money, more people —and what should stop.',
    signal:'25 years · Independent view · Judgement never delegated',
    tensionTitle:'The problem is not always execution. Sometimes it is <em>continuing.</em>',
    tension:'A team can stay busy, deliver the roadmap and still solve the wrong problem. I do not build the roadmap. I help decide whether it deserves to exist.',
    momentsTitle:'When it makes sense to bring me in',
    moments:[
      'Before committing a significant digital investment.',
      'When the team delivers but the impact does not show up.',
      'When Product, Growth and leadership describe different problems.',
      'When the roadmap is full but no one knows what moves the business.',
      'When the CEO suspects the team is solving the wrong problem.',
      'Before a redesign, migration or new platform.',
      'When you need to decide what to stop, rethink or prioritise.',
      'Before or after an investment or due diligence.'
    ],
    approachTitle:'I come in. Form a view. <em>Then leave.</em>',
    approach:'I speak to the people with something useful to say, look at the data that matters and challenge the decisions. I do not build a team around the problem or turn one decision into six months of consulting.',
    approachClose:'Once it is clear what stays, what stops and what needs deciding, I leave. Your team already knows how to execute.',
    offersTitle:'Two ways to work together',
    intervention:{
      name:'Strategic intervention',
      desc:'An independent view around an important digital decision. I come in, get the context I need and test the problem, the investment and the active priorities.',
      price:'Strategic interventions typically range from €20,000 to €30,000, depending on the decision and context.'
    },
    advisory:{
      name:'Private advisory',
      desc:'A six-month relationship for recurring decisions. It is not unlimited support, a block of hours, execution or a fractional CPO role. You work directly with me.',
      price:'Advisory relationships run for six months and start at €36,000.'
    },
    decisionsTitle:'A few decisions I have been involved in',
    labels:['What it looked like','What was really happening','The decision','The outcome'],
    decisions:[
      ['Retention','The business was growing; nothing looked urgent.','Growth was masking a weak customer relationship and a future churn problem.','Build a loyalty-focused app before the urgency became obvious.','Retention moved to the centre of the product decision.'],
      ['Roadmap','The team needed to deliver every initiative faster.','Capacity was not the issue: too much activity was competing without a shared view of the business.','Cut the roadmap and align Product, Growth and leadership around one priority.','Fewer initiatives. A clearer view of what should move the business.'],
      ['Ecommerce','More traffic was needed to drive more sales.','Demand was already there; the buying journey was leaving money on the table.','Fix the buying decision before increasing acquisition.','Conversion +196%; online sales grew from 30% to 65%.']
    ],
    aboutTitle:'Judgement that is never delegated',
    bio:'I’m Oriol Ibars. For 25 years I have worked where business ambition, product decisions and actual customer behaviour meet. I do not sell hours. Or meetings. If we work together, you work directly with me.',
    stats:[['25','years making decisions with numbers on the table'],['250+','projects'],['180+','digital products']],
    notFitTitle:'I am not always the right fit.',
    notFit:'Not if you need execution, extra hands, an agency or someone who stays indefinitely. Nor if you only want validation for a decision already made, or a report that makes it politically presentable.',
    fitClose:'I step in while there is still something important to decide.',
    ctaTitle:'What decision is on your table?',
    ctaBody:'An initial conversation is for understanding what is at stake, the cost of getting it wrong and whether it makes sense to bring me in.',
    cta:'Discuss the decision',
    contact:{ title:'Tell me what is <em>on the table.</em>', body:'No deck required. Tell me about the decision, what is at stake and why now. If I am not the right person, I will tell you.', calendar:'Book a conversation', email:'Send an email' },
    footer:'Independent judgement for important digital decisions.'
  }
};

const esc = value => String(value)
  .replaceAll('&','&amp;').replaceAll('"','&quot;')
  .replaceAll('<','&lt;').replaceAll('>','&gt;');

function alternates(path='') {
  return `${langs.map(lang => `<link rel="alternate" hreflang="${lang}" href="${origin}/${lang}/${path}">`).join('')}<link rel="alternate" hreflang="x-default" href="${origin}/en/${path}">`;
}

function nav(lang) {
  const c = copy[lang];
  return `<nav class="nav" aria-label="${ui[lang].primary}">
    <a class="brand" href="/${lang}/">Oriol Ibars</a>
    <div class="nav__links">
      <a href="/${lang}/#moments">${c.nav.moments}</a>
      <a href="/${lang}/#approach">${c.nav.work}</a>
      <a href="/${lang}/#about">${c.nav.proof}</a>
      <select class="language" data-language aria-label="${ui[lang].language}">
        ${langs.map(item => `<option value="${item}"${item===lang?' selected':''}>${item.toUpperCase()}</option>`).join('')}
      </select>
      <a class="button" href="/${lang}/contact/">${c.nav.contact} →</a>
    </div>
  </nav>`;
}

function head(lang, title, description, path='') {
  return `<!doctype html><html lang="${lang}" data-page="${path}"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${esc(title)}</title><meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${origin}/${lang}/${path}">${alternates(path)}
    <meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${origin}/${lang}/${path}">
    <meta name="twitter:card" content="summary">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter+Tight:wght@400..800&family=JetBrains+Mono:wght@500..700&display=swap">
    <link rel="stylesheet" href="/assets/site.css?v=20260718"><script defer src="/assets/site.js?v=20260718"></script>
  </head><body><a class="skip" href="#main">${ui[lang].skip}</a>${nav(lang)}`;
}

function footer(lang) {
  return `<footer class="foot"><span>© 2026 Oriol Ibars</span><span>${copy[lang].footer}</span></footer></body></html>`;
}

function home(lang) {
  const c = copy[lang];
  const decisions = c.decisions.map((item, index) => `
    <article class="decision">
      <span class="meta">0${index+1} · ${item[0]}</span>
      <dl>${c.labels.map((label, itemIndex) => `<div><dt>${label}</dt><dd>${item[itemIndex+1]}</dd></div>`).join('')}</dl>
    </article>`).join('');
  const stats = c.stats.map(item => `<div class="proof__item"><span class="proof__value">${item[0]}</span><span class="proof__label">${item[1]}</span></div>`).join('');

  return `${head(lang,c.title,c.description)}<main id="main">
    <section class="section hero">
      <p class="eyebrow"><span>§01</span><span>${c.eyebrow}</span></p>
      <h1>${c.hero}</h1>
      <div class="hero__foot"><p class="lede">${c.sub}</p><span class="hero__signal">${c.signal}</span></div>
    </section>
    <section class="section tension">
      <p class="eyebrow"><span>§02</span><span>${c.tensionTitle.replace(/<[^>]+>/g,'')}</span></p>
      <div class="split"><h2>${c.tensionTitle}</h2><p class="lede">${c.tension}</p></div>
    </section>
    <section class="section" id="moments">
      <p class="eyebrow"><span>§03</span><span>${c.momentsTitle}</span></p><h2>${c.momentsTitle}</h2>
      <ol class="moments">${c.moments.map((item,index) => `<li><span class="num">${String(index+1).padStart(2,'0')}</span><span>${item}</span></li>`).join('')}</ol>
    </section>
    <section class="section approach" id="approach">
      <p class="eyebrow"><span>§04</span><span>${c.nav.work}</span></p>
      <h2>${c.approachTitle}</h2>
      <div class="approach__copy"><p>${c.approach}</p><p class="approach__close">${c.approachClose}</p></div>
    </section>
    <section class="section" id="work">
      <p class="eyebrow"><span>§05</span><span>${c.offersTitle}</span></p><h2>${c.offersTitle}</h2>
      <div class="offers">${[c.intervention,c.advisory].map((offer,index) => `<article class="offer"><span class="num">0${index+1}</span><h3>${offer.name}</h3><p>${offer.desc}</p><p class="offer__price">${offer.price}</p></article>`).join('')}</div>
    </section>
    <section class="section decisions" id="proof">
      <p class="eyebrow"><span>§06</span><span>${c.decisionsTitle}</span></p><h2>${c.decisionsTitle}</h2>
      <div class="decisions__list">${decisions}</div>
    </section>
    <section class="section" id="about">
      <p class="eyebrow"><span>§07</span><span>${c.aboutTitle}</span></p><h2>${c.aboutTitle}</h2>
      <p class="bio">${c.bio}</p><div class="proof proof--three">${stats}</div>
    </section>
    <section class="section not-fit">
      <p class="eyebrow"><span>§08</span><span>${c.notFitTitle}</span></p><h2>${c.notFitTitle}</h2>
      <p class="not-fit__body">${c.notFit}</p><p class="not-fit__close">${c.fitClose}</p>
    </section>
    <section class="section cta">
      <p class="eyebrow"><span>§09</span><span>${c.nav.contact}</span></p><h2>${c.ctaTitle}</h2>
      <p>${c.ctaBody}</p><a class="button button--accent" href="/${lang}/contact/">${c.cta} →</a>
    </section>
  </main>${footer(lang)}`;
}

function contact(lang) {
  const c = copy[lang];
  const title = `${c.contact.title.replace(/<[^>]+>/g,'')} — Oriol Ibars`;
  return `${head(lang,title,c.contact.body,'contact/')}<main id="main">
    <section class="section page-hero cta">
      <p class="eyebrow"><span>§01</span><span>${c.nav.contact}</span></p>
      <h1>${c.contact.title}</h1><p class="lede">${c.contact.body}</p>
      <div class="contact-options">
        <a class="button button--accent" href="https://calendly.com/oriolibars/30min" target="_blank" rel="noopener">${c.contact.calendar} →</a>
        <a class="button" href="mailto:oriolibars@gmail.com">${c.contact.email}</a>
      </div>
    </section>
  </main>${footer(lang)}`;
}

for (const lang of langs) {
  await mkdir(lang,{recursive:true});
  await mkdir(`${lang}/contact`,{recursive:true});
  await writeFile(`${lang}/index.html`,home(lang));
  await writeFile(`${lang}/contact/index.html`,contact(lang));
}

await writeFile('index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Oriol Ibars</title>${alternates()}<script defer src="/assets/redirect.js"></script><noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript></head><body><p><a href="/ca/">Català</a> · <a href="/es/">Castellano</a> · <a href="/en/">English</a></p></body></html>`);
await writeFile('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${['','contact/'].flatMap(path => langs.map(lang => `<url><loc>${origin}/${lang}/${path}</loc>${langs.map(alt => `<xhtml:link rel="alternate" hreflang="${alt}" href="${origin}/${alt}/${path}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${origin}/en/${path}"/></url>`)).join('')}</urlset>`);
await writeFile('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
