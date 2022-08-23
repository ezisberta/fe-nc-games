//import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getAllReviews } from "../Apis";
import ReviewsList from "../Components/ReviewsList";

export default function CategoryReviewsPage() {
  console.log(useParams());
  const { category } = useParams();

  console.log(category);

  const [categoryHeader, setCategoryHeader] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getCategories().then((fetchedCategories) => {
      const foundCategory = fetchedCategories.find(
        (fetchedCategory) => fetchedCategory.slug === category
      );
      const upperCasedSlug =
        foundCategory.slug[0].toUpperCase() + foundCategory.slug.slice(1);
      setCategoryHeader(upperCasedSlug);
      setCategoryDescription(foundCategory.description);
    });

    getAllReviews().then((fetchedReviews) => {
      const filteredReviews = fetchedReviews.filter(
        (fetchedReview) => fetchedReview.category === category
      );
      setCategoryReviews(filteredReviews);
      setIsLoading(false);
    });
  }, [category]);

  return (
    <>
      <div className="CategoryReviewsPage">
        <h1 className="Header">{categoryHeader}</h1>
        <p className="CategoryDescription">{categoryDescription}</p>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <>
              <div>
                <ReviewsList reviewList={categoryReviews}></ReviewsList>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
