import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import {
  getSingleReviewById,
  getCommentsBySingleReviewId,
  patchVoteByReviewId,
  postCommentByReviewId,
  deleteCommentByID,
} from "../Apis";
import SingleReviewCommentList from "../Components/SingleReviewCommentList";

export default function SingleReviewPage() {
  const { id } = useParams();

  const user = useContext(UserContext);

  const [reviewObj, setReviewObj] = useState({});
  const [reviewComments, setReviewComments] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [addedCommentText, setAddedCommentText] = useState("");

  const optimisticArr = [];

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

  const handleCommentInputBoxChange = (event) => {
    setAddedCommentText(event.target.value);
  };

  const handleAddCommentClick = (event) => {
    event.preventDefault();

    const optimisticComment = {
      comment_id: uuid(),
      author: user,
      body: addedCommentText,
      created_at: `${new Date().toJSON()}`,
      votes: 0,
    };
    optimisticArr.push(optimisticComment);
    postCommentByReviewId(id, user, addedCommentText);

    setReviewComments([...reviewComments, ...optimisticArr]);

    setAddedCommentText("");
  };

  const removeComment = (commentID) => {
    const filteredComments = reviewComments.filter(
      (comment) => comment.comment_id !== commentID
    );

    setReviewComments(filteredComments);
    deleteCommentByID(commentID);
  };

  return (
    <>
      <div className="SingleReviewPage">
        <h1 className="ReviewTitle">{reviewObj.title}</h1>
        <div className="ReviewSpecs">
          By: {reviewObj.owner} In: {reviewObj.category}
          On: {reviewObj.created_at}
        </div>
        <img
          className="ReviewImage"
          src={reviewObj.review_img_url}
          alt={reviewObj.title}
        ></img>
        <p className="ReviewBody">{reviewObj.review_body}</p>
        <div className="VoteField">
          Votes: {voteCount}
          <span>
            {user === reviewObj.owner ? (
              <></>
            ) : (
              <button className="addVoteButton" onClick={handleVoteClick}>
                +
              </button>
            )}
          </span>
        </div>
        <div className="commentSection">
          <h2 className="CommentHeaderWithCount">
            Comments {`(${reviewObj.comment_count})`}
          </h2>
          <div>
            {isLoading ? (
              <h3>Loading</h3>
            ) : (
              <SingleReviewCommentList
                commentList={reviewComments}
                current_user={user}
                handleDelete={removeComment}
              />
            )}
          </div>
          <form className="Add Comment Field">
            <label htmlFor="AddCommentInputBox">
              <input
                className="AddCommentInputBox"
                id="AddCommentInputBox"
                name="AddCommentInputBox"
                type="text"
                placeholder="Write a comment..."
                value={addedCommentText}
                onChange={handleCommentInputBoxChange}
              />
            </label>
            {addedCommentText.trim().length !== 0 && (
              <button onClick={handleAddCommentClick}>Add Comment</button>
            )}
          </form>
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
