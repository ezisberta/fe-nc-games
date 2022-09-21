import { useEffect, useState } from "react";
import { getAllReviews, getAllReviewsSorted } from "../Apis";
import { Link } from "react-router-dom";
import Select from "react-select";
import ReviewsList from "../Components/ReviewsList";
import NavBar from "../Components/NavBar";

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

  const sortOptions = [
    { value: "created_at DESC", label: "Most Recent (default)" },
    { value: "created_at ASC", label: "Less Recent" },
    { value: "votes DESC", label: "Most Voted" },
    { value: "votes ASC", label: "Less Voted" },
    { value: "comment_count DESC", label: "Most Commented" },
    { value: "comment_count ASC", label: "Less Commented" },
  ];

  const handleSortByClick = (event) => {
    const valueStr = event.value;

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
        <Link to={`/`} className="Logo">
          <img src={require("../Images/nc-games-logo.png")} alt="NC logo"></img>
        </Link>

        <h1 className="AllReviewsHeader Header">All Reviews</h1>
        <div className="SortByField">
          <h3 className="SortBySmallHeader"> SORT BY</h3>
          <Select
            className="SortByDropdown"
            placeholder="Most Recent (default)"
            options={sortOptions}
            onChange={handleSortByClick}
            isSearchable={false}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <ReviewsList reviewList={allReviews} />
          )}
        </div>
        <NavBar
          buttons={[
            { text: "Home", path: "/" },
            { path: "/categories", text: "Categories" },
          ]}
        />
      </div>
    </>
  );
}
