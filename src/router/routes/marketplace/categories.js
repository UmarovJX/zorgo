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
                name: 'category-create',
                component: () => import('@/views/services/AppServicesCrud'),
                meta: {
                    parent: 'services'
                }
            },
            {
                path: 'update/:id',
                name: 'category-update',
                component: () => import('@/views/services/AppServicesCrud'),
                meta: {
                    parent: 'services'
                }
            },

        ]
    },

]
