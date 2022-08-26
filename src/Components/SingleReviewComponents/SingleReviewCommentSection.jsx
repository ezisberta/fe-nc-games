import SingleReviewCommentList from "./SingleReviewCommentList";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import {
  getCommentsBySingleReviewId,
  postCommentByReviewId,
  deleteCommentById,
} from "../../Apis";

export default function SingleCommentSection({ idProp }) {
  const user = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [reviewComments, setReviewComments] = useState([]);
  const [addedCommentText, setAddedCommentText] = useState("");
  const [hasAddedComment, setHasAddedComment] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCommentsBySingleReviewId(idProp).then((fetchedComments) => {
      setReviewComments(fetchedComments);
      setIsLoading(false);
    });
  }, [idProp]);

  const handleCommentInputBoxChange = (event) => {
    setAddedCommentText(event.target.value);
  };

  const handleAddCommentClick = (event) => {
    event.preventDefault();

    console.log(idProp);
    const optimisticArr = [];
    const optimisticComment = {
      comment_id: uuid(),
      author: user,
      body: addedCommentText,
      created_at: `${new Date().toJSON()}`,
      votes: 0,
    };

    optimisticArr.push(optimisticComment);

    setReviewComments([...reviewComments, ...optimisticArr]);

    setAddedCommentText("");

    setHasAddedComment(true);

    postCommentByReviewId(idProp, user, addedCommentText);
  };

  const handleCommentFormSubmit = (event) => {
    event.preventDefault();
  };

  const removeComment = (commentId) => {
    const filteredComments = reviewComments.filter(
      (comment) => comment.comment_id !== commentId
    );

    setReviewComments(filteredComments);
    deleteCommentById(commentId);
  };

  function AddedCommentConfirmation() {
    setTimeout(() => setHasAddedComment(false), 3000);
    return (
      <p className="AddedCommentConfirmationP">Comment Added Sucsessfuly!</p>
    );
  }

  return (
    <div className="commentSection">
      <h2 className="CommentHeaderWithCount">
        Comments {`(${reviewComments.length})`}
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
      {hasAddedComment ? (
        <AddedCommentConfirmation />
      ) : (
        <form className="Add Comment Field" onSubmit={handleCommentFormSubmit}>
          <label htmlFor="AddCommentInputBox">
            <input
              className="AddCommentInputBox"
              id="AddCommentInputBox"
              name="AddCommentInputBox"
              type="text"
              placeholder="Write a comment here..."
              value={addedCommentText}
              onChange={handleCommentInputBoxChange}
              size="height: 200px;"
            />
          </label>
          {addedCommentText.trim().length !== 0 && (
            <button
              className="AddCommentButton"
              onClick={handleAddCommentClick}
            >
              Add Comment
            </button>
          )}
        </form>
      )}
    </div>
  );
}
