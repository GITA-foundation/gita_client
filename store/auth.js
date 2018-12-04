import * as authApi from '~/api/auth'
const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';
const state = () => ({
  user: null,
  token: null,
});

const parseUser = ({
  email = null,
  fullName = null,
  title= null,
  contact= null,
  phone = null,
  type = null,
  address = null,
  country = null,
  isVerified = false,
  role
}) => ({
  email,
  fullName,
  title,
  contact,
  phone,
  type,
  address,
  country,
  isVerified,
  role
});

const actions = {
  async forgotPwd ({ commit, state }, payload) {
    try {
      const { data } = await authApi.forgotRequest(payload);
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getProfile ({ commit, state }) {
    try {
      if (!state.token) return;
      const { data } = await authApi.getProfile(state.token);
      commit(SET_USER, data);
      return parseUser(data);
    } catch ({ response }) {
      commit(SET_USER, null);
      commit(SET_TOKEN, null);
      throw(response && response.data);
    }
  },
  async login ({ commit, state }, payload) {
    try {
      const { data: { token }} = await authApi.login(payload);
      const { data: user } = await authApi.getProfile(token);
      commit(SET_USER, user);
      commit(SET_TOKEN, token);
    } catch ({ response }) {

      throw(response && response.data);
    }
  },
  logout({ commit }) {
    commit(SET_USER, null);
    commit(SET_TOKEN, null);
  },
  async updateProfile ({ commit, state }, payload) {
    try {
      await authApi.updateProfile(payload, state.token);
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async signup ({ commit, state }, payload) {
    try {
      const { data: { token }} = await authApi.signup(payload);
      const { data: user } = await authApi.getProfile(token);
      commit(SET_TOKEN, token);
      commit(SET_USER, user);
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async resetPwd ({ commit, state }, payload) {
    try {
      const { data } = await authApi.resetPwd(payload);
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user && parseUser(user) || user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

export default {
  state,
  actions,
  mutations
}
