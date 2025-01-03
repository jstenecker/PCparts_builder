import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCogs, FaTools, FaEnvelope, FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme ? "dark" : "light");
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userUpdate", handleUserUpdate);
    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    const event = new Event("userUpdate");
    window.dispatchEvent(event);
    setDropdownVisible(false);
    navigate("/");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome /> Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/pcbuilder" className="navbar-link">
            <FaCogs /> PC Builder
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">
            <FaEnvelope /> Contact
          </Link>
        </li>
        {user && (
          <li className="navbar-item">
            <Link to="/my-builds" className="navbar-link">
              <FaTools /> My Builds
            </Link>
          </li>
        )}
      </ul>
      <div className="navbar-profile">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ) : (
          <FaUserCircle
            className="profile-icon"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />
        )}
        {dropdownVisible && (
          <ProfileDropdown
            user={user}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            closeDropdown={() => setDropdownVisible(false)}
            navigate={navigate}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
