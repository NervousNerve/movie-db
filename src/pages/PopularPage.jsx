import React from "react";
import { useQuery } from "react-query";
import {
  useQueryParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";
import classNames from "classnames";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getTrendingMovies } from "../services/tmdb";

const TrendingPage = () => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [timeWindow, setTimeWindow] = useQueryParam(
    "time_window",
    withDefault(StringParam, "day")
  );

  const { data: movies } = useQuery({
    queryKey: ["movies", "trending", timeWindow, page],
    queryFn: () => getTrendingMovies(timeWindow, page),
  });

  return (
    <div className="container mb-1">
      <h2 className="color-white text-center">Popular</h2>

      <div className="flex flex-wrap list-style-none pl-0 justify-center gap-05 my-1">
        <button
          onClick={() => setTimeWindow("day")}
          className={classNames("round", {
            "bg-accent": timeWindow === "day",
          })}
        >
          Today
        </button>

        <button
          onClick={() => setTimeWindow("week")}
          className={classNames("round", {
            "bg-accent": timeWindow === "week",
          })}
        >
          This week
        </button>
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
        <h2 className="color-white text-center">
          No results matching selection
        </h2>
      )}
    </div>
  );
};

export default TrendingPage;
