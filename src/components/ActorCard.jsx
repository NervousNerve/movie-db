import React from "react";
import { Link } from "react-router-dom";

import { imgUrl } from "../services/tmdb";
import style from "./css/ActorCard.module.css";

const ActorCard = ({ actor }) => {
  return (
    <div className="flex gap-1">
      <Link to={"/actors/" + actor.id} className={style.picture}>
        {actor.profile_path && <img src={imgUrl.small + actor.profile_path} />}
      </Link>

      <div className={style.info}>
        <Link to={"/actors/" + actor.id} className="m-0 color-white">
          {actor.name}
        </Link>
        <p className="m-0 color-dark">{actor.character}</p>
      </div>
    </div>
  );
};

export default ActorCard;
