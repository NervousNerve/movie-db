import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import {
  useQueryParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";
import classNames from "classnames";

import { searchMovies } from "../services/tmdb";

import style from "./css/SearchPage.module.css";

const SearchPage = () => {
  const [search, setSearch] = useQueryParam("q", StringParam);
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const searchInput = useRef();

  const { data } = useQuery({
    queryKey: ["movies", "search", search, page],
    queryFn: () => searchMovies(search, page),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.current.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch("");
  };

  useEffect(() => {
    // Fill input on render if query param is set
    searchInput.current.value = search || "";
  }, [search]);

  return (
    <div className="container mb-1">
      <h2 className="color-white text-center">Search</h2>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-wrap justify-center gap-05 mb-1"
      >
        <input
          placeholder="Movie title..."
          ref={searchInput}
          className={classNames(style.search, "round")}
        />
        <button type="submit" className="bg-accent round">
          Search
        </button>
        <button type="reset" className="round">
          Reset
        </button>
      </form>

      {data?.results?.length > 0 ? (
        <>
          <p className="color-white text-center">
            Showing results for "{search}"
          </p>
          <div className="grid-col gap-2">
            <MovieList movies={data.results} />

            <PageSelector
              currentPage={page}
              totalPages={data.total_pages}
              onChange={(val) => setPage(val)}
            />
          </div>
        </>
      ) : (
        <p className="color-white text-center">No results found</p>
      )}
    </div>
  );
};

export default SearchPage;
