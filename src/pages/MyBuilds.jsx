import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyBuilds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect if not logged in
          return;
        }

        const response = await axios.get('http://localhost:5000/api/builds/my-builds', {
            headers: { Authorization: `Bearer ${token}` },
          });          

        setBuilds(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No builds found');
        } else {
          setError('Error fetching builds. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-builds-container p-4 bg-background text-text">
      <h1 className="text-2xl font-bold mb-4">My Builds</h1>
      <div className="builds-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {builds.map((build) => (
          <div key={build._id} className="build-card p-4 bg-card rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{build.name}</h2>
            <ul className="mt-2 text-sm">
              <li><strong>CPU:</strong> {build.cpu}</li>
              <li><strong>GPU:</strong> {build.gpu}</li>
              <li><strong>RAM:</strong> {build.ram}</li>
              <li><strong>Storage:</strong> {build.storage}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBuilds;
