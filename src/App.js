import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Routed/HomePage";
import AllReviewsPage from "./Routed/AllReviewsPage";
import CategoriesPage from "./Routed/CategoriesPage";
import CategoryReviewsPage from "./Routed/CategoryReviewsPage";
import SingleReviewPage from "./Routed/SingleReviewPage";
import ErrorPage from "./Routed/ErrorPage";
import { Context } from "./Context";

function App() {
  return (
    <BrowserRouter>
      <Context.Provider value={{ user: "happyamy2016", hasVoted: [] }}>
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
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
