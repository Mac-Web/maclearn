import { Link } from "react-router";

function Btn({ link, content, blank = false }) {
  return (
    <Link to={link} className="action-btn" target={blank ? "_blank" : ""}>
      {content}
    </Link>
  );
}

export default Btn;
