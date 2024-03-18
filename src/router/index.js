import Vue from 'vue';
import VueRouter from 'vue-router';
import isRouteAvailable from '@/util/isRouteAvailable';

import Error404 from '@/views/error/Error404.vue';
import { getLocalVar } from '@/util/localstorage-helper';

// Routes
import pages from '@/router/routes/pages';
import roles from '@/router/routes/roles';
import users from '@/router/routes/users';
import services from '@/router/routes/services';
import brands from '@/router/routes/brands';
import years from '@/router/routes/years';
import models from '@/router/routes/models';
import osago from '@/router/routes/osago';
import companies from '@/router/routes/companies';
import travel from '@/router/routes/travel';
import partners from '@/router/routes/partners';
import mainPage from '@/router/routes/mainPage';
import settings from '@/router/routes/settings';
import description from '@/router/routes/description';
import publicOffer from '@/router/routes/publicOffer';
import notifications from '@/router/routes/notifications';
import transactions from '@/router/routes/transactions';

//marketplace
import category from '@/router/routes/marketplace/categories';
import orders from '@/router/routes/marketplace/orders';
import products from '@/router/routes/marketplace/products';
import specifications from '@/router/routes/marketplace/specifications';
import units from '@/router/routes/marketplace/units';
import dealers from '@/router/routes/marketplace/dealers';
import compilations from '@/router/routes/marketplace/compilations';
import banners from '@/router/routes/marketplace/banners';
import promocodes from '@/router/routes/marketplace/promocodes';
import regions from '@/router/routes/marketplace/regions';
import cities from '@/router/routes/marketplace/cities';
import feedback from '@/router/routes/marketplace/feedback';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'services' },
    },
    ...pages,
    ...roles,
    ...users,
    ...services,
    ...brands,
    ...years,
    ...models,
    ...osago,
    ...travel,
    ...companies,
    ...partners,
    ...mainPage,
    ...description,
    ...publicOffer,
    ...settings,
    ...notifications,
    ...transactions,
    //marketplace
    ...category,
    ...orders,
    ...products,
    ...specifications,
    ...units,
    ...dealers,
    ...compilations,
    ...banners,
    ...promocodes,
    ...regions,
    ...cities,
    ...feedback,
    {
      path: '/:pathMatch(.*)',
      component: Error404,
    },
  ],
});
function getAvailableRoute() {
  const perm = JSON.parse(getLocalVar('userData')).permissions.find((el) => {
    return el.slug.startsWith('show');
  });
  console.log(perm);

  switch (perm.slug) {
    case 'show-category':
      return { name: 'categories' };
      break;
    case 'show-city':
      return { name: 'cities' };
      break;
    case 'show-company':
      return { name: 'company-index' };
      break;
    case 'show-feedback':
      return { name: 'feedback' };
      break;
    case 'show-osago':
      return { name: 'osago' };
      break;
    case 'show-public-offer':
      return { name: 'publicoffer-po' };
      break;
    case 'show-travel':
      return { name: 'travel' };
      break;
    case 'show-description':
      return { name: 'description-osago' };
      break;
    case 'show-partner':
      return { name: 'partner-index' };
      break;
    case 'show-promo-code':
      return { name: 'promocodes' };
      break;
    case 'show-section':
      return { name: 'main-page-osago' };
      break;
    default:
      return { name: perm.slug.slice(5) + 's' };
  }
}
router.beforeEach((to, from, next) => {
  const AUTH_TOKEN = localStorage.getItem('accessToken');
  if (to.name === 'auth-login') return next();
  if (AUTH_TOKEN) {
    if (to.path === '/' || !isRouteAvailable(to.name, to.params)) {
      const r = getAvailableRoute();
      console.log(r);
      return next(r);
    } else {
      return next();
    }
  } else {
    // return next({ name: "home" })
    return next({ name: 'auth-login' });
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
