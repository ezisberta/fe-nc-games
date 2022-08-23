const axios = require("axios").default;

export function getAllReviews() {
  return axios
    .get("https://ezisberta-be-nc-games.herokuapp.com/api/reviews") //fetch("https://ezisberta-be-nc-games.herokuapp.com/api/reviews")
    .then((res) => res.data.reviews);
}

export function getCategories() {
  return axios
    .get("https://ezisberta-be-nc-games.herokuapp.com/api/categories")
    .then((res) => res.data.categories);
}

export function getSingleReviewById(review_id) {
  return axios
    .get(`https://ezisberta-be-nc-games.herokuapp.com/api/reviews/${review_id}`)
    .then((res) => res.data.review);
}

export function getCommentsBySingleReviewId(review_id) {
  return axios
    .get(
      `https://ezisberta-be-nc-games.herokuapp.com/api/reviews/${review_id}/comments`
    )
    .then((res) => res.data.comments);
}
