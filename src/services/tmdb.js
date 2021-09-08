const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5eed0df086924f06e5e1149ebdd2ae4c";

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

export const getNowPlaying = async () => {
  const response = await get("/movie/now_playing");
  return response.results;
};

export default { getNowPlaying };
