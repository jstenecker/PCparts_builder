import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCogs, FaEnvelope, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user and theme preference on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme ? "dark" : "light");
  }, []);

  // Listen for custom "userUpdate" event
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

  // Handle Login Redirect
  const handleLogin = () => {
    localStorage.setItem("redirectPath", location.pathname); // Save current path
    navigate("/login"); // Redirect to login page
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    const event = new Event("userUpdate"); // Trigger custom event
    window.dispatchEvent(event);
    setDropdownVisible(false); // Close dropdown
    navigate("/"); // Redirect to home
  };

  // Toggle Dark Mode
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
              My Builds
            </Link>
          </li>
        )}
      </ul>
      <div className="navbar-profile">
        <FaUserCircle
          className="profile-icon"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />
        {dropdownVisible && (
          <div className="profile-dropdown">
            {/* ✕ button to close the dropdown */}
            <button
              onClick={() => setDropdownVisible(false)}
              className="dropdown-close-btn"
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "transparent",
                border: "none",
                color: darkMode ? "white" : "black",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            {user ? (
              <>
                <p>Hello, {user.name}!</p>
                <button
                  onClick={() => navigate("/profile")}
                  className="dropdown-btn"
                >
                  Profile
                </button>
                <button onClick={handleLogout} className="dropdown-btn">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <p>You are not signed in</p>
                <button onClick={handleLogin} className="dropdown-btn">
                  Login
                </button>
              </>
            )}
            <hr />
            {/* Theme Selector */}
            <div
              className="theme-toggle"
              onClick={toggleDarkMode}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
