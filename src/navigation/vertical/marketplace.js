import i18n from "@/libs/i18n";
export default [
    {
        header: "Маркетплейс", //i18n.t('test')
    },
    {
        title: "Дилеры",
        route: "dealers",
        icon: "UserIcon",
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
        icon: "DatabaseIcon",
    },
    {
        title: "Промо коды",
        route: "promocodes",
        icon: "EditIcon",
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
        icon: "ImageIcon",
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
        icon: "ListIcon",
    },
    {
        title: "Единицы измерения",
        route: "units",
        icon: "PackageIcon",
    },
    {
        title: "Регионы",
        route: "regions",
        icon: "TargetIcon",
    },
    {
        title: "Города",
        route: "cities",
        icon: "TargetIcon",
    },
    {
        title: "Отзывы",
        route: "feedback",
        icon: "MessageCircleIcon",
    },
];
