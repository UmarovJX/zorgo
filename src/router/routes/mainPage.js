export default [
    {
        path: '/main-page/osago',
        name: 'main-page-osago',
        component: () => import("@/views/mainPage/Index")
    },
    {
        path: '/main-page/kasko',
        name: 'main-page-kasko',
        component: () => import("@/views/mainPage/Index")
    },
    {
        path: '/main-page/travel',
        name: 'main-page-travel',
        component: () => import("@/views/mainPage/Index")
    },
]