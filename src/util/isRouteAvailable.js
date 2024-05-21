import { getLocalVar } from '@/util/localstorage-helper';

const routeToPermission = {
  notifications: ['show-notification', false],
  'notification-edit': ['create-notification', false],
  roles: ['show-role', false],
  'role-create': ['create-role', false],
  'role-update': ['update-role', false],
  users: ['show-user', false],
  'user-create': ['create-user', false],
  'user-update': ['update-user', false],
  services: ['show-service', false],
  'service-create': ['create-service', false],
  'service-update': ['update-service', false],
  brands: ['show-brand', false],
  'brand-create': ['create-brand', false],
  'brand-update': ['update-brand', false],
  years: ['show-year', false],
  'year-create': ['create-year', false],
  'year-update': ['update-year', false],
  models: ['show-model', false],
  'model-create': ['create-model', false],
  'model-update': ['update-model', false],
  osago: ['show-osago', false],
  'osago-show': ['show-osago', false],
  'company-index': ['show-company', false],
  'company-update': ['update-company', false],
  travel: ['show-travel', false],
  'travel-show': ['show-travel', false],
  'partner-index': ['show-partner', false],
  'partner-show': ['show-partner', false],
  'partner-create': ['create-partner', false],
  'partner-update': ['update-partner', false],
  'main-page-osago': ['show-section', false],
  'main-page-kasko': ['show-section', false],
  'main-page-travel': ['show-section', false],
  settings: ['show-setting', false],
  'description-osago': ['show-description', false],
  'description-kasko': ['show-description', false],
  'description-travel': ['show-description', false],
  'publicoffer-po': ['show-public-offer', false],
  'publicoffer-pda': ['show-public-offer', false],
  categories: ['show-category', false],
  'category-edit': ['category', true],
  subcategories: ['show-category', false],
  'subcategory-edit': ['category', true],
  'category-positions': ['update-category', false],
  orders: ['show-order', false],
  'order-details': ['show-order', false],
  products: ['show-product', false],
  'product-edit': ['product', true],
  specifications: ['show-specification', false],
  'specification-edit': ['specification', true],
  units: ['show-unit', false],
  'unit-edit': ['unit', true],
  dealers: ['show-dealer', false],
  'dealer-edit': ['dealer', true],
  compilations: ['show-compilation', false],
  'compilation-edit': ['compilation', true],
  'compilation-positions': ['update-compilation', false],
  banners: ['show-banner', false],
  'banner-edit': ['banner', true],
  'banner-positions': ['update-banner', false],
  promocodes: ['show-promo-code', false],
  'promocode-edit': ['promo-code', true],
  regions: ['show-region', false],
  'region-edit': ['region', true],
  cities: ['show-city', false],
  'city-edit': ['city', true],
  feedback: ['show-feedback', false],

  transactions: ['show-wallet-transaction', false],
  clients: ['show-client', false],
  'client-view': ['show-client', false],
  kasko: ['show-kasko', false],
  'kasko-show': ['show-kasko', false],
};

export default function isRouteAvailable(name, params) {
  if (name === 'auth-login') return true;
  const perms = JSON.parse(getLocalVar('userData'))?.permissions || [];
  const [tag, needParams] = routeToPermission[name];
  if (!needParams) {
    return perms.some((el) => el.slug === tag);
  } else {
    if (params && params.id) {
      return perms.some((el) => el.slug === 'update-' + tag);
    } else {
      return perms.some((el) => el.slug === 'create-' + tag);
    }
  }
}
