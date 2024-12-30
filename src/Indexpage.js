import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import "./indexpage.css";

const IndexPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Delete a favorite package
  const handleDelete = (packageName) => {
    if (window.confirm(`Are you sure you want to delete ${packageName}?`)) {
      const updatedFavorites = favorites.filter((fav) => fav.name !== packageName);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to Favorite NPM Packages</h1>
      <Button
        label="Add Fav"
        onClick={() => navigate("/add-favorite")}
        className="mb-4"
      />
      {favorites.length === 0 ? (
        <p>You don't have any favs yet. Please add.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((fav, index) => (
            <li
              key={index}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{fav.name}</h2>
                <p className="text-sm">{fav.reason}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  label="View"
                  onClick={() => alert(`Viewing ${fav.name}`)} // Placeholder
                  className="bg-green-500"
                />
                <Button
                  label="Edit"
                  onClick={() => alert(`Editing ${fav.name}`)} // Placeholder
                  className="bg-yellow-500"
                />
                <Button
                  label="Delete"
                  onClick={() => handleDelete(fav.name)}
                  className="bg-red-500"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IndexPage;
