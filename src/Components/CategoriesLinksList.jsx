import { Link } from "react-router-dom";

export default function CategoriesLinksList({ categoriesList }) {
  return (
    <ul className="CategoriesList">
      {categoriesList.map((category) => {
        return (
          <li key={category}>
            {" "}
            <Link to={`/reviews/${category}`}>
              <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
              {/* temporary will get rid of the dashes and sort Upper cases for better presentation */}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
