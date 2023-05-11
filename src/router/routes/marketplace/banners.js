export default [
    {
        path: "/marketplace/banners",
        name: "banners",
        component: () => import("@/views/marketplace/banners/AppBanners"),
    },
    {
        path: "/marketplace/banners/positions",
        name: "banner-positions",
        component: () =>
            import("@/views/marketplace/banners/AppBannerPositions"),
    },

    {
        path: "/marketplace/banner",
        component: () => import("@/views/marketplace/banners/id"),
        children: [
            {
                path: "edit/:id?",
                name: "banner-edit",
                component: () =>
                    import("@/views/marketplace/banners/AppBannerEdit"),
                meta: {
                    navActiveLink: "banners",
                },
            },
        ],
    },
];
