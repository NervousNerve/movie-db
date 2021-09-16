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
        <button
          key={i}
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
      ))}
    </ul>
  );
};

export default ButtonList;
