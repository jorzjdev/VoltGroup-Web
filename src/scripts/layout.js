import { site, nav, footer } from '../data/content.js';

function resolveHref(href, isSubpage) {
  if (!href) return '#';
  if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return href;
  if (href.startsWith('#')) {
    return isSubpage ? `../index.html${href}` : href;
  }
  if (href.startsWith('/pages/')) {
    return isSubpage ? href.replace('/pages/', './') : href;
  }
  if (href.startsWith('/')) return href;
  return href;
}

export function isSubpage() {
  return window.location.pathname.includes('/pages/');
}

export function renderHeader() {
  const sub = isSubpage();

  const desktopLinks = nav.main
    .map((item) => {
      const href = resolveHref(item.href, sub);

      if (item.children) {
        const children = item.children
          .map((child) => `<a href="${resolveHref(child.href, sub)}">${child.label}</a>`)
          .join('');
        return `
          <div class="nav-desktop__group">
            <a href="${href}">${item.label}</a>
            <div class="nav-desktop__dropdown">${children}</div>
          </div>`;
      }
      return `<a href="${href}">${item.label}</a>`;
    })
    .join('');

  const mobileLinks = nav.main
    .map((item) => {
      const href = resolveHref(item.href, sub);

      if (item.children) {
        const subs = item.children
          .map((child) => `<a class="mobile-menu__sub" href="${resolveHref(child.href, sub)}">${child.label}</a>`)
          .join('');
        return `<a href="${href}">${item.label}</a>${subs}`;
      }
      return `<a href="${href}">${item.label}</a>`;
    })
    .join('');

  const logoHref = sub ? '../index.html' : '/';

  const themeToggle = `
    <button type="button" class="theme-toggle" data-theme-toggle aria-pressed="false" aria-label="Включить светлую тему">
      <svg class="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
      <svg class="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    </button>`;

  return `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="logo" href="${logoHref}"><span>Вольт</span>групп</a>
        <nav class="nav-desktop" aria-label="Основная навигация">${desktopLinks}</nav>
        <div class="header-actions">
          ${themeToggle}
          <button type="button" class="btn btn--primary" data-open-discuss>Обсудить проект</button>
          <button type="button" class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div id="mobile-menu" class="mobile-menu" aria-hidden="true">
      <nav aria-label="Мобильная навигация">
        ${mobileLinks}
        <button type="button" data-open-discuss>Обсудить проект</button>
      </nav>
      <div class="mobile-menu__contacts">
        <a href="tel:${site.phone.replace(/\D/g, '')}">${site.phone}</a><br>
        <a href="mailto:${site.email}">${site.email}</a>
      </div>
    </div>`;
}

export function renderFooter() {
  const sub = isSubpage();

  const sectionLinks = footer.sections[0].links
    .map((link) => `<a href="${resolveHref(link.href, sub)}">${link.label}</a>`)
    .join('');

  const social = footer.social
    .map((s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer">${s.label}</a>`)
    .join('');

  const logoHref = sub ? '../index.html' : '/';

  return `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div class="site-footer__brand">
          <a class="logo" href="${logoHref}"><span>Вольт</span>групп</a>
          <p>${footer.tagline}</p>
          <div class="site-footer__social">${social}</div>
        </div>
        <div class="site-footer__col">
          <h4>Разделы</h4>
          ${sectionLinks}
        </div>
        <div class="site-footer__col">
          <h4>Контакты</h4>
          <a href="tel:${site.phone.replace(/\D/g, '')}">${site.phone}</a>
          <a href="mailto:${site.email}">${site.email}</a>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>${site.copyright}</span>
        <span>${site.legalName} · ИНН: ${site.inn}</span>
      </div>
    </footer>`;
}

export function renderDiscussModal() {
  return `
    <div id="discuss-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="discuss-modal-title" aria-hidden="true">
      <div class="modal__backdrop" data-close-modal></div>
      <div class="modal__dialog">
        <button type="button" class="modal__close" data-close-modal aria-label="Закрыть">×</button>
        <h2 id="discuss-modal-title" class="modal__title">Обсудить проект</h2>
        <div data-discuss-form-host="modal"></div>
      </div>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

export function mountLayout() {
  const headerEl = document.getElementById('layout');
  const footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  if (!document.getElementById('discuss-modal')) {
    document.body.insertAdjacentHTML('beforeend', renderDiscussModal());
  }
}
