import {
  hero,
  featured,
  clients,
  about,
  awards,
  services,
  portfolio,
  contacts,
  site,
} from '../data/content.js';
import { createDiscussFormMarkup } from './discuss-form.js';

export function renderHomePage() {
  const clientItems = [...clients.logos, ...clients.logos]
    .map((name) => `<div class="carousel__item">${name}</div>`)
    .join('');

  const aboutStats = about.stats
    .map(
      (s) => `
      <div>
        <div class="about__stat-value">${s.value}</div>
        <div class="about__stat-label">${s.label}</div>
        <p>${s.text}</p>
      </div>`,
    )
    .join('');

  const awardCards = awards.items
    .map(
      (a) => `
      <article class="card award-card section--fade">
        <img src="${a.image}" alt="${a.project}" loading="lazy" width="800" height="600" />
        <div class="award-card__body">
          <div class="award-card__meta">
            <span>${a.year}</span>
            <span>${a.event}</span>
            <span class="award-card__status">${a.status}</span>
          </div>
          <h3>${a.project}</h3>
          <p class="section-intro">${a.category}</p>
          <a class="btn btn--text link-arrow award-card__link" href="/pages/portfolio.html">Смотреть проект</a>
        </div>
      </article>`,
    )
    .join('');

  const serviceTabs = services.tabs
    .map(
      (tab, i) => `
      <button type="button" class="services__tab${i === 0 ? ' is-active' : ''}" data-tab="${tab.id}" role="tab" aria-selected="${i === 0}">
        ${tab.label}
      </button>`,
    )
    .join('');

  const servicePanels = services.tabs
    .map(
      (tab, i) => `
      <div class="services__panel${i === 0 ? ' is-active' : ''}" data-panel="${tab.id}" role="tabpanel">
        <div>
          <h3>${tab.title}</h3>
          <ul class="services__bullets">${tab.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          <p class="section-intro">${tab.text}</p>
          <a class="btn btn--text link-arrow" href="/pages/services.html">Подробнее</a>
        </div>
        <img src="${tab.image}" alt="${tab.title}" loading="lazy" width="700" height="500" />
      </div>`,
    )
    .join('');

  const portfolioItems = portfolio.items
    .map(
      (p) => `
      <a class="portfolio__item" href="/pages/portfolio.html">
        <img src="${p.image}" alt="${p.title}" loading="lazy" width="600" height="750" />
        <div class="portfolio__overlay">
          <span>${p.category}</span>
          <h3>${p.title}</h3>
        </div>
      </a>`,
    )
    .join('');

  return `
    <section id="hero" class="hero section--fade" style="--hero-bg: url('${hero.backgroundImage}')">
      <div class="container hero__content">
        <p class="hero__eyebrow">${hero.eyebrow}</p>
        <h1 class="hero__title">${hero.title}</h1>
        <p class="hero__stat">${hero.stat}</p>
        <p class="hero__subtitle">${hero.subtitle}</p>
        <a class="btn btn--primary" href="${hero.ctaHref}">${hero.cta}</a>
      </div>
    </section>

    <section id="featured" class="featured section section--fade">
      <div class="container featured__card">
        <img class="featured__image" src="${featured.image}" alt="${featured.title}" loading="lazy" width="1200" height="800" />
        <div>
          <p class="featured__label">${featured.label}</p>
          <h2 class="featured__title">${featured.title}</h2>
          <p class="featured__location">${featured.location}</p>
          <a class="btn btn--text link-arrow" href="/pages/portfolio.html">${featured.cta}</a>
        </div>
      </div>
    </section>

    <section id="clients" class="section section--fade">
      <div class="container">
        <h2 class="clients__title">${clients.title}</h2>
        <div class="carousel">
          <div class="carousel__track">${clientItems}</div>
        </div>
      </div>
    </section>

    <section id="about" class="section section--fade">
      <div class="container">
        <p class="section-label">${about.period}</p>
        <h2 class="section-title">${about.title}</h2>
        <p class="section-intro">${about.lead}</p>
        <div class="about__grid" style="margin-top: var(--space-lg)">
          <div>
            <h3>${about.helpTitle}</h3>
            <p class="section-intro" style="margin-top: var(--space-sm)">${about.helpText}</p>
            <div class="about__stats" style="margin-top: var(--space-lg)">${aboutStats}</div>
            <a class="btn btn--text link-arrow" href="/pages/about.html" style="margin-top: var(--space-md)">Подробнее</a>
          </div>
          <div class="about__images">
            <img src="${about.images[0]}" alt="Нижнегородская ярмарка, главное здание" loading="lazy" width="600" height="700" />
            <img src="${about.images[1]}" alt="Освещение интерьера коммерческого объекта" loading="lazy" width="400" height="500" />
            <img src="${about.images[2]}" alt="Архитектурное освещение фасада" loading="lazy" width="400" height="500" />
          </div>
        </div>
        <blockquote class="about__quote" style="margin-top: var(--space-lg)">${about.quote}</blockquote>
      </div>
    </section>

    <section id="awards" class="section section--fade">
      <div class="container">
        <h2 class="section-title">${awards.title}</h2>
        <p class="section-intro">${awards.intro}</p>
        <div class="awards__grid" style="margin-top: var(--space-lg)">${awardCards}</div>
      </div>
    </section>

    <section id="services" class="section section--fade">
      <div class="container">
        <h2 class="section-title">${services.title}</h2>
        <div class="services__tabs" role="tablist">${serviceTabs}</div>
        ${servicePanels}
      </div>
    </section>

    <section id="portfolio" class="section section--fade">
      <div class="container">
        <div class="portfolio__header">
          <div>
            <p class="section-label">${portfolio.badge}</p>
            <h2 class="section-title">${portfolio.title}</h2>
            <p class="section-intro">${portfolio.intro}</p>
          </div>
          <a class="btn btn--ghost" href="${portfolio.allLink}">${portfolio.allLabel}</a>
        </div>
        <div class="portfolio__grid">${portfolioItems}</div>
      </div>
    </section>

    <section id="quick-contact" class="quick-contact section--fade">
      <div class="container">
        <h2>${contacts.quickTitle}</h2>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="tel:${site.phone.replace(/\D/g, '')}">${site.phone}</a>
      </div>
    </section>

    <section id="contacts" class="section section--fade">
      <div class="container contacts__grid">
        <div>
          <p class="section-label">${contacts.badge}</p>
          <h2 class="section-title">${contacts.sectionTitle}</h2>
          <p class="section-intro">${contacts.intro}</p>
          <div class="contacts__stat">
            <div class="contacts__stat-value">${contacts.statLabel}</div>
            <p>${contacts.statText}</p>
          </div>
        </div>
        <div class="contacts__form-wrap">
          <h3>${contacts.formTitle}</h3>
          <div data-discuss-form-host="section"></div>
        </div>
      </div>
    </section>`;
}
