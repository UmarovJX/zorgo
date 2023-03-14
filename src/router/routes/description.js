export default [
    {
        path: '/description/osago',
        name: 'description-osago',
        component: () => import("@/views/description/Index")
    },
    {
        path: '/description/kasko',
        name: 'description-kasko',
        component: () => import("@/views/description/Index")
    },
    {
        path: '/description/travel',
        name: 'description-travel',
        component: () => import("@/views/description/Index")
    },
]