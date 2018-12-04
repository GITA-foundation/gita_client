import axios from '~/plugins/axios';

export const getProjects = (token) => {
  const headers = { Authorization: `Bearer ${token}`};
  return axios.get('/advance-api/projects', { headers });
}

export const getUsers = (token) => {
  const headers = { Authorization: `Bearer ${token}`};
  return axios.get('/advance-api/users', { headers });
}

export const updateProject = (token, { identity, ...payload }) => {
  const headers = { Authorization: `Bearer ${token}`};
  return axios.put(`/advance-api/projects/${identity}`, payload, { headers });

}

export const updateUser = (token, { id, ...payload }) => {
  const headers = { Authorization: `Bearer ${token}`};
  return axios.put(`/advance-api/users/${id}`, payload, { headers });

}
