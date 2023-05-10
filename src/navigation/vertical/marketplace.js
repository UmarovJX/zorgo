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
        title: "Категория",
        route: "categories",
        icon: "GridIcon",
    },
    {
        icon: "GridIcon",
        title: "Подкатегории",
        route: { name: "subcategories" },
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
        title: "Подборки товаров",
        route: "compilations",
        icon: "GridIcon",
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
