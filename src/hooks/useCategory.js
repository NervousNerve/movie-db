import { getNowPlaying, getPopular, getTopRated } from "../services/tmdb";

const useCategory = (name) => {
  switch (name) {
    case "now-playing":
      return {
        name,
        title: "Now Playing",
        queryFn: getNowPlaying,
      };
    case "popular":
      return {
        name,
        title: "Popular",
        queryFn: getPopular,
      };
    case "top-rated":
      return {
        name,
        title: "Top Rated",
        queryFn: getTopRated,
      };
    default:
      throw new Error("Unknown category: " + name);
  }
};

export default useCategory;
