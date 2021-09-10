import React, { useState } from "react";
import { useQuery } from "react-query";
import MovieList from "../components/MovieList";
import PageSelector from "../components/PageSelector";

import { getNowPlaying } from "../services/tmdb";

const NowPlayingPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery(["now-playing", page], () => getNowPlaying(page), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60,
  });

  return (
    <div>
      <h2 className="color-white text-center">Now Playing</h2>

      {data && (
        <div className="container">
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
