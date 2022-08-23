//import { Link } from "react-router-dom"; (will need)
import { useEffect, useState } from "react";
import { getAllReviews } from "../Apis";
import ReviewsList from "../Components/ReviewsList";

export default function AllReviewsPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllReviews().then((fetchedReviews) => {
      setAllReviews(fetchedReviews);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="AllReviews">
        <h1 className="Header">All Reviews</h1>
        <div className="SortByForm">Sort By Form will go here</div>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <>
              <div>
                <ReviewsList reviewList={allReviews} />
              </div>
            </>
          )}
        </div>
        <div className="NavButtons">Categories Link Button will go here</div>
      </div>
    </>
  );
}
