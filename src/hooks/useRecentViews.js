import { useEffect, useState } from "react";

export const useRecentViews = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentViews")) || [];
    setMovies(recent);
  }, []);

  const addMovie = (movie) => {
    const recent = JSON.parse(localStorage.getItem("recentViews")) || [];
    if (recent.length >= 10) recent.pop();
    recent.unshift(movie);
    localStorage.setItem("recentViews", JSON.stringify(recent));
    setMovies(recent);
  };

  return { movies, addMovie };
};
