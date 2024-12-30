// Creates button for various uses
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ label, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) {
            navigate(route);
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1, backgroundColor: "#535bf2", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            style={{
                padding: "0.6em 1.2em",
                fontSize: "1em",
                fontWeight: "500",
                borderRadius: "8px",
                border: "1px solid transparent",
                backgroundColor: "#646cff",
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.3s",
            }}
        >
            {label}
        </motion.button>
    );
};

// Add prop validation
Button.propTypes = {
    label: PropTypes.string.isRequired, // The label for the button
    route: PropTypes.string.isRequired, // The route to navigate to
};

export default Button;
