import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [savedBuilds, setSavedBuilds] = useState([]);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use stored token
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  // Fetch saved builds
  const fetchBuilds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/builds', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSavedBuilds(response.data);
    } catch (error) {
      console.error('Error fetching builds:', error);
      setMessage('Error fetching saved builds');
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/api/users/delete', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect to home page
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error deleting account');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.profilePicture && <img src={user.profilePicture} alt="Profile" style={{ maxWidth: '150px' }} />}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <hr />
      <h2>Saved PC Builds</h2>
      <button onClick={fetchBuilds}>Load Builds</button>
      <ul>
        {savedBuilds.map((build) => (
          <li key={build.id}>{build.name}</li>
        ))}
      </ul>
      <hr />
      <button onClick={handleDeleteAccount} style={{ color: 'red' }}>
        Delete Account
      </button>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
};

export default UserProfile;
