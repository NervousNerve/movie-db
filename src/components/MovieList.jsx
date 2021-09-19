import React from "react";

import MovieCard from "./MovieCard";
import style from "./css/MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <div className={style.movieList}>
      {movies && movies.map((movie, i) => <MovieCard movie={movie} key={i} />)}
    </div>
  );
};

export default MovieList;
