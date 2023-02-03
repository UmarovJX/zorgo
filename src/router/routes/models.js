export default [
    {
        path: '/cars/models',
        name: 'models',
        component: () => import('@/views/models/AppModels'),
    },
    {
        path: '/cars/model',
        component: () => import('@/views/models/id'),
        children: [
            {
                path: 'create',
                name: 'model-create',
                component: () => import('@/views/models/AppModelsCrud'),
                meta: {
                    parent: 'models'
                }
            },
            {
                path: 'update/:id',
                name: 'model-update',
                component: () => import('@/views/models/AppModelsCrud'),
                meta: {
                    parent: 'models'
                }
            },

        ]
    },

]
