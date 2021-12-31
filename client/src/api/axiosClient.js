import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'content-type': 'application/json',
  },
});

const token = JSON.parse(localStorage.getItem('token'));
axiosClient.defaults.headers.common['Authorization'] = token
  ? `Bearer ${token}`
  : '';

axios.interceptors.request.use(async (config) => {
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
