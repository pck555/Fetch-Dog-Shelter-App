import React from "react";

const BreedFilter = ({ breeds, breedFilter, setBreedFilter }) => {
  return (
    <div className="filter-container">
      <select
        onChange={(e) => setBreedFilter(e.target.value)}
        value={breedFilter}
        className="breed-select"
      >
        <option value="">All breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedFilter;
