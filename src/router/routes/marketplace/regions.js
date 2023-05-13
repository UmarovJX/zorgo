export default [
    {
        path: "/marketplace/regions",
        name: "regions",
        component: () => import("@/views/marketplace/regions/AppRegions"),
    },

    {
        path: "/marketplace/region",
        component: () => import("@/views/marketplace/regions/id"),
        children: [
            {
                path: "edit/:id?",
                name: "region-edit",
                component: () =>
                    import("@/views/marketplace/regions/AppRegionEdit"),
                meta: {
                    navActiveLink: "regions",
                },
            },
        ],
    },
];
