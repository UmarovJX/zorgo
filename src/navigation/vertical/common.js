import perms from "@/navigation/vertical/permissionsUtil";
const config = [];

const options = [
    [
        "show-partner",
        {
            title: "Партнеры",
            route: "partner-index",
            icon: "UsersIcon",
        },
    ],
    [
        "show-section",
        {
            title: "Главная страница",
            icon: "HomeIcon",
            children: [
                {
                    title: "Осаго",
                    route: { name: "main-page-osago" },
                },
                {
                    title: "Каско",
                    route: { name: "main-page-kasko" },
                },
                {
                    title: "Путешествие",
                    route: { name: "main-page-travel" },
                },
            ],
        },
    ],
    [
        "show-setting",
        {
            title: "Контакты и ссылки",
            route: "settings",
            icon: "LinkIcon",
        },
    ],
    [
        "show-notification",
        {
            title: "Уведомления",
            route: "notifications",
            icon: "MessageCircleIcon",
        },
    ],
];

options.forEach(([key, option]) => {
    if (perms[key]) config.push(option);
});

if (config.length > 0)
    config.unshift({
        header: "Общее",
    });
export default config