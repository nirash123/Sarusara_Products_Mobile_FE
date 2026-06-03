export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
            redirectIfLoggedIn: true,
            noAuth: true,
        },
    },
    {
        path: '/forgot-password',
        name: 'auth.login',
        component: () => import('@/views/auth/forgot-password.vue'),
        meta: {
            layout: 'full',
            redirectIfLoggedIn: true,
            noAuth: true,
        },
    },

]
