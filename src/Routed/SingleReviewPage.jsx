import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleReviewById, getCommentsBySingleReviewId } from "../Apis";
import SingleReviewCommentList from "../Components/SingleReviewCommentList";

export default function SingleReviewPage() {
  const { id } = useParams();

  const [reviewObj, setReviewObj] = useState({
    review_id: 0,
    title: "___",
    designer: "___",
    owner: "___",
    review_img_url: "___",
    review_body: "___",
    category: "___",
    created_at: "___",
    votes: 0,
    comment_count: 0,
  });
  const [reviewComments, setReviewComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getSingleReviewById(id).then((fetchedReview) => {
      setReviewObj(fetchedReview);
    });

    getCommentsBySingleReviewId(id).then((fetchedComments) => {
      setReviewComments(fetchedComments);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <div className="SingleReviewPage">
        <h1 className="ReviewTitle">{reviewObj.title}</h1>
        <div className="ReviewSpecs">
          By: (reviewObj.owner) In: {reviewObj.category}
          On: {reviewObj.created_at}
        </div>
        <img
          className="ReviewImage"
          src={reviewObj.review_img_url}
          alt={reviewObj.title}
        ></img>
        <p className="ReviewBody">{reviewObj.review_body}</p>
        <div className="VoteField">Votes: {reviewObj.votes}</div>
        <div className="commentSection">
          <h2 className="CommentHeaderWithCount">
            Comments {`(${reviewObj.comment_count})`}
          </h2>
          <div>
            {isLoading ? (
              <h3>Loading</h3>
            ) : (
              <>
                <div>
                  <SingleReviewCommentList commentList={reviewComments} />
                </div>
              </>
            )}
          </div>
          <div className="Add Comment Field">Form will go here</div>
          <div className="NavButtons">
            <Link to="/">Home</Link>
            <Link to="/reviews">All Reviews</Link>
            <Link to="/categories">Categories</Link>
          </div>
        </div>
      </div>
    </>
  );
}
