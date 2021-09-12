import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getGenres, getMoviesByGenres } from "../services/tmdb";

import style from "./css/GenresPage.module.css";

const GenresPage = () => {
  const [page, setPage] = useState(1);
  const { data: genres } = useQuery(["genres"], () => getGenres(), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { data: movies } = useQuery(
    ["movies", "genres", selectedGenres.join(","), page],
    () => getMoviesByGenres(page, selectedGenres.join(",")),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
    }
  );
  const queryClient = useQueryClient();

  const handleClickGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((val) => val !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
    setPage(1);
    queryClient.invalidateQueries(["movies", "genres"]);
  };

  return (
    <div className={style.genresPage}>
      <h2 className="color-white text-center">Genres</h2>

      <ul className="flex flex-wrap gap-05 list-style-none pl-0 color-white">
        {genres &&
          genres.map((genre, i) => (
            <li key={i}>
              <button
                className={
                  "color-white round px-1 py-05 " +
                  (selectedGenres.includes(genre.id) ? "bg-accent" : "bg-dark")
                }
                onClick={() => handleClickGenre(genre.id)}
              >
                {genre.name}
              </button>
            </li>
          ))}
      </ul>

      {movies ? (
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
