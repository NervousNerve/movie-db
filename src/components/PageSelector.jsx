import React from "react";

const PageSelector = ({ currentPage, totalPages, onChange }) => {
  const onClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-2 justify-center align-center list-style-none pl-0">
      <button
        className="bg-accent round"
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <span className="color-white">
        {currentPage} / {totalPages}
      </span>

      <button
        className="bg-accent round"
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PageSelector;
