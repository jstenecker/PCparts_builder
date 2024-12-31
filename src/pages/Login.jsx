import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      console.log("User data:", response.data.user);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      setMessage("Registration successful!");
      console.log("Registered user:", response.data.user);
      setIsRegistering(false); // Switch to login after successful registration
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleAuth = () => {
    // Add Firebase Google authentication logic here
    console.log("Google authentication triggered!");
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
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
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
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: isRegistering ? "#007BFF" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isRegistering ? "Register" : "Log In"}
        </button>
      </form>
      <p style={{ textAlign: "center", margin: "1rem 0", color: "#f44336" }}>
        {message}
      </p>
      <hr />
      <button
        onClick={handleGoogleAuth}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Log in with Google
      </button>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{
            background: "none",
            border: "none",
            color: "#007BFF",
            textDecoration: "underline",
            cursor: "pointer",
            padding: "0",
          }}
        >
          {isRegistering ? "Log In" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Login;
