import React from "react";
import { logout } from "../services/apiService";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = window.location.origin;
    } catch (error) {
      console.error("Error logging out.", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
