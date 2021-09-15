import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getMovieById } from "../services/tmdb";

import MovieList from "../components/MovieList";
import ActorCard from "../components/ActorCard";

import style from "./css/MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  if (!movie) return null;

  const cast = movie.credits.cast;
  const recommendations = movie.recommendations.results;

  return (
    <div className={`${style.moviePage} color-white`}>
      <div className={style.backdrop}>
        {movie.backdrop_path && (
          <img src={imgUrl.large + movie.backdrop_path} />
        )}
      </div>

      <main>
        <div className={style.topSection}>
          {movie.poster_path && (
            <img src={imgUrl.small + movie.poster_path} className="rounded" />
          )}

          <div>
            <h2 className="font-size-xxl mb-1">{movie.title}</h2>

            <div className="flex flex-wrap gap-05">
              {movie.genres.map((genre, i) => (
                <span key={i} className="round bg-dark px-1 py-05">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {movie.overview && <p>{movie.overview}</p>}

        {cast?.length > 0 && (
          <>
            <h3 className="text-center">Top Cast</h3>
            <ol className={style.actorList}>
              {cast.slice(0, 9).map((actor, i) => (
                <li key={i}>
                  <ActorCard actor={actor} />
                </li>
              ))}
            </ol>
          </>
        )}

        {recommendations?.length > 0 && (
          <>
            <h3 className="text-center">Recommended</h3>
            <MovieList movies={recommendations.slice(0, 8)} />
          </>
        )}
      </main>
    </div>
  );
};

export default MoviePage;
