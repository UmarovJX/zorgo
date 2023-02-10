export default [
    {
        path: '/insurance/companies',
        name: 'company-index',
        component: () => import('@/views/companies/Index.vue'),
    },
    {
        path: '/insurance/companies/:id/update',
        name: 'company-update',
        component: () => import('@/views/companies/Update.vue'),
        meta: {
            navActiveLink: 'company-index',
        }
    }
]
