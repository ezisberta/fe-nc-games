//import { Link } from "react-router-dom"; (will need)
import { useEffect, useState, dropdown } from "react";
import { getAllReviews } from "../Apis";
import ReviewsList from "../Components/ReviewsList";

export default function AllReviewsPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(dropdown);
    setIsLoading(true);
    getAllReviews().then((fetchedReviews) => {
      setAllReviews(fetchedReviews);
      setIsLoading(false);
    });
  }, []);

  // const handleSortByClick = (event) => {
  //   const valueStr = event.target.value;

  //   console.log(valueStr);
  // };

  return (
    <>
      <div className="AllReviews">
        <h1 className="Header">All Reviews</h1>
        <div>DROPDOWN HERE</div>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <ReviewsList reviewList={allReviews} />
          )}
        </div>
        <div className="NavButtons">Categories Link Button will go here</div>
      </div>
    </>
  );
}
