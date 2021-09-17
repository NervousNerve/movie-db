import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getPersonById, getMoviesByPersons } from "../services/tmdb";

import MovieList from "../components/MovieList";

import style from "./css/ActorPage.module.css";

const MAX_MOVIES = 10;

const ActorPage = () => {
  const { id } = useParams();

  const { data: actor } = useQuery({
    queryKey: ["actor", id],
    queryFn: () => getPersonById(id),
  });

  const { data: movies } = useQuery({
    queryKey: ["actor", "movies", id],
    queryFn: () => getMoviesByPersons(id),
  });

  if (!actor) return null;

  return (
    <div className={"container color-white mt-1 mb-1"}>
      <main>
        <div className={style.topSection}>
          {actor.profile_path && (
            <img src={imgUrl.small + actor.profile_path} />
          )}

          <div>
            <h2 className="font-size-xxl mb-1">{actor.name}</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-1">
          {actor.birthday && (
            <div>
              <label>Birthday</label>
              <p className="m-0">{actor.birthday}</p>
            </div>
          )}

          {actor.deathday && (
            <div>
              <label>Deathday</label>
              <p className="m-0">{actor.deathday}</p>
            </div>
          )}

          {actor.place_of_birth && (
            <div>
              <label>Place of birth</label>
              <p className="m-0">{actor.place_of_birth}</p>
            </div>
          )}
        </div>

        {actor.biography && (
          <>
            <h3 className="text-center">Biography</h3>
            <p className={style.whiteSpace}>{actor.biography}</p>
          </>
        )}

        {movies?.results?.length > 0 && (
          <div>
            <h3 className="text-center">Known For</h3>
            <MovieList movies={movies.results.slice(0, MAX_MOVIES)} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ActorPage;
