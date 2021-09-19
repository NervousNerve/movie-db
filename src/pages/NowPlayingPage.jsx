import React from "react";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";

import { getMoviesByCategory } from "../services/tmdb";
import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

const NowPlayingPage = () => {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const { data } = useQuery({
    queryKey: ["now_playing", page],
    queryFn: () => getMoviesByCategory("now_playing", page),
  });

  return (
    <div className="container mb-1">
      <h2 className="color-white text-center">Now Playing</h2>

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

export default NowPlayingPage;
