import axios from '~/plugins/axios';

export const uploadFile = ({ formData, token }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
  return axios.post(`/api/image/upload`, formData, { headers });
}
