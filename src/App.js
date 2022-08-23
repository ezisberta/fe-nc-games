import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Routed/HomePage";
import AllReviewsPage from "./Routed/AllReviewsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/reviews" element={<AllReviewsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
