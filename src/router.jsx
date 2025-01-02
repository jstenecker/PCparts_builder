// Navigates between pages
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PCbuilder from "./pages/PCbuilder";
import UserProfile from "./pages/UserProfile";
import MyBuilds from "./pages/MyBuilds";
import Navbar from "./components/navbar/Navbar";

// Function to check if user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Check for token in localStorage
};

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pcbuilder" element={<PCbuilder />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected Routes */}
                <Route
                    path="/my-builds"
                    element={
                        isAuthenticated() ? (
                            <MyBuilds />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isAuthenticated() ? (
                            <UserProfile />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                {/* Fallback for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
