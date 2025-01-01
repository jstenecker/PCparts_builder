import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeIZTXFxo12kM7Bu2ZIpxqc06C_LIiqn8",
  authDomain: "pcparts-bb425.firebaseapp.com",
  projectId: "pcparts-bb425",
  storageBucket: "pcparts-bb425.appspot.com",
  messagingSenderId: "380361184608",
  appId: "1:380361184608:web:bf9e389abd1f68d2003a05",
  measurementId: "G-Q9T6YJ5PP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    const event = new Event("userUpdate");
    window.dispatchEvent(event); // Dispatch custom event
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    navigate(redirectPath);
  };
  

  // Handle Manual Login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      saveUser(response.data.user);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
      console.error("Login error:", error);
    }
  };

  // Handle Manual Registration
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      saveUser(response.data.user);
      setMessage("Registration successful!");
      setIsRegistering(false); // Switch to login view
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering");
      console.error("Registration error:", error);
    }
  };

  // Handle Google Login
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("http://localhost:5000/api/users/auth/google", {
        idToken,
      });
      saveUser(response.data.user);
      setMessage("Google login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error with Google login");
      console.error("Google login error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        {isRegistering && (
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc" }}
            />
          </div>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required={!isRegistering}
            style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: isRegistering ? "#007BFF" : "#4CAF50", color: "white" }}>
          {isRegistering ? "Register" : "Log In"}
        </button>
      </form>
      <p style={{ textAlign: "center", margin: "1rem 0", color: "#f44336" }}>{message}</p>
      <hr />
      <button onClick={handleGoogleAuth} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#4285F4", color: "white" }}>
        Log in with Google
      </button>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: "none", border: "none", color: "#007BFF", cursor: "pointer" }}>
          {isRegistering ? "Log In" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Login;
