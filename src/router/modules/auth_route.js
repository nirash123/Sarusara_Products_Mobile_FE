export default [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/auth/login.vue'),
        meta: {
            layout: 'full',
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
