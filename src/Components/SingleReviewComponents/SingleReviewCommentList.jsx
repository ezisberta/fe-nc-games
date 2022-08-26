export default function SingleReviewCommentList({
  commentList,
  current_user,
  handleDelete,
}) {
  return (
    <div className="SingleReviewCommentList">
      {commentList.map(({ comment_id, author, body, created_at, votes }) => {
        return (
          <div key={comment_id} className="ListedCommentFragment">
            <h3 className="ListedCommentAuthor">{author}</h3>
            <p className="ListedCommentText">{body}</p>
            <p className="ListedCommentDate">
              {created_at.slice(0, -1).split("T").join(" at ")}
            </p>
            <p className="ListedCommentVotes">Votes {votes}</p>
            {author === current_user ? (
              <button
                className="deleteButton"
                onClick={() => handleDelete(comment_id)}
              >
                Delete
              </button>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
