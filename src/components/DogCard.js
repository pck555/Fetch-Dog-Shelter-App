import React from "react";

const DogCard = ({ dog, toggleFavorite, favorites }) => {
  return (
    <div key={dog.id} className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-img" />
      <div className="dog-info">
        <h3>
          {dog.name} ({dog.breed})
        </h3>
        <p>Age: {dog.age}</p>
        <p>Zip Code: {dog.zip_code}</p>
        <button
          onClick={() => toggleFavorite(dog.id)}
          className="favorite-button"
        >
          {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
