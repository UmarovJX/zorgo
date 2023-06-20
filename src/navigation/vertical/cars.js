import perms from "@/navigation/vertical/permissionsUtil";
const config = [];
const options = [
    [
        "show-brand",
        {
            title: "Бренды",
            route: "brands",
            icon: "GridIcon",
        },
    ],
    [
        "show-model",
        {
            title: "Модели",
            route: "models",
            icon: "GridIcon",
        },
    ],
    [
        "show-year",
        {
            title: "Годы",
            route: "years",
            icon: "GridIcon",
        },
    ],
];

options.forEach(([key, option]) => {
    if (perms[key]) config.push(option);
});

if (config.length > 0)
    config.unshift({
        header: "Машины",
    });

export default config;
