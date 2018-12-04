import axios from '~/plugins/axios';

export const forgotRequest= (payload) => axios.post('/api/forgetRequest', payload);
export const login = (payload) => axios.post('/api/auth/local', payload);
export const resetPwd = ({ code, ...payload }) => {
  const headers = { Authorization: `Bearer ${code}`}
  return axios.post('/api/resetPassword', payload, { headers });
}
export const signup = (payload) => axios.post('/api/auth/local/register', payload);

export const getProfile = (token) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.get('/api/me', { headers });
}

export const updateProfile = (payload, token) => {
  const headers = { Authorization: `Bearer ${token}`}
  return axios.put('/api/me', payload, { headers });
}
