export const STORAGE_KEY = 'voltgroup-theme';
export const THEMES = ['dark', 'light'];

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (THEMES.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return 'dark';
}

export function applyTheme(theme) {
  const resolved = THEMES.includes(theme) ? theme : 'dark';
  document.documentElement.setAttribute('data-theme', resolved);
  return resolved;
}

export function syncThemeToggleUI(theme = getStoredTheme()) {
  const isLight = theme === 'light';
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      isLight ? 'Включить тёмную тему' : 'Включить светлую тему',
    );
    btn.classList.toggle('theme-toggle--light', isLight);
  });
}

export function toggleTheme() {
  const next = getStoredTheme() === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  applyTheme(next);
  syncThemeToggleUI(next);
  return next;
}

export function initTheme() {
  const theme = applyTheme(getStoredTheme());
  syncThemeToggleUI(theme);

  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    toggleTheme();
  });
}
