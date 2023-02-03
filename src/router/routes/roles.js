export default [
    {
        path: '/roles',
        name: 'roles',
        component: () => import('@/views/roles/AppRoles'),
    },
    {
        path: '/role',
        component: () => import('@/views/roles/id'),
        children: [
            {
                path: 'create',
                name: 'role-create',
                component: () => import('@/views/roles/AppRolesCrud'),
                meta: {
                    parent: 'roles'
                }
            },
            {
                path: 'update/:id',
                name: 'role-update',
                component: () => import('@/views/roles/AppRolesCrud'),
                meta: {
                    parent: 'roles'
                }
            },

        ]
    },

]
