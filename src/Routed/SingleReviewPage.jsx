import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import SingleReviewCommentSection from "../Components/SingleReviewComponents/SingleReviewCommentSection";
import { getSingleReviewById, patchVoteByReviewId } from "../Apis";
import ErrorPage from "../Routed/ErrorPage";

export default function SingleReviewPage() {
  const { id } = useParams();

  const user = useContext(UserContext);

  const [reviewObj, setReviewObj] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getSingleReviewById(id)
      .then((fetchedReview) => {
        setVoteCount(fetchedReview.votes);
        setReviewObj(fetchedReview);
        setIsLoading(false);
      })
      .catch((catchedError) => {
        setError(catchedError);
      });
  }, [id]);

  const handleVoteClick = () => {
    setVoteCount((voteCount) => voteCount + 1);
    patchVoteByReviewId(id);
  };

  if (error) {
    return (
      <ErrorPage
        status={error.response.status}
        message={error.response.statusText}
      />
    );
  }

  return (
    <>
      <div className="SingleReviewPage">
        {isLoading ? (
          <h3>Loading</h3>
        ) : (
          <>
            <h1 className="SingleReviewTitle Header">{reviewObj.title}</h1>
            <div className="SingleReviewSpecs">
              By
              <span className="SingleReviewOwner SingleReviewSmallText">{`${reviewObj.owner}   `}</span>
              In
              <span className="SingleReviewSmallText">
                <Link
                  to={`/categories/${reviewObj.category}`}
                  className={`${
                    reviewObj.category[0].toUpperCase() +
                    reviewObj.category.slice(1)
                  }SingleReviewLink`}
                >
                  {`${
                    reviewObj.category[0].toUpperCase() +
                    reviewObj.category.slice(1)
                  } `}
                </Link>
              </span>
              On
              <span className="SingleReviewDate SingleReviewSmallText">
                {`${reviewObj.created_at.slice(0, 10)}`}
              </span>
            </div>
            <img
              className="SingleReviewImage"
              src={reviewObj.review_img_url}
              alt={reviewObj.title}
            ></img>
            <p className="SingleReviewBody">{reviewObj.review_body}</p>
            <div className="VoteField">
              Votes: {voteCount}{" "}
              <span>
                {user !== reviewObj.owner && (
                  <button className="addVoteButton" onClick={handleVoteClick}>
                    +
                  </button>
                )}
              </span>
            </div>
            <SingleReviewCommentSection idProp={id} />
            <div className="NavBar">
              <button className="NavButtons LeftNavButtons">
                <Link to="/reviews">Home</Link>
              </button>
              <button className="NavButtons RightNavButtons">
                <Link to="/reviews">View All</Link>
              </button>
              <button className="NavButtons RightNavButtons">
                <Link to="/categories">Go to Categories</Link>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
