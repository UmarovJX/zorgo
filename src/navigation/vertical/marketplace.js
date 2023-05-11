import i18n from "@/libs/i18n";
export default [
    {
        header: "Маркетплейс", //i18n.t('test')
    },
    {
        title: "Дилеры",
        route: "dealers",
        icon: "GridIcon",
    },
    {
        title: "Категории",
        icon: "GridIcon",
        children: [
            {
                title: "Категории",
                route: "categories",
            },
            {
                title: "Подкатегории",
                route: "subcategories",
            },
            {
                title: "Позиции",
                route: "category-positions",
            },
        ],
    },

    {
        title: "История заказов",
        route: "orders",
        icon: "ActivityIcon",
    },
    {
        title: "Товары",
        route: "products",
        icon: "ActivityIcon",
    },
    {
        title: "Промо коды",
        route: "promocodes",
        icon: "ActivityIcon",
    },

    {
        title: "Подборки товаров",
        icon: "GridIcon",
        children: [
            {
                title: "Подборки товаров",
                route: "compilations",
            },
            {
                title: "Позиции подборок",
                route: "compilation-positions",
            },
        ],
    },
    {
        title: "Баннеры",
        icon: "GridIcon",
        children: [
            {
                title: "Баннеры",
                route: "banners",
            },
            {
                title: "Позиции",
                route: "banner-positions",
            },
        ],
    },

    {
        title: "Характеристики",
        route: "specifications",
        icon: "ActivityIcon",
    },
    {
        title: "Единицы измерения",
        route: "units",
        icon: "ActivityIcon",
    },
    // {
    //     title: "Осаго",
    //     route: "osago",
    //     icon: "FileIcon",
    // },
    // {
    //     title: "Путешествие",
    //     route: "travel",
    //     icon: "FileIcon",
    // },
    // {
    //     title: "Краткое описание",
    //     icon: "MessageCircleIcon",
    //     children: [
    //         {
    //             title: "Осаго",
    //             route: { name: "description-osago" },
    //         },
    //         {
    //             title: "Каско",
    //             route: { name: "description-kasko" },
    //         },
    //         {
    //             title: "Путешествие",
    //             route: { name: "description-travel" },
    //         },
    //     ],
    // },
    // {
    //     title: "Компании",
    //     route: "company-index",
    //     icon: "ListIcon",
    // },
];
