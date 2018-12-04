import * as imageApi from '~/api/image'
const SET_FILE = 'SET_FILE';

const state = () => ({
  file: {},
});

const actions = {
  async upload ({ commit, state }, payload) {
    try {
      const { data } = await imageApi.uploadFile(payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
}

const mutations = {
  SET_FILE: (state, data) => {
    state.file = data
  }
}

export default {
  state,
  actions,
  mutations
}
