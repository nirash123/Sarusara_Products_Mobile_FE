import axios from 'axios'
import config from '@/constants/config'
import Cookies from 'js-cookie'


const axiosIns = axios.create({
  baseURL: config.apiUrl,
   // withCredentials:true
})

axiosIns.interceptors.request.use(
  reqConfig => {
    // const cacheUserToken = Cookies.get('current_user_token')
    // const cacheUserToken = Cookies.get('authenticated')
    // const cacheUserToken = Cookies.get('XSRF-TOKEN')
    const cacheUserToken = Cookies.get('token')
      reqConfig.headers.credential = true


      if (cacheUserToken) {
      // eslint-disable-next-line no-param-reassign
      // reqConfig.headers.set('X-XSRF-TOKEN' ,cacheUserToken)
      // reqConfig.headers.common['X-XSRF-TOKEN'] = cacheUserToken;
      // reqConfig.headers.Authorization = `Bearer ${cacheUserToken}`
    }
    return reqConfig
  },
  error => Promise.reject(error),

    axiosIns.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 403 || error.response.status === 401){
            localStorage.removeItem('isLoggedIn')
            window.location = '/TBS' // /TBS/admin
        }

        return Promise.reject(error)
    })
)

export default axiosIns
