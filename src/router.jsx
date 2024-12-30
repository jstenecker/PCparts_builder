// Navigates between pages 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import PCbuilder from "./pages/PCbuilder";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/" element={<PCbuilder />} />
                <Route path="/" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;