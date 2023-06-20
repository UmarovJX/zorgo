import perms from "@/navigation/vertical/permissionsUtil";
const config = [];
const options = [
    [
        "show-role",
        {
            title: "Роли",
            route: "roles",
            icon: "GridIcon",
        },
    ],
    [
        "show-user",
        {
            title: "Сотрудники",
            route: "users",
            icon: "GridIcon",
        },
    ],
];

options.forEach(([key, option]) => {
    if (perms[key]) config.push(option);
});

if (config.length > 0)
    config.unshift({
        header: "Пользователи ",
    });

export default config;
