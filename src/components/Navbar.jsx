import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

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

        <ul className={[style.links, !isMenuOpen && style.hidden].join(" ")}>
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
            <NavLink to="/movies/trending" className="color-white">
              Trending
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
