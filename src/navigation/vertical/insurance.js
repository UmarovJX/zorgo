import i18n from '@/libs/i18n';
import { getLocalVar } from '@/util/localstorage-helper';
const perms = {};
JSON.parse(getLocalVar('userData')).permissions.forEach((el) => {
  perms[el.slug] = true;
});
const config = [];

const options = [
  [
    'show-service',
    {
      title: 'Услуги',
      route: 'services',
      icon: 'GridIcon',
    },
  ],
  [
    'show-osago',
    {
      title: 'Осаго',
      route: 'osago',
      icon: 'FileIcon',
    },
  ],
  [
    'show-travel',
    {
      title: 'Путешествие',
      route: 'travel',
      icon: 'FileIcon',
    },
  ],
  [
    'show-description',
    {
      title: 'Краткое описание',
      icon: 'MessageCircleIcon',
      children: [
        {
          title: 'Осаго',
          route: { name: 'description-osago' },
        },
        {
          title: 'Каско',
          route: { name: 'description-kasko' },
        },
        {
          title: 'Путешествие',
          route: { name: 'description-travel' },
        },
      ],
    },
  ],
  [
    'show-public-offer',
    {
      title: 'Оферта',
      icon: 'MessageCircleIcon',
      children: [
        {
          title: 'Публичная оферта',
          route: {
            name: 'publicoffer-po',
          },
        },
        {
          title: 'Пользовательское соглашение',
          route: {
            name: 'publicoffer-pda',
          },
        },
      ],
    },
  ],
  [
    'show-company',
    {
      title: 'Компании',
      route: 'company-index',
      icon: 'ListIcon',
    },
  ],
];

options.forEach(([key, option]) => {
  if (perms[key]) config.push(option);
});
if (config.length > 0) {
  config.unshift({
    header: 'Страхование', //i18n.t('test')
  });
}
config.push({
  title: 'Transactions',
  route: 'transactions',
  icon: 'ListIcon',
});
config.push({
  title: 'Clients',
  route: 'clients',
  icon: 'UsersIcon',
});
export default config;
