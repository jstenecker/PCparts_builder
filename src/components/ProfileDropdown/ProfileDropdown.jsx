// src/components/ProfileDropdown.jsx
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
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
          <p>Hello, {user.name}!</p>
          <button onClick={() => navigate("/profile")} className="dropdown-btn">
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
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </div>
  );
};

export default ProfileDropdown;
