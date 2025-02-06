import React from "react";
import DogCard from "./DogCard";

const DogGrid = ({ dogs, toggleFavorite, favorites }) => {
  return (
    <div className="dog-grid">
      {dogs.length > 0 ? (
        dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        ))
      ) : (
        <p className="no-dogs">No dogs found.</p>
      )}
    </div>
  );
};

export default DogGrid;
