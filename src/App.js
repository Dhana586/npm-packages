// Complete Project: Favorite NPM Packages Management

// Project Structure:
// 1. `App.js`: Main application with routing.
// 2. `IndexPage.js`: Home page showing favorites (Page 2 & 3).
// 3. `AddFavorite.js`: Page for searching and adding favorites (Page 1).
// 4. Components: Reusable components like `Button` and `TextInput`.
// 5. `localStorage` is used to persist data.

// ----- App.js -----
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./Indexpage";
import AddFavorite from "./components/AddFavorite/AddFavorite";
// Remove this line if not used




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/add-favorite" element={<AddFavorite />} />
      </Routes>
    </Router>
  );
};
export default App;