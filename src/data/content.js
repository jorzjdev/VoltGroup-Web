/** Проверенные URL (npm run verify:images). Unsplash + Wikimedia Commons. */
function unsplash(id, width, height) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    q: '80',
  });
  if (height) params.set('h', String(height));
  return `https://images.unsplash.com/${id}?${params}`;
}

/** Wikimedia thumb — width 960px стабилен; для hero используйте 1920 */
function wiki(path, width = 960) {
  const filename = path.split('/').pop();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${width}px-${filename}`;
}

// Hero: Нижегородская ярмарка (Commons: Nizhny Novgorod Fair 2010.jpg)
const YARMARKA = '8/85/Nizhny_Novgorod_Fair_2010.jpg';

export const images = {
  hero: wiki(YARMARKA, 1920),
  featured: wiki(YARMARKA, 960),
  about: [
    wiki(YARMARKA, 960),
    unsplash('photo-1497366216548-37526070297c', 600, 700),
    unsplash('photo-1503387762-592deb58ef4e', 600, 700),
  ],
  awards: [
    wiki(YARMARKA, 960),
    wiki('f/fd/Main_Fair_building_in_Nizhny_Novgorod.jpg', 960),
  ],
  services: [
    unsplash('photo-1503387762-592deb58ef4e', 700, 500),
    unsplash('photo-1542314831-068cd1dbfeeb', 700, 500),
    unsplash('photo-1486406146926-c627a92ad1ab', 700, 500),
    unsplash('photo-1600607687920-4e2a09cf159d', 700, 500),
  ],
  portfolio: [
    unsplash('photo-1449824913935-59a10b8d2000', 600, 750),
    unsplash('photo-1551882547-ff40c63fe5fa', 600, 750),
    unsplash('photo-1564013799919-ab600027ffc6', 600, 750),
    unsplash('photo-1600585152915-d208bec867a1', 600, 750),
  ],
};

/** Список для автоматической проверки доступности */
export const imageUrlsToVerify = [
  images.hero,
  images.featured,
  ...images.about,
  ...images.awards,
  ...images.services,
  ...images.portfolio,
];

export const site = {
  name: 'Светотехника — Нижний',
  logoAccent: 'Светотехника',
  logoRest: ' — Нижний',
  tagline: 'Профильное светотехническое бюро в Нижнем Новгороде',
  description:
    'Проектируем и монтируем архитектурное и интерьерное освещение для жилых, коммерческих и общественных объектов Нижнего Новгорода и области.',
  phone: '+7 (831) 000-00-00',
  email: 'info@svetotehnika-nn.example',
  city: 'Нижний Новгород',
  yearFounded: '2012',
  projectsCount: '120+',
  yearsOnMarket: 13,
  teamSize: 16,
  proposalDays: 3,
  copyright: '© 2026 Светотехника — Нижний. Все права защищены.',
  legalName: 'ООО «Светотехника — Нижний»',
  inn: '0000000000',
};

export const nav = {
  main: [
    { label: 'Портфолио', href: '#portfolio', anchor: true },
    {
      label: 'Услуги',
      href: '/pages/services.html',
      children: [
        { label: 'Проектирование освещения', href: '/pages/services.html' },
        { label: 'Фасадная подсветка', href: '/pages/services.html' },
        { label: 'Поставка оборудования', href: '/pages/services.html' },
      ],
    },
    { label: 'О компании', href: '#about', anchor: true },
    { label: 'Контакты', href: '#contacts', anchor: true },
    { label: 'Блог', href: '/pages/blog.html' },
  ],
};

export const hero = {
  eyebrow: site.tagline,
  title: site.name,
  stat: `${site.projectsCount} проектов сдано`,
  subtitle: site.description,
  cta: 'Подробнее',
  ctaHref: '#about',
  backgroundImage: images.hero,
};

export const featured = {
  label: 'Проект',
  title: 'Главный ярмарочный дом',
  location: 'Нижний Новгород, Нижегородская ярмарка',
  cta: 'Подробнее',
  image: images.featured,
};

export const clients = {
  title: 'Бренды, которые уже работали с нами',
  logos: ['СтройГрад', 'Volga Home', 'NN Development', 'Канавино', 'Сормово', 'Приокский', 'Автозавод', 'Центр'],
};

export const about = {
  title: 'О компании',
  period: `[${site.yearFounded}–наст. вр.]`,
  lead: site.description,
  helpTitle: 'Чем можем помочь',
  helpText:
    'Ответственность в каждом шаге: крайних искать не придётся. Проектируем освещение фасадов, интерьеров, торговых и офисных пространств, жилых комплексов и частных домов в Нижнем Новгороде и по всей области.',
  stats: [
    {
      value: String(site.yearsOnMarket),
      label: 'лет на рынке',
      text: `Работаем с ${site.yearFounded} г. Специализируемся на архитектурном и функциональном освещении.`,
    },
    {
      value: String(site.teamSize),
      label: 'человек в штате',
      text: 'Инженеры, светодизайнеры и монтажные бригады — один контакт на весь проект.',
    },
  ],
  quote:
    'Мы создаём свет, который помогает прочесть архитектуру, а не маскирует её. Учитываем форму, ритм и пространство вокруг — от исторического центра до новых кварталов города.',
  images: images.about,
};

export const awards = {
  title: 'Награды',
  intro:
    'Наши проекты отмечены на региональных и отраслевых конкурсах. К каждому объекту относимся как к визитной карточке компании.',
  items: [
    {
      year: '2024',
      event: 'Премия «Золотой фотон»',
      status: 'Лауреаты',
      project: 'Подсветка Главного ярмарочного дома',
      category: 'Архитектурное освещение фасадов',
      image: images.awards[0],
    },
    {
      year: '2023',
      event: 'Конкурс «Свет и архитектура»',
      status: 'Номинанты',
      project: 'ЖК «На Стрелке»',
      category: 'Жилые комплексы',
      image: images.awards[1],
    },
  ],
};

export const services = {
  title: 'Услуги',
  tabs: [
    {
      id: 'design',
      label: 'Проектирование',
      title: 'Проектирование',
      bullets: [
        'Светотехнические концепции',
        'Расчёт освещённости',
        'Проектная документация',
        '3D-визуализация',
        'Подбор оборудования',
        'Монтаж',
        'Пусконаладка',
      ],
      text: 'Создаём проекты освещения, которые подчёркивают архитектуру и решают задачи бизнеса и города.',
      image: images.services[0],
    },
    {
      id: 'equipment',
      label: 'Оборудование',
      title: 'Оборудование',
      bullets: [
        'Российские производители',
        'Европа и Китай',
        'LED-решения',
        'Уличные и архитектурные светильники',
        'Свыше 20 поставщиков',
        'Гарантия до 5 лет',
      ],
      text: 'Подберём и поставим световое оборудование с запасом, чтобы не срывать сроки монтажа.',
      image: images.services[1],
    },
    {
      id: 'business',
      label: 'Бизнесу',
      title: 'Бизнесу',
      bullets: [
        'Консультации',
        'Фасадная подсветка',
        'Освещение ТРЦ и офисов',
        'Проектная документация',
        'Поставка оборудования',
        'Монтаж под ключ',
        'Сервисное обслуживание',
      ],
      text: 'Спроектируем и смонтируем освещение для торговых, офисных и промышленных объектов.',
      image: images.services[2],
    },
    {
      id: 'private',
      label: 'Частным лицам',
      title: 'Частным лицам',
      bullets: [
        'Дизайн освещения интерьера',
        'Ландшафтная подсветка',
        'Умный дом',
        'Подбор светильников',
        'Монтаж',
        'Настройка сценариев',
      ],
      text: 'Спроектируем свет для дома или квартиры. Согласуем решения с дизайнером и архитектором.',
      image: images.services[3],
    },
  ],
};

export const portfolio = {
  title: 'Портфолио',
  badge: '[Избранное]',
  intro:
    'Хороший светодизайн лаконичен и естественен. Делаем проекты, которые останутся актуальными и через годы.',
  allLink: '/pages/portfolio.html',
  allLabel: 'Все проекты',
  items: [
    { title: 'ЖК «На Стрелке»', category: 'Жилые комплексы', image: images.portfolio[0] },
    { title: 'ТРЦ «Мега»', category: 'Коммерция', image: images.portfolio[1] },
    { title: 'Бизнес-центр «Стрелка»', category: 'Офисы', image: images.portfolio[2] },
    { title: 'Коттедж «Волга»', category: 'Частные дома', image: images.portfolio[3] },
  ],
};

export const contacts = {
  quickTitle: 'Для быстрой связи',
  sectionTitle: 'Готовы обсудить ваш проект',
  badge: '[Контакты]',
  intro:
    'Менеджеры сориентируют по стоимости, покажут примеры работ в Нижнем Новгороде и ответят на вопросы.',
  statLabel: `${site.proposalDays} дня`,
  statText: 'Средний срок подготовки коммерческого предложения',
  formTitle: 'Обсудить проект',
};

export const footer = {
  tagline: 'Светотехническое бюро в Нижнем Новгороде',
  sections: [
    {
      title: 'Разделы',
      links: [
        { label: 'Проекты', href: '/pages/portfolio.html' },
        { label: 'Услуги', href: '/pages/services.html' },
        { label: 'О компании', href: '#about' },
        { label: 'Контакты', href: '#contacts' },
        { label: 'Политика', href: '/pages/privacy.html' },
      ],
    },
  ],
  social: [
    { label: 'Telegram', href: 'https://t.me/' },
    { label: 'VK', href: 'https://vk.com/' },
  ],
};

export const stub = {
  title: 'Раздел в разработке',
  text: 'Мы готовим материалы для этого раздела. Пока вы можете вернуться на главную или связаться с нами.',
  backLabel: 'На главную',
  backHref: '/',
};
