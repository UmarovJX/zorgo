import i18n from "@/libs/i18n";
export default [
    {
        header: "Страхование", //i18n.t('test')
    },
    {
        title: "Услуги",
        route: "services",
        icon: "GridIcon",
    },
    {
        title: "Осаго",
        route: "osago",
        icon: "FileIcon",
    },
    {
        title: "Путешествие",
        route: "travel",
        icon: "FileIcon",
    },
    {
        title: "Краткое описание",
        icon: "MessageCircleIcon",
        children: [
            {
                title: "Осаго",
                route: { name: "description-osago" },
            },
            {
                title: "Каско",
                route: { name: "description-kasko" },
            },
            {
                title: "Путешествие",
                route: { name: "description-travel" },
            },
        ],
    },
    {
        title: "Оферта",
        icon: "MessageCircleIcon",
        children: [
            {
                title: "Публичная оферта",
                route: {
                    name: "publicoffer-po",
                },
            },
            {
                title: "Пользовательское соглашение",
                route: {
                    name: "publicoffer-pda",
                },
            },
        ],
    },
    {
        title: "Компании",
        route: "company-index",
        icon: "ListIcon",
    },
];
