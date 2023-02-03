export default [
    {
        path: '/cars/years',
        name: 'years',
        component: () => import('@/views/years/AppYears'),
    },
    {
        path: '/cars/year',
        component: () => import('@/views/years/id'),
        children: [
            {
                path: 'create',
                name: 'year-create',
                component: () => import('@/views/years/AppYearsCrud'),
                meta: {
                    parent: 'years'
                }
            },
            {
                path: 'update/:id',
                name: 'year-update',
                component: () => import('@/views/years/AppYearsCrud'),
                meta: {
                    parent: 'years'
                }
            },

        ]
    },

]
