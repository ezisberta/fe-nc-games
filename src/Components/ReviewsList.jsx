import { Link } from "react-router-dom";

export default function AllReviewsList({ reviewList }) {
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
            <div key={review_id} className="ListedReviewFragment">
              {/* the review itself will be a link in the mobile version, there should be a 'read more' / 'view review' button in the desktop version */}
              <Link to={`/reviews/${review_id}`}>
                <h2 className="ListedReviewTittle">{title}</h2>
              </Link>
              <p className="ListedReviewByAndIn">
                By: {owner} In: {category}
                {/* temporary, these will be split into spans, and the category will be Upper case and a link */}
              </p>
              <p className="ListedReviewOn">On: {created_at.slice(0, 10)}</p>
              <p className="ListedReviewPreviewText">
                {review_body.slice(0, 141)}...{" "}
                {/* temporary slice, will be more user friendly in the future */}
              </p>
              <span>Votes {votes}</span> <span>Comments {comment_count}</span>
            </div>
          );
        }
      )}
      ;
    </div>
  );
}
