import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getMovieById } from "../services/tmdb";

import MovieList from "../components/MovieList";
import ActorCard from "../components/ActorCard";

import style from "./css/MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  if (!data) return null;

  const cast = data.credits.cast;
  const movies = data.recommendations.results;

  return (
    <div className={`${style.moviePage} color-white`}>
      <div className={style.backdrop}>
        {data.backdrop_path && <img src={imgUrl.large + data.backdrop_path} />}
      </div>

      <main>
        <div className={style.topSection}>
          {data.poster_path && (
            <img src={imgUrl.small + data.poster_path} className="rounded" />
          )}

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

        {data.overview && <p>{data.overview}</p>}

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

        {movies?.length > 0 && (
          <>
            <h3 className="text-center">Recommended</h3>
            <MovieList movies={movies.slice(0, 8)} />
          </>
        )}
      </main>
    </div>
  );
};

export default MoviePage;
