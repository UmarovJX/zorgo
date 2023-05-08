export default [
    {
        path: "/marketplace/units",
        name: "units",
        component: () => import("@/views/marketplace/units/AppUnits"),
    },

    {
        path: "/marketplace/unit",
        component: () => import("@/views/marketplace/units/id"),
        children: [
            {
                path: "edit/:id?",
                name: "unit-edit",
                component: () =>
                    import("@/views/marketplace/units/AppUnitEdit"),
                meta: {
                    navActiveLink: "units",
                },
            },
        ],
    },
];
