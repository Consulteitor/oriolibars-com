(() => {
  const supported = ['ca', 'es', 'en'];
  let locale;
  try { locale = localStorage.getItem('oriolibars-language'); } catch (_) {}
  if (!supported.includes(locale)) {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const codes = languages.map(value => String(value).toLowerCase().split('-')[0]);
    locale = codes.includes('ca') ? 'ca' : codes.includes('es') ? 'es' : 'en';
  }
  location.replace(`/${locale}/`);
})();
