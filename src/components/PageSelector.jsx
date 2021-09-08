import React from "react";

const PageSelector = ({ current, max, onChange }) => {
  const onClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-05 justify-center list-style-none pl-0 color-white">
      <button
        className="bg-accent color-white font-size-sm rounded"
        onClick={() => onClick(current - 1)}
        disabled={current <= 1}
      >
        &laquo;
      </button>

      <span>
        {current} / {max}
      </span>

      <button
        className="bg-accent color-white font-size-sm rounded"
        onClick={() => onClick(current + 1)}
        disabled={current >= max}
      >
        &raquo;
      </button>
    </div>
  );
};

export default PageSelector;
