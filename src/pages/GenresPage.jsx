import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";
import classNames from "classnames";

import { getGenres, getMoviesByGenres } from "../services/tmdb";
import { CommaNumberArrayParam } from "../util/CommaNumberArrayParam";
import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

const GenresPage = () => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const [genres, setGenres] = useQueryParam(
    "genres",
    withDefault(CommaNumberArrayParam, [])
  );

  const { data: allGenres } = useQuery({
    queryKey: "genres",
    queryFn: () => getGenres(),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const { data: movies } = useQuery({
    queryKey: ["movies", "genres", genres.join(), page],
    queryFn: () => getMoviesByGenres(genres.join(), page),
  });

  const handleClickGenre = (id) => {
    // Add or remove genre from currently selected list
    if (genres.includes(id)) {
      setGenres(genres.filter((val) => val !== id));
    } else {
      setGenres([...genres, id]);
    }
    setPage(1);
  };

  return (
    <div className="container mb-1">
      <h2 className="color-white text-center">Genres</h2>

      <div className="flex flex-wrap list-style-none pl-0 justify-center gap-05 my-1">
        {allGenres?.map((genre, i) => (
          <button
            key={i}
            onClick={() => handleClickGenre(genre.id)}
            className={classNames("color-white round px-1 py-05", {
              "bg-accent": genres.includes(genre.id),
            })}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {movies?.results?.length > 0 ? (
        <>
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
        <p className="color-white text-center">No results matching selection</p>
      )}
    </div>
  );
};

export default GenresPage;
