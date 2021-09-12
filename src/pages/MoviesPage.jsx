import React, { useState } from "react";
import { useQuery } from "react-query";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import useCategory from "../hooks/useCategory";

import style from "./css/moviesPage.module.css";

const MoviesPage = ({ category }) => {
  const movieCategory = useCategory(category);
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["movies", category, page],
    () => movieCategory.queryFn(page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60,
    }
  );

  return (
    <div className={style.moviesPage}>
      <h2 className="color-white text-center">{movieCategory.title}</h2>

      {data && (
        <div className="grid-col gap-2">
          <MovieList movies={data.results} />

          <PageSelector
            currentPage={page}
            totalPages={data.total_pages}
            onChange={(val) => setPage(val)}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
