import React from "react";
import { NavLink } from "react-router-dom";

import style from "./css/Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <div className={style.navbar}>
        <h1 className="text-bold m-0 font-size-md">movie-db</h1>

        <ul className="list-style-none my-0 pl-0 flex gap-2">
          <li>
            <NavLink to="/movies/now-playing" className="color-white">
              Now Playing
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/popular" className="color-white">
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/top-rated" className="color-white">
              Top Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/genres" className="color-white">
              Genres
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.spacer}></div>
    </nav>
  );
};

export default Navbar;
