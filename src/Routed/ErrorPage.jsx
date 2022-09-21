import NavBar from "../Components/NavBar";

export default function ErrorParamComponent({ status, message }) {
  status = status || 404;
  message = message || "Not Found";

  return (
    <div className="ErrorPage">
      <h1 className="ErrorPageHeader Header">Oops... :/</h1>
      <h2 className="ErrorPageStatus">{`${status}`}</h2>
      <h3 className="ErrorParamHeader">{message}</h3>
      <p>{"It seems thst we may have followed a wrong path... ;)"}</p>
      <NavBar
        buttons={[
          { text: "Home", path: "/" },
          { text: "All", path: "/reviews" },
          { text: "Categories", path: "/categories" },
        ]}
      />
    </div>
  );
}
