//import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getCategoryReviews } from "../Apis";
import ReviewsList from "../Components/ReviewsList";

export default function CategoryReviewsPage() {
  const { category } = useParams();

  const [categoryObj, setCategoryObj] = useState({
    slug: "___",
    description: "___",
  });
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getCategories().then((fetchedCategories) => {
      const foundCategory = fetchedCategories.find(
        (fetchedCategory) => fetchedCategory.slug === category
      );
      setCategoryObj(foundCategory);
    });

    getCategoryReviews(category).then((fetchedCategoryReviews) => {
      setCategoryReviews(fetchedCategoryReviews);
      setIsLoading(false);
    });
  }, [category]);

  return (
    <>
      <div className="CategoryReviewsPage">
        <h1 className="Header">
          {categoryObj.slug[0].toUpperCase() + categoryObj.slug.slice(1)}
        </h1>
        <p className="CategoryDescription">{categoryObj.description}</p>
        <div>
          {isLoading ? (
            <h3>Loading</h3>
          ) : (
            <ReviewsList reviewList={categoryReviews}></ReviewsList>
          )}
        </div>
      </div>
    </>
  );
}
