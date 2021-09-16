import { useEffect, useState } from "react";

const KEY = "recentViews";
const MAX_ITEMS = 10;

export const useRecentViews = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem(KEY)) || [];
    setMovies(recent);
  }, []);

  const addMovie = (movie) => {
    const recent = JSON.parse(localStorage.getItem(KEY)) || [];

    const index = recent.findIndex((val) => val.id === movie.id);
    if (index >= 0) {
      // Movie is already in list
      // Move it to the front
      recent.unshift(recent.splice(index, 1)[0]);
    } else {
      // Movie is not in list
      // If list is full, remove the oldest
      if (recent.length >= MAX_ITEMS) recent.pop();
      // Add new movie to front
      recent.unshift(movie);
    }

    localStorage.setItem("recentViews", JSON.stringify(recent));
    setMovies(recent);
  };

  return { movies, addMovie };
};
