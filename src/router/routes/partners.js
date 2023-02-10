export default [
    {
        path: '/partners/',
        name: 'partner-index',
        component: () => import('@/views/partners/Index.vue')
    },
    {
        path: '/partners/create',
        name: 'partner-create',
        component: () => import("@/views/partners/Create.vue"),
        meta: {
            navActiveLink: 'partner-index',
        }
    },
    {
        path: '/partners/:id/update',
        name: 'partner-update',
        component: () => import("@/views/partners/Update.vue"),
        meta: {
            navActiveLink: 'partner-index',
        }
    },
    {
        path: '/partners/:id',
        name: 'partner-show',
        component: () => import("@/views/partners/Show.vue"),
        meta: {
            navActiveLink: 'partner-index',
        }
    },
]