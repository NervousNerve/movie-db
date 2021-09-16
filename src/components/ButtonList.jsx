import React from "react";
import classNames from "classnames";

const ButtonList = ({ className, buttons }) => {
  return (
    <ul
      className={classNames(
        "flex",
        "flex-wrap",
        "list-style-none",
        "pl-0",
        className
      )}
    >
      {buttons?.map((button, i) => (
        <li key={i}>
          <button
            onClick={button.onClick}
            className={classNames(
              "color-white",
              "round",
              "px-1",
              "py-05",
              button.className
            )}
          >
            {button.text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ButtonList;
