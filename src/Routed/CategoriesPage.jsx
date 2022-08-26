import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../Apis";
import CategoriesLinksList from "../Components/CategoriesLinksList";

export default function CategoriesPage() {
  const [allCategories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="Header">Categories</h1>
      <div>
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <>
            <div>
              <CategoriesLinksList categoriesList={allCategories} />
            </div>
          </>
        )}
      </div>
      <div className="NavBar">
        <button className="NavButtons LeftNavButtons">
          <Link to="/">Home</Link>
        </button>
        <button className="NavButtons RightNavButtons">
          <Link to="/reviews">All Reviews</Link>
        </button>
      </div>
    </>
  );
}
