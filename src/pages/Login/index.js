import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiService";
import "./Login.css";
import cuteDogImg from "../../assets/f_photo.jpg";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await login(name, email);
      if (success) {
        navigate("/search");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={cuteDogImg} alt="Cute dog" className="cute-dog-img" />
        <h2>Adopt-a-Paw Rescue</h2>
        <p className="subheading">Find your new furry friend!</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
