import { Link } from "react-router-dom";

export default function ReviewsList({ reviewList }) {
  return (
    <div className="ReviewsList">
      {reviewList.map(
        ({
          review_id,
          title,
          owner,
          category,
          created_at,
          review_body,
          votes,
          comment_count,
        }) => {
          return (
            <Link to={`/reviews/${review_id}`} key={review_id}>
              <div
                className={`ListedReviewFragment ${
                  category[0].toUpperCase() + category.slice(1)
                }ListFragment`}
              >
                <h2 className="ListedReviewTitle">{title}</h2>
                <p className="ListedReviewByAndIn ">
                  By
                  <span className="ListedReviewOwnerText ListedReviewSmallText">
                    {` ${owner}`}
                  </span>{" "}
                  In
                  <span className="ListedReviewCategoryText ListedReviewSmallText">
                    {` ${category[0].toUpperCase() + category.slice(1)}`}
                  </span>
                </p>
                <p className="ListedReviewOn">
                  On
                  <span className="ListedReviewDateText ListedReviewSmallText">
                    {` ${created_at.slice(0, 10)}`}
                  </span>
                </p>
                <p className="ListedReviewPreviewText">
                  {review_body.slice(0, 141)}...{" "}
                  {/* temporary slice, will be more user friendly in the future */}
                </p>
                <span>Votes {votes}</span> <span>Comments {comment_count}</span>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
}
