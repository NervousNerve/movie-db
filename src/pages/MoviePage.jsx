import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { imgUrl, getMovieById } from "../services/tmdb";
import { useRecentViews } from "../hooks/useRecentViews";
import MovieList from "../components/MovieList";
import ActorCard from "../components/ActorCard";
import style from "./css/MoviePage.module.css";

const MAX_ACTORS = 9;
const MAX_RECOMMENDED = 10;

const MoviePage = () => {
  const { id } = useParams();
  const { addMovie } = useRecentViews();

  const { data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  useEffect(() => {
    // Save movie to "history" in local storage on page load
    if (!movie) return;
    addMovie(movie);
  }, [movie]);

  if (!movie) return null;

  // Shortcuts for convenience
  const cast = movie.credits.cast;
  const recommendations = movie.recommendations.results;

  return (
    <div className="mb-1">
      <header className={style.header}>
        {movie.backdrop_path && (
          <div className={style.backdrop}>
            <img src={imgUrl.large + movie.backdrop_path} />
          </div>
        )}

        <div className={"container"}>
          <div className={style.headerContent}>
            {movie.poster_path && (
              <img src={imgUrl.small + movie.poster_path} className="rounded" />
            )}

            <div>
              <h2 className="font-size-xxl color-white my-1">{movie.title}</h2>

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
        </div>
      </header>

      <main className="container color-white">
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
              {cast.slice(0, MAX_ACTORS).map((actor, i) => (
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
            <MovieList movies={recommendations.slice(0, MAX_RECOMMENDED)} />
          </>
        )}
      </main>
    </div>
  );
};

export default MoviePage;
