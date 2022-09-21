import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import SingleReviewCommentSection from "../Components/SingleReviewComponents/SingleReviewCommentSection";
import {
  getSingleReviewById,
  getSingleReviewVotesById,
  postVoteByReviewId,
  deleteVoteByReviewId,
} from "../Apis";
import ErrorPage from "../Routed/ErrorPage";
import NavBar from "../Components/NavBar";

export default function SingleReviewPage() {
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
    console.log(context.hasVoted);
    if (!context.hasVoted.includes(id)) {
      setHasVoted(true);
      setVoteCount((voteCount) => voteCount + 1);
      postVoteByReviewId(id, context.user).then(context.hasVoted.push(id));
    }
  };

  const handleUnvoteClick = () => {
    console.log(context.hasVoted);
    for (let i = 0; i < context.hasVoted.length; i++) {
      if (context.hasVoted[i] === id) {
        context.hasVoted.splice(i, 1);
      }
    }
    setHasVoted(false);
    setVoteCount((voteCount) => voteCount - 1);
    deleteVoteByReviewId(id, context.user);
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
    <div className="SingleReviewPage">
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <Link to={`/`} className="Logo SingleReviewLogo">
            <img
              src={require("../Images/nc-games-logo.png")}
              alt="NC logo"
            ></img>
          </Link>
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
              <>
                <FontAwesomeIcon
                  className="SingleReviewVoteIcon"
                  icon={faCheck}
                />
                <button
                  className="SingleReviewVoteButton"
                  onClick={handleUnvoteClick}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </>
            ) : context.user !== reviewObj.owner ? (
              <button
                className="SingleReviewVoteButton"
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
  );
}
