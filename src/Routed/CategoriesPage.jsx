import { useEffect, useState } from "react";
import { getCategories } from "../Apis";
import { Link } from "react-router-dom";
import CategoriesLinksList from "../Components/CategoriesLinksList";
import NavBar from "../Components/NavBar";

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
    <div className="CategoriesPage">
      <Link to={`/`} className="Logo">
        <img src={require("../Images/nc-games-logo.png")} alt="NC logo"></img>
      </Link>
      <h1 className="Header">Categories</h1>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <CategoriesLinksList categoriesList={allCategories} />
      )}
      <NavBar
        buttons={[
          { text: "Home", path: "/" },
          { text: "All", path: "/reviews" },
        ]}
      />
    </div>
  );
}
