import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import useCategory from "../hooks/useCategory";

import style from "./css/MoviesPage.module.css";

const MoviesPage = ({ category }) => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const movieCategory = useCategory(category);

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
