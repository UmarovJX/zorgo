export default [
    {
        path: "/marketplace/promo-codes",
        name: "promocodes",
        component: () => import("@/views/marketplace/promocodes/AppPromocodes"),
    },

    {
        path: "/marketplace/promocode",
        component: () => import("@/views/marketplace/promocodes/id"),
        children: [
            {
                path: "edit/:id?",
                name: "promocode-edit",
                component: () =>
                    import("@/views/marketplace/promocodes/AppPromocodeEdit"),
                meta: {
                    navActiveLink: "promocodes",
                },
            },
        ],
    },
];
