// src/components/ProfileDropdown.jsx
import { FaSun, FaMoon } from "react-icons/fa";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./ProfileDropdown.css";

const ProfileDropdown = ({
  user,
  darkMode,
  toggleDarkMode,
  handleLogin,
  handleLogout,
  closeDropdown,
  navigate,
}) => {
  return (
    <div className="profile-dropdown">
      <button onClick={closeDropdown} className="dropdown-close-btn">
        ✕
      </button>
      {user ? (
        <>
          <p className="welcome-text">Hello, {user.name}!</p>
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
          <p className="welcome-text">You are not signed in</p>
          <button onClick={handleLogin} className="dropdown-btn">
            Login
          </button>
        </>
      )}
      <hr className="dropdown-divider" />
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </div>
  );
};

// Prop validation for safety
ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default ProfileDropdown;
