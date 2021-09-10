import React from "react";
import { Link } from "react-router-dom";

import { smallImgUrl } from "../services/tmdb";

import style from "./css/MovieCard.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={style.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img src={smallImgUrl + movie.poster_path} className="rounded" />
      </Link>

      <div>
        <Link to={"/movies/" + movie.id} className="color-white m-0">
          {movie.title}
        </Link>
        <p className="color-dark font-size-sm m-0">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
