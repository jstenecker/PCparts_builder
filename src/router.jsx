// Navigates between pages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PCbuilder from "./pages/PCbuilder";
import UserProfile from "./pages/UserProfile"; // Import UserProfile component
import Navbar from "./components/navbar/Navbar";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pcbuilder" element={<PCbuilder />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
