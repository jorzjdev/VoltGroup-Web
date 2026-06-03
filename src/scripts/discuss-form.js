import { site } from '../data/content.js';

const STORAGE_KEY = 'voltgroup_discuss_submissions';

export function submitDiscussForm(payload) {
  // TODO: подключить API / email / Telegram
  console.log('[VoltGroup] Discuss form submission:', payload);

  const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  existing.push({ ...payload, submittedAt: new Date().toISOString() });
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  return Promise.resolve({ ok: true });
}

function getPrivacyHref() {
  return window.location.pathname.includes('/pages/')
    ? './privacy.html'
    : '/pages/privacy.html';
}

export function createDiscussFormMarkup(suffix = '') {
  const id = (name) => `discuss-${name}${suffix}`;
  return `
    <form class="discuss-form" novalidate>
      <div class="form-field">
        <label for="${id('name')}">Имя</label>
        <input id="${id('name')}" name="name" type="text" autocomplete="name" required />
        <span class="form-field__error" data-error="name"></span>
      </div>
      <div class="form-field">
        <label for="${id('phone')}">Телефон</label>
        <input id="${id('phone')}" name="phone" type="tel" inputmode="tel" placeholder="+7" required />
        <span class="form-field__error" data-error="phone"></span>
      </div>
      <div class="form-field">
        <label for="${id('city')}">Город</label>
        <input id="${id('city')}" name="city" type="text" required />
        <span class="form-field__error" data-error="city"></span>
      </div>
      <div class="form-field">
        <label for="${id('message')}">Сообщение (необязательно)</label>
        <textarea id="${id('message')}" name="message" rows="3"></textarea>
        <span class="form-field__error" data-error="message"></span>
      </div>
      <label class="form-checkbox">
        <input type="checkbox" name="consent" required />
        <span>Нажимая на кнопку, вы соглашаетесь с <a href="${getPrivacyHref()}">политикой конфиденциальности</a></span>
      </label>
      <span class="form-field__error" data-error="consent"></span>
      <button type="submit" class="btn btn--primary">Отправить</button>
    </form>`;
}

function validateForm(form) {
  const data = new FormData(form);
  const errors = {};

  const name = (data.get('name') || '').toString().trim();
  if (name.length < 2) errors.name = 'Введите имя (минимум 2 символа)';

  const phone = (data.get('phone') || '').toString().trim();
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 11) errors.phone = 'Введите корректный номер телефона';

  const city = (data.get('city') || '').toString().trim();
  if (city.length < 2) errors.city = 'Укажите город';

  if (!data.get('consent')) errors.consent = 'Необходимо согласие с политикой';

  return { valid: Object.keys(errors).length === 0, errors, payload: { name, phone, city, message: (data.get('message') || '').toString().trim() } };
}

function showErrors(form, errors) {
  form.querySelectorAll('[data-error]').forEach((el) => {
    const key = el.dataset.error;
    el.textContent = errors[key] || '';
  });
  form.querySelectorAll('input, textarea').forEach((input) => {
    const key = input.name;
    input.classList.toggle('is-invalid', Boolean(errors[key]));
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 4000);
}

export function initDiscussForms() {
  document.querySelectorAll('[data-discuss-form-host]').forEach((host) => {
    const suffix = host.dataset.discussFormHost === 'modal' ? '-modal' : '-section';
    host.innerHTML = createDiscussFormMarkup(suffix);
    const form = host.querySelector('.discuss-form');
    if (!form) return;

    const phoneInput = form.querySelector('[name="phone"]');
    phoneInput?.addEventListener('input', () => {
      let value = phoneInput.value.replace(/[^\d+]/g, '');
      if (!value.startsWith('+')) value = '+7' + value.replace(/^7/, '');
      phoneInput.value = value.slice(0, 16);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { valid, errors, payload } = validateForm(form);
      showErrors(form, errors);
      if (!valid) return;

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;

      try {
        await submitDiscussForm(payload);
        form.replaceWith(
          `<div class="form-success"><p>Спасибо! Заявка сохранена локально. Мы свяжемся с вами по ${site.phone}.</p></div>`,
        );
        showToast('Заявка сохранена локально');
        document.getElementById('discuss-modal')?.classList.remove('is-open');
        document.body.classList.remove('modal-open');
      } finally {
        btn.disabled = false;
      }
    });
  });
}

export function initDiscussModal() {
  const modal = document.getElementById('discuss-modal');
  if (!modal) return;

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const firstInput = modal.querySelector('input');
    firstInput?.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-open-discuss]').forEach((btn) => {
    btn.addEventListener('click', open);
  });

  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}
