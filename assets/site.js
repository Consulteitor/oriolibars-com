(() => {
  document.documentElement.classList.add('motion-ready');
  const select = document.querySelector('[data-language]');
  if (select) select.addEventListener('change', () => {
    const locale = select.value;
    try { localStorage.setItem('oriolibars-language', locale); } catch (_) {}
    const page = document.documentElement.dataset.page || '';
    location.href = `/${locale}/${page}`;
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll('.section:not(.hero)');
  if (reduced || !('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -8% 0px' });
  sections.forEach(section => observer.observe(section));
})();
