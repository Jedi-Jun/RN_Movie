import axios from '.';

export const movieAPI = (query: string) => axios.get(query);

export const movieDetailAPI = (imdb_id: string) =>
  axios.get(
    `/movie_details.json?imdb_id=${imdb_id}&with_images=true&with_cast=true`,
  );
