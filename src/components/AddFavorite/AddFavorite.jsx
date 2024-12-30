import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddFavorite.css";

const AddFavorite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch results as user types
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${term}`
      );
      setResults(response.data.objects.map((obj) => obj.package.name));
    } catch (err) {
      setError("Failed to fetch packages. Please try again later.");
      console.error("Axios error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    if (!selectedPackage || !reason) {
      alert("Please select a package and provide a reason.");
      return;
    }

    const newFavorite = { name: selectedPackage, reason };
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify([...storedFavorites, newFavorite]));
    navigate("/");
  };

  return (
    <div className="favorite-container">
      <h1 className="favorite-title">Search for NPM Packages</h1>

      {/* Search input */}
      <input
        className="search-input"
        placeholder="Search for packages"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Loading and Error State */}
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display search results */}
      <ul className="results-list">
        {results.length > 0 ? (
          results.map((pkg, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="package"
                  value={pkg}
                  onChange={() => setSelectedPackage(pkg)}
                />
                {pkg}
              </label>
            </li>
          ))
        ) : (
          !loading && <p className="no-packages-message">No packages found.</p>
        )}
      </ul>

      {/* Textarea for favorite reason */}
      <textarea
        className="favorite-textarea"
        placeholder="Why is this your favorite?"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      {/* Submit button */}
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddFavorite;
