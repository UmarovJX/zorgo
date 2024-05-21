export default [
  {
    path: '/insurance/kasko',
    name: 'kasko',
    component: () => import('@/views/kasko/Index.vue'),
  },
  {
    path: '/insurance/kasko/:id',
    name: 'kasko-show',
    component: () => import('@/views/kasko/Show.vue'),
    meta: {
      navActiveLink: 'osago',
    },
  },
];
