import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-accent color-white flex justify-space-between p-1">
      <span className="text-bold">movie-db</span>

      <ul className="list-style-none my-0 pl-0 flex gap-2">
        <li>
          <NavLink to="/playing" className="color-white">
            Playing Now
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
