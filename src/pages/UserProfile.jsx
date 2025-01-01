import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      setMessage('Please log in to access your profile.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error);
        setMessage('Error fetching profile. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch saved builds
  const fetchBuilds = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to load your builds.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/users/builds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedBuilds(response.data);
    } catch (error) {
      console.error('Error fetching builds:', error.response?.data || error);
      setMessage('Error fetching saved builds.');
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to delete your account.');
      return;
    }

    try {
      await axios.delete('http://localhost:5000/api/users/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/'; // Redirect to home page
    } catch (error) {
      console.error('Error deleting account:', error.response?.data || error);
      setMessage('Error deleting account.');
    }
  };

  if (loading) {
    return <div className="user-profile">Loading user data...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Registered on:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
        </div>
      ) : (
        <p className="error-message">{message}</p>
      )}
      <hr />
      <h2>Saved PC Builds</h2>
      <button className="load-builds-btn" onClick={fetchBuilds}>Load Builds</button>
      <ul className="builds-list">
        {savedBuilds.length > 0 ? (
          savedBuilds.map((build) => (
            <li key={build.id} className="build-item">{build.name}</li>
          ))
        ) : (
          <p>No saved builds found.</p>
        )}
      </ul>
      <hr />
      <button className="delete-account-btn" onClick={handleDeleteAccount}>
        Delete Account
      </button>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default UserProfile;

// Embedded CSS
const style = document.createElement('style');
style.textContent = `
  .user-profile {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .user-profile h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
  }

  .profile-info p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .profile-info strong {
    color: #007BFF;
  }

  .profile-picture {
    display: block;
    max-width: 150px;
    margin: 1rem auto;
    border-radius: 50%;
    border: 2px solid #007BFF;
  }

  .load-builds-btn {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .load-builds-btn:hover {
    background-color: #0056b3;
  }

  .builds-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .build-item {
    background-color: #e9ecef;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 4px;
  }

  .delete-account-btn {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: red;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .delete-account-btn:hover {
    background-color: darkred;
  }

  .error-message {
    text-align: center;
    color: red;
    margin-top: 1rem;
  }
`;
document.head.appendChild(style);
