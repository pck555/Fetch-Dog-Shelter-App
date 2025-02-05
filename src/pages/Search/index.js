import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

const Search = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedFilter, setBreedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageCursors, setPageCursors] = useState({ 1: null }); // Store cursors for pages
  const [matchedDog, setMatchedDog] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Fetch breed options on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            withCredentials: true,
          }
        );
        setBreeds(response.data);
      } catch (error) {
        toast.error("Error fetching breeds.");
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const params = {
          breeds: breedFilter ? [breedFilter] : [],
          size: 25,
          sort: `breed:${sortOrder}`,
        };
        params.from = 25 * (currentPage - 1) + 1;

        const searchResponse = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            params,
            withCredentials: true,
          }
        );

        const dogIds = searchResponse.data.resultIds;
        console.info("searchResponse.data", searchResponse.data);
        setTotalPages(Math.ceil(searchResponse.data.total / 25)); // Calculate total pages
        setPageCursors((prevCursors) => ({
          ...prevCursors,
          [currentPage + 1]: searchResponse.data.next || null, // Store cursor for the next page
        }));

        if (dogIds.length > 0) {
          const dogsResponse = await axios.post(
            "https://frontend-take-home-service.fetch.com/dogs",
            dogIds,
            {
              withCredentials: true,
            }
          );
          setDogs(dogsResponse.data);
        } else {
          setDogs([]);
          toast.info("No dogs found for the selected breed.");
        }
      } catch (error) {
        toast.error("Error fetching dogs.");
      }
    };

    fetchDogs();
  }, [breedFilter, currentPage, sortOrder]);

  // Toggle favorite dog selection
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate a match based on selected favorite dogs
  const generateMatch = async () => {
    try {
      if (favorites.length === 0) {
        toast.error("Please select at least one dog to generate a match.");
        return;
      }

      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favorites,
        {
          withCredentials: true,
        }
      );

      const matchId = response.data.match;

      if (matchId) {
        const matchedDogFromList = dogs.find((dog) => dog.id === matchId);
        if (matchedDogFromList) {
          setMatchedDog(matchedDogFromList); // Set matched dog from current list
          toast.success(`You've been matched with ${matchedDogFromList.name}!`);
        } else {
          setMatchedDog({ id: matchId });
          toast.info(`You've been matched with dog ID: ${matchId}`);
        }
      } else {
        toast.warn("No match found. Please try again.");
      }
    } catch (error) {
      toast.error("Error generating match.");
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = window.location.origin; // Redirect to login page
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  return (
    <div className="container">
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <h2 className="title">Find Your Best Friend</h2>

      {/* Filter by breed */}
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

      {/* Sorting Buttons */}
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

      {/* Display dog results */}
      <div className="dog-grid">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
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
          ))
        ) : (
          <p className="no-dogs">No dogs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          variant="outlined"
          onChange={(e, number) => goToPage(number)}
        />
        <button
          onClick={generateMatch}
          disabled={favorites.length === 0}
          className="match-button"
        >
          Generate Match
        </button>
      </div>

      {/* Display matched dog info */}
      {matchedDog && (
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
      )}
    </div>
  );
};

export default Search;
