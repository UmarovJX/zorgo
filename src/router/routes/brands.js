export default [
    {
        path: '/cars/brands',
        name: 'brands',
        component: () => import('@/views/brands/AppBrands'),
    },
    {
        path: '/cars/brand',
        component: () => import('@/views/brands/id'),
        children: [
            {
                path: 'create',
                name: 'brand-create',
                component: () => import('@/views/brands/AppBrandsCrud'),
                meta: {
                    parent: 'brands'
                }
            },
            {
                path: 'update/:id',
                name: 'brand-update',
                component: () => import('@/views/brands/AppBrandsCrud'),
                meta: {
                    parent: 'brands'
                }
            },

        ]
    },

]
