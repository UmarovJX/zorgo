export default [
    {
        path: "/marketplace/products",
        name: "products",
        component: () => import("@/views/marketplace/products/AppProducts"),
    },

    {
        path: "/marketplace/product",
        component: () => import("@/views/marketplace/products/id"),
        children: [
            {
                path: "edit/:id?",
                name: "product-edit",
                component: () =>
                    import("@/views/marketplace/products/AppProductEdit"),
                meta: {
                    navActiveLink: "products",
                },
            },
        ],
    },
];
