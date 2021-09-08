import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { smallImgUrl, hugeImgUrl, getMovieById } from "../services/tmdb";

import MovieList from "../components/MovieList";

import style from "./css/MoviePage.module.css";

const MoviePage = () => {
  const { id } = useParams();
  const { data } = useQuery(["movie"], () => getMovieById(id));

  if (!data) return null;

  return (
    <div className={`${style.moviePage} color-white`}>
      <header className={style.backdrop}>
        <img src={hugeImgUrl + data.backdrop_path} />
      </header>

      <main className="container">
        <div className="container flex gap-1 align-end">
          <img src={smallImgUrl + data.poster_path} />

          <div className="">
            <h2 className="font-size-xxl mb-1">{data.title}</h2>

            <div className="flex gap-05">
              {data.genres.map((genre, i) => (
                <span key={i} className="round bg-dark px-1 font-size-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p>{data.overview}</p>

        <h3>Top Cast</h3>
        <ol className="list-style-none pl-0 flex flex-wrap gap-1">
          {data.credits.cast.slice(0, 5).map((person, i) => (
            <li key={i} className={`${style.castCard} flex gap-1`}>
              <div className={style.profile}>
                {person.profile_path && (
                  <img src={smallImgUrl + person.profile_path} />
                )}
              </div>

              <div>
                <p className="m-0">{person.character}</p>
                <p className="m-0 font-size-sm color-dark">{person.name}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3>Recommended</h3>
        <MovieList movies={data.recommendations.results.slice(0, 5)} />
      </main>
    </div>
  );
};

export default MoviePage;
