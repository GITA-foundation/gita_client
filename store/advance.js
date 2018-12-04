import * as advanceApi from '~/api/advance';

const state = () => ({
  users: [],
  projects: [],
});

const actions = {
  async getProjects ({ commit }, token) {
    try {
      const { data } = await advanceApi.getProjects(token);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getUsers ({ commit }, token) {
    try {
      const { data } = await advanceApi.getUsers(token);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async updateProject ({ commit, state }, { token, ...payload }) {
    try {
      const { data } = await advanceApi.updateProject(token, payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async updateUser ({ commit, state }, { token, ...payload }) {
    try {
      const { data } = await advanceApi.updateUser(token, payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
}


export default {
  state,
  actions,
}
