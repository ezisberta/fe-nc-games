//import { Link } from "react-router-dom"; (will need)
import { useEffect, useState } from "react";
import getAllReviews from "../Apis";
import AllReviewsList from "../Components/AllReviewsList";

export default function AllReviewsPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllReviews().then((fetchedReviews) => {
      console.log(fetchedReviews);
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
                <AllReviewsList reviewList={allReviews} />
              </div>
            </>
          )}
        </div>
        <div className="LinkingButtons">
          Categories Link Button will go here
        </div>
      </div>
    </>
  );
}
