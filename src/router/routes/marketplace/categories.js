export default [
    {
        path: "/marketplace/categories",
        name: "categories",
        component: () => import("@/views/marketplace/categories/AppCategories"),
    },
    {
        path: "/marketplace/category",
        component: () => import("@/views/marketplace/categories/id"),
        children: [
        
            {
                path: "edit/:id?",
                name: "category-edit",
                component: () =>
                    import("@/views/marketplace/categories/AppCategoriesCrud"),
                meta: {
                    navActiveLink: "categories",
                },
            },
        ],
    },
];
