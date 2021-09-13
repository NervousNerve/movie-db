import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getGenres, getMoviesByGenres } from "../services/tmdb";
import { CommaNumberArrayParam } from "../util/CommaNumberArrayParam";

import style from "./css/GenresPage.module.css";

const GenresPage = () => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const [genres, setGenres] = useQueryParam(
    "genres",
    withDefault(CommaNumberArrayParam, [])
  );

  const { data: allGenres } = useQuery(["genres"], () => getGenres(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const { data: movies } = useQuery(
    ["movies", "genres", genres.join(","), page],
    () => getMoviesByGenres(page, genres.join(",")),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  );

  const handleClickGenre = (id) => {
    if (genres.includes(id)) {
      setGenres(genres.filter((val) => val !== id));
    } else {
      setGenres([...genres, id]);
    }
    setPage(1);
  };

  return (
    <div className={style.genresPage}>
      <h2 className="color-white text-center">Genres</h2>

      <ul className="flex flex-wrap gap-05 list-style-none pl-0 color-white">
        {allGenres &&
          allGenres.map((genre, i) => (
            <li key={i}>
              <button
                className={
                  "color-white round px-1 py-05 " +
                  (genres.includes(genre.id) ? "bg-accent" : "bg-dark")
                }
                onClick={() => handleClickGenre(genre.id)}
              >
                {genre.name}
              </button>
            </li>
          ))}
      </ul>

      {movies?.results?.length > 0 ? (
        <>
          <h2 className="color-white text-center">Results</h2>

          <div className="grid-col gap-2">
            <MovieList movies={movies.results} />

            <PageSelector
              currentPage={page}
              totalPages={movies.total_pages}
              onChange={(val) => setPage(val)}
            />
          </div>
        </>
      ) : (
        <h2 className="color-white text-center">
          No results matching selection
        </h2>
      )}
    </div>
  );
};

export default GenresPage;
