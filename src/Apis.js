export function getAllReviews() {
  return fetch("https://ezisberta-be-nc-games.herokuapp.com/api/reviews")
    .then((res) => res.json())
    .then((data) => data.reviews);
}

export function getCategories() {
  return fetch("https://ezisberta-be-nc-games.herokuapp.com/api/categories")
    .then((res) => res.json())
    .then((data) => data.categories);
}
