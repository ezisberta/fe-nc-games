const axios = require("axios").default;

export function getAllReviews() {
  return axios
    .get(`https://nc-games-zw4f.onrender.com/api/reviews`)
    .then((res) => res.data.reviews);
}

export function getAllReviewsSorted(sortBy, order) {
  return axios
    .get(
      `https://nc-games-zw4f.onrender.com/api/reviews?sort_by=${sortBy}&order=${order}`
    )
    .then((res) => res.data.reviews);
}

export function getCategoryReviews(category) {
  return axios
    .get(`https://nc-games-zw4f.onrender.com/api/reviews?category=${category}`)
    .then((res) => res.data.reviews);
}

export function getCategories() {
  return axios
    .get("https://nc-games-zw4f.onrender.com/api/categories")
    .then((res) => res.data.categories);
}

export function getSingleReviewById(review_id) {
  return axios
    .get(`https://nc-games-zw4f.onrender.com/api/reviews/${review_id}`)
    .then((res) => res.data.review);
}

export function getCommentsBySingleReviewId(review_id) {
  return axios
    .get(`https://nc-games-zw4f.onrender.com/api/reviews/${review_id}/comments`)
    .then((res) => res.data.comments);
}

export function getSingleReviewVotesById(review_id) {
  return axios
    .get(`https://nc-games-zw4f.onrender.com/api/reviews/${review_id}/votes`)
    .then((res) => res.data.votes);
}

export function postVoteByReviewId(review_id, user) {
  return axios.post(
    `https://nc-games-zw4f.onrender.com/api/reviews/${review_id}/votes`,
    { user: user }
  );
}

export function deleteVoteByReviewId(review_id, user) {
  return axios.delete(
    `https://nc-games-zw4f.onrender.com/api/reviews/${review_id}/votes?voter=${user}`
  );
}

export function postCommentByReviewId(
  review_id,
  current_user,
  postedCommentBody
) {
  return axios.post(
    `https://nc-games-zw4f.onrender.com/api/reviews/${review_id}/comments`,
    {
      username: current_user,
      body: postedCommentBody,
    }
  );
}

export function deleteCommentById(comment_id) {
  return axios.delete(
    `https://nc-games-zw4f.onrender.com/api/comments/${comment_id}`
  );
}
