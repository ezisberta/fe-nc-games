export default function SingleReviewCommentList({
  commentList,
  optimisticComment,
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
          </div>
        );
      })}
      {optimisticComment ? (
        <div className="OptimisticCommentPlace">
          <h3 className="ListedCommentAuthor">{optimisticComment.author}</h3>
          <p className="ListedCommentText">{optimisticComment.body}</p>
          <p className="ListedCommentDate">{optimisticComment.created_at}</p>
          <p className="ListedCommentVotes">Votes {optimisticComment.votes}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
