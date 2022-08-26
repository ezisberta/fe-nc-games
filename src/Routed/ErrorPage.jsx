import { Link } from "react-router-dom";

export default function ErrorParamComponent({ status, message }) {
  status = status || 404;
  message = message || "Not Found";

  return (
    <div className="ErrorPage">
      <h1 className="ErrorPageHeader">Oops... :/</h1>
      <h2 className="ErrorPageStatus">{`${status}`}</h2>
      <h3 className="ErrorParamHeader">{message}</h3>
      <p>{"It seems thst we may have followed a wrong path... ;)"}</p>
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
    </div>
  );
}
