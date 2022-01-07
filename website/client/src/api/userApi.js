import axiosClient from './axiosClient';

const userApi = {
  login: async (user) => {
    const url = 'users/login';
    return await axiosClient.post(url, user);
  },

  register: async (user) => {
    const url = 'users/register';
    return await axiosClient.post(url, user);
  },
};

export default userApi;
