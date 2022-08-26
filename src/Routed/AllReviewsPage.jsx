import { Link } from "react-router-dom";
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
        <h1 className="AllReviewsHeader Header">All Reviews</h1>
        <div className="SortByField">
          <h3 className="SortBySmallHeader"> SORT BY</h3>
          <div className="SortByButtonsField">
            <div className="SortByButtonsLine">
              <button
                className="SortByButton"
                value="created_at DESC"
                onClick={handleSortByClick}
              >
                Most Recent {"(default)"}
              </button>{" "}
              <button
                className="SortByButton"
                value="created_at ASC"
                onClick={handleSortByClick}
              >
                Less Recent
              </button>
            </div>
            <div className="SortByButtonsLine">
              <button
                className="SortByButton"
                value="votes DESC"
                onClick={handleSortByClick}
              >
                Most Voted
              </button>{" "}
              <button
                className="SortByButton"
                value="votes ASC"
                onClick={handleSortByClick}
              >
                Less Voted
              </button>
            </div>
            <div className="SortByButtonsLine">
              <button
                className="SortByButton"
                value="comment_count DESC"
                onClick={handleSortByClick}
              >
                Most Commented
              </button>{" "}
              <button
                className="SortByButton"
                value="comment_count ASC"
                onClick={handleSortByClick}
              >
                Less Commented {"(default)"}
              </button>
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <ReviewsList reviewList={allReviews} />
          )}
        </div>
        <div className="NavBar">
          <button className="NavButtons LeftNavButtons">
            <Link to="/">Home</Link>
          </button>
          <button className="NavButtons RightNavButtons">
            {" "}
            <Link to="/categories">Categories</Link>
          </button>
        </div>
      </div>
    </>
  );
}
