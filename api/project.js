import axios from '~/plugins/axios';

export const createComment = ({ token, data, identity }) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.post(`/api/project/${identity}/comment`, { data }, { headers });
}

export const getMyProject = (token) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.get('/api/project/one', { headers });
}

export const getSchema = (token) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.get('/api/project/schema', { headers });
}

export const getCommentList = (payload) => axios.get(`/api/project/${payload.identity}/comment`);

export const getHistory = ({ token, projectId, historyId }) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.get(`/api/project/${projectId}/history/${historyId}`, { headers });
}
export const getHistoryList = ({ token, projectId }) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.get(`/api/project/${projectId}/history`, { headers });
}

export const getByIdentity = (payload) => axios.get(`/api/project/${payload.identity}`);

export const getList = () => axios.get('/api/project/list');


export const getVerifiedEmails = (payload) =>
  axios.get(`/api/project/${payload.identity}/verifiedEmails`);

export const update = ({ identity, token, data }) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.put(`/api/project/${identity}`, data, { headers });
}

export const uploadFile = ({ identity, token, data }) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.post(`/api/image/upload`, data, { headers });
}

export const verified = (token) =>
  axios.get(`/api/project/verified?token=${token}`);


