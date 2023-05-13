export default [
    {
        path: "/marketplace/cities",
        name: "cities",
        component: () => import("@/views/marketplace/cities/AppCities"),
    },

    {
        path: "/marketplace/city",
        component: () => import("@/views/marketplace/cities/id"),
        children: [
            {
                path: "edit/:id?",
                name: "city-edit",
                component: () =>
                    import("@/views/marketplace/cities/AppCityEdit"),
                meta: {
                    navActiveLink: "cities",
                },
            },
        ],
    },
];
