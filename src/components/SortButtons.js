import React from "react";

const SortButtons = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="sort-buttons">
      <button
        onClick={() => setSortOrder("asc")}
        className={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
      >
        Sort Ascending
      </button>
      <button
        onClick={() => setSortOrder("desc")}
        className={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
      >
        Sort Descending
      </button>
    </div>
  );
};

export default SortButtons;
