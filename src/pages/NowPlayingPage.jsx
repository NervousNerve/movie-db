import React, { useState } from "react";
import { useQuery } from "react-query";

import { getNowPlaying } from "../services/tmdb";

const NowPlayingPage = () => {
  const [page, setPage] = useState(1);
  const moviesQuery = useQuery(["movies", page], () => getNowPlaying(page));

  return (
    <div>
      {moviesQuery.data &&
        moviesQuery.data.map((movie, i) => (
          <p key={i} className="color-white">
            {movie.original_title}
          </p>
        ))}
    </div>
  );
};

export default NowPlayingPage;
