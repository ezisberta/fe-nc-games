import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Routed/HomePage";
import AllReviewsPage from "./Routed/AllReviewsPage";
import CategoriesPage from "./Routed/CategoriesPage";
import CategoryReviewsPage from "./Routed/CategoryReviewsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/reviews" element={<AllReviewsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reviews/:category" element={<CategoryReviewsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
