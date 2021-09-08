import React from "react";

import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center gap-1 m-1">
      {movies && movies.map((movie, i) => <MovieCard movie={movie} key={i} />)}
    </div>
  );
};

export default MovieList;
