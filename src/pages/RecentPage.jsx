import React from "react";

import { useRecentViews } from "../hooks/useRecentViews";
import MovieList from "../components/MovieList";

const RecentPage = () => {
  const { movies } = useRecentViews();

  return (
    <div className="container mb-1">
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
