//import { Link } from "react-router-dom"; (will need)
import { useEffect, useState } from "react";
import { getAllReviews, getAllReviewsSorted } from "../Apis";
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

  const handleSortByClick = (event) => {
    const valueStr = event.target.value;

    const sortByValue = valueStr.split(" ")[0];
    const orderByValue = valueStr.split(" ")[1];

    getAllReviewsSorted(sortByValue, orderByValue).then(
      (fetchedSortedReviews) => {
        setAllReviews(fetchedSortedReviews);
      }
    );
  };

  return (
    <>
      <div className="AllReviews">
        <h1 className="Header">All Reviews</h1>
        <div>
          SORT BY
          <br></br>
          <button
            className="sortByOption"
            value="created_at DESC"
            onClick={handleSortByClick}
          >
            Most Recent {"(default)"}
          </button>{" "}
          <button
            className="sortByOption"
            value="created_at ASC"
            onClick={handleSortByClick}
          >
            Less Recent
          </button>{" "}
          <br></br>
          <button
            className="sortByOption"
            value="votes DESC"
            onClick={handleSortByClick}
          >
            Most Voted
          </button>{" "}
          <button
            className="sortByOption"
            value="votes ASC"
            onClick={handleSortByClick}
          >
            Less Voted
          </button>{" "}
          <br></br>
          <button
            className="sortByOption"
            value="comment_count DESC"
            onClick={handleSortByClick}
          >
            Most Commented
          </button>{" "}
          <button
            className="sortByOption"
            value="comment_count ASC"
            onClick={handleSortByClick}
          >
            Less Commented {"(default)"}
          </button>
        </div>
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
