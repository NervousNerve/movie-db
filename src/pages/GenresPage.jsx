import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";
import ButtonList from "../components/ButtonList";

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

      <ButtonList
        className="justify-center gap-05"
        buttons={allGenres?.map((genre) => {
          return {
            text: genre.name,
            onClick: () => handleClickGenre(genre.id),
            className: genres.includes(genre.id) ? "bg-accent" : "bg-dark",
          };
        })}
      />

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
        <h2 className="color-white text-center">
          No results matching selection
        </h2>
      )}
    </div>
  );
};

export default GenresPage;
