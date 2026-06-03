import '../styles/main.css';
import { initTheme, syncThemeToggleUI } from './theme.js';
import { mountLayout } from './layout.js';
import { initDiscussForms, initDiscussModal } from './discuss-form.js';
import { initMobileMenu } from './mobile-menu.js';
import { stub, site } from '../data/content.js';

const pageTitles = {
  portfolio: 'Портфолио',
  services: 'Услуги',
  about: 'О компании',
  contacts: 'Контакты',
  blog: 'Блог',
  privacy: 'Политика конфиденциальности',
};

function initStub() {
  const page = document.body.dataset.page || 'section';
  const title = pageTitles[page] || 'Раздел';

  initTheme();
  mountLayout();
  syncThemeToggleUI();

  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <main>
        <section class="stub-page section--fade is-visible">
          <p class="section-label">${site.name}</p>
          <h1>${title}</h1>
          <p>${stub.text}</p>
          <a class="btn btn--primary" href="../index.html">${stub.backLabel}</a>
          <button type="button" class="btn btn--ghost" data-open-discuss style="margin-top: 1rem">Обсудить проект</button>
        </section>
      </main>`;
  }

  initDiscussForms();
  initDiscussModal();
  initMobileMenu();

  document.title = `${title} — ${site.name}`;
}

initStub();
