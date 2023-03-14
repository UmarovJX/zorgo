export default [
    {
        header: 'Страхование'
    },
    {
        title: 'Услуги',
        route: 'services',
        icon: 'GridIcon'
    },
    {
        title: 'Осаго',
        route: 'osago',
        icon: 'FileIcon'
    },
    {
        title: 'Путешествие',
        route: 'travel',
        icon: 'FileIcon'
    },
    {
        title: 'Краткое описание',
        icon: 'HomeIcon',
        children: [
            {
                title: 'Осаго',
                route: {name: 'description-osago'}
            },
            {
                title: 'Каско',
                route: {name: 'description-kasko'}
            },
            {
                title: 'Путешествие',
                route: {name: 'description-travel'}
            },
        ]
    },
    {
        title: 'Компании',
        route: 'company-index',
        icon: 'ListIcon',
    },
]