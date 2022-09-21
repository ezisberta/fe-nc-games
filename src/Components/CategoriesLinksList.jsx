import { Link } from "react-router-dom";

export default function CategoriesLinksList({ categoriesList }) {
  return (
    <div className="CategoriesList">
      {categoriesList.map(({ slug, description }) => {
        return (
          <Link to={`/categories/${slug}`}>
            <div
              className={`ListedCategoryFragment ${
                slug[0].toUpperCase() + slug.slice(1)
              }CategoryFragment`}
              key={slug}
            >
              <h2 className="listedCategoryHeader">
                {slug[0].toUpperCase() + slug.slice(1)}
              </h2>
              <p className="listedCategoryDescription">{description}</p>
            </div>
          </Link>
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
