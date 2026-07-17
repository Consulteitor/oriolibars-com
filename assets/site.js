(() => {
  const select = document.querySelector('[data-language]');
  if (!select) return;
  select.addEventListener('change', () => {
    const locale = select.value;
    try { localStorage.setItem('oriolibars-language', locale); } catch (_) {}
    const page = document.documentElement.dataset.page || '';
    location.href = `/${locale}/${page}`;
  });
})();
