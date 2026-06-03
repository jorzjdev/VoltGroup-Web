# VoltGroup-Web

Сайт-визитка компании **Вольтгрупп**. Главная страница по структуре с адаптивной вёрсткой, якорной навигацией и формой «Обсудить проект».

## Стек

- [Vite](https://vite.dev/) (vanilla JS, multi-page)
- CSS без фреймворков
- Контент в `src/data/content.js`

## Команды

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # сборка в dist/
npm run preview       # предпросмотр production-сборки
npm run verify:images # проверка доступности URL картинок из content.js
```

Заглушки изображений — в `src/data/content.js` (Unsplash + Wikimedia Commons, тема: освещение зданий).

## Темы оформления

- **Тёмная** (по умолчанию) и **светлая** — переключатель в шапке сайта.
- Выбор сохраняется в `localStorage` (`voltgroup-theme`).
- Палитры: [`src/styles/themes.css`](src/styles/themes.css).
- Ранняя инициализация без мигания: [`public/theme-init.js`](public/theme-init.js) в `<head>` всех страниц.

## Структура

| Путь | Назначение |
|------|------------|
| `index.html` | Главная страница |
| `pages/*.html` | Заглушки разделов (портфолио, услуги, блог и т.д.) |
| `src/data/content.js` | Тексты и заглушки |
| `src/scripts/` | Логика UI, форма, меню, табы |
| `src/styles/` | Стили |
| `plan/` | План реализации |

## Форма «Обсудить проект»

Сейчас работает валидация и stub-отправка (данные в `sessionStorage`, см. `submitDiscussForm` в `src/scripts/discuss-form.js`). Подключение API — позже.

## Деплой

### GitHub Pages

Сайт: **https://jorzjdev.github.io/VoltGroup-Web/**

1. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push в ветку `main` запускает [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
3. `base` в [`vite.config.js`](vite.config.js): `/VoltGroup-Web/` (имя репозитория).

Локальная проверка production-сборки:

```bash
npm run build
npm run preview
# http://localhost:4173/VoltGroup-Web/
```

Подробный план: [plan/github-pages-deploy.md](plan/github-pages-deploy.md).

### Другой статический хостинг

Для корня домена временно смените `base` на `'./'`, выполните `npm run build`, загрузите `dist/`.

## План

Подробности — в [plan/homepage-implementation.md](plan/homepage-implementation.md).
