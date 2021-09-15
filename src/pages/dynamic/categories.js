import { getNowPlaying, getPopular, getTopRated } from "../../services/tmdb";

const categories = [
  {
    name: "now-playing",
    title: "Now Playing",
    queryFn: getNowPlaying,
  },
  {
    name: "popular",
    title: "Popular",
    queryFn: getPopular,
  },
  {
    name: "top-rated",
    title: "Top Rated",
    queryFn: getTopRated,
  },
];

export default categories;
