export default [
    {
        path: '/marketplace/orders',
        name: 'orders',
        component: () => import('@/views/marketplace/orders/AppOrders'),
    },
    {
        path: '/marketplace/orders/:id',
        name: 'order-details',
        component: ()=> import('@/views/marketplace/orders/AppOrderDetails'),
        meta: {
            navActiveLink: 'orders',
        }
    }

]
