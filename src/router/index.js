import Vue from 'vue'
import VueRouter from 'vue-router'
import auth_route from "@/router/modules/auth_route";
import admin_dashboard from "@/router/modules/admin/dashboard";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        ...admin_dashboard,
        ...auth_route,
        

    ],
})

export default router
