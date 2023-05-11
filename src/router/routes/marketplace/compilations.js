export default [
    {
        path: "/marketplace/compilations",
        name: "compilations",
        component: () =>
            import("@/views/marketplace/compilations/AppCompilations"),
    },

    {
        path: "/marketplace/compilations/positions",
        name: "compilation-positions",
        component: () =>
            import("@/views/marketplace/compilations/AppCompilationPositions"),
    },

    {
        path: "/marketplace/compilation",
        component: () => import("@/views/marketplace/compilations/id"),
        children: [
            {
                path: "edit/:id?",
                name: "compilation-edit",
                component: () =>
                    import("@/views/marketplace/compilations/AppCompilationEdit"),
                meta: {
                    navActiveLink: "compilations",
                },
            },
        ],
    },
];
