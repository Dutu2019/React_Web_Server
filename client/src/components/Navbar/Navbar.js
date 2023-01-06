import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../icons/logo-react-icon.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar-box">
        <img className="logo" src={logo} alt="react img" />
        <Link className="navbar-item" to="/">
          Home
        </Link>
        <Link className="navbar-item" to="/movies">
          Movies
        </Link>
        <Link className="navbar-item" to="/numberGen">
          Random Number Generator
        </Link>
        <Link className="navbar-item" to="/account">
          Account
        </Link>
      </div>
    </>
  );
};

export default Navbar;
