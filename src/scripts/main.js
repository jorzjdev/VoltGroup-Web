import '../styles/main.css';
import { initTheme, syncThemeToggleUI } from './theme.js';
import { mountLayout } from './layout.js';
import { renderHomePage } from './home-page.js';
import { initDiscussForms, initDiscussModal } from './discuss-form.js';
import { initMobileMenu } from './mobile-menu.js';
import { initServicesTabs } from './services-tabs.js';
import { initCarousels } from './carousels.js';
import { initScrollNav, initSectionFade } from './scroll-nav.js';
import { site } from '../data/content.js';

function initHome() {
  const app = document.getElementById('app');
  if (!app) return;

  initTheme();
  mountLayout();
  syncThemeToggleUI();

  const main = document.createElement('main');
  main.innerHTML = renderHomePage();
  app.appendChild(main);

  initDiscussForms();
  initDiscussModal();
  initMobileMenu();
  initServicesTabs();
  initCarousels();
  initScrollNav();
  initSectionFade();

  document.title = `${site.name} — сайт-визитка`;
}

initHome();
