import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import { getAllReviewsSorted } from "../Apis";
import { Link } from "react-router-dom";
import ReviewsList from "../Components/ReviewsList";
import NavBar from "../Components/NavBar";

export default function HomePage() {
  const { user } = useContext(Context);

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
      <Link to={`/`} className="Logo">
        <img src={require("../Images/nc-games-logo.png")} alt="NC logo"></img>
      </Link>
      <h1 className="HomePageHeader Header">
        <p className="HomePageGreeting">
          Hi <span className="HomePageUserName">{user}</span>,{" "}
        </p>
        <p className="HomePageTrendingIntro"> Here’s what’s trending today</p>
      </h1>
      <div>
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <ReviewsList reviewList={trendingReviews} />
        )}
      </div>
      <NavBar
        buttons={[
          { path: "/categories", text: "Categories" },
          { path: "/reviews", text: "All" },
        ]}
      />
    </div>
  );
}
