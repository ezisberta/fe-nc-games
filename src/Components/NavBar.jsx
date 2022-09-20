import { Link } from "react-router-dom";

export default function NavBar({ buttons }) {
  return (
    <div className="NavBar">
      {buttons.map(({ path, text }) => {
        return (
          <button className="NavButtons" key={text}>
            <Link to={path}>{text}</Link>
          </button>
        );
      })}
    </div>
  );
}
