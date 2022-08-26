import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { getAllReviewsSorted } from "../Apis";
import ReviewsList from "../Components/ReviewsList";

export default function HomePage() {
  const user = useContext(UserContext);

  const [trendingReviews, setTrendingReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllReviewsSorted("comment_count", "DESC").then((fetchedReviews) => {
      const cateredReviews = fetchedReviews.slice(0, 6);
      setTrendingReviews(cateredReviews);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="HomePage">
      <h1 className="Greeting">
        Hi <span className="HomepageUserName">{user}</span>, Here’s what’s
        trending today.
      </h1>
      <div>
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <ReviewsList reviewList={trendingReviews} />
        )}
      </div>
      <div className="NavBar">
        <button className="NavButtons LeftNavButtons">
          <Link to="/reviews">View All</Link>
        </button>
        <button className="NavButtons RightNavButtons">
          {" "}
          <Link to="/categories">Go to Categories</Link>
        </button>
      </div>
    </div>
  );
}
