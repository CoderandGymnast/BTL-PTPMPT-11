import axiosClient from './axiosClient';

const genreApi = {
  getAll: async () => {
    const url = `/movies/genres/all`;
    return await axiosClient.get(url);
  },

  getByGenre: async (name) => {
    const url = `/movies/genres/${name}`;
    return await axiosClient.get(url);
  },
};

export default genreApi;
