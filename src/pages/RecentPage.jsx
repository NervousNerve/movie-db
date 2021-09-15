import React from "react";

import MovieList from "../components/MovieList";
import { useRecentViews } from "../hooks/useRecentViews";

import style from "./css/CategoryPage.module.css";

const RecentPage = () => {
  const { movies } = useRecentViews();

  return (
    <div className={style.categoryPage}>
      <h2 className="color-white text-center">Viewed recently</h2>

      {movies && (
        <div className="grid-col gap-2">
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default RecentPage;
