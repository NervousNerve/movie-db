import React from "react";

import style from "./css/MovieCard.module.css";

const imgUrl = "https://image.tmdb.org/t/p/w200";

const MovieCard = ({ movie }) => {
  return (
    <div className={style.movieCard}>
      <img src={imgUrl + movie.poster_path} className="rounded" />

      <div className={style.info}>
        <div className={style.rating}>
          <span className="color-white text-bold">{movie.vote_average}</span>
        </div>

        <p className="color-white m-0">{movie.title}</p>
        <p className="color-dark font-size-sm m-0">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
