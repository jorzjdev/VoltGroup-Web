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

/** Wikimedia thumb (960px — стабильно отдаётся сервером) */
function wiki(path) {
  const filename = path.split('/').pop();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/960px-${filename}`;
}

export const images = {
  hero: unsplash('photo-1480714378408-67cf0d13bc1b', 1920, 1080),
  featured: wiki('f/f1/Galeries_Lafayette,_Strasbourg_(nuit-2016).jpg'),
  about: [
    wiki('8/8b/Moscow-Bolshoi-Theare-1.jpg'),
    unsplash('photo-1497366216548-37526070297c', 600, 700),
    wiki('5/57/La_haye_mauritshuis_nuit_face.JPG'),
  ],
  awards: [
    wiki('8/8b/Moscow-Bolshoi-Theare-1.jpg'),
    wiki('5/57/La_haye_mauritshuis_nuit_face.JPG'),
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
  name: 'Вольтгрупп',
  tagline: 'Инженеры и специалисты по электромонтажу и слаботочным системам',
  description:
    'Профильная компания по проектированию и монтажу инженерных систем. Реализуем проекты под ключ.',
  phone: '+7 (800) 000-00-00',
  email: 'info@voltgroup.example',
  city: 'Москва',
  yearFounded: '2015',
  projectsCount: '150+',
  yearsOnMarket: 10,
  teamSize: 18,
  proposalDays: 3,
  copyright: '© 2026 Вольтгрупп. Все права защищены.',
  legalName: 'ООО «Вольтгрупп»',
  inn: '0000000000',
};

export const nav = {
  main: [
    { label: 'Портфолио', href: '#portfolio', anchor: true },
    {
      label: 'Услуги',
      href: '/pages/services.html',
      children: [
        { label: 'Проектирование', href: '/pages/services.html' },
        { label: 'Монтаж', href: '/pages/services.html' },
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
  title: 'БЦ «Центральный»',
  location: 'Москва, ул. Примерная, 12',
  cta: 'Подробнее',
  image: images.featured,
};

export const clients = {
  title: 'Бренды, которые уже работали с нами',
  logos: ['Альфа', 'Бета', 'Гамма', 'Дельта', 'Эпсилон', 'Зета', 'Эта', 'Тета'],
};

export const about = {
  title: 'О компании',
  period: `[${site.yearFounded}–наст. вр.]`,
  lead: site.description,
  helpTitle: 'Чем можем помочь',
  helpText:
    'Ответственность в каждом шаге: крайних искать не придётся. Проектируем и монтируем системы для жилых комплексов, коммерческих объектов, частных домов и промышленных площадок.',
  stats: [
    {
      value: String(site.yearsOnMarket),
      label: 'лет на рынке',
      text: `Существуем на рынке с ${site.yearFounded} г. Развиваем компетенции в проектировании и монтаже.`,
    },
    {
      value: String(site.teamSize),
      label: 'человек в штате',
      text: 'Один контакт закроет задачи — от проекта до сдачи объекта.',
    },
  ],
  quote:
    'Мы создаём решения, которые помогают прочесть архитектуру объекта, а не маскируют её. Учитываем форму, ритм и пространство вокруг.',
  images: images.about,
};

export const awards = {
  title: 'Награды',
  intro:
    'Делаем работы, которые отмечают на отраслевых конкурсах. К каждому проекту относимся как к публичной презентации компетенций.',
  items: [
    {
      year: '2024',
      event: 'Премия «Инженер года»',
      status: 'Лауреаты',
      project: 'ТРЦ «Север»',
      category: 'Коммерческие объекты',
      image: images.awards[0],
    },
    {
      year: '2024',
      event: 'Премия «Инженер года»',
      status: 'Номинанты',
      project: 'ЖК «Речной»',
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
        'Технические концепции',
        'Расчёт нагрузок',
        'Проектная документация',
        'Поставка оборудования',
        'Подбор аналогов',
        'Монтаж',
        'Обслуживание',
      ],
      text: 'Создаём проекты инженерных систем, которые помогут выделиться среди конкурентов и решить бизнес-задачи.',
      image: images.services[0],
    },
    {
      id: 'equipment',
      label: 'Оборудование',
      title: 'Оборудование',
      bullets: [
        'Россия',
        'Китай',
        'Европа',
        'Нестандартные решения',
        'Свыше 15 поставщиков',
        'Гарантия до 5 лет',
      ],
      text: 'Подберём оборудование для вашего проекта. Закупаем с запасом, чтобы исключить влияние брака на сроки.',
      image: images.services[1],
    },
    {
      id: 'business',
      label: 'Бизнесу',
      title: 'Бизнесу',
      bullets: [
        'Консультации',
        'Технические концепции',
        'Расчёт нагрузок',
        'Проектная документация',
        'Поставка оборудования',
        'Монтаж',
        'Обслуживание',
      ],
      text: 'Спроектируем и смонтируем системы для любого типа здания и масштаба проекта.',
      image: images.services[2],
    },
    {
      id: 'private',
      label: 'Частным лицам',
      title: 'Частным лицам',
      bullets: [
        'Технические концепции',
        'Расчёт нагрузок',
        'Проектная документация',
        'Поставка оборудования',
        'Монтаж',
        'Обслуживание',
      ],
      text: 'Спроектируем и смонтируем системы для вашего дома. Согласуем решения с архитектором.',
      image: images.services[3],
    },
  ],
};

export const portfolio = {
  title: 'Портфолио',
  badge: '[Избранное]',
  intro:
    'В нашем понимании качественный проект лаконичен и надёжен. Реализуем решения, которые останутся актуальными и через годы.',
  allLink: '/pages/portfolio.html',
  allLabel: 'Все проекты',
  items: [
    { title: 'ЖК «Высота»', category: 'Жилые комплексы', image: images.portfolio[0] },
    { title: 'БЦ «Плаза»', category: 'Коммерция', image: images.portfolio[1] },
    { title: 'Склад «Логистик»', category: 'Промышленность', image: images.portfolio[2] },
    { title: 'Коттедж «Резиденс»', category: 'Частные объекты', image: images.portfolio[3] },
  ],
};

export const contacts = {
  quickTitle: 'Для быстрой связи',
  sectionTitle: 'Готовы обсудить ваш проект',
  badge: '[Контакты]',
  intro:
    'Менеджеры сориентируют по стоимости, покажут примеры похожих работ и ответят на вопросы.',
  statLabel: `${site.proposalDays} дня`,
  statText: 'Средний срок подготовки коммерческого предложения',
  formTitle: 'Обсудить проект',
};

export const footer = {
  tagline: 'Профильная компания по инженерным системам',
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
