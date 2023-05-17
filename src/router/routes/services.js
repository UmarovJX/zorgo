export default [
    {
        path: '/insurance/services',
        name: 'services',
        component: () => import('@/views/services/AppServices'),
    },
    {
        path: '/insurance/service',
        component: () => import('@/views/services/id'),
        children: [
            {
                path: 'create',
                name: 'service-create',
                component: () => import('@/views/services/AppServicesCrud'),
                meta: {
                    parent: 'services'
                }
            },
            {
                path: 'update/:id',
                name: 'service-update',
                component: () => import('@/views/services/AppServicesCrud'),
                meta: {
                    parent: 'services'
                }
            },

        ]
    },
]
