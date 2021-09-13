import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getMovieById } from "../services/tmdb";

import MovieList from "../components/MovieList";
import ActorCard from "../components/ActorCard";

import style from "./css/MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();
  const { data } = useQuery(["movie", id], () => getMovieById(id));

  if (!data) return null;

  return (
    <div className={`${style.moviePage} color-white`}>
      <div className={style.backdrop}>
        <img src={imgUrl.large + data.backdrop_path} />
      </div>

      <main>
        <div className={style.topSection}>
          <img src={imgUrl.small + data.poster_path} />

          <div>
            <h2 className="font-size-xxl mb-1">{data.title}</h2>

            <div className="flex flex-wrap gap-05">
              {data.genres.map((genre, i) => (
                <span key={i} className="round bg-dark px-1 py-05">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p>{data.overview}</p>

        <h3 className="text-center">Top Cast</h3>
        <ol className={style.actorList}>
          {data.credits.cast.slice(0, 9).map((actor, i) => (
            <li key={i}>
              <ActorCard actor={actor} />
            </li>
          ))}
        </ol>

        <h3 className="text-center">Recommended</h3>
        <MovieList movies={data.recommendations.results.slice(0, 8)} />
      </main>
    </div>
  );
};

export default MoviePage;
