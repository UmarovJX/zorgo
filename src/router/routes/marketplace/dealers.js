export default [
    {
        path: "/marketplace/dealers",
        name: "dealers",
        component: () => import("@/views/marketplace/dealers/AppDealers"),
    },

    {
        path: "/marketplace/dealer",
        component: () => import("@/views/marketplace/dealers/id"),
        children: [
            {
                path: "edit/:id?",
                name: "dealer-edit",
                component: () =>
                    import("@/views/marketplace/dealers/AppDealerEdit"),
                meta: {
                    navActiveLink: "dealers",
                },
            },
        ],
    },
];
