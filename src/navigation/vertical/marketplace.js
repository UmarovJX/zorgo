import i18n from "@/libs/i18n";
import { getLocalVar } from "@/util/localstorage-helper";
const perms = {};
JSON.parse(getLocalVar("userData")).permissions.forEach((el) => {
    perms[el.slug] = true;
});
const config = [
    {
        header: "Маркетплейс", //i18n.t('test')
    },
];

const categories = {
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
    ],
};
const compilations = {
    title: "Подборки товаров",
    icon: "GridIcon",
    children: [
        {
            title: "Подборки товаров",
            route: "compilations",
        },
    ],
};

const banners = {
    title: "Баннеры",
    icon: "ImageIcon",
    children: [
        {
            title: "Баннеры",
            route: "banners",
        },
    ],
};

const options = [
    [
        "show-dealer",
        {
            title: "Дилеры",
            route: "dealers",
            icon: "UserIcon",
        },
    ],
    ["show-category", categories],
    [
        "show-order",
        {
            title: "История заказов",
            route: "orders",
            icon: "ActivityIcon",
        },
    ],
    [
        "show-product",
        {
            title: "Товары",
            route: "products",
            icon: "DatabaseIcon",
        },
    ],
    [
        "show-promo-code",
        {
            title: "Промо коды",
            route: "promocodes",
            icon: "EditIcon",
        },
    ],
    ["show-compilation", compilations],
    ["show-banner", banners],
    [
        "show-specification",
        {
            title: "Характеристики",
            route: "specifications",
            icon: "ListIcon",
        },
    ],
    [
        "show-unit",
        {
            title: "Единицы измерения",
            route: "units",
            icon: "PackageIcon",
        },
    ],
    [
        "show-region",
        {
            title: "Регионы",
            route: "regions",
            icon: "TargetIcon",
        },
    ],
    [
        "show-city",
        {
            title: "Города",
            route: "cities",
            icon: "TargetIcon",
        },
    ],
    [
        "show-feedback",
        {
            title: "Отзывы",
            route: "feedback",
            icon: "MessageCircleIcon",
        },
    ],
];

options.forEach(([key, option]) => {
    if (perms[key]) config.push(option);
});

if (perms["update-category"])
    categories.children.push({
        title: "Позиции",
        route: "category-positions",
    });

if (perms["update-compilation"])
    compilations.children.push({
        title: "Позиции подборок",
        route: "compilation-positions",
    });

if (perms["update-banner"])
    banners.children.push({
        title: "Позиции",
        route: "banner-positions",
    });

export default config;
