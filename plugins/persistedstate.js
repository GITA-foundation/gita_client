import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({store, req, isDev}) => {
  createPersistedState({
      key: 'your_key',
      reducer: state => ({ 'auth': state.auth }),
      storage: {
        getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie||'')[key],
        // setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
        setItem: (key, value) => Cookies.set(key, value),
        removeItem: (key) => Cookies.remove(key)
      }
  })(store)
}
