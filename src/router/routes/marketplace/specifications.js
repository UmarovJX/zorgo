export default [
    {
        path: "/marketplace/specifications",
        name: "specifications",
        component: () =>
            import("@/views/marketplace/specifications/AppSpecifications"),
    },

    {
        path: "/marketplace/specification",
        component: () => import("@/views/marketplace/specifications/id"),
        children: [
            {
                path: "edit/:id?",
                name: "specification-edit",
                component: () =>
                    import(
                        "@/views/marketplace/specifications/AppSpecificationEdit"
                    ),
                meta: {
                    navActiveLink: "specifications",
                },
            },
        ],
    },
];
