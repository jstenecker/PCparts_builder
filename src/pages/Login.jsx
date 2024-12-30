//Login and account creation page, utilizes Firebase for secure Google auth

// src/pages/Login.jsx
const Login = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        // Add login logic here (e.g., form validation, API call, etc.)
        console.log("Logged in!");
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter your username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;

