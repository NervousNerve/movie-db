import React, { useEffect, useState } from "react";

import { getNowPlaying } from "../services/tmdb";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    getNowPlaying().then((res) => setMovies(res));
  }, []);

  return (
    <div>
      {movies &&
        movies.map((movie, i) => (
          <p key={i} className="color-white">
            {movie.original_title}
          </p>
        ))}
    </div>
  );
};

export default NowPlayingPage;
