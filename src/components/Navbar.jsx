import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-accent color-white flex justify-space-between p-1">
      <h1 className="text-bold m-0 font-size-md">movie-db</h1>

      <ul className="list-style-none my-0 pl-0 flex gap-2">
        <li>
          <NavLink to="/now-playing" className="color-white">
            Now Playing
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" className="color-white">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/top-rated" className="color-white">
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" className="color-white">
            Genres
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
