export default [
    {
        header: 'Общее'
    },
    {
        title: 'Партнеры',
        route: 'partner-index',
        icon: 'UsersIcon',
    },
    {
        title: 'Главная страница',
        icon: 'HomeIcon',
        children: [
            {
                title: 'Осаго',
                route: {name: 'main-page-osago'}
            },
            {
                title: 'Каско',
                route: {name: 'main-page-kasko'}
            },
            {
                title: 'Путешествие',
                route: {name: 'main-page-travel'}
            },
        ]
    },
    {
        title: 'Контакты и ссылки',
        route: 'settings',
        icon: 'LinkIcon'
    }
]