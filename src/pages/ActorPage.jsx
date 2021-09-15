import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getPersonById, getMoviesByPersons } from "../services/tmdb";

import MovieList from "../components/MovieList";

import style from "./css/ActorPage.module.css";

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
    <div className={`${style.actorPage} color-white`}>
      <main>
        <div className={style.topSection}>
          {actor.profile_path && (
            <img src={imgUrl.small + actor.profile_path} />
          )}

          <div>
            <h2 className="font-size-xxl mb-1">{actor.name}</h2>
          </div>
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
            <MovieList movies={movies.results.slice(0, 8)} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ActorPage;
