import { Link } from "react-router-dom";

export default function CategoriesLinksList({ categoriesList }) {
  return (
    <div className="CategoriesList">
      {categoriesList.map(({ slug, description }) => {
        return (
          <div
            className={`ListedCategoryFragment ${
              slug[0].toUpperCase() + slug.slice(1)
            }CategoryFragment`}
            key={slug}
          >
            <Link to={`/categories/${slug}`}>
              <h2 className="listedCategoryHeader">
                {slug[0].toUpperCase() + slug.slice(1)}
              </h2>
              <p className="listedCategoryDescription">{description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// Strategy = Gray

// Hidden-Roles = Purple

// Dexterity = Red

// Push-your-luck = Green

//
