import * as projectApi from '~/api/project';
import * as thirdPartyApi from '~/api/thirdParty';
import { groupSchemaForArray } from '~/assets/utils/project';

const SET_CURRENT_ONE = 'SET_CURRENT_ONE';
const SET_SCHEMA = 'SET_SCHEMA';
const state = () => ({
  current: {},
  schema: {},
  formatSchema: [],
});

const actions = {
  async createComment ({ commit, state }, payload) {
    try {
      const { data } = await projectApi.createComment(payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getByIdentity ({ commit, state }, payload) {
    try {
      const { data } = await projectApi.getByIdentity(payload);
      const items = data.items ? JSON.parse(data.items) : {};
      const result = { ...data, items };
      commit(SET_CURRENT_ONE, result);
      return result;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getHistory ({ commit, state }, payload) {
    try {
      const { data } = await projectApi.getHistory(payload);
      const items = data.items ? JSON.parse(data.items) : {};
      const result = { ...data, items };
      commit(SET_CURRENT_ONE, result);
      return result;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getCommentList ({ commit, state }, payload) {
    try {
      const { data } = await projectApi.getCommentList(payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getSchema ({ commit, state }) {
    try {
      const [schemaData, countryData] = await Promise.all([
        projectApi.getSchema(),
        thirdPartyApi.getCountries()
      ]);

      const parseSchemas = JSON.parse(schemaData.data.schema);
      const countries = countryData.data.reduce((result, { numericCode = null, name }) => {
        if (numericCode === null) return result;
        return [...result, { id: numericCode,  name }]
      }, []);

      const conbineSchemas = parseSchemas.map((s)=>{
        if (s.type === 'select' && s.name === 'jurisdiction') {
          return { ...s, values: countries };
        } else if (s.name === 'token_type') {
          return { ...s, countries };
        }
        return s;
      });
      commit(SET_SCHEMA, conbineSchemas);
      return conbineSchemas;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getMyProject ({ commit }, token) {
    try {
      const { data } = await projectApi.getMyProject(token);
      const items = data.items ? JSON.parse(data.items) : {};
      const result = { ...data, items };
      commit(SET_CURRENT_ONE, result);
      return result;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async update ({ commit, state }, payload) {
    try {
      const { data } = await projectApi.update(payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
  async getVerifiedEmails ({ commit }, payload) {
    try {
      const { data } = await projectApi.getVerifiedEmails(payload);
      return data;
    } catch ({ response }) {
      throw(response && response.data);
    }
  },
}

const mutations = {
  SET_CURRENT_ONE: (state, data) => {
    // state.current = data;
  },
  SET_SCHEMA: (state, data) => {
    // edit form will have problem
    // [vuex] Do not mutate vuex store state outside mutation handlers
    // state.schema = data;
    // state.formatSchema = groupSchemaForArray(data);
  }
}

export default {
  state,
  actions,
  mutations
}
