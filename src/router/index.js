import Vue from "vue";
import VueRouter from "vue-router";

import Error404 from "@/views/error/Error404.vue";

// Routes
import pages from "@/router/routes/pages";
import roles from "@/router/routes/roles";
import users from "@/router/routes/users";
import services from "@/router/routes/services";
import dealers from "@/router/routes/dealers";
import brands from "@/router/routes/brands";
import years from "@/router/routes/years";
import models from "@/router/routes/models";
import osago from "@/router/routes/osago";
import companies from "@/router/routes/companies";
import travel from "@/router/routes/travel";
import partners from "@/router/routes/partners";
import mainPage from "@/router/routes/mainPage";
import settings from "@/router/routes/settings";
import description from "@/router/routes/description";

//marketplace
import category from "@/router/routes/marketplace/category";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {
            x: 0,
            y: 0,
        };
    },
    routes: [
        {
            path: "/",
            redirect: { name: "services" },
        },
        ...pages,
        ...roles,
        ...users,
        ...services,
        ...dealers,
        ...brands,
        ...years,
        ...models,
        ...osago,
        ...travel,
        ...companies,
        ...partners,
        ...mainPage,
        ...description,
        ...settings,
        //marketplace
        ...category,
        {
            path: "/:pathMatch(.*)",
            component: Error404,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const AUTH_TOKEN = localStorage.getItem("accessToken");
    if (to.name === "auth-login") return next();
    if (AUTH_TOKEN) {
        if (to.path === "/") {
            return next({ name: "insurance/services" });
        } else {
            return next();
        }
    } else {
        // return next({ name: "home" })
        return next({ name: "auth-login" });
    }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

export default router;
