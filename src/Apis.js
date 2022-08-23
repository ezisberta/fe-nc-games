export default function getAllReviews() {
  return fetch("https://ezisberta-be-nc-games.herokuapp.com/api/reviews")
    .then((res) => res.json())
    .then((data) => data.reviews);
}
