import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories, getCategoryReviews } from "../Apis";
import ErrorPage from "../Routed/ErrorPage";
import ReviewsList from "../Components/ReviewsList";
import NavBar from "../Components/NavBar";

export default function CategoryReviewsPage() {
  const { category } = useParams();

  const [categoryObj, setCategoryObj] = useState({
    slug: "___",
    description: "___",
  });
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getCategories()
      .then((fetchedCategories) => {
        const foundCategory = fetchedCategories.find(
          (fetchedCategory) => fetchedCategory.slug === category
        );
        setCategoryObj(foundCategory);
      })
      .catch((catchedError) => {
        setError(catchedError);
      });

    getCategoryReviews(category)
      .then((fetchedCategoryReviews) => {
        setCategoryReviews(fetchedCategoryReviews);
        setIsLoading(false);
      })
      .catch((catchedError) => {
        setError(catchedError);
      });
  }, [category]);

  if (error) {
    return (
      <ErrorPage
        status={error.response.status}
        message={error.response.statusText}
      />
    );
  }

  return (
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
      <NavBar
        buttons={[
          { text: "All", path: "/reviews" },
          { text: "Categories", path: "/categories" },
        ]}
      />
    </div>
  );
}
