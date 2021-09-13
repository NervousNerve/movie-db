import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";

import { imgUrl, getPersonById } from "../services/tmdb";

import MovieList from "../components/MovieList";

import style from "./css/ActorPage.module.css";

const ActorPage = () => {
  const { id } = useParams();
  const { data } = useQuery(["actor"], () => getPersonById(id));

  if (!data) return null;

  return (
    <div className={`${style.actorPage} color-white`}>
      <main>
        <div className={style.topSection}>
          <img src={imgUrl.small + data.profile_path} />

          <div>
            <h2 className="font-size-xxl mb-1">{data.name}</h2>
          </div>
        </div>

        <p>{data.biography}</p>

        <h3 className="text-center">Known For</h3>
        <MovieList movies={data.movie_credits.cast.slice(0, 8)} />
      </main>
    </div>
  );
};

export default ActorPage;
