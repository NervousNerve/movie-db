import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getMoviesByCategory } from "../services/tmdb";

import style from "./css/CategoryPage.module.css";

const CategoryPage = ({ category }) => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const { data } = useQuery({
    queryKey: ["movies", category.name, page],
    queryFn: () => getMoviesByCategory(category.query, page),
  });

  return (
    <div className={style.categoryPage}>
      <h2 className="color-white text-center">{category.title}</h2>

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

export default CategoryPage;
