import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getSingleReviewById,
  getCommentsBySingleReviewId,
  patchVoteByReviewId,
} from "../Apis";
import SingleReviewCommentList from "../Components/SingleReviewCommentList";

export default function SingleReviewPage() {
  const { id } = useParams();

  const [reviewObj, setReviewObj] = useState({});
  const [reviewComments, setReviewComments] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getSingleReviewById(id).then((fetchedReview) => {
      setVoteCount(fetchedReview.votes);
      setReviewObj(fetchedReview);
    });

    getCommentsBySingleReviewId(id).then((fetchedComments) => {
      setReviewComments(fetchedComments);
      setIsLoading(false);
    });
  }, [id]);

  const handleVoteClick = () => {
    setVoteCount((voteCount) => voteCount + 1);
    patchVoteByReviewId(id);
  };

  console.log(reviewObj);
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
        <div className="VoteField">
          Votes: {voteCount}{" "}
          <button className="addVoteButton" onClick={handleVoteClick}>
            +
          </button>{" "}
        </div>
        <div className="commentSection">
          <h2 className="CommentHeaderWithCount">
            Comments {`(${reviewObj.comment_count})`}
          </h2>
          <div>
            {isLoading ? (
              <h3>Loading</h3>
            ) : (
              <SingleReviewCommentList commentList={reviewComments} />
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
