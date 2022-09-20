import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import SingleReviewCommentSection from "../Components/SingleReviewComponents/SingleReviewCommentSection";
import {
  getSingleReviewById,
  postVoteByReviewId,
  getSingleReviewVotesById,
} from "../Apis";
import ErrorPage from "../Routed/ErrorPage";
import NavBar from "../Components/NavBar";

export default function SingleReviewPage() {
  console.log(<FontAwesomeIcon icon={faPlus} />);
  const { id } = useParams();

  const context = useContext(Context);

  const [reviewObj, setReviewObj] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getSingleReviewById(id)
      .then((fetchedReview) => {
        setVoteCount(fetchedReview.vote_count);
        setReviewObj(fetchedReview);
        setIsLoading(false);
      })
      .catch((catchedError) => {
        setError(catchedError);
      });

    getSingleReviewVotesById(id).then((fetchedVotes) => {
      if (fetchedVotes.find((vote) => vote.voter === context.user)) {
        setHasVoted(true);
      }
    });
  }, [id, context.user]);

  const handleVoteClick = () => {
    if (!context.hasVoted.includes(id)) {
      setHasVoted(true);
      setVoteCount((voteCount) => voteCount + 1);
      postVoteByReviewId(id, context.user).then(context.hasVoted.push(id));
    }
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
            <div className="SingleReviewVoteField">
              Votes: {voteCount}{" "}
              {hasVoted ? (
                <s className="SingleReviewVoteCheck">-</s>
              ) : context.user !== reviewObj.owner ? (
                <button
                  className="SingleReviewAddVoteButton"
                  onClick={handleVoteClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ) : (
                <></>
              )}
            </div>
            <SingleReviewCommentSection idProp={id} />
            <NavBar
              buttons={[
                { text: "Home", path: "/" },

                { path: "/categories", text: "Categories" },
                { path: "/reviews", text: "All" },
              ]}
            />
          </>
        )}
      </div>
    </>
  );
}
