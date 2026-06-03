export default {
  init(router, store) {
    router.beforeEach(async (to, _, next) => {


      if ( localStorage.getItem('isLoggedIn') === 'true' ){

        const {currentUser} = store.getters
        if (currentUser === null){
          await store.dispatch('autoLogin')
        }
      }

      const { isLogedIn } = store.getters

      if (to.meta.redirectIfLoggedIn && isLogedIn) {
        next({
          path: '/dashboard',
          replace: true,
        })
      }

      if (!to.meta.noAuth && !isLogedIn) {
        next({
          path: '/',
          replace: true,
        })
      }

      return next()
    })
  },
  computed: {



  },
}
