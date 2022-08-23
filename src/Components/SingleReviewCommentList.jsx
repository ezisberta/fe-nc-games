export default function SingleReviewCommentList({ commentList }) {
  return (
    <div className="SingleReviewCommentList">
      {commentList.map(({ comment_id, author, body, created_at, votes }) => {
        return (
          <div key={comment_id} className="ListedCommentFragment">
            <h3 className="ListedCommentAuthor">{author}</h3>
            <p className="ListedCommentText">{body}</p>
            <p className="ListedCommentDate">{created_at}</p>
            <p className="ListedCommentVotes">Votes {votes}</p>
          </div>
        );
      })}
      ;
    </div>
  );
}
