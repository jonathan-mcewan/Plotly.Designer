export function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Detect system preference
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    toggle.textContent = dark ? '☀' : '🌙';
  }

  // Initialize from system preference
  applyTheme(mq.matches);

  // Watch for system changes
  mq.addEventListener('change', e => applyTheme(e.matches));

  // Manual toggle overrides
  toggle.addEventListener('click', () => {
    const isDark = root.dataset.theme === 'dark';
    applyTheme(!isDark);
  });
}
