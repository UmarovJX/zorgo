export default [
    {
        path: '/insurance/travel',
        name: 'travel',
        component: () => import('@/views/travel/Index.vue'),
    },
    {
        path: '/insurance/travel/:id',
        name: 'travel-show',
        component: () => import('@/views/travel/Show.vue'),
        meta: {
            navActiveLink: 'travel',
        }
    }
]
