import React from "react";
import { useQuery } from "react-query";
import {
  useQueryParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

import ButtonList from "../components/ButtonList";
import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getTrendingMovies } from "../services/tmdb";

import style from "./css/TrendingPage.module.css";

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
    <div className={style.trendingPage}>
      <h2 className="color-white text-center">Trending</h2>

      <ButtonList
        className="justify-center gap-05"
        buttons={[
          {
            text: "Today",
            onClick: () => setTimeWindow("day"),
            className: timeWindow === "day" ? "bg-accent" : "bg-dark",
          },
          {
            text: "This week",
            onClick: () => setTimeWindow("week"),
            className: timeWindow === "week" ? "bg-accent" : "bg-dark",
          },
        ]}
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

export default TrendingPage;
