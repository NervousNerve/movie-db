import React from "react";

const PageSelector = ({ currentPage, totalPages, onChange }) => {
  const onClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-05 justify-center list-style-none pl-0 color-white">
      <button
        className="bg-accent color-white font-size-sm rounded"
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        &laquo;
      </button>

      <span>
        {currentPage} / {totalPages}
      </span>

      <button
        className="bg-accent color-white font-size-sm rounded"
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default PageSelector;
