import { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaDice, FaFile, FaDoorClosed } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaClipboard } from "react-icons/fa";
import { UserContext } from "../../App.js";
import "./Navbar2.css";
import Logout from "../Logout/Logout.js";

const Navbar2 = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const logout = useRef();

  useEffect(() => {
    const path = window.location.href;
    const li = document.querySelectorAll(".navli");
    const indicator = document.querySelector(".indicator");

    const setActive = (item) => {
      li.forEach((i) => {
        i.classList.remove("active");
      });
      item.classList.add("active");

      indicator.style.setProperty(
        "--index",
        Object.keys(li).find((key) => li[key] === item)
      );
    };

    li.forEach((item) => {
      if (path === item.childNodes[0].href) {
        setActive(item);
      }
    });

    if (user.isAuth) {
      logout.current.addEventListener("click", () => <Logout />);
    }
  }, [location]);

  return (
    <div className="Navbar2">
      <ul>
        <li className="navli">
          <Link className="link" to="/">
            <FaHome className="icon" />
            <span className="text">Home</span>
          </Link>
        </li>
        <li className="navli">
          <Link className="link" to="/numberGen">
            <FaDice className="icon" />
            <span className="text">Random Number Generator</span>
          </Link>
        </li>
        <li className="navli">
          <Link className="link" to="/todo">
            <FaClipboard className="icon" />
            <span className="text">Todos</span>
          </Link>
        </li>
        {user.isAuth && (
          <li className="navli">
            <Link className="link" to="/files">
              <FaFile className="icon" />
              <span className="text">Files</span>
            </Link>
          </li>
        )}

        {!user.isAuth && (
          <li className="navli">
            <Link className="link" to="/login">
              <FiSettings className="icon" />
              <span className="text">Login</span>
            </Link>
          </li>
        )}
        {user.isAuth && (
          <li className="navli">
            <div className="link" ref={logout}>
              <FaDoorClosed className="icon" />
            </div>
          </li>
        )}

        <div className="indicator"></div>
      </ul>
    </div>
  );
};
export default Navbar2;
