import axiosClient from './axiosClient';

const movieApi = {
  getAll: async () => {
    const url = `/movies`;
    return await axiosClient.get(url);
  },

  getById: async (id) => {
    const url = `/movies/${id}`;
    return await axiosClient.get(url);
  },

  getByName: async (name) => {
    const url = `http://localhost:5000/api/movies/search/all?title=${name}`;
    return await axiosClient.get(url);
  },
};

export default movieApi;
