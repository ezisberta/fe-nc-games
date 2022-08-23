import { Link } from "react-router-dom";
//import { useEffect, useState } from "react"; (will need)
import TrendingReviewsList from "../Components/TrendingReviewsList";

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1 className="Greeting">Hi USER, Here’s what’s trending today.</h1>
      <TrendingReviewsList></TrendingReviewsList>
      <div className="NavButtons">
        <Link to="/reviews">View All</Link>
        <Link to="/categories">Categories</Link>
      </div>
    </div>
  );
}
