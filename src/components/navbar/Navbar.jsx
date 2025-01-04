import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCogs, FaTools, FaEnvelope, FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
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

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
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
            onClick={toggleDropdown}
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
            onClick={toggleDropdown}
          />
        )}
        {dropdownVisible && (
          <ProfileDropdown
            user={user}
            closeDropdown={() => setDropdownVisible(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
