const axios = require("axios").default;

export function getAllReviews() {
  return axios
    .get(`https://ezisberta-be-nc-games.herokuapp.com/api/reviews`)
    .then((res) => res.data.reviews);
}

export function getAllReviewsSorted(sortBy, order) {
  return axios
    .get(
      `https://ezisberta-be-nc-games.herokuapp.com/api/reviews?sort_by=${sortBy}&order=${order}`
    )
    .then((res) => res.data.reviews);
}

export function getCategoryReviews(category) {
  return axios
    .get(
      `https://ezisberta-be-nc-games.herokuapp.com/api/reviews?category=${category}`
    )
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

export function patchVoteByReviewId(review_id) {
  return axios
    .patch(
      `https://ezisberta-be-nc-games.herokuapp.com/api/reviews/${review_id}`,
      { inc_votes: 1 }
    )
    .then((res) => res.data.review);
}

export function postCommentByReviewId(
  review_id,
  current_user,
  postedCommentBody
) {
  return axios.post(
    `https://ezisberta-be-nc-games.herokuapp.com/api/reviews/${review_id}/comments`,
    {
      username: current_user,
      body: postedCommentBody,
    }
  );
}
