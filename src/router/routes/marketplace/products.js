export default [
    {
        path: '/marketplace/products',
        name: 'products',
        component: () => import('@/views/marketplace/products/AppProducts'),
    },
    {
        path: '/marketplace/product',
        component: () => import('@/views/marketplace/products/id'),
        children: [
            {
                path: 'create',
                name: 'product-create',
                component: () => import('@/views/marketplace/products/AppProductsCrud'),
                meta: {
                    parent: 'products'
                }
            },
            {
                path: 'update/:id',
                name: 'product-update',
                component: () => import('@/views/marketplace/products/AppProductsCrud'),
                meta: {
                    parent: 'products'
                }
            },

        ]
    },
]
