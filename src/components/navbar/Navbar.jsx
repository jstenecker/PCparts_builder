import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCogs, FaEnvelope, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
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
      </ul>
      <div className="navbar-profile">
        <FaUserCircle
          className="profile-icon"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />
        {dropdownVisible && (
          <div className="profile-dropdown">
            {user ? (
              <>
                <p>Hello, {user.name}!</p>
                <button
                  onClick={() => navigate("/profile")}
                  className="dropdown-btn"
                >
                  My Builds
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
