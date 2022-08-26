import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Routed/HomePage";
import AllReviewsPage from "./Routed/AllReviewsPage";
import CategoriesPage from "./Routed/CategoriesPage";
import CategoryReviewsPage from "./Routed/CategoryReviewsPage";
import SingleReviewPage from "./Routed/SingleReviewPage";
import ErrorPage from "./Routed/ErrorPage";
import { UserContext } from "./UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider value="happyamy2016">
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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
