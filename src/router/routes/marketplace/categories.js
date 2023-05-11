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
    {
        path: "/marketplace/subcategories",
        name: "subcategories",
        component: () =>
            import("@/views/marketplace/subcategories/AppSubCategories"),
    },
    {
        path: "/marketplace/subcategory",
        component: () => import("@/views/marketplace/subcategories/id"),
        children: [
            {
                path: "edit/:id?",
                name: "subcategory-edit",
                component: () =>
                    import(
                        "@/views/marketplace/subcategories/AppSubCategoriesCrud"
                    ),
                meta: {
                    navActiveLink: "subcategories",
                },
            },
        ],
    },
    {
        path: "/marketplace/categories/position",
        name: "category-positions",
        component: () =>
            import(
                "@/views/marketplace/categoryPositions/AppCategoryPositions"
            ),
    },
];
