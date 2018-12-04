export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'en',
})

const getters = {
  isAuthenticated(state) {
    return !!state.auth.token
  },
  currentUser(state) {
    return state.auth.user
  }
}

const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('auth/getProfile');
    } catch (e) {
      console.log(e);
    }

  }
}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}


