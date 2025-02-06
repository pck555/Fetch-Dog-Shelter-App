import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const login = async (name, email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { name, email },
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/breeds`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching breeds.");
  }
};

export const searchDogs = async (breedFilter, currentPage, sortOrder) => {
  try {
    const params = {
      breeds: breedFilter ? [breedFilter] : [],
      size: 25,
      sort: `breed:${sortOrder}`,
      from: 25 * (currentPage - 1) + 1,
    };

    const response = await axios.get(`${API_BASE_URL}/dogs/search`, {
      params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("Error searching dogs.");
  }
};

export const fetchDogsByIds = async (dogIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching dog details.");
  }
};

export const generateDogMatch = async (favorites) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dogs/match`, favorites, {
      withCredentials: true,
    });
    return response.data.match;
  } catch (error) {
    throw new Error("Error generating match.");
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    throw new Error("Error logging out.");
  }
};
