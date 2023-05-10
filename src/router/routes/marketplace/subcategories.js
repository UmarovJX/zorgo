export default [
    {
        path: "/marketplace/subcategories",
        name: "subcategories",
        component: () => import("@/views/marketplace/subcategories/AppSubCategories"),
    },
    {
        path: "/marketplace/subcategory",
        component: () => import("@/views/marketplace/subcategories/id"),
        children: [
        
            {
                path: "edit/:id?",
                name: "subcategory-edit",
                component: () =>
                    import("@/views/marketplace/subcategories/AppSubCategoriesCrud"),
                meta: {
                    navActiveLink: "subcategories",
                },
            },
        ],
    },
];
