import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBuilds.css"; // Import the CSS file

const MyBuilds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        const response = await axios.get("http://localhost:5000/api/builds/my-builds", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBuilds(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No builds found");
        } else {
          setError("Error fetching builds. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, [navigate]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="my-builds-container">
      <h1 className="my-builds-title">My Builds</h1>
      <div className="builds-grid">
        {builds.map((build) => (
          <div key={build._id} className="build-card">
            <h2 className="build-card-title">{build.name}</h2>
            <ul className="build-card-list">
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
