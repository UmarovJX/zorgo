export default [
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/transactions/AppTransactions'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/transactions/AppClients'),
  },
  {
    path: 'view/:id',
    name: 'client-view',
    component: () => import('@/views/transactions/AppClientView'),
    meta: {
      navActiveLink: 'clients',
    },
  },

  // {
  //     path: "/marketplace/dealer",
  //     component: () => import("@/views/marketplace/dealers/id"),
  //     children: [
  //         {
  //             path: "edit/:id?",
  //             name: "dealer-edit",
  //             component: () =>
  //                 import("@/views/marketplace/dealers/AppDealerEdit"),
  //             meta: {
  //                 navActiveLink: "dealers",
  //             },
  //         },
  //     ],
  // },
];
