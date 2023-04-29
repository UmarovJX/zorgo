export default [
    {
        path: '/marketplace/categories',
        name: 'categories',
        component: () => import('@/views/marketplace/categories/AppCategories'),
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
                name: 'services-update',
                component: () => import('@/views/services/AppServicesCrud'),
                meta: {
                    parent: 'services'
                }
            },

        ]
    },

]
