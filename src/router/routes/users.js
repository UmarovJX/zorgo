export default [
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/AppUsers'),
    },
    {
        path: '/user',
        component: () => import('@/views/users/id'),
        children: [
            {
                path: '/user/create',
                name: 'user-create',
                component: () => import('@/views/users/AppUsersCrud'),
            },
            {
                path: '/user/update/:id',
                name: 'user-update',
                component: () => import('@/views/users/AppUsersCrud'),
            },

        ]
    },

]
