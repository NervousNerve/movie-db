import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import categories from "../pages/dynamic/categories";

import style from "./css/Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    navRef.current.addEventListener("mouseleave", () => {
      setIsMenuOpen(false);
    });
  }, []);

  return (
    <nav ref={navRef}>
      <div className={style.navbar}>
        <h1 className="text-bold m-0 font-size-md">movie-db</h1>

        <button
          className={style.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={isMenuOpen ? "/menu-open.svg" : "/menu.svg"} />
        </button>

        <ul
          className={classNames(style.links, !isMenuOpen && style.menuClosed)}
        >
          {categories.map((c) => (
            <NavLink
              to={`/movies/${c.name}`}
              key={c.name}
              className="color-white"
            >
              {c.title}
            </NavLink>
          ))}
          <li>
            <NavLink to="/movies/popular" className="color-white">
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/genres" className="color-white">
              Genres
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/search" className="color-white">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies/recent" className="color-white">
              Viewed recently
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={style.spacer}></div>
    </nav>
  );
};

export default Navbar;
