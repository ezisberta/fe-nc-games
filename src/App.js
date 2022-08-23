import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Routed/HomePage";
import AllReviewsPage from "./Routed/AllReviewsPage";
import CategoriesPage from "./Routed/CategoriesPage";
import CategoryReviewsPage from "./Routed/CategoryReviewsPage";
import SingleReviewPage from "./Routed/SingleReviewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/reviews" element={<AllReviewsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/categories/:category"
            element={<CategoryReviewsPage />}
          />
          <Route path="/reviews/:id" element={<SingleReviewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
