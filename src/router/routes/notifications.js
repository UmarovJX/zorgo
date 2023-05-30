export default [
    {
        path: "/notifications",
        name: "notifications",
        component: () => import("@/views/notifications/AppNotifications"),
    },

    {
        path: "/marketplace/notification",
        component: () => import("@/views/notifications/id"),
        children: [
            {
                path: "edit/:id?",
                name: "notification-edit",
                component: () =>
                    import("@/views/notifications/AppNotificationEdit"),
                meta: {
                    navActiveLink: "notifications",
                },
            },
        ],
    },
];
