export default [
    {
        path: '/insurance/osago',
        name: 'osago',
        component: () => import('@/views/osago/Index.vue'),
    },
    {
        path: '/insurance/osago/:id',
        name: 'osago-show',
        component: () => import('@/views/osago/Show.vue'),
        meta: {
            navActiveLink: 'osago',
        }
    }

]
