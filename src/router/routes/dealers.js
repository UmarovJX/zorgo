export default [
    {
        path: '/marketplace/dealers',
        name: 'dealers',
        component: () => import('@/views/dealers/AppDealers'),
    },
    {
        path: '/marketplace/dealer',
        component: () => import('@/views/dealers/id'),
        children: [
            {
                path: 'create',
                name: 'dealer-create',
                component: () => import('@/views/dealers/AppDealersCrud'),
                meta: {
                    parent: 'dealers'
                }
            },
            {
                path: 'update/:id',
                name: 'dealer-update',
                component: () => import('@/views/dealers/AppDealersCrud'),
                meta: {
                    parent: 'dealers'
                }
            },

        ]
    },

]
