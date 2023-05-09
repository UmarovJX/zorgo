export default [
    {
        path: "/public-offer/public-offer",
        name: "publicoffer-po",
        component: () => import("@/views/publicOffer/Index"),
    },
    {
        path: "/public-offer/personal-data-agreement",
        name: "publicoffer-pda",
        component: () => import("@/views/publicOffer/Index"),
    },
];
