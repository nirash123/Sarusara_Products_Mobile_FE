import profile from "@/apis/modules/profile";
import ErrorMessages from '@/mixins/ErrorMessages'
import Cookies from 'js-cookie'
import router from '@/router/index'
import axios from 'axios'
import VueCookies from 'vue-cookies'



export default {
  mixins: [ErrorMessages],

  state: {
    current_user_data: null,
    authenticated:false,
  },
  mutations: {
    CLEAR_CURRENT_USER: state => {
      state.current_user_data = undefined
      state.current_user_permission = undefined
        localStorage.removeItem('isLoggedIn')
    },
    SET_CURRENT_USER_PERMISSION: (state, value) => {
      state.current_user_permission = value
    },
    SET_CURRENT_USER: (state, value) => {
      state.current_user_data = value
    },
    UPDATE_USER_INFO: (state, { displayName, photoURL }) => {
      state.current_user_data.name = displayName
      state.current_user_data.image = photoURL
    },
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },
  },
  getters: {
    isLogedIn: state => localStorage.getItem('isLoggedIn'),
    currentUser: state => state.current_user_data,
    permissions: state => state.current_user_permission,
    authenticated:state => state.authenticated

  },
  actions: {
    setCurrentUser: ({ commit }, payload) => { commit('SET_CURRENT_USER', payload) },

    async autoLogin({ commit }) {
      try {
          const cacheUserData = (await profile.getCurrentUser()).data.data
          commit('SET_CURRENT_USER', {
            user: cacheUserData,
          })
        sessionStorage.setItem('is_current_user_data', '1')
      }catch (error){
      }
    },

    async login({ commit },form) {

        const loginResponse = await profile.adminLogin(form)
        if(loginResponse.status === 200){
          localStorage.setItem('isLoggedIn', 'true')
          const cacheUserData = (await profile.getCurrentUser(form)).data.data
          localStorage.setItem('userData', JSON.stringify(cacheUserData))
          commit('SET_CURRENT_USER', {
            user: cacheUserData,
          })
          sessionStorage.setItem('is_current_user_data', '1')
           window.location = '/TBS' // /TBS/admin
           localStorage.removeItem('phone')

          // sessionStorage.setItem('is_current_user_data', '1')     

        }else {
          window.location= '/TBS'  // /TBS/admin
        }
    },


    async logout({ commit }) {
      try {
        localStorage.removeItem('isLoggedIn')
        if (window.location.pathname !== '/TBS') { // /TBS/admin
          window.location = '/TBS' // /TBS/admin
        }

      } catch (error) {
        await commit('CLEAR_CURRENT_USER')
      }
      await commit('CLEAR_CURRENT_USER')
    },


    async updateCurrentUserPhotoUrl({ commit }, newUrl) {
      commit('UPDATE_USER_INFO', {
        photoURL: newUrl,
      })
    },
  },
}
