import "./layout.css"; // Import external stylesheet
import { Link } from "react-router";
import banner from "../assets/banner.gif";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <div className="header">
        <img src={banner} alt="Header img" className="banner-img" />
      </div>
      <div className="navbar">
        {" "}
        <Link to="/">Home</Link> | <Link to="/add-book">Add book</Link> |{" "}
        <Link to="/update-book">Update book</Link>{" "}
      </div>
      <div className="content">
        <div className="content-box">{children}</div>
      </div>
      <div className="footer">Created by codeFluroite &#169; 2025 </div>
    </div>
  );
};

export default Layout;
