import { Link } from "react-router-dom";

export default function CategoriesLinksList({ categoriesList }) {
  return (
    <ul className="CategoriesList">
      {categoriesList.map(({ slug, description }) => {
        return (
          <li className="listedCategoryFragment" key={slug}>
            <Link to={`/categories/${slug}`}>
              <h2 className="listedCategoryHeader">
                {slug[0].toUpperCase() + slug.slice(1)}
              </h2>
              <p className="listedCategoryDescription">{description}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
