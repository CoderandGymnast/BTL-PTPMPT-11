import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'content-type': 'application/json',
  },
});

const token = JSON.parse(localStorage.getItem('token'));
if (token != null && token !== '') {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
