const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5eed0df086924f06e5e1149ebdd2ae4c";

export const imgUrl = {
  small: "https://image.tmdb.org/t/p/w185",
  medium: "https://image.tmdb.org/t/p/w500",
  large: "https://image.tmdb.org/t/p/w1280",
};

const get = async (endpoint, params) => {
  params = { ...params, api_key: apiKey };

  const url =
    baseUrl +
    endpoint +
    "?" +
    Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

  const response = await fetch(url);
  return await response.json();
};

export const getMoviesByCategory = async (category, page = 1) => {
  return await get("/movie/" + category, { page });
};

export const getMoviesByGenres = async (genres = "", page = 1) => {
  return await get("/discover/movie", { page, with_genres: genres });
};

export const getMoviesByPersons = async (persons) => {
  return await get("/discover/movie", {
    with_cast: persons,
    sort_by: "popularity.desc",
  });
};

export const getMovieById = async (id) => {
  return await get("/movie/" + id, {
    append_to_response: "credits,recommendations",
  });
};

export const getGenres = async () => {
  const response = await get("/genre/movie/list");
  return response.genres;
};

export const getPersonById = async (id) => {
  return await get("/person/" + id, {
    append_to_response: "movie_credits",
  });
};

export const searchMovies = async (query = "", page = 1) => {
  return await get("/search/movie", { query, page });
};
