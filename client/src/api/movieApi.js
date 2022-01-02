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
    const url = `movies/search/all?title=${name}`;
    return await axiosClient.get(url);
  },

  setRatingMovie: async (data) => {
    const url = `movies/rating`;
    return await axiosClient.post(url, data);
  },
};

export default movieApi;
