import React from "react";

const MatchDisplay = ({ matchedDog }) => {
  if (!matchedDog) return null;

  return (
    <div className="matched-dog-info">
      <h2>You've Been Matched!</h2>
      <div className="dog-card">
        <img
          src={matchedDog.img}
          alt={matchedDog.name || `Dog ${matchedDog.id}`}
          className="dog-img"
        />
        <div className="dog-info">
          <h3>{matchedDog.name || `Dog ID: ${matchedDog.id}`}</h3>
          {matchedDog.breed && <p>Breed: {matchedDog.breed}</p>}
          {matchedDog.age && <p>Age: {matchedDog.age}</p>}
          {matchedDog.zip_code && <p>Zip Code: {matchedDog.zip_code}</p>}
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
