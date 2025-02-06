import React, { useState, useEffect } from "react";
import {
  fetchBreeds,
  searchDogs,
  fetchDogsByIds,
  generateDogMatch,
} from "../../services/apiService";
import BreedFilter from "../../components/BreedFilter";
import DogGrid from "../../components/DogGrid";
import PaginationControls from "../../components/PaginationControls";
import MatchDisplay from "../../components/MatchDisplay";
import SortButtons from "../../components/SortButtons";
import LogoutButton from "../../components/LogoutButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

const Search = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedFilter, setBreedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState([]);
  const [matchedDog, setMatchedDog] = useState(null);

  useEffect(() => {
    const loadBreeds = async () => {
      const breedData = await fetchBreeds();
      setBreeds(breedData);
    };
    loadBreeds();
  }, []);

  useEffect(() => {
    const loadDogs = async () => {
      const searchData = await searchDogs(breedFilter, currentPage, sortOrder);
      setTotalPages(Math.ceil(searchData.total / 25));

      if (searchData.resultIds.length > 0) {
        const dogData = await fetchDogsByIds(searchData.resultIds);
        setDogs(dogData);
      } else {
        setDogs([]);
        toast.info("No dogs found for the selected breed.");
      }
    };
    loadDogs();
  }, [breedFilter, currentPage, sortOrder]);

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

  const handleGenerateMatch = async () => {
    try {
      const matchId = await generateDogMatch(favorites);
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
    } catch (e) {
      toast.error("Error generating match.");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      <LogoutButton />
      <h2 className="title">Find Your Best Friend</h2>
      <BreedFilter
        breeds={breeds}
        breedFilter={breedFilter}
        setBreedFilter={setBreedFilter}
      />
      <SortButtons sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <DogGrid
        dogs={dogs}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
      {/* Pagination Controls */}
      <div className="pagination-container">
        <PaginationControls totalPages={totalPages} goToPage={goToPage} />
        <button
          onClick={handleGenerateMatch}
          disabled={favorites.length === 0}
          className="match-button"
        >
          Generate Match
        </button>
      </div>

      <MatchDisplay matchedDog={matchedDog} />
    </div>
  );
};

export default Search;
