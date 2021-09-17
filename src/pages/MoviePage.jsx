import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getMovieById } from "../services/tmdb";

import MovieList from "../components/MovieList";
import ActorCard from "../components/ActorCard";
import { useRecentViews } from "../hooks/useRecentViews";

import style from "./css/MoviePage.module.css";
import { Link } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  const { addMovie } = useRecentViews();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  useEffect(() => {
    if (!movie) return;
    addMovie(movie);
  }, [movie]);

  if (!movie) return null;

  // Shortcuts for convenience
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
          {movie.poster_path && <img src={imgUrl.small + movie.poster_path} />}

          <div>
            <h2 className="font-size-xxl mb-1">{movie.title}</h2>

            <div className="flex flex-wrap gap-05 list-style-none pl-0 m-0">
              {movie.genres.map((genre, i) => (
                <Link
                  key={i}
                  to={"/movies/genres?genres=" + genre.id}
                  className="button round bg-dark px-1 py-05 color-white"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {movie.overview && <p>{movie.overview}</p>}

        <div className="flex flex-wrap gap-2">
          {movie.title !== movie.original_title && (
            <div>
              <label>Original title</label>
              <p className="m-0">{movie.original_title}</p>
            </div>
          )}

          {movie.release_date && (
            <div>
              <label>Release date</label>
              <p className="m-0">{movie.release_date}</p>
            </div>
          )}

          {movie.runtime && (
            <div>
              <label>Runtime</label>
              <p className="m-0">{movie.runtime} minutes</p>
            </div>
          )}

          {movie.budget > 0 && (
            <div>
              <label>Budget</label>
              <p className="m-0">
                ${movie.budget.toLocaleString(navigator.language)}
              </p>
            </div>
          )}
        </div>

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
            <MovieList movies={recommendations.slice(0, 6)} />
          </>
        )}
      </main>
    </div>
  );
};

export default MoviePage;
